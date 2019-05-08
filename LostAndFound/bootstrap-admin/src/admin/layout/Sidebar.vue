<template>
  <div id="admin-sidebar">
    <div class="mobile-phone">
      <a href="#">
        <i class="icon icon-folder-close"></i>&nbsp;
        <span>招领信息</span>
      </a>
    </div>

    <div class="mini-menu">
      <a href="#">&nbsp;</a>
    </div>

    <b-nav vertical id="admin-sidebar-menu">
      <b-nav-text tag="li" :class="{active:this.$route.path==='/found'}">
        <router-link to="/found">
          <i class="icon icon-folder-close"></i>
          <span class="ml-3">招领信息</span>
        </router-link>
      </b-nav-text>

      <b-nav-text tag="li" :class="{active:this.$route.path==='/lost'}">
        <router-link to="/lost">
          <i class="icon icon-folder-open"></i>
          <span class="ml-3">失物信息</span>
        </router-link>
      </b-nav-text>

      <b-nav-text tag="li" :class="{active:this.$route.path==='/publish'}">
        <router-link to="/publish">
          <i class="icon icon-plus"></i>
          <span class="ml-3">发布信息</span>
        </router-link>
      </b-nav-text>
    </b-nav>
  </div>
</template>

<script>
import { sidebarMenuFeatures } from "../../assets/admin/js/sidebar";


export default {
  data() {
    return {};
  },
  mounted() {
    sidebarMenuFeatures();
  },
  methods: {}
};
</script>
