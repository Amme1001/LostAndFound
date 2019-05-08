import request from '@/utils/request'

export function updatePerson(id, username, password, sex, phone, permission, state) {
  return request({
    url: '/person/edit',
    method: 'post',
    data: {
      id,
      username,
      password,
      sex,
      phone,
      permission,
      state
    }
  })
}

export function getPerson(username) {
  return request({
    url: '/person/getPerson',
    method: 'get',
    params: {
      username
    }
  })
}

