<template>
<div class="setAvatar">
    <van-popup v-model="show">
        <div class="maxImage" @click="show=false">
            <img :src="imgSrc" alt="" >
        </div>
    </van-popup>
    <main>
        <div class="imageShow">
            {{isHaveImg}}
            <img :src="imgSrc" alt="" @click="show=true" class="preview">
        </div>
    </main>
    <van-row>
        <van-button type="primary">
            选择图片
            <input type="file" @change="fileChangge"  ref="file">
        </van-button>
    </van-row>
    <van-row>
        <van-button type="info" @click="showClick">上传图片</van-button>
    </van-row>
</div>
</template>
    
<script>
import {mapState,mapMutations} from 'vuex';  
import {request} from 'network/request';
export default {
    name:"setAvatar",
    data(){return{
        imgSrc:"",
        //遮罩层
        show:false,
    }},
    computed: {
        ...mapState(["userData"]),
        imgSize(){
            return (14.992503748125937 * window.innerHeight) / 100 +"px"
        },
        // 一进来就替换图片
        isHaveImg(){
            this.imgSrc = 'http://192.168.4.233:8360'+this.userData.avatar
        }
    },
    methods:{
        //选择图片
        fileChangge(){
            let file = this.$refs.file.files[0]
            let read = new FileReader()
            let thid = this
            read.readAsDataURL(file)
            read.onload = function(){
                let result = read.result
                thid.imgSrc = result
            }
        },

        ...mapMutations(["editUserImage"]),
        //上传图片
        showClick(){
            let formData = new FormData()
            formData.append("avatar",this.$refs.file.files[0])
            if(this.$refs.file.files[0]){
                request({
                    url:'/user/avatar',
                    method:'post',
                    data:formData
                }).then(data=>{
                    if(data.errcode === 0){
                        this.$toast.success({
                            message:"上传头像成功",
                            duration:600
                        })
                        this.editUserImage(data.data.avatar);
                        this.$router.push('/my');
                        
                    }
                })
            }else{
                this.$toast.fail({
                    message:"请选择新头像",
                    duration:600
                })
            }
            
        }
    },
}
    
</script>
<style scoped lang="scss">
    .van-popup{
        img{
            width: 100vw;
            height: 50%;
            display: block;
            min-width: 100vw;
        }
    }
    .imgShow{
        display: block;
        width: 100vw;
        height: 50%;
        
    }
    main{
        height: calc(100vh - 21.88905547226387vh);
        background-color: #f8f8f8;
        display: flex;
        justify-content: center;
        align-items: center;
        //中间图片展示
        .imageShow{
            width: 14.992503748125937vh;
            height: 14.992503748125937vh;
            border: 2px solid goldenrod;
            border-radius:50%;
            background-color: pink;
            overflow: hidden;
            position: relative;
            .preview{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
            }
        }

    }
    //下方两个按钮
    .van-row{
        height: 7.496251874062969vh;
        overflow: hidden;
        .van-button{
            width: 100vw;
            height:7.496251874062969vh;
            font-size: 2.0989505247376314vh;

            position: relative;
            input{
                position: absolute;
                left: 0;
                top: 0;
                width: 100vw;
                height:7.496251874062969vh;
                opacity: 0;
            }
        }
    }
</style>