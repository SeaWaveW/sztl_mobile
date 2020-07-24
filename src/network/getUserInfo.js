//获取用户信息
import {reqUserData} from 'network/api';
import store from "@/store"

const getUserInfoData = () => {
    if(sessionStorage.getItem("token")){
        reqUserData().then(data=>{
          if(data.errcode === 0){
            store.commit("saveUserInfo",data.data)
          }
        })
      }
}

export default {
    getUserInfoData
}