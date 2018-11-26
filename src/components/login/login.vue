<template>
    <div class="login-wrap">
      <el-form 
      class="login-form"
      label-position="top" 
      label-width="80px" 
      :model="formdata">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
      <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
      <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button type="primary" class="login-btn">登录按钮</el-button>
</el-form>
    </div>
</template>

<script>
export default {
     data(){
         return {
             formdata:{
                 username:'',
                 password:''
             }
         }
     }
}
</script>

<style>
.login-wrap {
    background: #324152;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-wrap .login-form{
    width: 400px;
    padding: 30px;
    border-radius: 5px;
    background: #fff;
}
.login-wrap .login-btn{
    width: 100%;
}
</style>
