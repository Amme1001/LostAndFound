import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  // 登录路由
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },

  // 注册路由
  { path: '/register', component: () => import('@/views/register/index'), hidden: true },

  // 404 跳转
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/homePage',
    name: 'homePage',
    hidden: true,
    children: [{
      path: 'homePage',
      component: () => import('@/views/homePage/index')
    }]
  },

  {
    path: '/propertyManage',
    component: Layout,
    redirect: '/lost',
    name: 'propertyManage',
    meta: {
      title: '失物招领信息管理',
      icon: 'propertyManage'
    },
    children: [
      {
        path: '/lost',
        name: 'lost',
        meta: {
          title: '失物信息管理',
          icon: 'lost'
        },
        component: () => import('@/views/propertyManage/lost/index')
      },
      {
        path: '/found',
        name: 'found',
        meta: {
          title: '招领信息管理',
          icon: 'found'
        },
        component: () => import('@/views/propertyManage/found/index')
      }
    ]
  },

  {
    path: '/messageManage',
    component: Layout,
    redirect: '/user',
    name: 'messageManage',
    meta: {
      title: '个人信息管理',
      icon: 'messageManage'
    },
    children: [
      {
        path: '/user',
        name: 'user',
        meta: {
          title: '用户信息管理',
          icon: 'userMessage'
        },
        component: () => import('@/views/messageManage/user/index')
      },
      {
        path: '/manager',
        name: 'manager',
        meta: {
          title: '管理员信息管理',
          icon: 'manager'
        },
        component: () => import('@/views/messageManage/manager/index')
      },
      {
        path: '/addPerson',
        name: 'addPerson',
        meta: {
          title: '添加信息',
          icon: 'addPerson'
        },
        component: () => import('@/views/messageManage/addPerson')
      }
    ]
  },

  {
    path: '/proclamation',
    component: Layout,
    name: 'proclamation',
    meta: {
      title: '网站公告管理',
      icon: 'proclamation'
    },
    children: [
      {
        path: '/proclamation',
        component: () => import('@/views/proclamation/index')
      }
    ]
  },

  {
    path: '/messageBoard',
    component: Layout,
    name: 'messageBoard',
    meta: {
      title: '留言板管理',
      icon: 'messageBoard'
    },
    children: [
      {
        path: '/messageBoard',
        component: () => import('@/views/messageBoard/index')
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
