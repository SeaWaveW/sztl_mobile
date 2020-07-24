<template>
<van-tabs v-model="active" sticky :offset-top="vhCom">
    <van-tab>
        <template #title>
            <span class="titleText">图片</span>
        </template>
        <img v-for="item in detailImgList" :key="item.id" :src="item.path" alt="" >
    </van-tab>
    <van-tab>
        <template #title>
            <span class="titleText">参数</span>
        </template>
        <van-row v-for="item in properties" :key="item.id">
            <van-col span="10">
                <van-cell :title="item.name" />
            </van-col>
            <van-col span="14">
                <van-cell :title="item.detail" />
            </van-col>
        </van-row>
    </van-tab>
</van-tabs>
</template>
    
<script>
    
export default {
    name:"GoodsTabs",
    data(){return{
        active:0
    }},
    props:{
        detailImgList:{
            type:Array,
            default(){
                return []
            }
        },
        properties:{
            type:Array,
            default(){
                return []
            }
        },
    },
    computed: {
        vhCom(){
            return 6.896551724137931 * window.innerHeight * 0.01 +"px"
        }
    },
}
    
</script>
<style scoped lang="scss">
    .titleText{
        font-size: 2.0989505247376314vh;
    }
    .van-tabs__wrap .van-hairline--top-bottom{
        height: 6.5967016491754125vh;
    }
    img{
        width: 100vw;
    }
    .van-row{
        height: 6.5967016491754125vh;
        border-bottom: 0.14992503748125938vh solid rgba(0,0,0,0.05);
        &:last-child{
            border: none;
        }
        .van-cell{
            font-size: 1.7991004497751124vh;
        }
    }
</style>