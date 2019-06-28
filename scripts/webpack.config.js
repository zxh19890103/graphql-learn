const path = require('path')
// const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const clientCfg = require('./client.config.json')

module.exports = {
    mode: 'development',
    entry: {
        app: './client'
    },
    resolve: {
        extensions: [".ts",".js",".tsx"]
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js',
        publicPath: "/"
    },    
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve('./client/tsconfig.json')
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new HtmlPlugin({
            template: './client/index.html',
            filename: 'index.html'
        })
    ]
}

Object.keys(module.exports.entry).forEach((name => {
    const entry = module.exports.entry[name]
    module.exports.entry[name] = [
      'webpack/hot/dev-server',
      `webpack-dev-server/client?http://${clientCfg.host}:${clientCfg.port}`
    ].concat(entry)
}))