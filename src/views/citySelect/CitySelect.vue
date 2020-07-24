<template>
<div class="CitySelect">
    <main>
        <van-index-bar>
            <div v-for="(value,key) in cityList.cities" :key="key" :index="key">
                <van-index-anchor :index="key" />
                <van-cell v-for="item in value" :key="item.id" :title="item.name" @click="selectClick(item)"/>
            </div>
        </van-index-bar>
    </main>
</div>
</template>
    
<script>
import {mapState,mapMutations} from 'vuex';   
export default {
    name:"CitySelect",
    computed:{
       ...mapState(["cityList"]), 
    },
    data(){return{
        
    }},
    methods:{
        ...mapMutations(["editSelectCity"]),
        selectClick(item){
            this.editSelectCity(item.name)
            this.$router.push("/home")
        }
    },

}
    
</script>
<style scoped lang="scss">
main{
    height: calc(100vh - 6.896551724137931vh);
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
</style>