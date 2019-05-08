<template>
  <div class="app-container">
    <div style="width:950px; margin:0 30px 30px 30px">
      <el-table :data="showList" border style="width: 100%">
        <el-table-column label="评论列表" align="center">
          <el-table-column prop="id" label="评论id" width="100px" sortable/>
          <el-table-column prop="time" label="评论时间" width="170px" sortable/>
          <el-table-column prop="publicer" label="评论人" width="70px"/>
          <el-table-column prop="mid" label="被评论id" width="80px"/>
          <el-table-column prop="message" label="评论信息" width/>
          <el-table-column prop="type" label="招领或失物" width="95px"/>
          <el-table-column prop="ptype" label="物品类型" width="90px"/>
          <el-table-column prop="pid" label="物品id" width="90px"/>
          <el-table-column label="操作" width="150px">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="currentChange"
        layout="prev, pager, next"
        :total="commentList.length">
      </el-pagination>
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
import { getAllComment, deleteComment } from "@/api/comment";
import { Message } from "element-ui";

export default {
  data() {
    return {
      commentList: [],
      delVisible: false,
      stateName: ["禁用", "正常"],
      currentId: Number,
      showList: [],
      currentPage: 1
    };
  },
  mounted() {
    this.GetComment();
  },
  methods: {
    //获取评论
    GetComment: function() {
      new Promise((resolve, reject) => {
        getAllComment()
          .then(response => {
            this.commentList = response.data.list;
            for (var i = 0; i < this.commentList.length; i++) {
              var time = this.commentList[i].time;
              this.commentList[i].time =
                time.substr(0, 10) + " " + time.substr(11, 8);
              this.commentList[i].mid = this.commentList[i].mid || "无"
            }
            this.getShowList()
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    handleDelete: function(index, row) {
      this.delVisible = true;
      this.currentId = row.id;
    },
    deleteRow: function() {
      console.log(this.currentId);
      new Promise((resolve, reject) => {
        deleteComment(this.currentId)
          .then(response => {
            Message.success("删除成功");
            this.delVisible = false;
            this.GetComment();
            resolve();
          })
          .catch(error => {
            Message.error("删除失败");
            this.delVisible = false;
            this.GetComment();
            reject(error);
          });
      });
    },
    getShowList: function() {
      this.showList = []
      let length = this.currentPage * 10
      if(length >= this.commentList.length ) {
        length = this.commentList.length
      }
      for(let i = 10 * (this.currentPage -1); i< length; i++){
        this.showList.push(this.commentList[i])
      }
    },
    currentChange: function(value) {
      this.currentPage = value
      this.GetComment()
    }
  }
};
</script>

