<template>
<div class="SetLoginPassword">
    
    <van-form @submit="onSubmit" ref="vanForm">
        <van-field
            v-model="password"
            type="password"
            name="旧密码"
            label="旧密码"
            placeholder="请输入旧密码"
            :rules="[{ required: true, message: '  ' }]"
        />
        <van-field
            v-model="newPassword"
            type="password"
            name="新密码"
            label="新密码"
            placeholder="请输入新密码"
            :rules="[{ required: true, message: '  ' }]"
        />
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
            确认修改
            </van-button>
        </div>
    </van-form>
    
</div>
</template>
    
<script>
import {reqEditLoginPassword} from "network/api" 
import {mapState,mapMutations} from 'vuex';   
export default {
    name:"SetLoginPassword",
    computed: {
        ...mapState(["userData"])
    },
    data(){return{
        password:"",
        newPassword:"",
    }},
    methods:{
        ...mapMutations(["editUserLoginPassword"]),
        async editLoginPassword(){
            const result = await reqEditLoginPassword(this.password,this.newPassword)
            if(result.errcode === 0){
                this.editUserLoginPassword(this.newPassword)
                this.$toast.success({
                    message:"登录密码修改成功",
                    duration:800
                })
                this.$router.back()
            }else{
                this.$toast.fail({
                    message:"出了点小差错，重试一下",
                    duration:800
                })
            }
        },
        onSubmit(){
            if(this.password === this.userData.password){
                if(this.password === this.newPassword){
                    this.$toast({
                        message:"新密码与旧密码不能相同",
                        duration:800
                    })
                }else{
                    this.editLoginPassword()
                }
            }else{
                this.$toast({
                    message:"旧密码输入不正确",
                    duration:800
                })
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
    .van-field__error-message--right,.van-field__error-message{
        position: relative;
        bottom: 2.666666666666667vw;
        right: 0;
        // transform: translateY(-6.4vw);
    }
</style>