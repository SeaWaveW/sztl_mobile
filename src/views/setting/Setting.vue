<template>
<div class="Setting">
    <main>
        <van-cell-group v-for="item in mainVanCellList" :key="item.id">
            <van-cell class="titleInfo">
                <template #title>
                    <h4>{{item.title}}</h4>
                </template>
            </van-cell>
            <van-cell v-for="citem in item.abilityList" :key="citem.id" class="Ability" @click="$router.push(citem.path)">
                <template #title>
                    <h4>{{citem.title}}</h4>
                </template>
                <template #icon>
                    <van-icon :name="citem.icon" :size="cellIconSize" class="leftIcon"/>
                </template>
                <template #default>
                    <van-icon name="arrow" :size="cellIconSize"/>
                </template>
            </van-cell>
        </van-cell-group>
        <!-- <van-cell v-for="item in mainVanCellList" :key="item.id" class="Ability">
            <template #title>
                <h4>{{item.title}}</h4>
            </template>
            <template #icon>
                <van-icon :name="item.icon" :size="cellIconSize" class="leftIcon"/>
            </template>
            <template #default>
                <van-icon name="arrow" :size="cellIconSize"/>
            </template>
        </van-cell> -->
    </main>
</div>
</template>
    
<script>
    
export default {
    name:"Setting",
    components:{
        
    },
    data(){return{
        mainVanCellList:[
            {
                id:1,
                title:"基本信息",
                abilityList:[
                    {id:11,icon:"setting-o",title:"修改昵称",path:"/setNickName"},
                    {id:12,icon:"setting-o",title:"修改头像",path:"/setAvatar"},
                ]
            },
            {
                id:2,
                title:"安全",
                abilityList:[
                    {id:21,icon:"setting-o",title:"修改登录密码",path:"/setLoginPassword"},
                    {id:22,icon:"setting-o",title:"修改支付密码",path:"/setPayPassword"},
                ]
            },
            
            
        ]
    }},
    methods:{
        
    },
    computed: {
        //单元格图标大小
        cellIconSize(){
            return (4.266666666666667 * window.innerWidth) / 100 +"px"
        },
    },
}
    
</script>
<style scoped lang="scss">
    main{
        height: calc(100vh - 6.896551724137931vh);
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        //每一项宫格
        h4{
            font-size: 3.2vw;
        }
        .titleInfo{
            height: 11.733333333333333vw;
            padding: 2.666666666666667vw 4.266666666666667vw;
            @media all and (min-width: 760px){
                height: 6.4vw;
            }
            h4{
                font-size: 3.733333333333334vw;
                color: #969799;
            }
        }
        .Ability{
            // height: 5.997001499250374vh;
            height: 10.666666666666668vw;
            padding: 1.4992503748125936vh 4.266666666666667vw;
            h4{
                transform: translate(0.6333333333333333vw,-0.6vh);
            }
            @media all and (min-width: 760px) {
                .leftIcon{
                    margin-left: 1.9736842105263157vw;
                }
                h4{
                    transform: translate(0.6333333333333333vw,0.9789473684210527vw);
                }
            }
            
        }
    }
</style>