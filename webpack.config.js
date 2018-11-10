import path from 'path'
import webpack from 'webpack'

import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin'

import CleanWebpackPlugin from 'clean-webpack-plugin'

module.exports = (env, argv) => ({
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'index.bundle.js',
    },
    mode: process.env.NODE_ENV || 'development',
    resolve: {
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
    devServer: {
        hot: true,
        port: 4000,
        open: false,
        contentBase: path.join(__dirname, 'src'),
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true, // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    map: {
                        inline: false,
                        annotation: true,
                    },
                },
            }),
        ],
    },
    module: {
        rules: [
            {
                // this is so that we can compile any React,
                // ES6 and above into normal ES5 syntax
                test: /\.(js|jsx)$/,
                // we do not want anything from node_modules to be compiled
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    argv.mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader, // creates style nodes from JS strings
                    {
                        loader: 'css-loader',
                        options: { sourceMap: true },
                    }, // translates CSS into CommonJS
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true },
                    }, // compiles Sass to CSS, using Node Sass by default
                ],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                loaders: ['file-loader'],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: 'React Menu Hamburguer Icon Animations',
            template: path.join(__dirname, 'src', 'index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                conservativeCollapse: true,
            },
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: argv.mode !== 'production' ? '[name].css' : '[name].[hash].css',
            chunkFilename: argv.mode !== 'production' ? '[id].css' : '[id].[hash].css',
        }),
        new CleanWebpackPlugin(['dist', 'build']),
    ],
    devtool: 'source-map',
})
