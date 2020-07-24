<template>
    <van-cell-group>
        <van-cell>
            <template #title>
                <span class="custom-title">{{name}}</span>
            </template>
            <template #label>
                <span class="price">￥{{price|fprice}}</span>
            </template>
        </van-cell>
    </van-cell-group>
</template>
    
<script>
    
export default {
    name:"GoodsNamePrice",
    props:{
        name:{
            type:String
        },
        price:{
            type:Number
        }
    }
}
    
</script>
<style scoped lang="scss">
    .van-cell-group{
        height: 13.493253373313344vh;
    }
    .custom-title{
        font-size: 2.0989505247376314vh;
    }
    .price{
        color: #ff5500;
        font-size: 1.7991004497751124vh;
    }
</style>