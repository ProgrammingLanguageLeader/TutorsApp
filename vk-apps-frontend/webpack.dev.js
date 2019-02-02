const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'API_URL': JSON.stringify('http://localhost:8000/api'),
        'ROOT_URL': JSON.stringify('http://localhost:8000'),
        'VK_APP_ID': JSON.stringify(6700618)
      }
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    watchContentBase: true,
  },
});
