<template>
  <div id="loginpage">
    <div id="inputpage">
      <a>登录</a>
      <el-input placeholder="请输入内容" v-model="loginForm.username">
        <template slot="prepend">用户</template>
      </el-input>
      <el-input placeholder="请输入内容" v-model="loginForm.password">
        <template slot="prepend">密码</template>
      </el-input>
      <el-button plain @click="register" >注册</el-button>
      <el-button type="primary"  @click="login" plain>登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Nologin',
  data(){
    return {
      loginForm: {
        username: '',
        password: ''
      },
      usertoken:'',
      //vueserver:'http://47.107.85.69:8181/book'
       //vueserver:'http://localhost:8181/book'
    }
  },
  methods:{
    register(){
      if(this.loginForm.username =='' || this.loginForm.password ==''){
        this.$alert('用户或密码都不能为空!','提示',{
          confirmButtonText:'确定',
          callback : action => {
            this.$message({
              type:'info',
              message:`请输入账户或密码`
            });
          }
        });
      }else{
        var usname = {"username":this.loginForm.username,"userpassword":this.loginForm.password}
        this.$axios.post(this.$store.state.vueserver+'/ishaveuser',usname).then(resp =>{
          if(resp.data.respcode == 0){
            this.$message({
              type:'info',
              message:`注册失败`
            });
          }else{
            this.$message({
              type:'success',
              message:`注册成功`
            });
          }
        }).catch(function (err){
          console.log("err"+err)
        })
      }
    },
    login(){
      if(this.loginForm.username =='' || this.loginForm.password ==''){
        this.$alert('用户或密码都不能为空!','提示',{
          confirmButtonText:'确定',
          callback : action => {
            this.$message({
              type:'info',
              message:`请输入账户或密码`
            });
          }
        });
      }else{
        var usname = {"username":this.loginForm.username,"userpassword":this.loginForm.password}
        this.$axios.post(this.$store.state.vueserver+'/userlogin',usname).then(resp =>{

          if(resp.data.respcode == 1){
            window.sessionStorage.setItem("token", resp.data.token);
            this.$message({
              type:'success',
              message:`登录成功`
            });
            //刷新界面
            location.reload();
          }else{
            this.$message({
              type:'info',
              message:`没有这个用户`
            });
          }
        }).catch(function (err){
          console.log("err"+err)
        })
      }
    }
  },
}
</script>

<style scoped>
#loginpage{
  z-index: 1;
  padding-top: 60px;
}
#inputpage{
  width: 30%;
  position: absolute;
  left: 32%;
  top: 30%;
  padding: 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
}
#inputpage .el-input{
  margin-bottom: 20px;
  margin-top: 10px;
}
#inputpage .el-button{
  margin-top: 10px;
  width: 47%;
}

</style>
