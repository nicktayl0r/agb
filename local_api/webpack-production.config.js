var path = require("path");
var projectFiles = require("./utils/buildHelper").findProjectCssHtml;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const projectName = require("./utils/buildHelper").GetProjectName;
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const srcHelper = require("./utils/helpers/srcHelper.js");

const files = projectFiles(); //get all the css and html files used by the app + player_dist/vueStyle.css + project/assets/case.css
//add more files to be processed with files["path/to/exported/file.ext"] = "path/to/source/file.ext"

module.exports = {
  entry: files,
  output: {
    path: path.resolve("../publish/"),
    filename: "./[name]",
    publicPath: "/publish/",
  },

  devServer: {
    contentBase: "publish",
  },

  module: {
    rules: [
      {
        test: /\.(css|scss)$/,

        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        type: "javascript/auto",
        test: /\.json/, //for animated svg json src tags
        use: {
          loader: "file-loader",
          options: {
            outputPath: "assets/images", //where to put the final file output.publicPath + assets/images
            publicPath: "./assets/images", //what to have the src link be in the html file (ex: <img src= "./assets/images/[filename]">)
          },
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "file-loader", //(fourth) take extracted html text and save them out as html files @ name:
            options: {
              name: "data/pages/[name].[ext]", //put the html files at output.publicpath + data/pages/[name].[ext]
            },
          },
          { loader: "extract-loader" }, //(third) extract text out of webpack bundle
          { loader: path.resolve("./utils/require-condition-src-loader.js") }, //(second) custom loader to add "require()" around src urls in conditions
          {
            loader: "html-loader", //(first) parse html file for src attribute urls (images, etc) into js with "require()"
            options: {
              attrs: srcHelper.getSrcAttributes(),
              // minimize: true
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            modules: false,
          },
        },
      },
      // {
      // 	test: /\.(png|jpe?g|gif|svg)$/,
      // 	loader: "image-webpack-loader",
      // 	// Specify enforce: 'pre' to apply the loader
      // 	// before url-loader/svg-url-loader
      // 	// and not duplicate it in rules with them
      // 	enforce: "pre",
      // },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: {
          loader: "file-loader", //"url-loader", //take src links and convert to base64 data if under limit, else use file-loader to put file @ outputPath, but change src to publicPath.
          options: {
            // limit: 50000, //limit of 50K, if under limit then convert the file into base64 data and \embed in the html tag (ex: <img src="alsdfaweoradflsasewf203...">)
            outputPath: "assets/images", //where to put the final file if over limit, output.publicPath + assets/images
            publicPath: "./assets/images", //what to have the src link be in the html file (ex: <img src= "./assets/images/[filename]">)
          },
        },
      },
      {
        test: /\.(webm|mp4|ogv)$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "assets/movies", //where to put the final file output.publicPath + assets/movies
            publicPath: "./assets/movies", //what to have the src link be in the html file (ex: <video src= "./assets/movies/[filename]">)
          },
        },
      },
      {
        test: /\.(mp3|aac|m4a|ogg)$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "assets/audio", //where to put the final file output.publicPath + assets/audio
            publicPath: "./assets/audio", //what to have the src link be in the html file (ex: <audio src= "./assets/audio/[filename]">)
          },
        },
      },
      {
        test: /\.svg/,
        use: [
          {
            loader: "file-loader", //"svg-url-loader",
            options: {
              // limit: 50000, //limit of 50K, if under limit then convert the file into base64 data and \embed in the html tag (ex: <img src="alsdfaweoradflsasewf203...">)
              outputPath: "assets/images", //where to put the final file if over limit, output.publicPath + assets/images
              publicPath: "./assets/images", //what to have the src link be in the html file (ex: <img src= "./assets/images/[filename]">)
              noquotes: true,
            },
          },
          { loader: "extract-loader" },
          {
            loader: "html-loader", //(first) parse svg file for image src attribute urls (images) into js with "require()"
            options: {
              attrs: ["img:src", "href", "link:href", "image:xlink:href"],
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: {
          loader: "file-loader",
          options: {
            outputPath: "assets/fonts", //where to put the final file if over limit, output.publicPath + assets/images
            publicPath: "./assets/fonts", //what to have the src link be in the html file (ex: <img src= "../../assets/images/[filename]">)
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        //Extract CSS to single file: https://webpack.js.org/plugins/mini-css-extract-plugin/#extracting-all-css-in-a-single-file
        styles: {
          name: "allStyles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      //filename: "allStyles.css",
      filename: "[name].css",
      chunkFilename: "[name].css",
      fallback: "style-loader",
    }),
    new HtmlWebpackPlugin({
      //generate an index.html file
      title: projectName(), //set the page title to the project name
      template: "./publishTemplates/index-template.ejs", //use this file as a starting point, it includes hardcoded libraries and ids (bootstrap, etc)
      chunks: [], //don't insert any of the webpacked files into the html. Otherwise this adds a bunch of files that are either deleted/merged (style.css) or unnecessary (page.html)
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new CopyWebpackPlugin([
      {
        from: "./dependencies/app/dist/production/bundles/*",
        to: "./bundles/[name].[ext]",
      },
      { from: "./dependencies/app/dist/production/assets/", to: "./assets/" },
      {
        from: "./dependencies/app/dist/production/*.js*",
        to: "./[name].[ext]",
      },
      {
        from: "./node_modules/@is3d/playcanvasengine/*min.js",
        to: "./lib/[name].[ext]",
      },
      {
        from: "./node_modules/@is3d/playcanvasengine/basis*",
        to: "./lib/[name].[ext]",
      },
    ]),
  ],
};
