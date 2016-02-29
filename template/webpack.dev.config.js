var vue = require('vue-loader')
var webpack = require('webpack')
var cdn = 'static/'
var HtmlWebpackPlugin = require('html-webpack-plugin')



module.exports = {
    entry: './src/main.js',
    output: {
        path: './static',
        publicPath: cdn,
        filename: 'build.js',
    },
    module: {
        loaders: [
            {
                test: /\.vue$/,
                // apply ES2015 transform to all JavaScript in *.vue files.
                // https://github.com/vuejs/vue-loader#advanced-loader-configuration
                loader: vue.withLoaders({
                    js: 'babel?optional[]=runtime&loose=all',
                    // sass: 'style-loader!css-loader!px2rem?remUnit=16&remPrecision=8!autoprefixer-loader?{browsers:["android 4", "iOS 6"]}!sass-loader?indentedSyntax'
                })
            },
            {
                test: /\.js$/,
                // excluding some local linked packages.
                // not needed for normal installations
                exclude: /node_modules|vue\/src|vue-loader\//,
                loader: 'babel?optional[]=runtime&loose=all'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'file?name=images/[name].[ext]?[sha512:hash:base64:5]'
            }
        ]
    }
}

// if (process.env.NODE_ENV === 'production') {
    // module.exports.plugins = [
    //     new webpack.DefinePlugin({
    //         'process.env': {
    //             NODE_ENV: '"production"'
    //         }
    //     }),
    //     new webpack.optimize.UglifyJsPlugin({
    //         compress: {
    //             warnings: false
    //         }
    //     }),
    //     new webpack.optimize.OccurenceOrderPlugin(),
    //     new HtmlWebpackPlugin({
    //             hash: true,
    //             inject: 'body',
    //             template: 'template.html',
    //             filename: '../index.html'
    //     })
    // ]
// } else {
    module.exports.devtool = '#source-map'
// }
