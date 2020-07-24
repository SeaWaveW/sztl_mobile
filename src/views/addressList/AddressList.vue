<template>
<div class="AddressList">
    
    <main>
        <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        :switchable="isFrom"
        @select="selectAddress"
        @add="onAdd"
        @edit="onEdit">
        {{getAddressList}}
        </van-address-list>
    </main>
    
</div>
</template>
    
<script>
import {mapState,mapMutations} from "vuex"    
export default {
    name:"AddressList",
    data(){return{
        chosenAddressId: '',
        addressList:[],
    }},
    computed: {
        ...mapState(["userData"]),
        getAddressList(){
            if(this.userData.id || this.userData.name){
                this.userData.addressList.forEach(item=>{
                    const {id,name,mobile,province,city,country,detail} = item
                    const address = `${province}${city}${country}${detail}`
                    this.addressList.push({
                        id,name,
                        tel:mobile,
                        address,
                        isDefault:item.default
                    })
                })
            }
            // console.log(this.addressList)
        },
        //决定是否可以切换
        isFrom(){
            // ture--orderConfirm    false--my
            if(!!this.$route.query.from){
                return Boolean( this.$route.query.from.indexOf("orderConfirm")>=0 )
            }
        }
    },
    methods:{
        ...mapMutations(["changeSelectAddress"]),
        //选择收货地址
        selectAddress(item){
            this.changeSelectAddress(item)
            this.$router.back()
        },
        //新增地址
        onAdd(){
            this.$router.push({
                path:"/addressEdit",
                query:{
                    adrId:0
                }
            })
        },
        //编辑地址
        onEdit(addressItem){
            this.addressList.forEach(item=>{
                if(addressItem.id === item.id){
                    this.$router.push({
                        path:"/addressEdit",
                        query:{
                            adrId:item.id
                        }
                    })
                }
            })
            
        },
    },
}
    
</script>
<style scoped lang="scss">
    main{
        height: calc(100vh - 14.3928035982009vh);
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }
</style>