import request from '@/utils/request'

export function getPersonList(checkPermission) {
  return request({
    url: '/person/get',
    method: 'get',
    params: {
      checkPermission
    }
  })
}

export function deletePerson(id) {
  return request({
    url: '/person/delete',
    method: 'get',
    params: {
      id
    }
  })
}

export function addPerson(username, password, sex, phone, permission) {
  return request({
    url: '/person/add',
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