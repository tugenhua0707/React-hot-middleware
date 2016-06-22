
var path = require('path');
var webpack = require('webpack');
var fs = require('fs');
var glob = require('glob');

function entries (globPath) {
    var files = glob.sync(globPath);
    var entries = {}, entry, dirname, basename;
    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        basename = path.basename(entry, '.js');
        entries[path.join(dirname, basename)] = './' + entry;
    }
    return entries;
}
module.exports = {
  // or devtool: 'eval' to debug issues with compiled output:
  devtool: 'cheap-module-eval-source-map',
  entry: [
    // necessary for hot reloading with IE:
    'eventsource-polyfill',
    'webpack/hot/only-dev-server',
    // listen to code updates emitted by hot middleware:
    'webpack-hot-middleware/client',
    // your code:
    './src/js/index',
    './src/css/index.styl'
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: '/js/index.js',
    publicPath: '/build/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.styl$/,
        loader: "style!css!stylus"
      }
    ]
  },
  resolve: {
    extensions: ['.js', "", ".css"],
    alias: {
        
    }
  }
};