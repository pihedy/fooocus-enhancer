/** 
 * This file is used to configure the webpack build process.
 * 
 * @author Pihedy
 */

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
    entry: {
        content: './src/content.ts',
        styles: {
            import: './src/styles/main.scss',
            runtime: false
        }
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '',
        chunkFilename: '[name].js',
    },
    resolve: {
        preferRelative: true,
        extensions: ['.ts', '.js', '.vue'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components'),
            '@elements': path.resolve(__dirname, 'src/elements'),
            '@styles': path.resolve(__dirname, 'src/styles'),
            '@utils': path.resolve(__dirname, 'src/utils'),
            '@events': path.resolve(__dirname, 'src/events'),
            '@classes': path.resolve(__dirname, 'src/classes'),
            '@node_modules': path.resolve(__dirname, 'node_modules'),
        },
        modules: [path.resolve(__dirname), 'node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/],
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/main.css',
        }),
        new VueLoaderPlugin(),
    ],
    optimization: {
        splitChunks: false,
    },
    mode: 'production',
    devtool: false
};
