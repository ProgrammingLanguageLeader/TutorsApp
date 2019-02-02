const webpack = require("webpack");
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
  context: path.resolve(__dirname, "src"),
  entry: "./index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-sprite-loader",
          },
          "svg-fill-loader",
          "svgo-loader"
        ]
      },
      {
        test: /\.(gif|png|jpe?g)$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[name].[ext]"
          }
        }],
      },
    ]
  },
  
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      filename: "./index.html", 
    }),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(process.env.NODE_ENV || 'development'),
        "API_URL": JSON.stringify("https://tutors-app.ru/api/"),
        "VK_APP_ID": JSON.stringify(6700618)
      }
    })
  ],

  resolve: {
    alias: {
      "vk-apps-frontend": path.resolve(__dirname, "src"),
    }
  }
};
