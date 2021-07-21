<template>
  <div id="ybooks">
    <el-row :gutter="20">
      <el-col :span="3" v-for="ybook in ybooks" :key="ybook.shelfid">
        <el-card>
          <img :src=ybook.bookcover class="image" @click="readbook(ybook.bookoneurl,ybook.bookname)">
          <div style="padding: 14px;">
            <span>{{ ybook.bookname }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ ybook.bookauthor}}</time>
              <el-button type="text" class="button" @click="deletebook(ybook.bookname)">删除</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
export default {
  name: "YourBooks",
  data(){
    return{
      url:'https://www.xbiquge.la/files/article/image/13/13959/13959s.jpg',
      ybooks:[

      ],
    };
  },
  methods:{
    deletebook(userybook){
      this.$confirm('此操作将从书架中移除这本书, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var delename = userybook
        var deteledata = {"token":window.sessionStorage.getItem("token"),"bookname":delename}
        this.$axios.post(this.$store.state.vueserver+'/deleteuserbook',deteledata).then(() =>{

        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
        //刷新界面
        location.reload();
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    readbook(urlbook,booknameop){
      this.$router.push({name:"ReadBook",params:{url:urlbook,bkname:booknameop}})
    }
  },
  created() {
    const  _this = this
    const h = this.$createElement;
    var usernametoken = window.sessionStorage.getItem("token");
    if(usernametoken != null){
      var username = {"username":usernametoken}
      _this.$axios.post(_this.$store.state.vueserver+'/findoneuserbooks',username).then(function (resp){
        if(resp.data[0] == null){
          _this.$message({
            type: 'info',
            message: '用户书架无书籍'
          });
        }else{
          if(resp.data[0].shelfid == -2){
            _this.$message({
              type: 'info',
              message: '过期用户！！！'
            });
            window.sessionStorage.removeItem("token");
            location.reload();
          }
          if(resp.data[0].shelfid == -1){
            _this.$message({
              type: 'info',
              message: '错误的用户！！！'
            });
          }else{
            _this.ybooks = resp.data;
          }
        }
      })
    }else{
      _this.$notify({
        title: '消息通知',
        message: h('i', { style: 'color: teal'}, '未登录，书架无法显示书籍')
      });
    }
  }
}
</script>

<style scoped>
#ybooks{
  z-index: 1;
  padding-top: 60px;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
/*.el-main{*/
/*  font-size: 12px;*/
/*  text-align: left;*/
/*}*/
/*!*布局*!*/
/*.el-row {*/
/*  margin-bottom: 20px;*/
/*&:last-child {*/
/*   margin-bottom: 0px;*/
/* }*/
/*}*/
/*.el-col {*/
/*  border-radius: 4px;*/
/*  margin-bottom: 20px;*/
/*}*/
/*.el-container{*/
/*  background: antiquewhite;*/
/*}*/
/*.grid-content {*/
/*  border-radius: 4px;*/
/*  min-height: 36px;*/
/*}*/
/*.row-bg {*/
/*  padding: 10px 0;*/
/*  background-color: #f9fafc;*/
/*}*/
</style>
