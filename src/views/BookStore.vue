<template>
  <div id="appstyle" >

    <div id="search1">
      <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
        <template slot="prepend">搜索书籍</template>
        <el-button slot="append" icon="el-icon-search" @click="getbook"></el-button>
      </el-input>
    </div>


      <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%">
        <el-table-column
            prop="Searchbookname"
            label="书名"
            width="400px">
        </el-table-column>
        <el-table-column
            prop="Searchbooknewpage"
            label="最新章节"
            width="500px">
        </el-table-column>
        <el-table-column
            prop="Searchbookauthor"
            label="作者">
        </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
            size="mini"
            @click="handleDelete(scope.$index,scope.row)">加入书架</el-button>
      </template>
    </el-table-column>

    </el-table>


  </div>
</template>

<script>
export default {
  name: "BookStore",
  data(){
    return{
      input:'',
      tableData:[],
      loading:false,
       //vueserver:'http://localhost:8181/book'
      //vueserver:'http://47.107.85.69:8181/book'
    }
  },
  methods:{
    getbook(){
      this.loading = true
      const _this = this
      var inputname = {"name":this.input}
      _this.$axios.post(_this.$store.state.vueserver+'/searchbook',inputname).then(function (resp) {
        _this.loading = false
        _this.tableData = resp.data;
      })
    },
    handleDelete(index,row){
      const _this = this
      if(window.sessionStorage.getItem("token") != null){
        //用户已经登录
        var bookin = {"token":window.sessionStorage.getItem("token"),"bookname":row.Searchbookname,"bookauthor":row.Searchbookauthor,"bookoneurl":row.Searchbookoneurl}
        _this.$axios.post(_this.$store.state.vueserver+'/postbooktobooks',bookin).then(function (resp){
          if(resp.data == 0){
            _this.$message({
              type: 'info',
              message: '错误的用户！！！'
            });
          }else{
            _this.$message({
              type: 'success',
              message: '加入成功'
            });
          }
        })
      }else{
        _this.$message({
          type: 'info',
          message: '当前未登录'
        });
      }
    }
  }
}
</script>

<style scoped>
#appstyle {
  z-index: 1;
  padding-top: 20px;
}
#search1{
  margin-bottom: 12px;
}


</style>
