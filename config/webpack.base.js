module.exports = {
  module: {
    rules: [
      {
        // 使用 babel-loader 来编译处理 js 和 jsx 文件
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /\.min\.css$/,
        loader: ['style-loader', 'css-loader?modules'],
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
};
