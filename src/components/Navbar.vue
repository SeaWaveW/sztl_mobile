<template>

    <van-nav-bar @click-left="leftClick" v-if="$route.name !== 'My' && $route.name !== 'Search'">  <!-- 第一层if 1 -->
        <!-- 左边 -->
        <template #left v-if="$route.name === 'Home'"> <!-- 第二层if -->
            <van-icon name="location-o"  class="homePosition"/>
            <span class="leftText">{{$store.state.selectCity}}</span>
        </template>
        <template #left v-else > <!-- 第二层else -->
            <van-icon name="arrow-left" /> <!-- 第三层if -->
            <span class="leftText" style="color:#1989fa">{{isCity ? $store.state.selectCity : "返回"}}</span>
        </template>

        <!-- 中间 -->
        <template #title>
            <span class="titleText">{{isAddr}}</span>
        </template>

        <!-- 右边 -->
        <template #right v-if="$route.name === 'Home'"> <!-- 第一层if 2 -->
            <van-icon name="search" @click="$router.push('/search')"/>
        </template>
        {{isAddr}}
    </van-nav-bar>

</template>
    
<script>
export default {
    name:"Navbar",
    data(){return{
        
    }},
    methods:{
        leftClick(){
            console.log(this.$route)
            if(this.$route.path.indexOf("/home")>=0){
                this.$router.push("/citySelect")
            }else{
                this.$router.back()
            }
        }
    },
    computed: {
        isAddr(){
            //判断是否 从购买时进入收货地址
            if(!!this.$route.query.from){
                if(this.$route.query.from.indexOf("orderConfirm")>=0){
                    return "请选择收货地址"
                }else{
                    return this.$route.meta.title
                }
            }
            //判断是 新增地址 还是 修改地址
            else if(this.$route.query.adrId <= 0){ 
                return "新增地址"
            }
            else{
                return this.$route.meta.title
            }
        },
        isCity(){
            return this.$route.path.indexOf("/citySelect")>=0
        }
    },
}
    
</script>
<style scoped lang="scss">
    .van-nav-bar{
        box-sizing: border-box;
        height: 6.896551724137931vh;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        .titleText{
            font-size: 2.39880059970015vh;
        }
        .leftText{
            font-size: 2.0989505247376314vh;
        }
        .van-icon{
            font-size: 2.6986506746626686vh;
        }
    }
</style>