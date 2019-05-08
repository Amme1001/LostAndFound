import request from '@/utils/request'

// found
export function deletefoundBook(id) {
  return request({
    url: '/book/found/delete',
    method: 'get',
    params: { id }
  })
}

export function deletefoundOther(id) {
  return request({
    url: '/other/found/delete',
    method: 'get',
    params: { id }
  })
}

export function deletefoundUdisk(id) {
  return request({
    url: '/udisk/found/delete',
    method: 'get',
    params: { id }
  })
}

export function deletefoundWallet(id) {
  return request({
    url: '/wallet/found/delete',
    method: 'get',
    params: { id }
  })
}

// lost
export function deletelostBook(id) {
  return request({
    url: '/book/lost/delete',
    method: 'get',
    params: { id }
  })
}

export function deletelostOther(id) {
  return request({
    url: '/other/lost/delete',
    method: 'get',
    params: { id }
  })
}

export function deletelostUdisk(id) {
  return request({
    url: '/udisk/lost/delete',
    method: 'get',
    params: { id }
  })
}

export function deletelostWallet(id) {
  return request({
    url: '/wallet/lost/delete',
    method: 'get',
    params: { id }
  })
}