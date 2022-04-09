const path = require('path')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = (env) => {
    console.log('WEBPACK ENV:', env)

    // VARIABLES
    const isEnvProduction = env === 'production'
    const isEnvDevelopment = env === 'development'

    /// PLUGGINS ///
    // cleans 'dist' folder everytime begore a new build
    const CleanPlugin = new CleanWebpackPlugin({
        root: __dirname,
        verbose: true,
        dry: false,
    })

    const AnalyzerPlugin = new BundleAnalyzerPlugin({
        analyzerMode: 'server', // none
        openAnalyzer: false,
    })

    const HTMLPlugin = new HtmlWebpackPlugin({
        template: 'index.html',
        chunksSortMode: 'none',
    })

    const MiniCSSPlugin = new MiniCssExtractPlugin()
    const WebpackCompressorPlugin = new CompressionPlugin()

    /// BUILDING WEBPACKETS ///
    const config = {}

    config.entry = ['babel-polyfill', './src/index.js']

    config.optimization = {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor', // NPM
                    chunks: 'initial',
                },
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: 'vendor',
                    enforce: true,
                },
            },
            chunks: 'all',
            maxInitialRequests: Infinity,
            minSize: 0,
        },
        runtimeChunk: {
            name: 'manifest',
        },
    }

    // eslint-disable-next-line prettier/prettier
    config.plugins = [CleanPlugin, AnalyzerPlugin, HTMLPlugin, MiniCSSPlugin, WebpackCompressorPlugin]

    config.module = {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: 'babel-loader',
                exclude: /nodeModules/,
            },
            {
                test: /\.css$/i,
                use: [
                    // eslint-disable-next-line prettier/prettier
                    isEnvDevelopment ? require.resolve('style-loader') : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                ],
            },
        ],
    }

    config.resolve = {
        extensions: ['.js'],
    }

    if (isEnvProduction) {
        config.output = {
            path: path.join(__dirname, 'dist'),
            publicPath: path.join(__dirname, 'dist', '/'),
            filename: '[name].[hash:8].chunk.js',
            chunkFilename: '[name].[hash:8].bundle.js',
        }
        config.mode = 'production'
        config.devtool = 'source-map'
    }

    if (isEnvDevelopment) {
        config.output = {
            path: path.join(__dirname, 'dist'),
            filename: '[name].bundle.js',
            chunkFilename: '[name].chunk.js',
        }
        config.mode = 'development'
        config.devtool = 'inline-source-map'

        config.devServer = {
            contentBase: path.join(__dirname, 'dist'),
            historyApiFallback: true,
        }
    }

    return config
}
