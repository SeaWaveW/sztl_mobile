<template>
<div class="OrderInfo">
    
    <main>
        <van-steps :active="orderInfo.order_status">
            <van-step>未付款</van-step>
            <van-step>已付款</van-step>
            <van-step>已发货</van-step>
            <van-step>交易完成</van-step>
        </van-steps>
        <van-cell class="address">
            <template #title>
                <h4>{{orderInfo.userAddress.name + "，" + orderInfo.userAddress.mobile}}</h4>
            </template>
            <template #label>
                <label>
                    {{orderInfo.userAddress.province+" "+orderInfo.userAddress.city+" "+orderInfo.userAddress.country+" "+orderInfo.userAddress.detail}}
                </label>
            </template>
        </van-cell>
        <van-cell class="productInfo" center v-for="item in orderInfo.orderProducts" :key="item.create_time">
            <template #icon>
                <img :src="item.cover" alt="">
            </template>
            <template #title>
                <h4>{{item.name}}</h4>
            </template>
            <template #label>
                <label>￥{{item.price}}</label>
            </template>
            <template #default>
                <span>{{item.count}}件</span>
            </template>
        </van-cell>
    </main>
    <van-row>
        <label>合计：<span>￥{{totalPrice | fprice}}</span></label>
        <van-button type="primary" @click="paymentClick" :disabled="btnFlag" :color="btnFlag?'gray':''">{{orderStatus}}</van-button>
    </van-row>

    <PayMoney ref="PayMoney" :order_id="orderInfo.id"></PayMoney>
    
</div>
</template>
    
<script>
import {reqOrderDetail} from 'network/api'; 
import {mapState} from 'vuex'; 
import PayMoney from '../../components/PayMoney.vue';
export default {
    name:"OrderInfo",
    components:{
        PayMoney
    },
    data(){return{
        //当前订单的数据
        orderInfo:{
            //初始化数据
            userAddress:{
                name:"",mobile:"",province:"",city:"",country:"",detail:""
            },
            orderProducts:[]
        },
        //按钮时否禁用
        btnFlag:false
    }},
    computed: {
        ...mapState(["userData"]),
        //计算总金额
        totalPrice(){
            if(this.orderInfo.orderProducts.length>0){
                let price = 0
                this.orderInfo.orderProducts.forEach(item=>{
                    price+= item.count * item.price
                })
                return price
            }
        },
        //计算当前订单状态
        orderStatus(){
            if(this.orderInfo.id || this.orderInfo.order_status){
                if(this.orderInfo.order_status == 0){
                    this.btnFlag = false
                    return "付款"
                }else{
                    this.btnFlag = true
                    return "等待商家发货"
                }
            }
        }
    },
    methods:{
        //获取当前订单数据
        async getOrderDetail(id){
            const result = await reqOrderDetail(id)
            if(result.errcode === 0){
                this.orderInfo = result.data
                console.log(this.orderInfo)
            }
        },
        //付款
        paymentClick(){
            this.$refs.PayMoney.showKeyboard = true
        }
    },
    created(){
        this.getOrderDetail(this.$route.query.id)
    }
}
    
</script>
<style scoped lang="scss">
    main{
        height: calc(100vh - 14.4928035982009vh);
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        box-sizing: border-box;
        .address{
            border-top:1.4992503748125936vh solid rgba(150,150,150,.1);
            border-bottom:1.4992503748125936vh solid rgba(150,150,150,.1);
        }
        .productInfo{
            h4{
                font-size: 3.2vw;
                width: 165%;
                margin-left: 1.3333333333333335vw;
                max-height: 7.19640179910045vh;
                overflow-x: hidden;
                text-overflow: ellipsis;
                @media all and (min-width:760px){
                    line-height: 4.3vw;
                }
            }
            label{
                font-size: 3.2vw;
            }
            img{
                width: 8.995502248875562vh ;
                height: 10.494752623688155vh ;
                @media all and (min-width:760px){
                    margin-right: 1.3333333333333335vw;
                }
            }
            .van-cell__value{
                height: 11.466666666666667vw;
                line-height: 11.466666666666667vw;
                font-size: 3.733333333333334vw;
            }
        }
    }
    .van-row{
        height: 7.496251874062969vh;
        position: relative;
        border-top: 0.14992503748125938vh solid rgba(100,100,100,.2);
        box-sizing: border-box;
        label{
            margin-left: 20px;
            line-height: 7.496251874062969vh;
            font-size: 3.733333333333334vw;
            span{
                font-size: 4.266666666666667vw;
                color: red;
            }
        }
        .van-button{
            position: absolute;
            bottom: 0.4497751124437781vh;
            right: 5.333333333333334vw;
            font-size:3.733333333333334vw;
            border: none;

        }
    }
</style>