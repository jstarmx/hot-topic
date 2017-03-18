const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

const PATHS = {
  output: path.resolve(__dirname, 'public'),
  scripts: path.resolve(__dirname, 'app', 'scripts'),
  styles: path.resolve(__dirname, 'app', 'styles'),
  views: path.resolve(__dirname, 'app', 'views'),
};

const common = {
  entry: {
    dashboard: path.join(PATHS.scripts, 'dashboard.jsx'),
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
    new CopyWebpackPlugin([{ from: PATHS.views, to: PATHS.output }]),
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
