<template>
  <div id="read">
    <div id="readheader">
      <el-page-header @back="goBack" content="阅读界面">
      </el-page-header>
      <el-button-group>
        <el-button type="primary" icon="el-icon-arrow-left" @click="backone">上一章</el-button>
        <el-button type="primary">目录</el-button>
        <el-button type="primary" @click="nextpage">下一章<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </el-button-group>
    </div>
    <div v-loading="loading" v-html="allbook">
    </div>
  </div>

</template>

<script>
export default {
  name: 'ReadBook',
  data(){
    return{
      allbook:'',
      loading:false,
    }
  },
  props: {
    //url:String
  },
  methods:{
    goBack(){
      window.sessionStorage.removeItem("booknowurl");
      window.sessionStorage.removeItem("bookname");
      this.$router.back()
    },
    nextpage(){
      var _this = this
      var len = window.sessionStorage.getItem("token").length
      var usname = window.sessionStorage.getItem("token").substring(32,len)
      var bkname = window.sessionStorage.getItem("bookname")
      var url = {"url":window.sessionStorage.getItem("booknowurl"),"username":usname,"bookname":bkname}
      this.$axios.post(_this.$store.state.vueserver+"/havenextpage",url).then(function (resp){
        _this.allbook = resp.data.bookshow
        window.sessionStorage.setItem("booknowurl",resp.data.nowurl)
      })
    },
    backone(){
      var _this = this
      var len = window.sessionStorage.getItem("token").length
      var usname = window.sessionStorage.getItem("token").substring(32,len)
      var bkname = window.sessionStorage.getItem("bookname")
      var url = {"url":window.sessionStorage.getItem("booknowurl"),"username":usname,"bookname":bkname}
      this.$axios.post(_this.$store.state.vueserver+"/bakconepage",url).then(function (resp){
        _this.allbook = resp.data.bookshow
        window.sessionStorage.setItem("booknowurl",resp.data.nowurl)
      })

    }
  },
  created(){
    this.loading = true
    const  _this = this
    if(this.$route.params.url != null ){
      window.sessionStorage.setItem("booknowurl",this.$route.params.url)
      window.sessionStorage.setItem("bookname",this.$route.params.bkname)
    }
    var url = {"url":window.sessionStorage.getItem("booknowurl")}
    this.$axios.post(_this.$store.state.vueserver+"/readbook",url).then(function (resp){
      _this.allbook = resp.data
      _this.loading = false
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#readheader{
  position: fixed;
  width: 100%;
  top: 0;
  height: 70px;
  z-index: 30;
  background: white;
  /*position: absolute;*/
  /*top: 12px;*/
  /*z-index: 30;*/
  /*background: white;*/
  /*width: 100%;*/
}
#readheader .el-page-header{
  margin-top: 6px;
}
#readheader .el-button{
  margin-right: 12px;
}
</style>
