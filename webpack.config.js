const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.[hash].js',
    path: path.resolve(__dirname, 'dist'),
    // 静态资源存放地址
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  devServer: {
    port: 3060,
    open: true,
    hot: true,
    hotOnly: true,
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.jsx?$/,
        use: 'babel-loader?compact=false'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'postcss-loader',
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      },
      // {
      //   test: /\.(jpe?g|png|gif)/i,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: '[name].[ext]',
      //       outputPath: 'public/images/',
      //     }
      //   }
      // },
      {
        test: /\.(jpe?g|png|gif)/i,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: 'public/images/',
            limit: 8192,
            // limit: 381920,
            // fallback: require.resolve('file-loader')
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'react-boilerplate',
      template: path.resolve(__dirname, 'index.html')
    }),
    new CleanWebpackPlugin(),
    // 模块热更新插件
    new HotModuleReplacementPlugin(),
  ]
};