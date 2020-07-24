<template>
<div class="AddressEdit">
    
    <van-address-edit
    :area-list="areaList"
    :address-info="AddressInfo"
    :show-delete="isAddEdit"
    show-set-default
    show-search-result
    :search-result="searchResult"
    :area-columns-placeholder="['请选择', '请选择', '请选择']"
    @save="onSave"
    @delete="onDelete"
    >
    {{addORedit}}
    </van-address-edit>
</div>
</template>
    
<script>
import {reqAreaList,reqAddAddress,reqEditAddress,reqDeleteAddress} from 'network/api';
import {mapState,mapMutations} from "vuex"
export default {
    name:"AddressEdit",
    data(){return{
        searchResult: [],
        //请求回来的省市县列表 1
        areaList:{},
        //初始值 2
        AddressInfo:{}
    }},
    methods:{
        ...mapMutations(["addOReditAddress"]),
        // 新增收货地址请求
        async addAddress(addrData){
            const result = await reqAddAddress(addrData)
            if(result.errcode === 0){
                this.$toast({
                    message:"新增地址成功",
                    duration:800
                })
                this.addOReditAddress(result.data)
                this.$router.back()
            }
        },
        // 修改收货地址请求
        async editAddress(id,addrData){
            const result = await reqEditAddress(id,addrData)
            if(result.errcode === 0){
                this.$toast({
                    message:"修改成功",
                    duration:800
                })
                addrData.id = id 
                this.addOReditAddress(addrData)
                this.$router.back()
            }
        },
        // 删除收货地址请求
        async deleteAddress(id){
            const result = await reqDeleteAddress(id)
            if(result.errcode === 0){
                this.$toast({
                    message:"删除成功",
                    duration:800
                })
                console.log(id)
                this.addOReditAddress(id)
                this.$router.back()
            }
        },
        //保存
        onSave(content){
            // console.log(content)

            //解析所需数据
            const {id,name,province,city,county,addressDetail,tel,areaCode,isDefault} = content

            const addressInfo = {
                name,province,city,
                country:county,
                detail:addressDetail,
                mobile:tel,
                code:areaCode,
                default:Number(isDefault)
            }

            if(this.isAddEdit){ //修改
                this.editAddress(id,addressInfo)
            }else{ //新增
                this.addAddress(addressInfo)
            }
        },
        //删除
        onDelete(content){
            const {id} = content
            this.deleteAddress(id)
        },
        //获取省市县列表 1
        async getAreaList(){
            const result = await reqAreaList()
            if(result.errcode === 0){
                this.areaList = result.data
            }
        },
    },
    computed: {
        ...mapState(["userData"]),
        //判断是 新增(false) 还是 修改(true) 2
        isAddEdit(){
            return Boolean(this.$route.query.adrId>0)
        },
        // 渲染初始值 2
        addORedit(){
            if(this.userData.id || this.userData.name){
                this.userData.addressList.forEach(item=>{
                    if(item.id == this.$route.query.adrId){
                        // console.log(item)
                        const {id,name,mobile,province,city,country,detail} = item
                        this.AddressInfo = {
                            id,name,
                            tel:mobile,
                            province,city,
                            county:country,
                            addressDetail:detail,
                            isDefault:Boolean(item.default)
                        }

                    }
                })
            }
        }
    },
    created(){
        this.getAreaList() // 1
    }
}
    
</script>
<style scoped lang="scss">
    
</style>