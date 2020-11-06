const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackBar = require('webpackbar');


module.exports = {
  // entry: "./src/index.js",
  entry: {
    index: './src/js/index.js',
  },
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: "js/[name].js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'ts-loader',
          // options: {
          //   appendTsSuffixTo: [/\.tsx$/]
          // }
        },
        
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          }
        }
      },
     
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/'
            }
          },
        ]
      },
      {
        test: /\.(mp4)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'video/'
            }
          },
        ]
      },
      {
        test: /\.html$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'fonts/[name].[ext]'
          }
        }
      },
    ]
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      title: 'index',
      filename: 'index.html',
      template: 'src/index.html',
      chunks: ["index"],
    }),
    new WebpackBar()
  ],
  resolve: {
    extensions: [".js", ".ts", ".tsx"],
    alias: {
      
    }
  }
}
