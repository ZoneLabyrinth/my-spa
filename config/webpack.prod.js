// const webapck = require('webpack')
const path = require('path')

const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
// const ASSET_PATH = process.env.ASSET_PATH || './';

module.exports = {
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name].[hash:5].js",
        // publicPath: './'
    },
    devtool: 'source-map', //体积小
    plugins:[
        new UglifyJSPlugin({
            sourceMap: true
        }),
        // //定义全局环境
        // new webapck.DefinePlugin({
        //     'process.env.NODE_ENV':JSON.stringify('production'),
        //     "process.env.ASSET_PATH":JSON.stringify(ASSET_PATH)
        // })
    ],
    mode: "production"

}