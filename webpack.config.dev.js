const webpack = require('webpack');
const path = require('path');
const open = require('open');
const autoprefixer = require('autoprefixer');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const serverConfig = require('./config/server');

const PATHS = {
  client: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'dist')
};

function OpenPlugin() {
  let firstTime = true;
  OpenPlugin.prototype.apply = compiler => {
    compiler.plugin('done', () => {
      if (firstTime) {
        open(`http://localhost:${serverConfig.development.devServerPort}`);
        firstTime = false;
      }
    });
  };
}
module.exports = {
  entry: {
    app: path.resolve(PATHS.client, 'index.js'),
    vendor: ['react', 'react-dom', 'redux', 'react-redux', 'react-router', 'babel-polyfill']
  },

  output: {
    filename: '[name].js',
    path: PATHS.build,
    publicPath: '/assets/'
  },

  cache: true,
  debug: true,
  devtool: 'source-map',

  stats: {
    colors: true,
    reasons: true
  },

  module: {
    preloaders: [{
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
      loader: 'style!css?sourceMap!postcss!sass?outputStyle=expanded'
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
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new StyleLintPlugin({
      context: 'src',
      syntax: 'scss'
    }),
    new OpenPlugin()
  ],
  sassLoader: {
    data: `$staticServer: 'http://localhost:${serverConfig.development.devServerPort}';`
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'src'),
    port: serverConfig.development.devServerPort,
    historyApiFallback: true,
    proxy: [
      {
        context: '/api',
        target: `http://localhost:${serverConfig.development.apiPort}`,
        secure: false
      }
    ]
  }

};
