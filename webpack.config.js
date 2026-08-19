const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require('path');

const asset = file => path.resolve('src/assets', file || '');
const publicDir = file => path.resolve('public', file || '');

module.exports = {
    entry: {
        app: [asset('styles/app.scss'), asset('js/app.js')],
        pages: [asset('js/pages.js')]
    },
    output: {
        path: publicDir(),
        filename: '[name].js',
        clean: true
    },
    resolve: {
        extensions: ['.js', '.scss', '.css']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: { presets: ['@babel/preset-env'] }
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false } },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false } }
                ]
            }
        ]
    },
    optimization: {
        minimizer: [
            '...',
            new CssMinimizerPlugin()
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: '[name].css' })
    ]
};
