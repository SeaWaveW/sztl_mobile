import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Vant UI
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);

// 自动获取用户信息
import getUserInfo from "network/getUserInfo"
getUserInfo.getUserInfoData()

// 金额过滤
import {fprice} from "tools/filterPrice"
Vue.filter("fprice",fprice)

// 调用vuex里城市列表请求
store.dispatch("getCityList")
// 调用vuex的定位
// store.dispatch("getCurrenPosition")

// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  error: require('assets/img/LoadFailed.jpg'),
  loading: require('assets/img/loading.gif'),
})

//解决移动端300ms延迟
import fastClick from 'fastclick'
fastClick.attach(document.body)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
