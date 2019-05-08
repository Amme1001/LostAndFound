import request from '@/utils/request'

export function register(username, password, sex, phone, permission) {
  return request({
    url: '/register',
    method: 'post',
    data: {
      username,
      password,
      sex,
      phone,
      permission
    }
  })
}
