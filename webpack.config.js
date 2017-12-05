
var path = require("path");

module.exports = {
  context: __dirname,
  entry: "./lib/main.js",
  output: {
    path: path.join(__dirname, 'lib'),
    filename: "bundle.js"
  },
  watch: true,
  module: {
    loaders: [
      {
        test: [/\.jsx?$/, /\.js?$/],
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  devtool: 'source-maps',
  resolve: {
    extensions: ["*", ".js", ".jsx" ]
  }
};
