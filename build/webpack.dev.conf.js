const package = require('../package.json')
const baseConfig = require('./webpack.base.conf')
const config = require('./config')
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portFinder = require('portfinder')
const utils = require('./utils')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const os = require('os')
const PrimaryLoader = require('./plugins/primary-loader')
//process.traceDeprecation = true;

const devConfig = merge(baseConfig, {
  mode: 'development',
  entry: ['./src/App.js'],
  devtool: config.dev.devtool,
  watch: config.dev.watch,
  watchOptions: config.dev.watchOptions,
  plugins: [
    new webpack.DefinePlugin({
      'process.env': '"DEV"',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true,
    }),
    new PrimaryLoader({ delay: 1000 }),
  ],
  devServer: {
    contentBase: path.join(__dirname, '../public'),
    compress: false,
    hot: true,
    stats: 'minimal',
    clientLogLevel: 'warning',
    publicPath: config.dev.assetsPublicPath,
    historyApiFallback: {
      rewrites: [
        {
          from: /.*!/,
          to: path.posix.join(config.dev.assetsPublicPath, 'index.html'),
        },
      ],
    },
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    open: config.dev.autoOpenBrowser,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    overlay: config.dev.errorOverlay ? { warnings: false, errors: true } : false,
  },
})

module.exports = new Promise((resolve, reject) => {
  const networks = os.networkInterfaces()
  let ip
  for (let i in networks) {
    for (let data of networks[i]) {
      if (!data.internal && data.family === 'IPv4') {
        ip = data.address
        break
      }
    }
    if (ip) break
  }

  portFinder.basePort = process.env.PORT || config.dev.port
  portFinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`Threejs boilerplate is running at\nhttp://${ip}:${port}\nhttp://127.0.0.1:${port}`],
            notes: [`Author: ${package.author}`],
          },
          onErrors: config.dev.notifyOnErrors ? utils.createNotifierCallback() : undefined,
        })
      )

      resolve(devConfig)
    }
  })
})
