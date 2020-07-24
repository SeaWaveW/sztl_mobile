<template>
<div class="GoodsRests">
    <van-row>
        <van-col span="10">
            <van-cell :title="'免运费'" />
        </van-col>
        <van-col span="14">
            <van-cell :title="'剩余：' + (ProductDetailData.stock || 0)" />
        </van-col>
    </van-row>
    <van-row>
        <van-col span="10">
            <van-cell :title="'销量：' + (ProductDetailData.sales || 0)" />
        </van-col>
        <van-col span="14">
            <van-cell :title="'收藏：' + (ProductDetailData.likes || 0)" />
        </van-col>
    </van-row>
</div>
</template>
    
<script>
    
export default {
    name:"GoodsRests",
    props:{
        ProductDetailData:{
            type:Object,
            default(){
                return {}
            }
        }
    },
}
    
</script>
<style scoped lang="scss">
    .van-row{
        height: 6.5967016491754125vh;
        margin: 0.14992503748125938vh 0;
        border-top: 0.14992503748125938vh solid rgba(0,0,0,.02);
        &:first-child{
            border: none;
        }
    }
    .van-cell{
        font-size: 1.7991004497751124vh;
    }
</style>