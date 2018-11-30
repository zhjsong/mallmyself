<template>
  <el-container class="container">
  <el-header class="header">
   <el-row class="header-row">
  <el-col :span="4">
      <div class="grid-content bg-purple">
          <img src="../../assets/logo.png" alt="图片无法显示">
      </div>
  </el-col>
  <el-col :span="19" class="middle">
      <div class="grid-content bg-purple-light">
          <h3>电商后台管理系统</h3>
    </div>
    </el-col>
  <el-col :span="1">
      <div class="grid-content bg-purple">
          <a href="#" class="loginout" @click.prevent="handlelogout()">退出</a>
      </div>
      </el-col>
   </el-row>
  </el-header>
  <el-container>
    <el-aside width="200px" class="aside">
   <el-menu class="el-menu-vertical-demo" :unique-opened="true" :router="true">

      <el-submenu :index="''+item1.order" v-for='(item1,i) in menus' :key='i'>
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{item1.authName}}</span>
        </template>

          <el-menu-item :index="item2.path" v-for='(item2,i) in item1.children' :key='i'>
            <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{item2.authName}}</span>
        </template>
        </el-menu-item>
        </el-submenu>

    </el-menu>

    </el-aside>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
    data(){
      return {
        menus:[]
      }
    },
//   在组件渲染之前判断有没有token
  beforeCreate () {
    const token = localStorage.getItem('token')
    //    如果token不存在
    if (!token) {
      this.$router.push({name: 'login'})
    }
  },
  mounted(){
      this.getMenu()
  },

  
  methods: {
      // 获取侧边栏的数据
      async getMenu(){
         const res=await this.$http.get('menus')
         console.log(res)
         this.menus=res.data.data
      },

    handlelogout () {
      //    1.提示
      this.$message.success('退出成功')
      // 2.清除
      localStorage.clear()
      // 3.回到首页
      this.$router.push({name: 'login'})
    }
  }
}
</script>

<style>
.container {
height: 100%;
}
.header {
background-color: #b3c0d1;
}
.aside {
 background-color: #d3dce6;
}
.main {
  background-color: #e9eef3;
  height: 100%;
}
/* 头部调整 */
.middle {
    text-align: center;
}
.loginout {

    text-decoration: none;
    line-height: 60px;

}
</style>
