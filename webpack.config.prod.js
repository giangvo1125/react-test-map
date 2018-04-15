const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  devtool: 'source-map',

  entry: './client.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
    publicPath: '/public/'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.css$/i,
        loader: ExtractTextPlugin.extract('style',
          `css?modules&localIdentName=[name]_[local]__[hash:base64:5]!postcss`),
      },
    ]
  },
  postcss: [ 
    autoprefixer({ browsers: ['last 2 versions'] }) 
  ],
  plugins: [
    new ExtractTextPlugin('style.css', { allChunks: true }),
    //optimize webpack
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.ProvidePlugin({
      'Helper': __dirname + '/src/helper.js',
      'types': __dirname + '/src/constants.js',
      'makeAxios': __dirname + '/src/api/API.js',
      'apiService': __dirname + '/src/api/index.js',
      '_' : 'lodash',
      'axios': 'axios',
      'recharts': 'recharts',
      'config': __dirname + '/config.js',
      'RichTextEditor': 'react-rte',
      'moment': 'moment'
    })
    //end optimize
  ]

};