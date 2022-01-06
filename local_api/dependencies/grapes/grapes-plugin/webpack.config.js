const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const pkg = require("./package.json");
const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const name = pkg.name;
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveFilesPlugin = require("remove-files-webpack-plugin");
const MergeFilesPlugin = require("merge-files-webpack-plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CreateFileWebpack = require("create-file-webpack");

let plugins = [];

getCogentAppCss = () => {
  let cssObj = {};

  const dep = "../../";
  const cogentAppDist = ["app/dist/", "app/dist/bundles/"];
  cogentAppDist.forEach((searchDir) => {
    const searchPath = path.join(dep, searchDir);
    fs.readdirSync(searchPath).forEach((file) => {
      const p = path.join(searchPath, file);
      if (fs.statSync(p).isFile() && path.extname(p) === ".css") {
        cssObj[path.basename(file)] = path.join(dep + searchDir, file);
      }
    });
  });
  return cssObj;
};

getEntry = () => {
  let rc = {};
  rc[name + ".min.js"] = "./src/index.ts";
  rc = { ...rc, ...getCogentAppCss() };

  return rc;
};

module.exports = (env = {}) => {
  plugins = [
    // new ExtractTextPlugin("dist/css/vue-extracted-styles.[name]"),
    new MiniCssExtractPlugin({
      filename: "dist/css/vue-extracted-styles.bundle.[name].css",
      chunkFilename: "dist/css/vue-extracted-styles.bundle.[name]",
    }),
    new CopyWebpackPlugin([
      {
        from: "../../app/dist/bundles/",
        to: "./bundles/[name].[ext]",
      },
      {
        from: "./node_modules/grapesjs/dist/grapes.js",
        to: "./dist/grapes.js",
      },
      {
        from: "./node_modules/grapesjs/dist/css/grapes.min.css",
        to: "./dist/css/grapes.min.css",
      },
    ]),
    new CreateFileWebpack({
      path: "../dist/bundles/",
      // file name
      fileName: "App.css",
      // content of the file
      content:
        "//Grapes Webpack removed content, because it interfered with editor styles",
    }),
  ];

  if (env.production) {
    plugins.push(new UglifyJsPlugin());
    plugins.push(new webpack.BannerPlugin(`${name} - ${pkg.version}`));
    plugins.push(
      new MergeFilesPlugin({
        //get all the files that have "style.css" in their name, and merge them into one file named allStyles.css
        filename: "dist/css/vue-extracted-styles.css", //the name of the merged file
        test: /vue-extracted-styles.bundle.*\.css$/,
        deleteSourceFiles: true, //deletes all the original [name].style.css files
      })
    );
    plugins.push(
      new RemoveFilesPlugin({
        after: {
          root: "../dist/dist",
          test: [
            {
              //remove junk files from MiniCssExtractPlugin output
              folder: ".",
              method: (absoluteItemPath) => {
                return new RegExp(/^.*\.css$/).test(absoluteItemPath);
              },
              trash: true,
              recursive: false,
            },
          ],
        },
      })
    );
  } else {
    const index = "../dist/index.html";
    const indexDev = "_" + index;
    plugins.push(
      new HtmlWebpackPlugin({
        template: fs.existsSync(indexDev) ? indexDev : index,
        inject: false,
      })
    );
  }

  return {
    mode: "production",
    entry: getEntry(),
    output: {
      path: path.resolve(__dirname, "../dist"),
      filename: `./dist/[name]`,
      chunkFilename: "./dist/bundles/[name]",
      library: name,
      libraryTarget: "umd",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".css"],
      alias: {
        "@": path.join(__dirname, "src"),
      },
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          include: [
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "../../app/dist"),
          ],
          options: {
            appendTsSuffixTo: [/\.vue$/],
          },
        },
        {
          test: /\.(png|jpg|gif|svg)$/, //specifically setup for css, output path matches path for extracted css
          loader: "file-loader",
          include: [
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "../../app/dist"),
          ],
          options: {
            name: "[name].[ext]",
            publicPath: "vue-extracted-assets/",
            outputPath: "dist/css/vue-extracted-assets/",
          },
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },
    node: { fs: "empty" },
    externals: { grapesjs: "grapesjs" },
    plugins: plugins,
    devServer: {
      contentBase: "../dist/",
    },
  };
};
