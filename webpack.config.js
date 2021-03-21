const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader'
            },
            {
                test: /\.(scss)$/,
                use: [{
                    // inject CSS to page
                    loader: MiniCssExtractPlugin.loader
                    }, {
                        // translates CSS into CommonJS modules
                        loader: 'css-loader'
                    }, {
                        // Run postcss actions
                        loader: 'postcss-loader',
                        options: {
                            // `postcssOptions` is needed for postcss 8.x;
                            // if you use postcss 7.x skip the key
                            postcssOptions: {
                                // postcss plugins, can be exported to postcss.config.js
                                plugins: function () {
                                    return [
                                        require('autoprefixer')
                                    ];
                                }
                            }
                        }
                    }, {
                        // compiles Sass to CSS
                        loader: 'sass-loader'
                    }]
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
        new HtmlWebpackPlugin({
            inject: "body",
            template: "public/index.html",
            filename: "index.html"
        }),
        new HtmlWebpackPlugin({
            inject: "body",
            template: "public/mobile.html",
            filename: "mobile.html"
        }),
        new CopyPlugin({
            patterns: [
                { from: "public/static", to: "static" },
            ],
        }),
    ],
    devServer: {
        contentBase: [path.join(__dirname, 'public'), path.join(__dirname, 'dist')],
        compress: true,
        port: 9000,
        host: '0.0.0.0',
        filename: 'bundle.js',
        liveReload: true,
        hot: true
    },
};
