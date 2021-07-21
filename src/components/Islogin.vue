<template>
  <div id="isloginpageshow">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-delete" @click.native="deleteuser">注销账户</el-dropdown-item>
              </el-dropdown-menu>
        </el-dropdown>
        <el-button style="float: right; padding: 3px 0" type="text" @click="deletetoken">退出账户</el-button>
      </div>
      <p>欢迎！ {{this.usname}}</p>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Islogin',
  data(){
    return{
      usname: ''
    }
  },
  created(){
    var len = window.sessionStorage.getItem("token").length
    this.usname = window.sessionStorage.getItem("token").substring(32,len)
  },
  methods:{
    deletetoken(){
      this.$confirm('是否退出账户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        sessionStorage.removeItem("token");
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
        //刷新界面
        location.reload();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        });
      });
    },
    deleteuser(){
      const h = this.$createElement;
      const _this = this
      this.$confirm('是否注销账户? 将删除账户以及书架记录!!!', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        var token = {"token":window.sessionStorage.getItem("token")}
        _this.$axios.post(_this.$store.state.vueserver+"/deleteuser",token)
        sessionStorage.removeItem("token");
        _this.$notify({
          title: '消息通知',
          message: h('i', { style: 'color: red'}, '注销成功')
        });
        //刷新界面
        location.reload();
      }).catch(() => {
        _this.$notify({
          title: '消息通知',
          message: h('i', { style: 'color: teal'}, '已经取消注销')
        });
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#isloginpageshow{
  z-index: 1;
  padding-top: 60px;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
  margin-left: 34%;
  text-align: left;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}

</style>
