const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = function (env, argv) {
  return [
    {
      entry: "./src/index.ts",
      output: {
        path:
          process.env.NODE_ENV !== "production"
            ? path.resolve(__dirname, "./dist")
            : path.resolve(__dirname, "./dist/production"),
        publicPath: "./",
        filename: "./build.js",
        chunkFilename: "./bundles/[name].bundle.js",
        libraryTarget: "umd",
        library: "cogent-app",
        umdNamedDefine: true,
      },
      // externals: {
      //   "/../PlaycanvasEngine/dist": "pc",
      // },
      module: {
        rules: [
          {
            test: /\.vue$/,
            loader: "vue-loader",
            exclude: /node_modules/,
            options: {
              // extractCSS: true,
              preserveWhitespace: false,
            },
          },
          {
            test: /\.(css|scss)$/,
            exclude: /node_modules/,
            use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
          },
          {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: [
              /node_modules/,
              path.resolve(__dirname, "./src/tests/jest/"),
              path.resolve(__dirname, "./src/tests/testcafe"),
            ],
            options: {
              compilerOptions: {
                declarationDir:
                  process.env.NODE_ENV !== "production"
                    ? path.resolve(__dirname, "./dist/types")
                    : path.resolve(__dirname, "./dist/production/types"),
              },
              appendTsSuffixTo: [/\.vue$/],
              transpileOnly: process.env.NODE_ENV !== "production",
            },
          },
          {
            test: /\.(png|jpe?g|gif|svg|mp3|mp4|webm|ogv)$/,
            exclude: /node_modules/,
            use: [
              {
                loader: "file-loader",
                options: {
                  name: "[name].[ext]?[hash]",
                  publicPath: "../assets/",
                  outputPath: "assets/",
                },
              },
            ],
          },
          {
            test: /\.(woff|woff2|eot|ttf)$/,
            loader: "url-loader?limit=100000",
            exclude: /node_modules/,
          },
        ],
      },
      optimization: {
        splitChunks: {
          minChunks: 2,
          cacheGroups: {
            //Extract CSS to single file: https://webpack.js.org/plugins/mini-css-extract-plugin/#extracting-all-css-in-a-single-file
            styles: {
              name: "vueStyle.css",
              test: /\.css$/,
              chunks: "all",
              enforce: false,
            },
          },
        },
      },
      plugins: [
        new MiniCssExtractPlugin({
          filename: "vueStyle.css",
          chunkFilename: "./bundles/[name].css",
        }),
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
          { from: "./src/assets/audio/", to: "./assets/audio/" },
          { from: "package.dist.json", to: "package.json" },
        ]),
      ],

      resolve: {
        extensions: [".ts", ".js", ".vue", ".json"],
        alias: {
          vue$: "vue/dist/vue.esm.js",
          "@": path.join(__dirname, "src"),
        },
      },
      devServer: {
        historyApiFallback: true,
        noInfo: true,
        contentBase: [
          path.join(__dirname, "dist"),
          __dirname,
          path.join(__dirname, "view"),
          argv["publish-dir"] === undefined
            ? path.join(__dirname, "project")
            : argv["publish-dir"],
        ],
        publicPath: "/",
        host: "0.0.0.0",
        public: "localhost:8080",
      },
      performance: {
        hints: false,
      },
      devtool: "#eval-source-map",
      bail: true,
    },
  ];
};

console.log(
  "env =",
  process.env.NODE_ENV,
  process.env.NODE_ENV === "production"
);

if (process.env.NODE_ENV === "production") {
  console.log("doing production build stuff");
  module.exports.devtool = "#source-map";
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"',
      },
    }),
    new UglifyJsPlugin({
      sourceMap: true,
      // uglifyOptions: {
      //   warnings: false
      // }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
  ]);
  // console.log(module.exports.plugins);
}
