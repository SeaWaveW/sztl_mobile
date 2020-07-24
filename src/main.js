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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
