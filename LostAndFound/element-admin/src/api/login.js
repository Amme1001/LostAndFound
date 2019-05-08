import request from '@/utils/request'
import store from '../store'

export function login(username, password) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  var username = store.getters.username
  return request({
    url: '/user/info',
    method: 'get',
    params: {
      token,
      username
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
