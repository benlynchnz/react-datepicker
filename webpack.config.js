var webpack           = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    path              = require('path'),
    fs                = require('fs');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'datepicker.js',
    path: path.resolve('./dist'),
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
        {
          test: /\.js[x]?$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },
        { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader') }
    ]
  },

  postcss: [
    require('autoprefixer-core'),
    require('postcss-color-rebeccapurple')
  ],

  resolve: {
    modulesDirectories: ['node_modules', 'components']
  },

  plugins: [
    new ExtractTextPlugin('datepicker.css', { allChunks: true })
  ]
};
