<template>
<div class="Home">
    <!-- 主体 -->
    <main ref="main" @scroll="mainScroll">
        <div class="productItem" v-for="item in productList" :key="item.id" @click="productDetailClick(item.id)">
            <img v-lazy="item.cover" alt="">
            <div class="Info">
                <h3>{{item.name}}</h3>
                <span>￥{{item.price | fprice}}</span>
            </div>
        </div>
        
    </main>

    <!-- 底部 -->
    <Tabbar :active="0"></Tabbar>
    
    <!-- 返回顶部 -->
    <BackTop v-if="backFlag" @click.native="backTopClick"></BackTop>
</div>
</template>
    
<script>
import Navbar from '../../components/Navbar.vue';
import Tabbar from '../../components/Tabbar.vue';
import {reqProduct} from "network/api";
import {mapMutations} from 'vuex'; 

import BackTop from '../../components/BackTop.vue';
import mix from 'mixin/mix.js';

export default {
    name:"Home",
    components:{
        Navbar,Tabbar,BackTop
    },
    mixins:[mix],
    data(){return{
        params:{ //请求商品列表所需的信息
            page:1,
            size:10
        },
        productList:[],//当前页的商品信息
        totalPages:0,//商品总页数
        reqFlag:false, //请求前提（是否已经加载完成）
    }},
    methods:{
        ...mapMutations(["editSelectCity"]),
        //商品列表请求
        async getProductList(){
            this.reqFlag = true
            const result = await reqProduct(this.params)
            if(result.errcode === 0){
                const {totalPages,data} = result.data
                this.totalPages = totalPages
                this.productList = [...this.productList,...data]
            }
            this.reqFlag = false
        },
        
        // 滚动
        mainScroll(){
            if(this.$refs.main.scrollTop >= 1500 ){
                this.backFlag = true
            }else{
                this.backFlag = false
            }
            // 滚动距离 + 可见高度  >  可滚动高度 -1
            if(this.$refs.main.scrollTop + this.$refs.main.clientHeight > this.$refs.main.scrollHeight -1){
                if(this.reqFlag){
                    return
                }
                if(this.params.page == this.totalPages){
                    return
                }
                this.params.page++
                this.getProductList()
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
        //当前定位
        getCurrentPosition(){
            let geolocation = new BMap.Geolocation();
            let that = this;
            geolocation.getCurrentPosition( function(r){
                if(this.getStatus() == BMAP_STATUS_SUCCESS){
                    let province = r.address.province //返回当前省份
                    let city = r.address.city//返回当前城市
                    // console.log(r)
                    that.editSelectCity(city)
                }
                
            })
        }
    },
    created(){
        this.getProductList()
        //获取当前地理位置
        this.getCurrentPosition()
    },
}
    
</script>
<style scoped lang="scss">
    
    main{
        // margin-top:6.896551724137931vh;
        height: calc(100vh - 14.3928035982009vh);
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
                    // font-size: 2.0989505247376314vh;
                    font-size: 14px;
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