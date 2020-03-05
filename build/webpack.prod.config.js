const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

module.exports =webpackMerge(commonConfig, {
  devtool: 'cheap-module-source-map',
  mode: 'production',
  optimization: {},
  plugins: []
});