<template>
  <div>
    <b-list-group v-show="!editVisable">
      <b-list-group-item>
        用户名:
        <span style="float: right;">{{ item.name }}</span>
      </b-list-group-item>
      <b-list-group-item v-if="visable">
        密码:
        <span style="float: right;">********</span>
      </b-list-group-item>
      <b-list-group-item>
        性别:
        <span style="float: right;">{{ item.sex }}</span>
      </b-list-group-item>
      <b-list-group-item>
        手机:
        <span style="float: right;">{{ item.phone }}</span>
      </b-list-group-item>
      <b-list-group-item>
        权限:
        <span style="float: right;">{{ permissionName[item.permission] }}</span>
      </b-list-group-item>
      <b-button v-if="visable" @click="edit">修改信息</b-button>
    </b-list-group>
    <b-form @submit="editMessage" class="pl-3 mt-3" v-if="editVisable">
      <b-form-group
        inline
        :label-cols="3"
        label="username:"
        label-for="register-input-name"
        label-align-md="right"
      >
        <b-form-input
          type="text"
          required
          v-model="editform.name"
          placeholder="用户名"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        inline
        :label-cols="3"
        label="password:"
        label-for="register-input-password"
        label-align-md="right"
      >
        <b-form-input
          type="password"
          required
          v-model="editform.password"
          placeholder="登陆密码"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        inline
        :label-cols="3"
        label="phone:"
        label-for="register-input-phone"
        label-align-md="right"
      >
        <b-form-input
          type="text"
          required
          v-model="editform.phone"
          placeholder="手机号码"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        :label-cols="3"
        label="sex:"
        label-align-md="right"
      >
        <b-form-radio-group
          v-model="editform.sex"
          style="padding-top:6px"
          label-align-md="right"
        >
          <b-row>
            <b-col offset="2">
              <b-form-radio value="男">男</b-form-radio>
            </b-col>
            <b-col>
              <b-form-radio value="女">女</b-form-radio>
            </b-col>
          </b-row>
        </b-form-radio-group>
      </b-form-group>
      <b-form-group>
        <p class="text-center">
          <b-button type="submit" variant="primary" lg="4">确认</b-button>
        </p>
      </b-form-group>
    </b-form>
    
  </div>
</template>

<script>
import { updatePerson, getPerson } from "@/api/person";
import store from "@/store";

export default {
  data() {
    return {
      item: {},
      permissionName: ["超级管理员", "管理员", "用户"],
      username: localStorage.getItem("username"),
      visable: false,
      editform: {},
      editVisable: false
    };
  },
  methods: {
    GetPerson() {
      new Promise((resolve, reject) => {
        getPerson(this.username)
          .then(response => {
            this.item = response.data.data;
            console.log(this.item);
            resolve();
          })
          .catch(error => {
            console.log("shiwu");
            reject(error);
          });
      });
    },
    editMessage() {
      this.editVisable = false
      new Promise((resolve, reject) => {
        updatePerson(this.editform.id, this.editform.name, this.editform.password, this.editform.sex, this.editform.phone, this.editform.permission, this.editform.state)
          .then(response => {
            this.item = response.data;
            console.log(response.data);
            this.GetPerson();
            resolve();
          })
          .catch(error => {
            console.log("shiwu");
            reject(error);
          });
      });
    },
    edit() {
      this.editVisable = true
      this.editform = this.item
    }
  },
  mounted() {
    if (this.username === store.getters.username) {
      this.visable = true;
    }
    this.GetPerson();
  },
  watch: {
    username(value) {
      this.username = value;
      console.log(value);
      this.GetPerson();
    }
  }
};
</script>