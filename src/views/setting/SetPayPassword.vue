<template>
<div class="SetPayPassword">
    
    <van-form @submit="onSubmit" ref="vanForm">
        <van-field
            @click="oldnew=true,showKeyboard=true"
            v-model="password"
            type="password"
            name="旧密码"
            label="旧密码"
            placeholder="请输入旧密码"
            :rules="[{ required: true, message: '  ' }]"
        />
        <van-field
            @click="oldnew=false,showKeyboard=true"
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
    <van-popup v-model="showKeyboard" position="bottom" :style="{ height: '70%' }" :close-on-click-overlay="false">
        <!-- 头部 -->
        <van-nav-bar  @click-left="closeClick">
            <template #left>
                <van-icon name="cross" :size="iconSize"/>
            </template>
            <template #title>
                <label>{{oldORnew?'旧密码':'新密码'}}</label>
            </template>
            
        </van-nav-bar>
        <!-- 密码输入框 -->
        <van-password-input :value="oldORnew?password:newPassword" info="密码为 6 位数字" :error-info="errorInfo"  v-if="showKeyboard"/>
        <!-- 数字键盘 -->
        <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete"></van-number-keyboard>
    </van-popup>
</div>
</template>
    
<script>
import {reqEditPayPassword} from 'network/api';
import {mapState,mapMutations} from 'vuex';   
export default {
    name:"SetPayPassword",
    
    data(){return{
        showKeyboard:false, //弹出层
        oldnew:true, //true表示绑定旧密码框  false表示绑定新密码框
        password:"",
        newPassword:"",
        errorInfo:""
    }},
    methods:{
        ...mapMutations(["editUserPayPassword"]),
        //关闭按钮
        closeClick(){ 
            this.showKeyboard = false
            if(this.oldORnew){ //旧密码
                this.password = ""
            }else{
                this.newPassword = ""
            }
        },
        //密码键盘输入
        onInput(key){ 
            if(this.oldORnew){ //旧密码
                this.password = (this.password + key).slice(0, 6);
                if(this.password.length === 6){
                    this.showKeyboard = false
                }
            }else{
                this.newPassword = (this.newPassword + key).slice(0, 6);
                if(this.newPassword.length === 6){
                    this.showKeyboard = false
                }
            }
            
        },
        //删除键
        onDelete(){ 
            if(this.oldORnew){ //旧密码
                this.password = this.password.slice(0, this.password.length - 1);
            }else{
                this.newPassword = this.newPassword.slice(0, this.newPassword.length - 1);
            }
            
        },
        //更新支付密码请求
        async editPayPassword(){
            const result = await reqEditPayPassword(this.password,this.newPassword)
            if(result.errcode === 0){
                this.editUserPayPassword(this.newPassword)
                this.$toast.success({
                    message:"支付密码修改成功",
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
        //确认修改
        onSubmit(){
            if(this.password.length===6 && this.newPassword.length===6){
                if(this.password === this.userData.pay_password){
                    if(this.password === this.newPassword){ //新旧密码相同不通过
                        this.$toast({
                            message:"新支付密码与旧支付密码不能相同",
                            duration:800
                        })
                    }else{
                        this.editPayPassword()
                    }
                }else{
                    this.$toast.fail({
                        message:"旧支付密码不正确",
                        duration:800
                    })
                }


            }
        }
    },
    computed: {
        
    },
    computed: {
        ...mapState(["userData"]),
        //判断是旧密码还是新密码
        oldORnew(){
            return this.oldnew
        },
        //关闭图标的大小计算
        iconSize(){
            return (3.733333333333334 * window.innerWidth) / 100 +"px"
        },
    },
}
    
</script>
<style scoped lang="scss">
    //表单---------------------------
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

    //遮罩层-------------------
    .van-nav-bar{
        width: 100%;
        height: 6.896551724137931vh;
        label{
            font-size: 4.266666666666667vw;
        }
    }
    .van-password-input{
        background-color: white;
        margin: 0;
        // height: 36vw;
        height: 26.666666666666668vw;
        width: 100%;
        .van-password-input__security{
            height: 7.496251874062969vh;
        }
        .van-password-input__info{
            font-size: 3.733333333333334vw;
        }
    }
    .van-number-keyboard{
        height: 38.08095952023988vh;
        
    }
    .van-number-keyboard__body{
        height: 38.08095952023988vh;
        .van-number-keyboard__keys{
            width: 100%;
            height: 100%;
            .van-key__wrapper{
                width: 31.2vw;
                height: 14.933333333333335vw;
                padding: 0 1.6vw 1.6vw 0;
                .van-key{
                    width: 31.2vw;
                    height: 14.933333333333335vw;
                }
            }
        }
    }
</style>