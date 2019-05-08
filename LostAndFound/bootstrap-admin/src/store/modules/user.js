import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { register } from '@/api/register'

const user = {
  state: {
    token: getToken(),
    username: '',
    avatar: '',
    sex: '',
    phone: '',
    permission: '',
    baseImageUrl: 'http://127.0.0.1:3000/public/images/',
    currentRouter: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERNAME: (state, username) => {
      state.username = username
    },
    SET_SEX: (state, sex) => {
      state.sex = sex
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
    },
    SET_PERMISSION: (state, permission) => {
      state.permission = permission
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_CURRENTROUTER: (state, currentRouter) => {
      state.currentRouter = currentRouter
    }
  },

  actions: {
    // 注册
    Register({ commit }, registerForm) {
      // 权限为1 ：普通管理员
      const permission = 2
      const username = registerForm.username.trim()
      return new Promise((resolve, reject) => {
        register(username, registerForm.password, registerForm.sex, registerForm.phone, permission).then(() => {
          commit('SET_TOKEN', '')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          const data = response.data
          console.log(data)
          console.log(data.token)
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_USERNAME', username)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          commit('SET_AVATAR', data.avatar)
          commit('SET_SEX', data.sex)
          commit('SET_PHONE', data.phone)
          commit('SET_PERMISSION', data.permission)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
