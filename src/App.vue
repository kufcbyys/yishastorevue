<template>
    <div id="nav">
      <el-menu :default-active="activeIndex" router class="el-menu-demo" mode="horizontal">
        <el-menu-item index="/login">个人中心</el-menu-item>
        <el-menu-item index="/yourBooks">书架</el-menu-item>
        <el-menu-item index="/">书城</el-menu-item>
      </el-menu>
      <router-view/>
    </div>
</template>

<script>


export default {
  name: 'App',
  data() {
    return {
      activeIndex: this.$route.path
    };
  },
  methods: {

  }

}
</script>

<style>
#nav {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  z-index: 20;
}

</style>
