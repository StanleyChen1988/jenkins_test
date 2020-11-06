const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const path = require('path');


let pathsToClean = [
  'dist'
]

module.exports = merge(common, {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader, // creates style nodes from JS strings
            options: {
              publicPath: "../",
            }
          },
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader, // creates style nodes from JS strings
          'css-loader', // translates CSS into CommonJS
          'less-loader' // compiles Less to CSS
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
    new CleanWebpackPlugin(pathsToClean, {
      root: path.resolve(__dirname, '../')
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  mode: 'production'
});
