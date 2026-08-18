const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: [
      path.resolve(__dirname, 'src/assets/js/app.js'),
      path.resolve(__dirname, 'src/assets/styles/app.css')
    ],
    pages: [
      path.resolve(__dirname, 'src/assets/js/pages.js'),
      path.resolve(__dirname, 'src/assets/styles/pages.css')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' })
  ]
};
