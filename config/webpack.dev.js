// const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry:{
        main: './src/main.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].bundle.js",
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
        compress: true,
        port: 3000,
        hot: true
    },
    mode: 'development'
}
