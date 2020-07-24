//引入node路径模块
const path = require('path');

//拼接路径
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    //配置路径
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src')) //src目录
            .set('assets', resolve('src/assets')) //src->assets目录
            .set('components', resolve('src/components')) //src->components目录
            .set('network', resolve('src/network')) //src->network目录
            .set('router', resolve('src/router')) //src->router目录
            .set('store', resolve('src/store')) //src->store目录
            .set('tools', resolve('src/tools')) //src->tools目录
            .set('views', resolve('src/views')) //src->views目录
    },
    devServer: {
    // host: 'localhost', // ip
    // host: '192.168.3.247', //电脑的IP -- cmd-> ipconfig -> ipv4
    //host: '192.168.1.102', // 手机访问输入的地址
    //port: 8080, // 设置端口号
    //https: false, // https:{type:Boolean}
    //open: true, //配置自动启动浏览器

        proxy:{
            '/api': {
                target: 'http://192.168.4.233:8360', //API服务器的地址
                changeOrigin: true, // 虚拟的站点需要更管origin
                // pathRewrite:{
                //     "^/api":""
                // }
            }
        }
  }
}