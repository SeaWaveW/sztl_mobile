<template>
<div class="OrderList">
    
    <main >

        <van-cell-group v-for="item in orderList" :key="item.id" >
            <van-cell class="orderHeader" @click="orderInfoClick(item.id)">
                <template #title>
                    <h4>订单ID：{{item.id}}</h4>
                </template>
                <template #default>
                    <van-icon name="arrow" :size="detailsSize"/>
                </template>
            </van-cell>
            <van-cell class="orderInfo" center v-for="citem in item.orderProducts" :key="citem.id" @click="productInfoClick(citem.id)">
                <template #icon>
                    <img :src="citem.cover" alt="">
                </template>
                <template #title>
                    <h4>{{citem.name}}</h4>
                </template>
                <template #default>
                    <span>{{citem.count}}件</span>
                </template>
            </van-cell>
        </van-cell-group>

    </main>
    
</div>
</template>
    
<script>
import {reqGetOrderList} from 'network/api'; 
export default {
    name:"OrderList",
    data(){return{
        //获取订单列表的参数
        params:{
            page:1,
            size:10
        },
        //订单总页数
        totalPages:0,
        //订单数据
        orderList:[]
    }},
    computed: {
        detailsSize(){
            return (3.733333333333334 * window.innerWidth) / 100 + "px"
        }
    },
    methods:{
        //获取订单列表
        async getOrderList(){
            const result = await reqGetOrderList(this.params)
            if(result.errcode === 0){
                const {totalPages,data} = result.data
                this.totalPages = totalPages
                this.orderList = [...this.orderList,...data]
            }
            // console.log(this.orderList)
        },
        //跳转至当前点击的订单页面
        orderInfoClick(id){
            this.$router.push({
                path:"/orderInfo",
                query:{id}
            })
        },
        //跳转商品详情
        productInfoClick(id){
            this.$router.push({
                path:"/product",
                query:{id}
            })
        }
    },
    created(){
        this.getOrderList()
    }
}
    
</script>
<style scoped lang="scss">
    main{
        height: calc(100vh - 6.896551724137931vh);
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        .orderHeader{
            height: 7.796101949025487vh;
            border-top:1.199400299850075vh solid #ebedf0;
            display: flex;
            align-items: center;
            h4{
                font-size: 3.733333333333334vw;
            }
            .van-icon{
                width: 3.733333333333334vw;
                height: 3.733333333333334vw;
            }
        }
        .orderInfo{
            h4{
                font-size: 3.2vw;
                width: 165%;
                margin-left: 1.3333333333333335vw;
                max-height: 7.19640179910045vh;
                overflow-x: hidden;
                text-overflow: ellipsis;
                @media all and (min-width:760px){
                    line-height: 4.6vw;
                }
            }
            img{
                width: 7.496251874062969vh ;
                height: 7.496251874062969vh ;
            }
            .van-cell__value{
                height: 11.466666666666667vw;
                line-height: 11.466666666666667vw;
                font-size: 3.733333333333334vw;
            }
        }
    }
</style>