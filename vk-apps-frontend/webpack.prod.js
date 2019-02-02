const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'API_URL': JSON.stringify('https://tutors-app.ru/api'),
        'ROOT_URL': JSON.stringify('https://tutors-app.ru'),
        'VK_APP_ID': JSON.stringify(6700618)
      }
    })
  ]
});
