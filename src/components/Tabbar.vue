<template>
    <van-tabbar :router="true" v-model="TabActive">
        <van-tabbar-item  to="/home">
            <template #icon>
                <van-icon name="star-o" />
            </template>
            <span class="Text">精选</span>
        </van-tabbar-item>
        <van-tabbar-item to="/cart">
            <template #icon>
                <van-icon name="cart-o" />
            </template>
            <span class="Text">购物车</span>
        </van-tabbar-item>
        <van-tabbar-item to="/my">
            <template #icon>
                <van-icon name="contact"/>
            </template>
            <span class="Text">我的</span>
        </van-tabbar-item>
    </van-tabbar>
</template>
    
<script>
    
export default {
    name:"Tabbar",
    data(){return{
        TabActive:this.tabbarCom()
    }},
    props:{
        active:{
            type:Number,
        }
    },
    watch: {
        active(newValue){
            this.TabActive = newValue
        }
    },
    methods: {
        tabbarCom(){
            if(this.$route.path.indexOf("/home")>=0){
                return 0
            }else if(this.$route.path.indexOf("/my")>=0){
                return 2
            }
        }
    },

}
    
</script>
<style scoped lang="scss">
    .van-tabbar{
        box-shadow: 0px -1px 1px rgba(0,0,0,.2);
        height: 7.496251874062969vh;
        .van-tabbar-item__icon{
            font-size: 2.6986506746626686vh;
        }
        .Text{
            font-size: 1.7991004497751124vh;
        }
        .van-icon{
            font-size: 2.6986506746626686vh;
        }
        

    }
</style>