<template>
    <van-goods-action>
        <van-goods-action-icon  @click="likeProductClick" >
            <template #icon >
                <van-icon :name="isLike ? 'like' : 'like-o' " :color="isLike ? 'red' : '' "/>
            </template>
            <span class="Text">{{isLike?'取消收藏':'收藏'}}</span>
        </van-goods-action-icon>
        <van-goods-action-icon @click="$router.push('/cart')">
            <template #icon>
                <van-icon name="cart-o" />
            </template>
            <span class="Text" >购物车</span>
        </van-goods-action-icon>


        <van-goods-action-button type="warning" @click="addCartClick">
            <template #default>
                <span class="btnText">加入购物车</span>
            </template>
        </van-goods-action-button>
        <van-goods-action-button type="danger" @click="BuyNowClick">
            <template #default>
                <span class="btnText" >立即购买</span>
            </template>
        </van-goods-action-button>
    </van-goods-action>
</template>
    
<script>
import {reqAddLikeProduct,reqCancelLikeProduct,reqAddCart} from 'network/api';
import {mapState,mapMutations} from 'vuex';
export default {
    name:"GoodsAction",
    props:{
        ProductDetailData:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){return{
    }},
    methods:{
        ...mapMutations(["changeLikeList"]),
        //收藏事件
        async addLikeProduct(){
            const result = await reqAddLikeProduct(this.ProductDetailData.id)
            if(result.errcode === 0){ 
                this.changeLikeList(this.ProductDetailData)
                this.$toast("收藏成功")
            }
        },
        // //取消收藏事件
        async cancelLikeProduct(){
            const result = await reqCancelLikeProduct(this.ProductDetailData.id)
            if(result.errcode === 0){ 
                this.changeLikeList(this.ProductDetailData.id)
                this.$toast("取消收藏成功")
            }   
        },
        //点击收藏事件
        likeProductClick(){
            if(this.isLike){ //已经收藏过--发送取消收藏
                this.cancelLikeProduct()
            }else{
                this.addLikeProduct()
            }
        },
        //加入购物车---------------------------------------------
        //方法
        async addCart(){
            const result = await reqAddCart(this.ProductDetailData.id)
            if(result.errcode !== 90101){
                this.$toast.success({
                    message:"添加成功",
                    duration:500
                })
            }
        },
        //单击时
        addCartClick(){
            this.addCart()
        },
        //立即购买---------------------
        BuyNowClick(){
            this.ProductDetailData.count = 1
            //路由方式
            // this.$router.push({
            //     path:"/orderConfirm",
            //     query:{
            //         orderInfo:JSON.stringify([this.ProductDetailData])
            //     }
            // })
            //本地存储方式
            sessionStorage.setItem("orderInfo",JSON.stringify([this.ProductDetailData]))
            this.$router.push("/orderConfirm")
        }

    },
    computed: {
        ...mapState(["userData"]),
        isLike(){
            this.ProductDetailData.product_id = this.ProductDetailData.id
            let likeKey = false
            if(this.userData.id || this.userData.name){
                this.userData.likeList.forEach(item=>{
                    if(item.product_id === this.ProductDetailData.id){
                        likeKey = true
                    }
                })
            }
            return likeKey
        }
    },
}
    
</script>
<style scoped lang="scss">
    .van-goods-action{
        height: 7.496251874062969vh;
    }
    //收藏
    .van-goods-action-icon{
        margin:0 0.5333333333333333vw;
        width: 12.8vw;
    }
    @media all and (min-width:1000px){
        .van-goods-action-icon{
            span{
                text-indent: 2.3vw;
                font-size: 2vw;
            }
        }
    }
    .van-icon{
        display: block;
        font-size: 4.8vw;
    }
    .Text{
        font-size: 3.2vw;
    }
    //右边按钮
    .van-goods-action-button{
        width: 35.86666666666667vw;
        height: 5.997001499250374vh;
    }
    .btnText{
        font-size: 2.0989505247376314vh;
    }
</style>