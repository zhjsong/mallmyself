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
                <el-col :span='4'>
                    <el-tag closable  @close='deleRight(scope.row,item1.id)'>{{item1.authName}}</el-tag>
                     <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span='20'>
                    <el-row v-for='(item2,index) in item1.children' :key='index'>
                        <el-col :span='4'>
                            <el-tag  closable @close='deleRight(scope.row,item2.id)' type='warning'>{{item2.authName}}</el-tag>
                             <i class="el-icon-arrow-right"></i>
                        </el-col>
                         <el-col :span='20'>
                             <el-tag  closable @close='deleRight(scope.row,item3.id)' type='danger' v-for='(item3,index) in item2.children' :key='index'>{{item3.authName}}</el-tag>
                         </el-col>
                    </el-row>
                </el-col>
            </el-row>
            <!-- 判断角色的children是否为零,为零就显示未分配权限 -->
            <el-row v-if='scope.row.children.length===0'>
                <span>
                    未分配权限
                </span>
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
             <el-button @click='setRight(scope.row)' size='mini' plain type="success" icon="el-icon-check" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
<!-- 分配权限--树形结构--打开对话框 -->
     <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
           <el-tree
        ref="tree"
        :data="treelist"
        default-expand-all
        show-checkbox
        node-key="id"
        :default-checked-keys="arrcheck"
        :props="defaultProps">
        </el-tree>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleRight= false">取 消</el-button>
    <el-button type="primary" @click="setRoleRight()">确 定</el-button>
  </div>
</el-dialog>
    </el-card>
</template>

<script>
export default {
     data(){
       return {
           rolelist:[],
           dialogFormVisibleRight:false,
           treelist:[],
           defaultProps:{
               label:'authName',
               children:'children'
           },
           arrcheck:[],
           currRoleId:-1
       }
   },
   mounted(){
     this.getRoleList()
   },
   methods:{
    //    分配权限根据角色id获取权限列表并修改
    async setRoleRight(){
    //    得到全选返回的key值的数组
        let arr1=this.$refs.tree.getCheckedKeys()
        // 得到半选返回的值
        let arr2=this.$refs.tree.getHalfCheckedKeys()
        // 合并数组
        let arr=[...arr1,...arr2]
        // 发送请求修改数据
        const res=this.$http.post(`roles/${this.currRoleId}/rights`,{
            rids:arr.join(',')
        })
        this.dialogFormVisibleRight = false
        this.getRoleList()
    },
    //    树形结构--弹出层
   async setRight(role){
       this.currRoleId=role.id
        // 获取权限数据列表
        const res=await this.$http.get(`rights/tree`)
        this.treelist=res.data.data
    //   角色获取权限id
        let arr=[]
        role.children.forEach((item1)=>{
            //  arr.push(item1.id)
           item1.children.forEach((item2)=>{
            //    arr.push(item2.id)
             item2.children.forEach((item3)=>{
                 arr.push(item3.id)
             })
           })
        })
        this.arrcheck = arr
        this.dialogFormVisibleRight=true
    },
    //    删除角色权限
    async deleRight(role,rightId){
        const res=await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
        // 更新视图
        role.children=res.data.data
    },
     
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
