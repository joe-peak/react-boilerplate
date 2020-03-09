const { HotModuleReplacementPlugin } = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.config');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  devServer: {
    port: 3060,
    open: true,
    hot: true,
    hotOnly: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3030/api',
        changeOrigin: true,
        headers: {},
        secure: true,
      },
    },
  },
  optimization: {
    // Tree Shaking
    // 开发环境设置，生产环境不需设置
    usedExports: true,
  },
  plugins: [
    // 模块热更新插件
    new HotModuleReplacementPlugin(),
  ],
});
