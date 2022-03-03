'use strict'

const utils = require('./utils')

module.exports = {
  entry: ['@babel/polyfill'],
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.ts'],
  },
  output: {
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        // For our normal typescript
        test: /\.js?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [['@babel/plugin-proposal-class-properties']],
            },
          },
        ],
        exclude: /(?:node_modules)/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(glsl|vs|fs)$/,
        loader: 'shader-loader',
      },
      {
        test: /\.worker\.js$/i,
        use: {
          loader: 'worker-loader',
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              esModule: false,
              limit: 100000,
              name: utils.assetsPath('fonts/[name].[hash].[ext]'),
            },
          },
        ],
      },
    ],
  },
  plugins: [],
}
