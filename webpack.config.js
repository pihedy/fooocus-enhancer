const path = require('path');

module.exports = {
    entry: './src/content.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'content.js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    mode: 'development',
    devtool: false
};
