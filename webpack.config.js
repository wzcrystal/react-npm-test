/*
 * @Author: zong.wang01@hand-china.com
 * @Date: 2021-04-04 10:06:10
 * @LastEditors: zong.wang01@hand-china.com
 * @LastEditTime: 2021-04-27 22:28:56
 * @Version: 1.0.0
 * @Description: 
 * @Copyright: Copyright (c) 2021, Hand-RongJing
 */
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
 template: path.join(__dirname, "examples/src/index.html"),
 filename: "./index.html"
});
module.exports = {
 entry: path.join(__dirname, "examples/src/index.js"),
 output: {
  path: path.join(__dirname, "examples/dist"),
  filename: "bundle.js"
 },
 module: {
  rules: [{
     test: /\.(js|jsx)$/,
    use: "babel-loader",
    exclude: /node_modules/
  },{
    test: /\.css$/,
    use: ["style-loader", "css-loader"]
  },{
    test: /\.less$/,
    use: ['style-loader',
      {
          loader: 'css-loader',
          options: {
              //支持@important引入css
              importLoaders: 1
          }
      },
      {
          loader: 'postcss-loader',
          // options: {
          //     plugins: function() {
          //         return [
          //             //一定要写在require("autoprefixer")前面，否则require("autoprefixer")无效
          //             require('postcss-import')(),
          //             require("autoprefixer")({
          //                 "browsers": ["Android >= 4.1", "iOS >= 7.0", "ie >= 8"]
          //             })
          //         ]
          //     }
          // }
      },
      {
        loader: "less-loader",
        options: {
            javascriptEnabled: true
        }
      }
    ]
  }]
},
 plugins: [htmlWebpackPlugin],
 resolve: {
   extensions: [".js", ".jsx"]
 },
 devServer: {
   port: 3001
}};
