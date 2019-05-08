// vue.config.js
// https://cli.vuejs.org/zh/config/#全局-cli-配置

module.exports = {
  devServer: {
    port: 8027, // 端口号
    host: 'localhost',
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    proxy: {
      '/': {
        target: 'http://127.0.0.1:3000', // 需要请求的地址
        changeOrigin: true, // 是否跨域
        ws: false
      }
    }
  }
}