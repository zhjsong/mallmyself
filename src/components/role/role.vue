<template>
    <el-card class="box-card">
        <my-bread level1='权限管理' level2='角色列表'></my-bread>
        <el-row class="addbtn">
            <el-col>
                <el-button>添加角色</el-button>
            </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table
      :data="rolelist"
      style="width: 100%">
       <el-table-column
        type="expand"
        label="#"
        width="80">
        <template slot-scope="scope">
            <el-row v-for='(item1,index) in scope.row.children' :key='index'>
                <el-col>
                    <el-tag>{{item1.authName}}</el-tag>
                </el-col>
                <el-col>
                    <el-row>
                        <el-col>
                            <el-tag></el-tag>
                        </el-col>
                         <el-col>
                             <el-tag></el-tag>
                         </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        label="#"
        width="80">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="100">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述">
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
    </el-card>
</template>

<script>
export default {
     data(){
       return {
           rolelist:[]
       }
   },
   mounted(){
     this.getRoleList()
   },
   methods:{
     
      async getRoleList(){
       
        const res=await this.$http.get(`roles`)
          this.rolelist=res.data.data
        console.log(res)
       }
       
   }
}
</script>

<style>
.addbtn {
    margin-top: 20px;
}
</style>
