const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.js'); // 引用公共的配置
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 用于将组件的css打包成单独的文件输出到`lib`目录中

const prodConfig = {
  mode: 'production', // 开发模式
  entry: path.join(__dirname, "../src/index.js"),
  output: {
    path: path.join(__dirname, "../lib/"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: [MiniCssExtractPlugin.loader,'css-loader?modules'],
      },
      {
        test: /\.min\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ],
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "main.min.css" // 提取后的css的文件名
    })
  ],
  // externals: { // 定义外部依赖，避免把react和react-dom打包进去
  //   react: {
  //     root: "React",
  //     commonjs2: "react",
  //     commonjs: "react",
  //     amd: "react"
  //   },
  //   "react-dom": {
  //     root: "ReactDOM",
  //     commonjs2: "react-dom",
  //     commonjs: "react-dom",
  //     amd: "react-dom"
  //   }
  // },
};

module.exports = merge(prodConfig, baseConfig); // 将baseConfig和prodConfig合并为一个配置
