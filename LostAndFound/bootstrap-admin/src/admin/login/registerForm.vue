<template>
  <b-form id="register-form" @submit="onSubmitRegister">
    <b-form-group
      id="register-input-group-username"
      inline
      :label-cols="4"
      label="username:"
      label-for="register-input-username"
      label-align-md="right"
    >
      <b-form-input
        id="register-input-username"
        type="text"
        required
        v-model="registerFormData.username"
        placeholder="用户名"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="register-input-group-password"
      inline
      :label-cols="4"
      label="password:"
      label-for="register-input-password"
      label-align-md="right"
    >
      <b-form-input
        id="register-input-password"
        type="password"
        required
        v-model="registerFormData.password"
        placeholder="登陆密码"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="register-input-group-phone"
      inline
      :label-cols="4"
      label="phone:"
      label-for="register-input-phone"
      label-align-md="right"
    >
      <b-form-input
        id="register-input-phone"
        type="text"
        required
        v-model="registerFormData.phone"
        placeholder="手机号码"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="register-input-group-phone"
      :label-cols="4"
      label="sex:"
      label-for="register-input-phone"
      label-align-md="right"
    >
      <b-form-radio-group
        v-model="registerFormData.sex"
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

    <b-form-group class="form-actions">
      <span class="pull-left">
        <b-button @click="toLoginForm" type="button" variant="info">&laquo; 返回登陆</b-button>
      </span>
      <span class="pull-right">
        <b-button type="submit" variant="primary">注册</b-button>
      </span>
    </b-form-group>
  </b-form>
</template>

<script>
export default {
  // 模板名
  name: "AdminRegisterForm",
  props: {
    // 显示恢复表单
    toLoginForm: Function
  },
  data() {
    return {
      // 登陆表单
      registerFormData: {
        username: "",
        password: "",
        phone: "",
        sex: ""
      }
    };
  },
  methods: {
    // 提交注册
    onSubmitRegister(event) {
      event.preventDefault();
      alert(JSON.stringify(this.registerFormData));
      this.$store
        .dispatch("Register", this.registerFormData)
        .then(() => {
          console.log("注册成功");
          this.$router.push({ path: "/login" });
          this.toLoginForm();
        })
        .catch(() => {});
    }
  }
};
</script>