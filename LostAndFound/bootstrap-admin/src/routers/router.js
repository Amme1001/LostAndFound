// vue
import Vue from "vue";
import Router from "vue-router";
import AdminLogin from "./../admin/Login.vue";
// 使用路由
Vue.use(Router);



const router = new Router({
  // mode: 'history', // 开启 history 模式，记得配置 http 服务改写规则
  // base: __dirname,
  routes: [
    {
      path: "/",
      redirect: "/admin",
    },
    // 用户登陆
    {
      path: "/login",
      name: "login",
      component: AdminLogin
    },
    // 用户注销
    {
      path: "/logout",
      name: "logout",
      component: AdminLogin
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("./../admin/Layout.vue"),
      redirect: "/found",
      children: [
        {
          path: "/found",
          name: "found",
          component: () => import("./../admin/porperty/found/index.vue"),
        },
        {
          path: "/lost",
          name: "lost",
          component: () => import("./../admin/porperty/lost/index.vue"),
        },
        {
          path: "/publish",
          name: "publish",
          component: () => import( /* webpackChunkName: "publish" */ './../admin/publish/index.vue'),
        },
        {
          path: "/showMessage",
          name: "showMessage",
          component: () => import( /* webpackChunkName: "timeline" */ './../admin/components/showMessage/index.vue'),
        },
         // 用户信息
        {
          path: "/personMessage",
          name: "personMessage",
          component: () => import("./../admin/personMessage/index.vue")
        },
      ],
    }
  ]
});

// 输出路由
export default router