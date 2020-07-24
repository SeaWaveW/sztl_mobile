import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//引入获取城市列表 当前定位 的请求
import {reqCityList,reqGetPosition} from "network/api"

export default new Vuex.Store({
  state: {
    //用户数据
    userData:{},
    //订单选中的收货地址
    selectedAddress:{},
    //城市列表
    cityList:{},
    //选中的城市
    selectCity:"定位中...",
  },
  mutations: {
    //保存用户数据
    saveUserInfo(state,data){
      state.userData = data
    },
    //修改收藏
    changeLikeList(state,data){
      //添加
      if(typeof data === "object"){
        state.userData.likeList.push(data)
      }
      //删除
      else{
        state.userData.likeList.forEach((item,index)=>{
          if(item.product_id === data){
            state.userData.likeList.splice(index,1)
          }
        })
      }
    },
    //订单选中的收货地址
    changeSelectAddress(state,data){
      state.selectedAddress = data
    },
    //新增（修改）地址 或 删除地址
    addOReditAddress(state,data){
      if(typeof data === "object"){ //新增 修改
          // let addFlag = false 
          // state.userData.addressList.forEach((item,index)=>{
          //   //相等直接为修改
          //   if(data === +item.id){
          //     state.userData.addressList.splice(index,1,data)
          //     addFlag = true
          //   }
          // })
          // if(addFlag){ return }
          // //否则为新增
          // state.userData.addressList.push(data)
          const boo = state.userData.addressList.findIndex(item=>{
            return data.id === +item.id
          })
          if(boo>=0){ //修改
            state.userData.addressList.splice(boo,1,data)
          }else{ //添加
            state.userData.addressList.push(data)
          }

      }else{ //删除
        state.userData.addressList.forEach((item,index)=>{
          if(data === +item.id){
            state.userData.addressList.splice(index,1)
          }
        })
      }
      
    },
    //修改用户昵称
    editNickName(state,data){
      state.userData.nickname = data
    },
    //修改用户登录密码
    editUserLoginPassword(state,data){
      state.userData.password = data
    },
    //修改用户支付密码
    editUserPayPassword(state,data){
      state.userData.pay_password = data
    },
    //保存城市列表
    saveCityList(state,cityData){
      state.cityList = cityData
    },
    //修改选中的城市列表
    editSelectCity(state,data){
      state.selectCity = data
    },
    //修改用户头像
    editUserImage(state,data){
      state.userData.avatar = data
    }
  },
  actions: {
    //获取城市列表
    async getCityList(context){
      const result = await reqCityList()
      // console.log(result)
      if(result.errcode === 0){
        context.commit("saveCityList",result.data)
      }
    },
    // 获取定位
    getCurrenPosition(context){
      window.navigator.geolocation.getCurrentPosition( async position =>{
        const {latitude,longitude} = position.coords
        const result = await reqGetPosition(latitude,longitude)
        // console.log(result)
        context.commit("editSelectCity",result.result.addressComponent.city)
      })
    }
  },
  modules: {
  }
})
