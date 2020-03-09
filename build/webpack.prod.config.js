const webpackMerge = require('webpack-merge');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const commonConfig = require('./webpack.common.config');


module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-source-map',
  mode: 'production',
  optimization: {
    minimizer: [new TerserJSPlugin(), new OptimizeCssAssetsPlugin()],
    splitChunks: {
      // cacheGroups: {
      //   style: {
      //     name: 'style.css',
      //     test: /\.css$/g,
      //     chunks: 'all',
      //     enforce: true,
      //   }
      // }
    },
  },
  plugins: [],
});
