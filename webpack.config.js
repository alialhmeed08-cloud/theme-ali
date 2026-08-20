const MiniCssExtractPlugin     = require('mini-css-extract-plugin');
const CssMinimizerPlugin       = require('css-minimizer-webpack-plugin');
// ✅ FIX: أُعيد ThemeWatcher — ضروري لـ `salla theme preview`
const ThemeWatcher             = require('@salla.sa/twilight/watcher.js');
// ✅ FIX: أُعيد CopyPlugin — بدونه الصور في public/images ما تتنسخ
const CopyPlugin               = require('copy-webpack-plugin');
const path                     = require('path');

const asset     = file => path.resolve('src/assets', file || '');
const publicDir = file => path.resolve('public', file || '');

module.exports = {
    entry: {
        // ✅ FIX: app.js يجمع الـ SCSS + كل الـ JS الأساسي
        app:   [asset('styles/app.scss'), asset('js/app.js')],
        // home.js منفصل لأنه يُحمّل فقط في الصفحة الرئيسية
        home:  asset('js/home.js'),
        // pages.js للصفحات الثانوية
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
                test:    /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader:  'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        // ✅ FIX: plugin-transform-runtime ضروري لـ async/await
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
        // ✅ FIX: ThemeWatcher مُعاد — لازم لـ salla theme preview
        new ThemeWatcher(),
        new MiniCssExtractPlugin({ filename: '[name].css' }),
        // ✅ FIX: CopyPlugin مُعاد — ينسخ الصور من src/assets/images إلى public/images
        new CopyPlugin({
            patterns: [{ from: asset('images'), to: publicDir('images') }],
        }),
    ],

    optimization: {
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ],
    },
};
