const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin   = require('css-minimizer-webpack-plugin');
const CopyPlugin           = require('copy-webpack-plugin');
const path                 = require('path');

const isCI = process.env.CI === 'true';
let ThemeWatcher = null;
if (!isCI) {
    try { ThemeWatcher = require('@salla.sa/twilight/watcher.js'); } catch (e) {}
}

const asset     = file => path.resolve('src/assets', file || '');
const publicDir = file => path.resolve('public', file || '');

module.exports = {
    entry: {
        app:   [asset('styles/app.scss'), asset('js/app.js')],
        home:  asset('js/home.js'),
        pages: asset('js/pages.js'),
    },
    output: {
        path:          publicDir(),
        filename:      '[name].js',
        clean:         true,
        chunkFilename: '[name].[contenthash].js',
    },
    stats: { modules: false, assetsSort: 'size', assetsSpace: 50 },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime'],
                    },
                },
            },
            {
                test: /\.(s[ac]ss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false } },
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false } },
                ],
            },
        ],
    },
    plugins: [
        ...(ThemeWatcher ? [new ThemeWatcher()] : []),
        new MiniCssExtractPlugin({ filename: '[name].css' }),
        new CopyPlugin({
            patterns: [{ from: asset('images'), to: publicDir('images'), noErrorOnMissing: true }],
        }),
    ],
    optimization: {
        minimizer: [ `...`, new CssMinimizerPlugin() ],
    },
};
