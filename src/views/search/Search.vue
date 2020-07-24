<template>
<div class="Search">
    
    <van-nav-bar left-arrow @click-left="$router.back()">
        <template #left > 
            <van-icon name="arrow-left"/> 
            <span class="leftText" style="color:#1989fa">返回</span>
        </template>
        <template #title > 
            <van-search v-model="params.key" placeholder="请输入搜索关键词"  @input="debounce(searchInput)" @clear="clearProductList"/>
        </template>
    </van-nav-bar>
    <main ref="main" @scroll="mainScroll">
        <div class="productItem" v-for="item in productList" :key="item.id" @click="productDetailClick(item.id)">
            <img :src="item.cover" alt="">
            <div class="Info">
                <h3>{{item.name}}</h3>
                <span>￥{{item.price | fprice}}</span>
            </div>
        </div>
    </main>
    <!-- 返回顶部 -->
    <BackTop v-if="backFlag" @click.native="backTopClick"></BackTop>
</div>
</template>
    
<script>
import {reqProduct} from "network/api"

import BackTop from '../../components/BackTop.vue';
import mix from 'mixin/mix.js';

export default {
    name:"Search",
    components:{
        BackTop
    },
    data(){return{
        //请求参数
        params:{
            page:1,
            size:10,
            key:"",
        },
        //总页数
        totalPages:0,
        //商品列表
        productList:[],
        //请求前提（是否已经加载完成）
        reqFlag:false, 
        //防抖ID
        timeId:"",
        //保存上次搜索内容
        oldSearch:""

    }},
    mixins:[mix],
    methods:{
        //防抖函数
        debounce(fn){
            clearTimeout(this.timeId)
            this.timeId = setTimeout(()=>{
                fn()
            },600)
        },
        //输入框监听事件
        searchInput(){
            if(this.params.key.length < 1){
                this.params={
                    page:1,
                    size:10,
                    key:"",
                }
                this.productList = []
            }else{
                if(this.oldSearch !== this.params.key){ //当本次搜索内容不等于上次搜索内容时重置列表
                    this.productList = []
                }
                this.getSearchProductList()
            }
        },
        //清除按钮事件
        clearProductList(){
            this.productList = []
        },
        //搜索商品请求
        async getSearchProductList(){
            this.reqFlag = true
            this.oldSearch = this.params.key
            const result = await reqProduct(this.params)
            if(result.errcode === 0){
                this.totalPages = result.data.totalPages
                this.productList = [...this.productList ,...result.data.data]
            }
            this.reqFlag = false
        },
        //
        mainScroll(){
            // 滚动距离 + 可见高度  >  可滚动高度 -1
            if(this.$refs.main.scrollTop >= 1500 ){
                this.backFlag = true
            }else{
                this.backFlag = false
            }
            if(this.$refs.main.scrollTop + this.$refs.main.clientHeight > this.$refs.main.scrollHeight -1){
                if(this.reqFlag){
                    return
                }
                if(this.params.page == this.totalPages){
                    return
                }
                this.params.page++
                this.getSearchProductList()

            }
            
        },
        //跳转商品详情页事件
        productDetailClick(id){
            this.$router.push({
                path:"/product",
                query:{
                    id
                }
            })
        },
    },
}
    
</script>
<style scoped lang="scss">
    .van-nav-bar{
        box-sizing: border-box;
        height: 6.896551724137931vh;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        .leftText{
            font-size: 2.0989505247376314vh;
        }
        .van-icon{
            font-size: 2.6986506746626686vh;
        }
        .van-search{
            padding: 0;
        }
    }
    main{
        height: calc(100vh - 6.896551724137931vh);
        display: flex;
        flex-wrap: wrap;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        .productItem{
            width: 48vw;
            margin: 0.7496251874062968vh 1vw;
            box-shadow: 0 0 0.8vw rgba(0,0,0,.2);
            border-radius: 1.0666666666666667vw;
            height: 34.93253373313343vh;
            box-sizing: border-box;
            img{
                display: block;
                width: 100%;
                height: 26.986506746626688vh;
            }
            .Info{
                overflow-wrap: normal;
                padding: 0 2.1333333333333333vw;
                h3{
                    font-size: 2.0989505247376314vh;
                    margin: 0.7496251874062968vh 0;
                    white-space: nowrap;
                    overflow-x: hidden;
                    text-overflow: ellipsis;
                }
                span{
                    font-size: 1.7991004497751124vh;
                    color: #ff5500;
                }
            }
        }
    }
</style>