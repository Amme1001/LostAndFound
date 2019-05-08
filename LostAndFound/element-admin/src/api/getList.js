import request from '@/utils/request'
// Found
export function getFoundBook() {
  return request({
    url: '/book/found/get',
    method: 'get'
  })
}

export function getFoundOther() {
  return request({
    url: '/other/found/get',
    method: 'get'
  })
}

export function getFoundWallet() {
  return request({
    url: '/wallet/found/get',
    method: 'get'
  })
}

export function getFoundUdisk() {
  return request({
    url: '/udisk/found/get',
    method: 'get'
  })
}

// Lost
export function getLostBook() {
  return request({
    url: '/book/lost/get',
    method: 'get'
  })
}

export function getLostOther() {
  return request({
    url: '/other/lost/get',
    method: 'get'
  })
}

export function getLostWallet() {
  return request({
    url: '/wallet/lost/get',
    method: 'get'
  })
}

export function getLostUdisk() {
  return request({
    url: '/udisk/lost/get',
    method: 'get'
  })
}

