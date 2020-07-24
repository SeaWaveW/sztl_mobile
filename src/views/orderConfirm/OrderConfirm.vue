<template>
<div class="OrderConfirm">
    
    <!-- 主体内容 -->
    <main>
        <van-cell-group class="address">
            <!-- 上下10 -->
            <van-cell @click="$router.push({path:'addressList',query:{from:'orderConfirm'}})" center>
                <template #title>
                    <h4>{{isHaveAddress ? selectedAddress.name+","+selectedAddress.tel : "请选择收货地址"}}</h4>
                </template>
                <template #label>
                    <h5>{{isHaveAddress ? selectedAddress.address : ""}}</h5>
                </template>
                <template  #default>
                    <van-icon name="arrow"/>
                </template>
            </van-cell>
            
        </van-cell-group>

        <van-cell-group class="productInfo" v-for="item in productInfoList" :key="item.product_id">
            <van-cell>
                <template #icon>
                    <img :src="item.cover" alt="">
                </template>
                <template #title>
                    <h4>{{item.name}}</h4>
                </template>
                <template #label>
                    <span>￥{{item.price}}</span>
                </template>
                <template #default>
                    <label>{{item.count}}件</label>
                </template>
            </van-cell>
        </van-cell-group>
    </main>

    <!-- 底部 -->
    <van-submit-bar currency="￥" :price="productPrice" decimal-length="2" button-text="付款" @submit="onSubmit">
        <div class="priceBox">
            <label>共计: </label><span>{{productNum}} 件</span>
        </div>
    </van-submit-bar>


    <PayMoney ref="PayMoney" :order_id="order_id"></PayMoney>
</div>
</template>
    
<script>
import PayMoney from '../../components/PayMoney.vue';
import {mapState,mapMutations} from 'vuex';  
import {reqPlaceOrder} from 'network/api';
export default {
    name:"OrderConfirm",
    components:{
        PayMoney
    },
    data(){return{
        // 1
        productInfoList:[],
        //下单后的返回来的订单ID 5
        order_id:0
    }},
    methods:{
        // 
        ...mapMutations(["changeSelectAddress"]),
        // 付款按钮事件3
        onSubmit(){
            if(this.isHaveAddress){ //已选有收货地址4
                this.placeOrder(this.productInfoList,this.selectedAddress.id)
            }else{
                this.$toast({
                    message:"请选择您的收货地址!!!",
                    duration:600
                })
            }
        },
        //下单请求5
        async placeOrder(orderInfo,addrId){
            const result = await reqPlaceOrder(orderInfo,addrId)
            if(result.errcode === 0){
                this.order_id = result.data.id
                console.log(this.order_id)
                this.$refs.PayMoney.showKeyboard = true
            }
            
        }
    },
    computed: {
        //计算总件数2
        productNum(){
            let num = 0
            this.productInfoList.forEach(item=>{
                num += item.count
            })
            return num
        },
        //计算总价格2
        productPrice(){
            let price = 0
            this.productInfoList.forEach(item=>{
                price += item.count*item.price
            })
            return price*100
        },
        ...mapState(["selectedAddress"]),
        //是否选有收货地址4
        isHaveAddress(){
            if(this.selectedAddress.id){
                return true
            }
            return false
        }
    },
    created(){ //1
        // 路由方式
        // this.productInfoList = JSON.parse(this.$route.query.orderInfo)
        // 本地存储方式
        let orderInfoArr = JSON.parse(sessionStorage.getItem("orderInfo"))
        orderInfoArr.forEach(item=>{
            let {product_id,name,price,cover,count} = item
            let orderObj = {
                product_id,name,price,cover,count
            }
            this.productInfoList.push(orderObj)
        })
        // console.log(this.productInfoList)
    },
    beforeDestroy() {
        this.changeSelectAddress({})
    },
}
    
</script>
<style scoped lang="scss">
    main{
        height: calc(100vh - 14.3928035982009vh);
        overflow-y:scroll;
        -webkit-overflow-scrolling: touch;
        .address{
            border-top: 1.4992503748125936vh solid rgba(150,150,150,.1);
            border-bottom: 1.4992503748125936vh solid rgba(150,150,150,0.08);
            
            h5{
                width: 200%;
            }
        }
        .productInfo{
            img{
                width: 13.333333333333334vw;
                height: 7.496251874062969vh;
            }
            h4{
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 60vw;
                margin: 0.29985007496251875vh 2.2488755622188905vh 0;
                font-size: 1.9490254872563717vh;
                height:3.598200899550225vh;
            }
            span{
                font-size: 1.7991004497751124vh;
                margin: 0 2.2488755622188905vh;
                height: 1.7991004497751124vh;
            }
            label{
                font-size: 2.0989505247376314vh;
            }
        }
    }
    .van-submit-bar{
        height: 7.496251874062969vh;
        .priceBox,.van-submit-bar__text,.van-submit-bar__price{
            font-size: 2.0989505247376314vh;
        }
        .van-submit-bar__price--integer{
            font-size: 2.39880059970015vh;
        }
        .van-button{
            width: 29.333333333333332vw;
            height: 5.997001499250374vh;
            font-size: 2.39880059970015vh;
        }
    }
</style>