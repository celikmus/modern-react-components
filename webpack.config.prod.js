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
    vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-router', 'babel-polyfill']
  },

  output: {
    filename: '[name].js',
    sourceMapFilename: '[file].map',
    path: path.join(PATHS.build, 'assets'),
    publicPath: '/assets/'
  },

  debug: false,
  devtool: 'source-map',

  stats: {
    colors: true,
    reasons: true
  },

  module: {
    preLoaders: [{
      test: /\.js$/,
      include: PATHS.client,
      loader: 'eslint'
    }],
    loaders: [{
      test: /\.(js|jsx)$/,
      include: PATHS.client,
      loader: 'babel'
    }, {
      test: /\.scss/,
      loader: 'style!css!postcss!sass?outputStyle=expanded'
    }, {
      test: /\.(png|jpg|woff|woff2|ttf|svg|eot|gif)$/,
      loader: 'url?limit=8192'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file'
    }]
  },
  postcss: () => [autoprefixer],
  sassLoader: {
    data: '$staticServer: "";'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new StyleLintPlugin({
      context: 'src',
      syntax: 'scss'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new CopyWebpackPlugin([
      {from: 'src/index.html', to: '..'},
      {context: 'src/assets', from: '**/*', to: '../assets'}
    ])
  ]
};
