<template>
  <div id="app">
    <Navbar class="Navbar"></Navbar>
    <router-view/>
  </div>
</template>
<script>
import Navbar from "components/Navbar.vue"
export default {
    name:"app",
    components:{
        Navbar
    },
}
    
</script>
<style lang="scss">
@import "assets/css/base.css";
.Navbar{
  height: 20px;
}
</style>
