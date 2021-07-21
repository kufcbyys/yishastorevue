<template>
  <div>
    <Nologin v-if="showloginNologin"></Nologin>
    <Islogin v-if="showloginIslogin"></Islogin>
  </div>
</template>

<script>
import Nologin from '@/components/Nologin.vue'
import Islogin from '@/components/Islogin.vue'
export default {
  name: "Login",
  data(){
    return{
      showloginNologin:true,
      showloginIslogin:false
    }
  },
  created(){
    if(window.sessionStorage.getItem("token") !=null){
      this.showloginNologin = false
      this.showloginIslogin = true
    }else{
      this.showloginNologin = true
      this.showloginIslogin = false
    }
  },components:{
    'Nologin':Nologin,
    'Islogin':Islogin,
  },
}
</script>

<style scoped>
</style>
