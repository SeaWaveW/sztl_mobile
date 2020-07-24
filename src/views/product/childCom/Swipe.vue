<template>
    <van-swipe class="my-swipe" :autoplay="2000" indicator-color="pink">
        <van-swipe-item v-for="item in imgList" :key="item.id">
            <img :src="item.path" alt="">
        </van-swipe-item>
    </van-swipe>
</template>
    
<script>
    
export default {
    name:"Swipe",
    props:{
        imgList:{
            type:Array,
            default(){
                return []
            }
        }
    },
}
    
</script>
<style scoped lang="scss">
    .my-swipe .van-swipe-item {
        color: #fff;
        font-size: 20px;
        text-align: center;
        background-color: #39a9ed;
        height: 44.97751124437781vh;
        img{
            width: 100%;
            height: 100%;
        }
        .van-swipe__indicator{
            .van-swipe__indicator{
                width: 1.6vw;
                height: 0.8995502248875562vh;
            }
        } 
    }
    
</style>