<template>
  <div class="app-container">
    <div style="width:1050px">
      <el-table :data="list" border style="100%">
        <el-table-column label="钱包" align="center">
          <el-table-column center="true" prop="date" label="日期" width="120px" sortable/>
          <el-table-column prop="color" label="颜色" width="100px"/>
          <el-table-column prop="include" label="包含物品" width="100px"/>
          <el-table-column prop="descript" label="描述" width/>
          <el-table-column prop="stateName" label="状态" width="100px"/>
          <el-table-column prop="publicer" label="发布人" width="100px"/>
          <el-table-column label="操作" width="150px">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <!-- 编辑弹出框 -->
    <el-dialog :visible.sync="editVisible" title="编辑" width="40%">
      <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            style="width: 100%;"
          />
        </el-form-item>
        <el-form-item label="颜色">
          <el-input v-model="form.color"/>
        </el-form-item>
        <el-form-item label="包含物品">
          <el-input v-model="form.include"/>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.descript" type="textarea"/>
        </el-form-item>
        <el-form-item label="图片">
          <img
            :style="divStyle"
            :src="imageUrl || baseImageUrl + form.image"
            class="imgStyle"
            @mouseenter="mouseEnter"
            @mouseleave="mouseLeave"
            @click="selectFile"
            v-text="changeWord"
          >
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.state">
            <el-radio :label="0">进行中</el-radio>
            <el-radio :label="1">完成</el-radio>
            <el-radio :label="2">失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发布人">
          <el-input v-model="form.publicer" :disabled="true"/>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>

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
import { getFoundWallet, getLostWallet } from "@/api/getList";
import { deletefoundWallet, deletelostWallet } from "@/api/deleteList";
import axios from "axios";
import { Message } from "element-ui";
import store from "@/store";

export default {
  data() {
    return {
      list: [],
      editVisible: false,
      delVisible: false,
      uploadVisible: false,
      form: {
        date: "",
        color: "",
        include: "",
        descript: "",
        image: "",
        state: "",
        publicer: "",
        id: ""
      },
      firstStyle: {},
      divStyle: {
        backgroundImage: "",
        opacity: 1
      },
      dialogImageUrl:
        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
      changeWord: "",
      imageUrl: "",
      fileUrl: "",
      fileData: "",
      fileName: "",
      rowIndex: -1,
      baseImageUrl: store.getters.baseImageUrl,
      stateList: ["进行中", "完成", "失败"]
    };
  },
  props: {
    message: String
  },
  mounted() {
    this["Get" + this.message + "Wallet"]();
  },
  watch: {},
  methods: {
    GetfoundWallet: function() {
      new Promise((resolve, reject) => {
        getFoundWallet()
          .then(response => {
            console.log(response.data.list);
            this.list = response.data.list;
            for (var i = 0; i < this.list.length; i++) {
              this.list[i].stateName = this.stateList[this.list[i].state];
              this.list[i].date = this.list[i].date.substr(0, 10);
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    GetlostWallet: function() {
      new Promise((resolve, reject) => {
        getLostWallet()
          .then(response => {
            console.log(response.data.list);
            this.list = response.data.list;
            for (var i = 0; i < this.list.length; i++) {
              this.list[i].stateName = this.stateList[this.list[i].state];
              this.list[i].date = this.list[i].date.substr(0, 10);
            }
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    handleEdit: function(index, row) {
      this.form.date = row.date;
      this.form.color = row.color;
      this.form.include = row.include;
      this.form.publicer = row.publicer;
      this.form.descript = row.descript;
      this.form.state = row.state;
      this.form.image = row.image;
      this.form.id = this.list[index].id;
      (this.imageUrl = ""), (this.editVisible = true);
    },
    handleDelete: function(index, row) {
      this.delVisible = true;
      this.rowIndex = index;
      console.log(this.rowIndex);
    },
    // 编辑确定
    saveEdit: function() {
      if (this.form.id !== -1) {
        let formData = new FormData();
        formData.append("id", this.form.id);
        formData.append("file", this.fileData, this.fileName);
        formData.append("color", this.form.color);
        formData.append("include", this.form.include);
        formData.append("descript", this.form.descript);
        formData.append("date", this.form.date);
        formData.append("state", this.form.state);
        formData.append("publicer", this.form.publicer);
        axios
          .post(
            process.env.BASE_API + "/wallet/" + this.message + "/edit",
            formData,
            { header: "multipart/form-data" }
          )
          .then(res => {
            Message.success("添加成功");
            this["Get" + this.message + "Wallet"]();
            this.editVisible = false;
            console.log("添加成功");
          })
          .catch(err => {
            Message.error("添加失败");
          });
      } else {
        let formData = new FormData();
        formData.append("file", this.fileData, this.fileName);
        formData.append("color", this.form.color);
        formData.append("include", this.form.include);
        formData.append("descript", this.form.descript);
        formData.append("date", this.form.date);
        formData.append("state", this.form.state);
        formData.append("publicer", this.form.publicer);
        axios
          .post(
            "/wallet/" + this.message + "/add",
            formData,
            { header: "multipart/form-data" }
          )
          .then(res => {
            Message.success("添加成功");
            this["Get" + this.message + "Wallet"]();
            this.editVisible = false;
            console.log("添加成功");
          })
          .catch(err => {
            Message.error("添加失败");
          });
      }
    },
    deleteRow: function() {
      new Promise((resolve, reject) => {
        console.log("id" + this.list[this.rowIndex].id);
        if (this.message === "found") {
          deletefoundWallet(this.list[this.rowIndex].id)
            .then(response => {
              this.delVisible = false;
              console.log(response.data);
              Message.success("删除成功");
              this["Get" + this.message + "Wallet"]();
              resolve();
            })
            .catch(error => {
              this.delVisible = false;
              reject(error);
              Message.error("删除失败");
            });
        } else {
          deletelostWallet(this.list[this.rowIndex].id)
            .then(response => {
              console.log(response.data);
              Message.success("删除成功");
              this["Get" + this.message + "Wallet"]();
              this.delVisible = false;
              resolve();
            })
            .catch(error => {
              this.delVisible = false;
              reject(error);
              Message.error("删除失败");
            });
        }
      });
    },
    mouseEnter: function() {
      this.changeWord = "更换图片";
      this.divStyle.opacity = 0.4;
    },
    mouseLeave: function() {
      this.changeWord = "";
      this.divStyle.opacity = 1;
    },
    // 选择文件
    selectFile() {
      /* 用直接在dom中写死一个input标签，定义change事件的方法会导致当用户下一次打开窗口选择跟上一次的文件一样时会没有反应，因为change事件是当input的值有变化时才会触发*/
      // document.getElementById("file").addEventListener("change",this.getFile);
      // // 点击file类型的input打开系统窗口，选择文件后则调用input的click事件执行uploadFile()方法
      // document.getElementById("file").click();

      /* 用动态创建input标签的方法可以有效解决上述问题*/
      // 创建input标签
      var inputObj = document.createElement("input");
      // 设置属性
      inputObj.setAttribute("id", "file");
      inputObj.setAttribute("type", "file");
      inputObj.setAttribute("style", "visibility:hidden");
      // 添加到DOM中
      document.body.appendChild(inputObj);
      // 添加事件监听器
      inputObj.addEventListener("change", this.getFile);
      // 点击file类型的input打开系统窗口，选择文件后则调用input的click事件执行uploadFile()方法
      inputObj.click();
    },
    getFile(e) {
      // 选择文件后显示加载
      // this.loading = this.$loading({
      //   lock: true,
      //   text: '上传中',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // })
      this.fileUrl = e.target.value;
      console.dir(e.target);
      this.fileData = e.target.files[0];
      this.fileName = e.target.files[0].name.split(".")[0];
      if (
        e.target.files[0].name.substr(-4, 4) === ".jpg" ||
        e.target.files[0].name.substr(-4, 4) === ".png" ||
        e.target.files[0].name.substr(-4, 4) === "jpeg"
      ) {
        // 文件不能大于300M,获取文件的size的单位是b, 1M = 1024kb; 1kb = 1024b; 1M = (1024 * 1024)b; 1G = (1024 * 1024 * 1024)b;
        if (e.target.files[0].size > 1 * Math.pow(1024, 3)) {
          console.log("文件过大", e.target.files[0].size / Math.pow(1024, 3));
          this.$alert("这是一段内容", "标题名称", {
            confirmButtonText: "确定",
            callback: action => {
              this.$message({
                type: "info",
                message: `action: ${action}`
              });
            }
          });
        } else {
          console.log("文件合格");
          let $this = this;
          let reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onload = function(e) {
            console.log(e.target.result);
            $this.imageUrl = e.target.result;
          };
        }
      } else {
        this.$alert("这是一段内容", "标题名称", {
          confirmButtonText: "确定",
          callback: action => {
            this.$message({
              type: "info",
              message: `action: ${action}`
            });
          }
        });
      }
      // 移除事件监听器
      document
        .getElementById("file")
        .removeEventListener("change", function() {});
      // 从DOM中移除input
      document.body.removeChild(document.getElementById("file"));
    },
    // 展示 添加other 界面
    showAddComponent: function() {
      console.log(6555555);
      this.form.date = new Date();
      this.form.color = "";
      this.form.include = "";
      this.form.publicer = store.getters.username;
      this.form.descript = "";
      this.form.state = 0;
      this.form.id = -1;
      this.imageUrl = this.dialogImageUrl;
      this.editVisible = true;
      console.log(this.imageUrl);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.imgStyle {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 20px;
  color: #303133;
  cursor: pointer;
}
.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .el-upload:hover {
    border-color: #409eff;
  }
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
