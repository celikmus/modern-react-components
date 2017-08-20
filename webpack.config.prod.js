const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  src: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'dist')
};

module.exports = {
  entry: {
    app: path.resolve(PATHS.src, 'index.js'),
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router',
      'babel-polyfill'
    ]
  },

  output: {
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    path: path.join(PATHS.build, 'assets'),
    publicPath: '/assets/'
  },

  devtool: 'source-map',

  stats: {
    colors: true,
    reasons: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: PATHS.client,
        enforce: 'pre',
        use: 'eslint-loader'
      },
      {
        test: /\.(js|jsx)$/,
        include: PATHS.client,
        use: 'babel-loader'
      },
      {
        test: /\.scss/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader?sourceMap'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader?outputStyle=expanded',
            options: {
              data: '$staticServer: "";'
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|woff|woff2|ttf|svg|eot|gif)$/,
        use: 'url-loader?limit=8192'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            browsers: ['>1%', 'last 2 versions', 'not ie < 11']
          })
        ]
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new StyleLintPlugin({
      context: 'src',
      syntax: 'scss'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new CopyWebpackPlugin([
      { from: 'src/index.html', to: '..' },
      { context: 'src/assets', from: '**/*', to: '../assets' }
    ])
  ]
};
