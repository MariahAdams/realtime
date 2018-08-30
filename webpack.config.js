/* eslint-env node */
const { resolve } = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const buildDir = 'build';
const path = resolve(__dirname, buildDir);

module.exports = {
  entry: './src/index.js',
  output: {
    path, 
    filename: 'bundle.[hash].js',
    publicPath: '/'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: `./${buildDir}`,
    historyApiFallback: true
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new CleanPlugin(`${path}/bundle.*.js`),
    new HtmlPlugin({ template: './src/index.html' }),
    new Dotenv()
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },

      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: { sourceMap: true }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: { sourceMap: true }
          }
        ]
      },

      {
        test: /\.(jpg|png|svg|jpeg)$/,
        use: {
          loader: 'url-loader',
          options: { limit: 1000 }
        }
      }

    ]
  }
};