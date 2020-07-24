const mix = {
    data(){return{
        backFlag:false
    }},
    methods:{
        mainScroll(){
            console.log(2222)
            if(this.$refs.main.scrollTop >= 1500 ){
                this.backFlag = true
            }else{
                this.backFlag = false
            }
        },
        // 返回顶部
        backTopClick(){
            this.$refs.main.scrollTop = 0
        },
    },  
}
export default mix