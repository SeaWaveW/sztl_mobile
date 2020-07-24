<template>
<div class="My">
    <!-- 头部 -->
    <van-cell-group>
        <van-cell class="userInfo" @click="isUserLogin ? '' : $router.push('/login')">
            <template #icon>
                <img class="userLogo" :src="'http://192.168.4.233:8360'+userData.avatar" alt="" v-if="isUserLogin">
                <img class="userLogo" src="~assets/img/usernameIcon.jpg" alt="" v-else>
            </template>
            <template #title>
                <h1 class="nickName">{{isUserLogin ? userData.nickname : '大兄弟请先登录 ~ ~ ！'}}</h1>
            </template>
        </van-cell>
    </van-cell-group>
    <main>
        <!-- 宫格 -->
        <van-grid>
            <van-grid-item v-for="item in vanGridItemList" :key="item.id" >
                <template #icon>
                    <van-icon :name="item.icon" :size="gridIconSize"/>
                </template>
                <template #text>
                    <h4>{{item.text}}</h4>
                </template>
            </van-grid-item>
        </van-grid>
        <!-- 单元功能 -->
        <van-cell v-for="item in mainVanCellList" :key="item.id" @click="routerClick(item.path)">
            <template #title>
                <h4>{{item.title}}</h4>
            </template>
            <template #icon>
                <van-icon :name="item.icon" :size="cellIconSize" class="leftIcon"/>
            </template>
            <template #default>
                <van-icon name="arrow" :size="cellIconSize"/>
            </template>
        </van-cell>
    </main>
    <!-- 底部 -->
    <Tabbar></Tabbar>
</div>
</template>
    
<script>
import Tabbar from '../../components/Tabbar.vue'; 
import {mapState} from 'vuex';   
export default {
    name:"My",
    components:{
        Tabbar
    },
    data(){return{
        vanGridItemList:[
            {id:1,icon:"pending-payment",text:"待发货"},
            {id:2,icon:"records",text:"待付款"},
            {id:3,icon:"tosend",text:"已发货"},
            {id:4,icon:"logistics",text:"已完成"},
        ],
        mainVanCellList:[
            {id:11,icon:"records",title:"我的订单",path:"/orderList"},
            {id:12,icon:"like-o",title:"我的收藏",path:"/likeList"},
            {id:13,icon:"description",title:"收货地址",path:"/addressList"},
            {id:14,icon:"setting-o",title:"用户设置",path:"/setting"},
        ]
    }},
    methods:{
        //单元功能跳转
        routerClick(path){
            if(path.indexOf("/addressList")>=0){
                this.$router.push({
                    path,
                    query:{
                        from:"my"
                    }
                })
            }else{
                this.$router.push(path)
            }
        }
    },
    computed: {
        ...mapState(["userData"]),
        //是否已经登录
        isUserLogin(){
            return Boolean(this.userData.id || this.userData.name || this.userData.password)
        },
        //宫格图标大小
        gridIconSize(){
            return (7.466666666666668 * window.innerWidth) / 100 +"px"
        },
        //单元格图标大小
        cellIconSize(){
            return (5.333333333333334 * window.innerWidth) / 100 +"px"
        },
    },
    
}
    
</script>
<style scoped lang="scss">
    .userInfo{
        height: 14.055472263868065vh;
        background-color: rosybrown;
        .userLogo{
            width: 9.557721139430285vh;
            height: 9.557721139430285vh;
            border-radius: 50%;
            @media all and (min-width: 768px) {
                transform: translate(1vw,1.1765625vh);
            }
        }
        .nickName{
            transform: translate(4vw,2.8610194902548725vh);
            font-size: 4.266666666666667vw;
            color: wheat;
            @media all and (min-width: 768px) {
                transform: translate(5vw,4vh);
            }
        }
    }
    main{
        height: calc(100vh - 21.551724137931032vh);
        //每一项宫格
        h4{
            font-size: 3.2vw;
        }
        .van-cell{
            // height: 5.997001499250374vh;
            height: 10.666666666666668vw;
            padding: 1.4992503748125936vh 4.266666666666667vw;
            h4{
                transform: translate(0.6333333333333333vw,-0.2vh);
            }
            @media all and (min-width: 760px) {
                .leftIcon{
                    margin-left: 1.9736842105263157vw;
                }
                h4{
                    transform: translate(0.6333333333333333vw,1.1789473684210527vw);
                }
            }
            
        }
    }
</style>