const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack');

const isProd = process.env.NODE_ENV === 'production';
console.log('isProd:', isProd);

module.exports = {
  entry: path.resolve(__dirname, '../src/index'),
  output: {
    // filename 分包后输出的chunks的文件名
    filename: '[name].[hash:8].bundle.js',
    chunkFilename: '[name].chunk.js',
    path: path.resolve(__dirname, '../dist'),
    // 静态资源存放地址
    publicPath: '/',
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.(j|t)sx?$/,
        use: 'happypack/loader?id=babel',
        // use: [
        //   {
        //     loader: 'babel-loader',
        //     options: {
        //       compact: false,
        //     },
        //     // 'babel-loader?compact=false'
        //   },
        //   'eslint-loader',
        //   // 'ts-loader'
        // ],
      },
      {
        test: /\.css$/,
        use: 'happypack/loader?id=css',
        // use: [
        //   // 'style-loader',
        //   // {
        //   //   loader: MiniCssExtractPlugin.loader,
        //   //   options: {
        //   //     esModule: false,
        //   //     publicPath: '/'
        //   //   }
        //   // },
        //   MiniCssExtractPlugin.loader,
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       modules: true,
        //       importLoaders: 2,
        //     },
        //   },
        //   'postcss-loader',
        // ],
      },
      {
        test: /\.less$/,
        use: 'happypack/loader?id=less',
        // use: [
        //   // 'style-loader',
        //   // MiniCssExtractPlugin.loader,
        //   {
        //     loader: MiniCssExtractPlugin.loader,
        //     options: {
        //       esModule: false,
        //       hmr: !isProd,
        //       reloadAll: !isProd,
        //     },
        //   },
        //   {
        //     loader: 'css-loader',
        //     options: {
        //       modules: true,
        //     },
        //   },
        //   'postcss-loader',
        //   'less-loader',
        // ],
      },
      {
        test: /\.(eot|ttf|svg)$/,
        // file-loader 把小文件转换为base64格式
        use: 'file-loader',
      },
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
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {},
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'react-boilerplate',
      template: path.resolve(__dirname, '../index.html'),
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: isProd ? 'style.[hash].css' : 'style.css',
      chunkFilename: isProd ? 'style.[hash].css' : 'style.css',
    }),
    new HappyPack({
      id: 'babel',
      loaders: [
        {
          loader: 'babel-loader',
          options: {
            compact: false,
          },
        },
      ],
    }),
    new HappyPack({
      id: 'css',
      loaders: [
        'style-loader',
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: false,
            publicPath: '/',
          },
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 2,
          },
        },
        'postcss-loader',
      ],
    }),
    new HappyPack({
      id: 'less',
      loaders: [
        'style-loader',
        {
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: false,
            publicPath: '/',
          },
        },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 2,
          },
        },
        'less-loader',
        'postcss-loader',
      ],
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      // automaticNameDelimiter: '-',
      automaticNameMaxLength: 20,
      cacheGroups: {
        react: {
          test: /(react|react-dom|prop-types)[\\/]/,
          chunks: 'initial',
          name: 'react',
          priority: 9,
        },
        commons: {
          chunks: 'initial',
          minChunks: 2,
          name: 'commons',
          maxInitialRequests: 5,
          // minSize: 0, // 默认是30kb,
          priority: 2,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
        // default: {
        //   name: 'vendor'
        // }
      },
    },
  },
};
