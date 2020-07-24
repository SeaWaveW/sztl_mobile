<template>
<div class="Product">
    
    <main>
        <Swipe :imgList="ProductDetailData.imgList"></Swipe>
        <GoodsNamePrice :name="ProductDetailData.name" :price="ProductDetailData.price"></GoodsNamePrice>
        <GoodsRests :ProductDetailData="ProductDetailData"></GoodsRests>
        <GoodsTabs :detailImgList="ProductDetailData.detailImgList" :properties="ProductDetailData.properties"></GoodsTabs>
    </main>
    <GoodsAction :ProductDetailData="ProductDetailData"></GoodsAction>
</div>
</template>
    
<script>
import Navbar from '../../components/Navbar.vue';
import {reqProductDetail} from 'network/api';
import Swipe from './childCom/Swipe.vue';
import GoodsAction from './childCom/GoodsAction.vue';   
import GoodsNamePrice from './childCom/GoodsNamePrice.vue';
import GoodsRests from './childCom/GoodsRests.vue';
import GoodsTabs from './childCom/GoodsTabs';
export default {
    name:"Product",
    components:{
        Navbar,Swipe,GoodsAction,GoodsNamePrice,GoodsRests,GoodsTabs
    },
    data(){return{
        ProductDetailData:{}
    }},
    methods:{
        async getProductDetail(){
            const result = await reqProductDetail(this.$route.query.id)
            if(result.errcode === 0){
                this.ProductDetailData = result.data
                // console.log(this.ProductDetailData)
                
            }else{
                this.$toast.fail('获取商品数据失败');
            }
        }
    },
    created(){
        this.getProductDetail()
    }
}
    
</script>
<style scoped lang="scss">
    main{
        height: calc(100vh - 14.3928035982009vh);
        overflow-y:scroll;
        -webkit-overflow-scrolling: touch;
    }
</style>