<template>
  <el-card class="box-card">
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="searchRom">
      <el-col :span='16'>
    <el-input @clear="loadUser()" clearable placeholder="请输入姓名" v-model="query"  class="searchInput">
    <el-button @click='searchUser()' slot="append" icon="el-icon-search"></el-button>
   </el-input>
       <el-button type="success" @click="showAdd()">添加用户</el-button>
        </el-col>
  </el-row>
    <!-- 表格 -->
    <el-table
      :data="userlist"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#"
        width="80">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="100">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱">
      </el-table-column>
        <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
        <el-table-column
        label="创建日期">
        <template slot-scope="userlist">
            {{userlist.row.create_time | fmtdata}}
        </template>
      </el-table-column>
        <el-table-column
        label="用户状态">
        <template slot-scope="scope">
            <!-- 非字符串要用容器包裹 -->
            <el-switch
              @change='messtatus(scope.row)'
               v-model="scope.row.mg_state"
               active-color="#13ce66"
               inactive-color="#ff4949">
            </el-switch>
        </template>
      </el-table-column>
          <el-table-column
        label="操作">
        <template slot-scope="scope">
             <el-button @click='editUser(scope.row)' size='mini' plain type="primary" icon="el-icon-edit" circle></el-button>
             <el-button @click='del(scope.row.id)' size='mini' plain type="danger" icon="el-icon-delete" circle></el-button>
             <el-button @click='setRole(scope.row)' size='mini' plain type="success" icon="el-icon-check" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- 添加 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
  <el-form :model="form">
    <el-form-item label="用户名称" label-width="100px">
      <el-input v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="密码" label-width="100px">
      <el-input v-model="form.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" label-width="100px">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" label-width="100px">
      <el-input v-model="form.mobile" autocomplete="off"></el-input>
    </el-form-item>
  
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
    <el-button type="primary" @click="addUser()">确 定</el-button>
  </div>
</el-dialog>
<!-- 编辑 -->
 <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
  <el-form :model="form">
    <el-form-item label="用户名称" label-width="100px">
      <el-input  v-model="form.username" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" label-width="100px">
      <el-input v-model="form.email" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" label-width="100px">
      <el-input v-model="form.mobile" autocomplete="off"></el-input>
    </el-form-item>
  
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
    <el-button type="primary" @click="editPut()">确 定</el-button>
  </div>
</el-dialog>

  <!-- 角色选择 -->
  <el-dialog title="角色分配" :visible.sync="dialogFormVisibleRole">
  <el-form :model="form">
    <el-form-item label="用户名" label-width="100px">   
        {{currentname}}
    </el-form-item>
    <el-form-item label="角色" label-width="100px">
      <el-select v-model="crrRole" placeholder="角色名称">
        <el-option label="请选择" :value="-1"></el-option>
        <el-option v-for="(item,index) in roles" :key="index" :label="item.roleName" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
    <el-button type="primary" @click="setRoleId()">确 定</el-button>
  </div>
</el-dialog>
  </el-card>
</template>

<script>
export default {
   data(){
       return {
           query:"",
           userlist:[
               {
                  create_time: "",
                  email: "",
                  id: "",
                  mg_state:"",
                  mobile: "",
                  role_name:"",
                  username:""
               }
           ],
           pagenum:1,
           pagesize:2,
           total:-1,
          //  对话框
          dialogFormVisibleAdd:false,
          // 编辑对话框
          dialogFormVisibleEdit:false,
          // 角色对话框
          dialogFormVisibleRole:false,
          form:{
            username:'',
            password:'',
            email:'',
            mobile: ''
          },
          currentname:'',
          crrRole:-1,
          roles:[],
          // 当前用户的id
          crrRoleID:-1
       }   
   },
   created(){
       this.getUserList()
   },
   methods:{  
    //  点击确定按钮发送请求
     async setRoleId(){
         const res=await this.$http.put(`users/${this.crrRoleID}/role`,{
            rid:this.crrRole        
         })
         this.dialogFormVisibleRole = false
      },
      // 角色分配
     async setRole(user){
         this.crrRoleID=user.id
        this.currentname=user.username
         //  获取角色的全部值
         const res=await this.$http.get(`roles`)
         this.roles=res.data.data
           this.dialogFormVisibleRole=true
          //  获取角色的id值
          const res1=await this.$http.get(`users/${user.id}`)
          this.crrRole=res1.data.data.rid
      },

    //  状态
     async messtatus(user){
      const res= await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
    },
    //  编辑--发送请求
    async editPut(){
      const res=await this.$http.put(`users/${this.form.id}`,this.form)
      console.log(res)
       const {
         meta:{msg,status},data
       }=res.data
       if(status===200) {
          this.getUserList()
          this.dialogFormVisibleEdit=false
          this.$message.success(msg)
       }else {
            this.$message.warning(msg)
       }     
    },
    //  编辑
    editUser(UserID){
       this.form = UserID
      this.dialogFormVisibleEdit=true
    },
    //  删除
    del(userId){
        this.$confirm('是否删除该数据', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // 发送删除请求
         const res=await this.$http.delete(`users/${userId}`)
         this.getUserList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })         
        })
    },
    //  添加
   async addUser(){
     const res=await this.$http.post('users',this.form)
     console.log(res)
     const {
       meta:{status,msg},data
     }=res.data
     if(status===201){
       this.dialogFormVisibleAdd=false
       this.$message.success(msg)
       this.getUserList()
      //  清空input
      this.form={}
     }else {
       this.$message.warning(msg)
     }
    },
    showAdd(){
       this.dialogFormVisibleAdd=true
    },
    //    搜索
    loadUser(){
      this.getUserList()
    },
    searchUser(){
      this.pagenum=1
      this.getUserList()
    },
    //    分页
     handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
           this.pagesize=val
           this.pagenum=1
        this.getUserList()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.pagenum=val
        this.getUserList()
      },
    async getUserList(){
          const AUTH_TOKEN=localStorage.getItem('token')
          this.$http.defaults.headers.common['Authorization']=AUTH_TOKEN
          const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
            console.log(res)
            const {meta:{msg,status},data:{total,users}}=res.data
             if(status===200){
                 this.total=total
                 this.userlist=users
                 this.$message.success(msg)
             }else {
                 this.$message.warning(msg)
             }

       }
        
   }
}
</script>

<style>
.searchRom {
    margin-top: 20px;
}
.searchInput {
     width:300px;
}
</style>
