const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProd = process.env.NODE_ENV === 'production';

console.log('isProd:', isProd);

module.exports = {
  entry: path.resolve(__dirname, '../src/index.js'),
  output: {
    // filename 分包后输出的chunks的文件名
    filename: '[name].[hash:8].bundle.js',
    path: path.resolve(__dirname, '../dist'),
    // 静态资源存放地址
    publicPath: '/'
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
          // 'style-loader',
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     esModule: false,
          //     publicPath: '/'
          //   }
          // },
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 2
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          // 'style-loader',
          // MiniCssExtractPlugin.loader,
           {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
              hmr: !isProd,
              reloadAll: !isProd,
            }
          },
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
      //   file-loader 把小文件转换为base64格式
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
      template: path.resolve(__dirname, '../index.html')
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isProd ? 'style.[hash].css': 'style.css',
      chunkFilename: isProd ? 'style.[hash].css' : 'style.css'
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      // automaticNameDelimiter: '-',
      automaticNameMaxLength: 20,
      cacheGroups: {
        react: {
          test: /(react|react-dom|prop-types)[\\/]/,
          chunks: 'initial'
        }
      }
  },
}
};