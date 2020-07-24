<template>
<div class="Login">
    <van-form @submit="onSubmit" ref="vanForm">
        <van-field
            v-model="userData.name"
            name="用户名"
            label="用户名"
            placeholder="请填写用户名"
            :rules="[{ required: true, message: '  ' }]"
        />
        <van-field
            v-model="userData.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="请填写密码"
            :rules="[{ required: true, message: '  ' }]"
        />
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
            登录/注册
            </van-button>
        </div>
    </van-form>
</div>
</template>
    
<script>
import Navbar from '../../components/Navbar.vue';  
import {reqLoginEnroll} from 'network/api';
export default {
    name:"Login",
    components:{
        Navbar
    },
    data(){return{
        userData:{
            name: '',
            password: '',
        }
    }},
    methods:{
        async onSubmit(){
           const result = await reqLoginEnroll(this.userData)
        //    console.log(result)
           if(result.errcode === 0){ 
                this.$toast.success("登录成功");
                this.$store.commit("saveUserInfo",result.data)
                sessionStorage.setItem("token",result.data.token)
                this.$router.back()
           }else{
                this.$toast.fail(result.errmsg);
           }
        } 
    },
}
    
</script>
<style scoped lang="scss">
    .van-form{
        .van-field{
            font-size: 2.4691358024691357vh;
            height: 6.5967016491754125vh;
            // height: 8.245877061469265vh;
            padding:1.4992503748125936vh 4.266666666666667vw ;
        }
        .van-button{
            font-size: 2.4691358024691357vh;
            height: 6.296851574212893vh;
        }
    }
</style>