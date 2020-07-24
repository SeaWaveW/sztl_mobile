import {request} from 'network/request';

//vue-jsonp
import Vue from 'vue'
import jsonp from 'vue-jsonp'
Vue.use(jsonp)


//商品列表
export const reqProduct = (params) => {
    return request({
        url:"/product/pagination",
        method:"get",
        params
    })
}

//商品详情
export const reqProductDetail = (id) => {
    return request({
        url:"/product",
        method:"get",
        params:{
            id
        }
    })
}

//收藏请求
export const reqAddLikeProduct = (product_id) => {
    return request({
        url:"/product_like/create",
        method:"post",
        data:{
            product_id
        }
    })
}

//取消收藏
export const reqCancelLikeProduct = (product_id) => {
    return request({
        url:"/product_like/delete",
        method:"get",
        params:{
            product_id
        }
    })
}


//登录注册
export const reqLoginEnroll = (data) => {
    return request({
        url:"/user/signin",
        method:"post",
        data
    })
}

//获取用户信息
export const reqUserData = () => {
    return request({
        url:"/user/info",
        method:"get"
    })
}

//加入购物车
export const reqAddCart = (product_id) => {
    return request({
        url:"/cart/update",
        method:"post",
        data:{
            product_id
        }
    })
}

//获取购物车列表
export const reqCartList = () => {
    return request({
        url:"/cart/all",
        method:"get"
    })
}

//更新单个商品
export const reqUpdateSingleGoods = (product_id,count,checked) => {
    return request({
        url:"/cart/update",
        method:"post",
        data:{
            product_id,count,checked
        }
    })
}

//删除单个商品
export const reqDeleteSingleGoods = (product_id) => {
    return request({
        url:"/cart/delete",
        method:"get",
        params:{
            product_id
        }
    })
}

// 订单列表
export const reqGetOrderList = (params) => {
    return request({
        url:"/order/pagination",
        method:"get",
        params
    })
}

// 获取收藏列表
export const reqGetLikeList = () => {
    return request({
        url:"/product_like/all",
        method:"get"
    })
}

// 下单
export const reqPlaceOrder = (orderProductList,user_address_id) => {
    return request({
        url:"/order/create",
        method:"post",
        data:{
            orderProductList,user_address_id
        }
    })
}

// 订单付款
export const reqOrderPayment = (order_id,pay_password) => {
    return request({
        url:`/order/pay?order_id=${order_id}`,
        method:"post",
        data:{
            pay_password
        }
    })
}

// 订单详情
export const reqOrderDetail = (id) => {
    return request({
        url:"/order",
        method:"get",
        params:{
            id 
        }
    })
}

// 获取省市县api列表
export const reqAreaList = () => {
    return request({
        url:"/data/area",
        method:"get"
    })
}

// 新增收货地址
export const reqAddAddress = (data) => {
    return request({
        url:"/user_address/create",
        method:"post",
        data
    })
}

// 修改收货地址
export const reqEditAddress = (id,data) => {
    return request({
        url:`/user_address/update?id=${id}`,
        method:"post",
        data
    })
}

// 删除收货地址
export const reqDeleteAddress = (id) => {
    return request({
        url:`/user_address/delete?id=${id}`,
        method:"get"
    })
}

//修改用户基本信息（用户昵称）
export const reqEditNickName = (nickname) => {
    return request({
        url:"/user/setting",
        method:"post",
        data:{
            nickname
        }
    })
}

//修改用户登录密码
export const reqEditLoginPassword = (password,newPassword) =>{
    return request({
        url:"/user/updatePassword",
        method:"post",
        data:{
            password,newPassword
        }
    })
}

//修改用户支付密码
export const reqEditPayPassword = (password,newPassword) => {
    return request({
        url:"/user/updatePayPassword",
        method:"post",
        data:{
            password,newPassword
        }
    })
}

//获取城市列表
export const reqCityList = () => {
    return request({
        url:"/data/city",
        method:"get"
    })
}

//获取当前定位
export const reqGetPosition = (latitude,longitude) => {
    return new Promise( (resolve,reject)=>{
        const url = `http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location=${latitude},${longitude}&output=json&pois=0`
        Vue.jsonp(url).then(data =>{
            resolve(data)
        }).catch(err => {
            reject(err)
        })
    })
}