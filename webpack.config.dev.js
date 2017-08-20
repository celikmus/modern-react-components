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
    path: PATHS.build,
    publicPath: '/assets/',
    pathinfo: true
  },

  cache: true,
  devtool: 'cheap-module-source-map',

  stats: {
    colors: true,
    reasons: true
  },

  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   include: PATHS.client,
      //   enforce: 'pre',
      //   use: 'eslint-loader'
      // },
      {
        test: /\.(js|jsx)$/,
        include: PATHS.client,
        use: {
          loader: 'babel-loader',
          options: { cacheDirectory: true }
        }
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
              data: `$staticServer: 'http://localhost:${serverConfig.development
                .devServerPort}';`
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
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        postcss: [
          autoprefixer({
            browsers: ['>1%', 'last 2 versions', 'not ie < 11']
          })
        ]
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new StyleLintPlugin({
      context: 'src',
      syntax: 'scss'
    }),
    new OpenPlugin()
  ],
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
