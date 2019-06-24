
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
// const argv = require('yargs-parser')(process.argv.slice(2))

const _mode = process.env.NODE_ENV || 'development'


const _mergeConfig = require(`./webpack.${_mode === "production " ?"prod":"dev"}.js`)


const _modeflag = process.env.NODE_ENV === 'production ' ? true : false

//webpack优化
// 提示框
const WebpackBuildNotifyerPlugin = require('webpack-build-notifier')
// 进度条
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
// dashboard
// const DashboardPlugin = require('webpack-dashboard/plugin')
// 打包速度
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const smp = new SpeedMeasurePlugin()

const ManifestPlugin = require('webpack-manifest-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')





let webpackConfig = {
    entry:{
        main: './src/main.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: ()=>[
                                require('autoprefixer')({
                                    browsers: ['last 2 version','>1%','ios 7']
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.(gif|png|jpg)$/,
                use: 'file-loader'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: 'file-loader'
            }
        ]
    },
    resolve:{
        alias: {
            "@": path.resolve(__dirname,"../src/components"),
            "src":path.resolve(__dirname,"../src")

        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    name: 'common',
                    minChunks: 1,
                    maxInitialRequests: 5,
                    minSize: 0
                }
            }

        },
        runtimeChunk: {
            name: 'runtime'
        }

    },
    plugins: [
        new HtmlWebpackPlugin({
            // filename:'index.html',
            template: path.resolve(__dirname, '../src/index.html')
        }),
        new MiniCssExtractPlugin({
          filename: _modeflag ? 'styles/[name].[hash:5].css' : 'styles/[name].css',
          chunkFilename: _modeflag ? 'styles/[id].[hash:5].css' : 'styles/[id].css'
        }),
        new WebpackBuildNotifyerPlugin({
            title:'my-spa',
            suppressSuccess:true
        }),
        new ProgressBarPlugin(),
        // new DashboardPlugin()
        new ManifestPlugin()
    ]
}


module.exports = smp.wrap(merge(_mergeConfig,webpackConfig))
