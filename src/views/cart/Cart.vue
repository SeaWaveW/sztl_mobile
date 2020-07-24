<template>
<div class="Cart">
    <!-- 主体 -->
    <main>
        <div class="goodsClear" v-if="!isNull">
            购物车空空如也~~
        </div>
        <van-row class="productInfo" v-for="item in cartList" :key="item.product_id">
            <van-col span="2">
                <van-checkbox v-model="item.checked" @change="change(item)"></van-checkbox>
            </van-col>
            <van-col span="22">
                <van-card>   
                    <template #thumb>
                        <img :src="item.cover" alt="">
                    </template>
                    <template #title>
                        <h4>{{item.name}}</h4>
                    </template>
                    <template #desc>
                        <van-row class="goodsPN">
                            <van-col span="14">
                                <span class="goodsPrice">￥{{item.price}}.00</span>
                            </van-col>
                            <van-col span="10">
                                <van-stepper v-model="item.count" @plus="addReduceProduct(item,'+')" @minus="addReduceProduct(item,'-')" @blur="change(item)" :input-width="stepperInput" :button-size="stepperButton"/>
                                <van-button type="danger" size="small" @click="deleteClick(item)">删除</van-button>
                            </van-col>
                        </van-row>
                    </template>
                </van-card>
            </van-col>
        </van-row>
        
    </main>
    <!-- 底部 -->
    <van-submit-bar currency="￥" :price="goodsPrice" decimal-length="2" button-text="提交订单" @submit="onSubmit" :disabled="cartList.length<1">
        <div class="priceBox">
            <label>共计:</label><span>{{goodsNum}}件</span>
        </div>
    </van-submit-bar>
</div>
</template>
    
<script>
import Navbar from '../../components/Navbar.vue'; 
import {reqCartList,reqUpdateSingleGoods,reqDeleteSingleGoods} from 'network/api';  
export default {
    name:"Cart",
    components:{
        Navbar
    },
    data(){return{
        cartList:[],
    }},
    methods:{
        //1.获取购物车列表
        async getCartList(){
            const result = await reqCartList()
            // console.log(result.data)
            if(result.errcode === 0){
                result.data.forEach(item=>{
                    item.checked = Boolean(item.checked)
                })
                this.cartList = result.data
            }
        },
        //2.更新单个商品
        //方法
        async updateSingleGoods(item){
            let {product_id,count,checked} = item
            checked = Number(checked)
            console.log(product_id,count,checked)
            const result = await reqUpdateSingleGoods(product_id,count,checked)
            console.log(result)
        },
        // 商品数据发生变化时
        change(item){
            this.updateSingleGoods(item)
        },
        //减少或增加
        addReduceProduct(item,isAdd){
            if(isAdd === "+"){
                item.count ++
            }else{
                item.count --
            }
            this.change(item)
        },
        //3.删除商品
        async deleteClick(goodsItem){
            const result = await reqDeleteSingleGoods(goodsItem.product_id)
            if(result.errcode === 0){
                this.cartList.forEach((item,index)=>{
                    if(item.product_id === goodsItem.product_id){
                        this.cartList.splice(index,1)
                    }
                })
                this.$toast.success({
                    message:"删除成功",
                    duration:500
                })
            }
            
        },
        // 提交订单
        onSubmit(){
            //先判断是否选中
            let productList = new Array()
            this.cartList.forEach(item=>{
                if(item.checked){
                    productList.push(item)
                }
            })
            //路由方式
            // this.$router.push({
            //     path:"/OrderConfirm",
            //     query:{
            //         orderInfo:JSON.stringify(this.cartList)
            //     }
            // })

            //本地存储方式
            sessionStorage.setItem("orderInfo",JSON.stringify(productList))
            this.$router.push("/orderConfirm")
        }
    },
    computed:{
        //总数
        goodsNum(){
            let num = 0
            this.cartList.forEach(item=>{
                if(item.checked){
                    num += item.count
                }
            })
            return num
        },
        //总价
        goodsPrice(){
            let price = 0
            this.cartList.forEach(item=>{
                if(item.checked){
                    price += item.count * item.price
                }
            })
            return price*100
        },
        //购物车数据是否为空
        isNull(){
            return Boolean(this.cartList.length>=1)
        },
        //stepper-button大小
        stepperButton(){
            return (window.innerWidth * 6.4)/100 + "px"
        },
        stepperInput(){
            return (window.innerWidth * 9.333333333333334)/100 + "px"
        }
    },
    created(){
        this.getCartList()
    }
}
    
</script>
<style scoped lang="scss">
    main{
        height: calc(100vh - 14.3928035982009vh);
        overflow-y:scroll;
        -webkit-overflow-scrolling: touch;
        .goodsClear{
            width: 100%;
            height: 100%;
            background-color: pink;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #aaa;
            background-color:  rgba(150,150,150,.1);
            font-size: 2.0989505247376314vh;
        }
        .productInfo{
            box-shadow: 0 0 0.5333333333333333vw rgba(0,0,0,.4);
            margin: 0.7496251874062968vh 1.6vw;
            padding: 0.7496251874062968vh 1.3333333333333335vw;
            border-radius: 1.0666666666666667vw;
            height: 15.742128935532234vh;
            .van-checkbox{
                margin: 4.94752623688156vh 0 0 1.3333333333333335vw;
            }
            .van-card{
                background-color: #fff;
                padding:0.7496251874062968vh 0 0 0;
                height: 14.24287856071964vh;
                img{
                    background-color: #fff;
                    width: 23.466666666666665vw;
                    height: 13.193403298350825vh;
                }
                h4{
                    font-size: 1.7991004497751124vh;
                    height: 4.497751124437781vh;
                    overflow: hidden;
                }
                .goodsPrice{
                    color: #ff5500;
                    font-size: 1.7991004497751124vh;
                }
                .van-stepper{
                    margin: 0.4497751124437781vh 0;
                    width: 25.333333333333336vw;
                    height: 4.197901049475263vh;
                    .van-stepper__input{
                        font-size: 1.7991004497751124vh;
                    }
                }
                .goodsPN{
                    height: 8.995502248875562vh;
                    .van-button{
                        transform: translateX(18%);
                        height: 4.497751124437781vh;
                        width: 17.066666666666666vw;
                        font-size: 1.9490254872563717vh;
                    }
                }
                
                
            }
        }
        
        
    }
    .van-submit-bar{
        height: 7.496251874062969vh;
        box-sizing: border-box;
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
        @media all and (min-width: 760px) {
            padding-top: 2.2488755622188905vh;
            .van-button{
                transform: translateY(- 0.7161458333333333vw);
            }
        }
    }
</style>