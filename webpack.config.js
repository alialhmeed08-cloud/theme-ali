const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

const asset     = file => path.resolve('src/assets', file || '');
const publicDir = file => path.resolve('public', file || '');

module.exports = {
    entry: {
        app:   [asset('styles/app.css'),   asset('js/app.js')],
        pages: [asset('styles/pages.css'), asset('js/pages.js')]
    },
    output: { path: publicDir(), clean: true },
    module: {
        rules: [
            { test: /\.css$/i, use: [MiniCssExtractPlugin.loader, { loader: "css-loader", options: { url: false } }] }
        ]
    },
    plugins: [ new MiniCssExtractPlugin() ]
};
