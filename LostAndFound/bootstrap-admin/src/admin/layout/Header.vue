<template>
  <div id="admin-header">
      <!--<b-navbar-brand class="admin-header-logo" href="https://github.com/ikaiguang">-->
      <b-navbar is-nav id="admin-header-nav-collapse">
        <b-navbar-nav>
          <b-nav-item>
            <router-link id="admin-login" to="login" v-if="username !== ''?false: true">
              <i class="icon icon-user"></i>
              <span style="color: #939da8" class="pull-rigth">登陆</span>
            </router-link>
          </b-nav-item>

          <b-nav-item-dropdown v-if="username !== ''?true: false" right>
            <template slot="button-content">
              <em>
                <b-navbar-brand class="admin-header-logo" to="/admin">
                  <img src="../../assets/admin/img/user.jpeg" alt="admin">
                </b-navbar-brand>
                <span>欢迎&nbsp;&nbsp;{{ username }}</span>
              </em>
            </template>
            <b-dropdown-item @click="setName" href="#">
              <i class="icon icon-user"></i>
              <span>个人信息</span>
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item href="#">
              <i class="icon icon-check"></i>
              <span>我的发布</span>
            </b-dropdown-item>
            <b-dropdown-divider></b-dropdown-divider>

            <b-dropdown-item href="#" to="/login">
              <i class="icon icon-share"></i>
              <span>退出登陆</span>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-navbar>
  </div>
</template>

<script>
import store from "@/store";
export default {
  data() {
    return {
      username: store.getters.username
    };
  },
  mounted() {},
  methods: {
    setName: function() {
      localStorage.setItem("username", this.username);
      this.$router.push("/personMessage");
    }
  }
};
</script>

<style>
.navbar {
    padding: 0px 10px 0px 10px;
}
</style>
