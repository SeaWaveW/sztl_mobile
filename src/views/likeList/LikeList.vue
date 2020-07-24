<template>
<div class="LikeList">
    <main>
        <van-cell center v-for="item in likeList" :key="item.id" @click="$router.push({path:'/product',query:{id:item.id}})">
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
                <van-icon name="arrow" :size="detailsSize"/>
            </template>
        </van-cell>
    </main>
    
    
</div>
</template>
    
<script>
import {reqGetLikeList} from "network/api"  
export default {
    name:"LikeList",
    components:{
        
    },
    data(){return{
        likeList:[]
    }},
    methods:{
        async getLikeList(){
            const result = await reqGetLikeList()
            if(result.errcode === 0){
                this.likeList = result.data
                console.log(this.likeList)
            }
        }
    },
    computed: {
        detailsSize(){
            return (3.733333333333334 * window.innerWidth) / 100 + "px"
        }
    },
    created(){
        this.getLikeList()
    }
}
    
</script>
<style scoped lang="scss">
main{
    height: calc(100vh - 6.896551724137931vh);
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
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
</style>