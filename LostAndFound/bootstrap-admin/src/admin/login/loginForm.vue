<template>
  <b-form id="login-form" @submit="onSubmitLogin">
    <b-form-group
      id="login-input-group-username"
      inline
      :label-cols="4"
      label="Username:"
      label-for="login-input-username"
    >
      <b-form-input
        id="login-input-username"
        type="text"
        required
        v-model="loginFormData.username"
        placeholder="用户名"
      ></b-form-input>
    </b-form-group>

    <b-form-group
      id="login-input-group-password"
      inline
      :label-cols="4"
      label="Password:"
      label-for="login-input-password"
    >
      <b-form-input
        id="login-input-password"
        type="password"
        required
        v-model="loginFormData.password"
        placeholder="登陆密码"
      ></b-form-input>
    </b-form-group>

    <b-form-group class="form-actions">
      <p class="normal_text">
        <a @click="toRegisterForm">没有账号？注册</a>
      </p>
    </b-form-group>

    <b-form-group style="text-align: center;">
      <span>
        <b-button type="submit" variant="primary">登陆</b-button>
      </span>
    </b-form-group>
  </b-form>
</template>

<script>
export default {
  // 模板名
  name: "AdminLoginForm",
  props: {
    // 显示恢复表单
    toLoginForm: Function,
    // 显示注册表单
    toRegisterForm: Function
  },
  data() {
    return {
      // 登陆表单
      loginFormData: {
        username: "wwww",
        password: "123456"
      }
    };
  },
  methods: {
    //登录功能
    onSubmitLogin: function(event) {
      event.preventDefault();
      alert(JSON.stringify(this.loginFormData));
      this.$store
        .dispatch("Login", this.loginFormData)
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {
        });
    }
  }
};
</script>