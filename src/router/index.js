import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

  const routes = [
  {
    path:"/",
    redirect:"/home"
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import( 'views/home/Home.vue'),
    meta:{
      title:"精选"
    }
  },
  {
    path: '/citySelect',
    name: 'CitySelect',
    component: () => import( 'views/citySelect/CitySelect.vue'),
    meta:{
      title:"选择城市"
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import( 'views/search/Search.vue'), //搜索
  },
  {
    path: '/product',
    name: 'Product',
    component: () => import( 'views/product/Product.vue'),
    meta:{
      title:"商品详情"
    }
  },
  {
    path:"/login",
    name:"Login",
    component:()=> import("views/login/Login.vue"),
    meta:{
      title:"登录/注册"
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import( 'views/cart/Cart.vue'),
    meta:{
      title:"购物车",
      key:true
    }
  },
  {
    path: '/orderConfirm',
    name: 'OrderConfirm',
    component: () => import( 'views/orderConfirm/OrderConfirm.vue'),
    meta:{
      title:"确认订单",
      key:true
    }
  },
  {
    path: '/paySuccess',
    name: 'PaySuccess',
    component: () => import( 'views/paySuccess/PaySuccess.vue'),
    meta:{
      title:"付款成功",
      key:true
    }
  },
  {
    path: '/my',
    name: 'My',
    component: () => import( 'views/my/My.vue'),
    meta:{
      title:"我的"
    }
  },
  {
    path: '/orderList',
    name: 'OrderList',
    component: () => import( 'views/orderList/OrderList.vue'),
    meta:{
      title:"我的订单",
      key:true
    }
  },
  {
    path: '/orderInfo',
    name: 'OrderInfo',
    component: () => import( 'views/orderInfo/OrderInfo.vue'),
    meta:{
      title:"订单详情",
      key:true
    }
  },
  {
    path: '/likeList',
    name: 'LikeList',
    component: () => import( 'views/likeList/LikeList.vue'),
    meta:{
      title:"我的收藏",
      key:true
    }
  },
  {
    path: '/addressList',
    name: 'AddressList',
    component: () => import( 'views/addressList/AddressList.vue'),
    meta:{
      title:"我的收货地址",
      key:true
    }
  },
  // addressEdit
  {
    path: '/addressEdit',
    name: 'AddressEdit',
    component: () => import( 'views/addressEdit/AddressEdit.vue'),
    meta:{
      title:"修改地址",
      key:true
    }
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import( 'views/setting/Setting.vue'),
    meta:{
      title:"用户设置",
      key:true
    }
  },
  {
    path: '/setNickName',
    name: 'SetNickName',
    component: () => import( 'views/setting/SetNickName.vue'),
    meta:{
      title:"修改昵称",
      key:true
    }
  },
  {
    path: '/setAvatar',
    name: 'SetAvatar',
    component: () => import( 'views/setting/SetAvatar.vue'),
    meta:{
      title:"设置头像",
      key:true
    }
  },
  {
    path: '/setLoginPassword',
    name: 'SetLoginPassword',
    component: () => import( 'views/setting/SetLoginPassword.vue'),
    meta:{
      title:"修改登录密码",
      key:true
    }
  },
  {
    path: '/setPayPassword',
    name: 'SetPayPassword',
    component: () => import( 'views/setting/SetPayPassword.vue'),
    meta:{
      title:"修改支付密码",
      key:true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.meta.key){ //需要登录
    if(sessionStorage.getItem("token")){ //已经登录
      next()
    }else{ //未登录
      router.push("/login")
    }
  }else{
    next()
  }
})

export default router
