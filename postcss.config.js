/*
 * @Author: zong.wang01@hand-china.com
 * @Date: 2021-04-27 22:21:12
 * @LastEditors: zong.wang01@hand-china.com
 * @LastEditTime: 2021-04-27 22:27:21
 * @Version: 1.0.0
 * @Description: 
 * @Copyright: Copyright (c) 2021, Hand-RongJing
 */
module.exports = {
  plugins: [
        //一定要写在require("autoprefixer")前面，否则require("autoprefixer")无效
        require('postcss-import')(),
        require("autoprefixer")()
    ],
    // javascriptEnabled: true
}
