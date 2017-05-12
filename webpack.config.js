const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const PATHS = {
  output: path.resolve(__dirname, 'public'),
  images: path.resolve(__dirname, 'app', 'images'),
  scripts: path.resolve(__dirname, 'app', 'scripts'),
  styles: path.resolve(__dirname, 'app', 'styles'),
};

const common = {
  entry: {
    admin: path.join(PATHS.scripts, 'admin.jsx'),
    dashboard: path.join(PATHS.scripts, 'dashboard.jsx'),
    index: path.join(PATHS.scripts, 'index.jsx'),
    vote: path.join(PATHS.scripts, 'vote.jsx'),
    styles: path.join(PATHS.styles, 'global.scss'),
  },
  output: {
    filename: '[name].js',
    path: PATHS.output,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.scss$/,
        enforce: 'pre',
        loader: 'import-glob-loader',
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'style.css' }),
  ],
};

let config;

switch (process.env.npm_lifecycle_event) {
  case 'dev':
    config = merge(
      common,
      {
        devtool: 'eval-source-map',
        module: {
          rules: [
            {
              test: /\.jsx?$/,
              enforce: 'pre',
              include: PATHS.scripts,
              loader: 'eslint-loader',
            },
          ],
        },
        plugins: [
          new StyleLintPlugin({
            configFile: './.stylelintrc.json',
            context: PATHS.styles,
            syntax: 'scss',
            quiet: true,
          }),
          new WebpackNotifierPlugin({ alwaysNotify: true }),
        ],
      }
    );
    break;

  default:
    config = common;
}

module.exports = config;
