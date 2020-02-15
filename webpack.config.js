const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const src = path.resolve(__dirname, 'src');

module.exports = {
  entry: path.resolve(__dirname, 'src/index'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        use: ['babel-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9000
  },
  resolve: {
    alias: {
      components: `${src}/components`,
      hooks: `${src}/hooks`,
      lib: `${src}/lib`,
      testlib: `${src}/testlib`
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html' //source html
    })
  ]
};
