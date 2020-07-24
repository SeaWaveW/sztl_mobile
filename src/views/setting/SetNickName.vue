<template>
<div class="SetNickName">
    
    <van-form @submit="onSubmit" ref="vanForm">
        <van-field
            v-model="nickname"
            name="昵称"
            label="昵称"
            placeholder="请输入昵称"
            :rules="[{ required: true, message: '  ' }]"/>
        <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
            修改昵称
            </van-button>
        </div>
    </van-form>
    
</div>
</template>
    
<script>
import {reqEditNickName} from "network/api" 
import {mapMutations} from 'vuex';   
export default {
    name:"SetNickName",
    components:{
        
    },
    data(){return{
        nickname:""
    }},
    methods:{
        ...mapMutations(["editNickName"]),
        async onSubmit(){
            const result = await reqEditNickName(this.nickname)
            if(result.errcode === 0){
                this.editNickName(result.data.nickname)
                this.$toast.success({
                    message:"昵称修改成功",
                    duration:500
                })
                this.$router.back()
            }
        }
    },
}
    
</script>
<style scoped lang="scss">
    .van-field{
        font-size: 2.4691358024691357vh;
        height: 6.5967016491754125vh;
        // height: 8.245877061469265vh;
        padding:1.4992503748125936vh 4.266666666666667vw ;
    }
    .van-button{
        font-size: 2.4691358024691357vh;
        height: 6.296851574212893vh;
    }
</style>