<template>
    <van-popup v-model="showKeyboard" position="bottom" :style="{ height: '70%' }" :close-on-click-overlay="false">
        <!-- 头部 -->
        <van-nav-bar  @click-left="closeClick">
            <template #left>
                <van-icon name="cross" :size="iconSize"/>
            </template>
            <template #title>
                <label>付款</label>
            </template>
            
        </van-nav-bar>
        <!-- 密码输入框 -->
        <van-password-input :value="pay_password" info="密码为 6 位数字" :error-info="errorInfo"  v-if="showKeyboard"/>
        <!-- 数字键盘 -->
        <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete"></van-number-keyboard>
    </van-popup>
</template>
    
<script>
import {mapState} from 'vuex';
import {reqOrderPayment} from 'network/api';
export default {
    name:"PayMoney",
    computed: {
        //关闭图标的大小计算
        iconSize(){
            return (3.733333333333334 * window.innerWidth) / 100 +"px"
        },
        ...mapState(["userData"]),
    },
    data(){return{
        pay_password: '',
        showKeyboard: false,
        errorInfo: '',
        orderId:0
    }},
    props:{
        order_id:{
            type:Number,
        }
    },
    watch: {
        order_id(newId){
           this.orderId = newId
        }
    },
    methods:{
        //关闭按钮
        closeClick(){
            this.showKeyboard = false
            this.pay_password = ""
            this.errorInfo = ""
            //跳转至当前订单的详情页
            this.$router.push({
                path:"/orderInfo",
                query:{
                    id:this.orderId
                }
            })
        },
        
        //付款请求
        async orderPayment(pay_password){
            const result = await reqOrderPayment(this.orderId,pay_password)
            if(result.errcode === 0){
                this.$router.push("/paySuccess")
                this.showKeyboard = false
                this.pay_password = ""
                this.errorInfo = ""
                this.$toast.success("支付成功")
            }
        },

        //密码按键
        onInput(key) {
            this.pay_password = (this.pay_password + key).slice(0, 6);
            if (this.pay_password.length === 6) {
                if(this.userData.pay_password === this.pay_password){
                    //输入的密码正确--直接进行付款请求
                    this.orderPayment(this.userData.pay_password)

                }else{
                    this.errorInfo = '支付密码不正确';
                    this.pay_password = ""
                }
            }
        },
        //删除密码
        onDelete() {
            this.pay_password = this.pay_password.slice(0, this.pay_password.length - 1);
            if(this.pay_password.length < 6){
                this.errorInfo = '';
            }
        },
    },
    
}
    
</script>
<style scoped lang="scss">
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
        height: 36vw;
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