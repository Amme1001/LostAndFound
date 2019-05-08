<template>
  <div class="app-container" >
    <div style="width:850px; margin:30px">
      <el-table
        :data="list"
        border
        style="width: 100%">
        <el-table-column label="管理员信息" align="center">
          <el-table-column
            prop="id"
            label="id"
            width="82px"/>
          <el-table-column
            prop="name"
            label="名字"
            width="100px"/>
          <el-table-column
            prop="password"
            label="密码"
            width=""/>
          <el-table-column
            prop="sex"
            label="性别"
            width="70px"/>
          <el-table-column
            prop="phone"
            label="手机"
            width="180px"/>
          <el-table-column
            prop="stateName"
            label="状态"
            width="100px"/>
          <el-table-column
            label="操作"
            width="150px">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>

    <!-- 删除提示框 -->
    <el-dialog :visible.sync="delVisible" title="提示" width="300px" center>
      <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getPersonList } from '@/api/person'
export default {
  data() {
    return {
      list: [],
      stateName: ['禁用', '正常'],
      editForm: {},
      delVisible: false
    }
  },
  mounted() {
    this.GetPersonList()
  },
  methods: {
    GetPersonList: function() {
      new Promise((resolve, reject) => {
        getPersonList(1).then(response => {
          console.log(response.data.list)
          this.list = response.data.list
          for(var i = 0; i < this.list.length; i++){
            this.list[i].stateName = this.stateName[this.list[i].state]
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    handleEdit: function(index,row) {
      this.editForm = this.list[index]
      console.log(this.editForm)
      this.$router.push({ 
        path: '/addPerson',
        name: 'addPerson',
        query: {
          form: this.editForm
        }
      })
    },
    handleDelete: function(index, row) {
      this.delVisible = true
    },
    deleteRow: function() {
      console.log(this.currentId)
      new Promise((resolve, reject) => {
        deletePerson(this.currentId).then(response => {
          Message.success('删除成功')
          this.delVisible = false
          this.GetPersonList()
          resolve()
        }).catch(error => {
          Message.error('删除失败')
          this.delVisible = false
          this.GetPersonList()
          reject(error)
        })
      })
    }
  }
}
</script>

