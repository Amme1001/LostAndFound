<template>
  <el-form
    ref="editForm"
    :model="editForm"
    label-width="80px"
    style="width: 400px; margin-top: 30px"
  >
    <el-form-item label="名称">
      <el-input v-model="editForm.name" :disabled="editAble"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="editForm.password" :disabled="editAble" :type="pwdType"></el-input>
    </el-form-item>
    <el-form-item label="sex" prop="sex">
      <el-radio-group v-model="editForm.sex" :disabled="editAble">
        <el-radio label="男"/>
        <el-radio label="女"/>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="手机号">
      <el-input v-model="editForm.phone" :disabled="editAble"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="turnTo" v-if="editAble">修改</el-button>
      <el-button type="primary" @click="editMessage" v-if="!editAble">确定</el-button>
      <el-button v-if="!editAble" @click="turnToTrue">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import store from "@/store";
import { getPerson, updatePerson } from "@/api/person";
import { Message } from 'element-ui'

export default {
  name: "HomePage",
  data() {
    return {
      editForm: {},
      editAble: true,
      pwdType: 'password'
    };
  },
  methods: {
    // 获取信息
    GetPerson() {
      new Promise((resolve, reject) => {
        getPerson(store.getters.username)
          .then(response => {
            this.editForm = response.data.data;
            console.log(this.editForm);
            resolve();
          })
          .catch(error => {
            console.log("shiwu");
            reject(error);
          });
      });
    },
    // 编辑信息
    editMessage() {
      console.log(this.editForm);
      new Promise((resolve, reject) => {
        updatePerson(
          this.editForm.id,
          this.editForm.name,
          this.editForm.password,
          this.editForm.sex,
          this.editForm.phone,
          this.editForm.permission,
          this.editForm.state
        )
          .then(Response => {
            Message.success("编辑成功");
            this.editAble = true;
            this.pwdType = 'password'
            this.GetPerson();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    turnTo() {
      this.editAble = false;
      this.pwdType = 'text'
    },
    turnToTrue() {
      this.editAble = true;
      this.pwdType = 'password'
      this.GetPerson();
    },
    edit() {
      this.editVisable = true;
      this.editform = this.item;
    }
  },
  mounted() {
    this.GetPerson();
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.homepage {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
