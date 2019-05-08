import request from '@/utils/request'

export function addComment(publicer,time, mid, message, type, ptype, pid) {
  return request({
    url: '/comment/add',
    method: 'post',
    data: {
      publicer,
      time, 
      mid, 
      message, 
      type, 
      ptype, 
      pid
    }
  })
}

export function getComment(type, ptype, pid) {
  return request({
    url: '/comment/get',
    method: 'get',
    params: {
      type,
      ptype,
      pid
    }
  })
}

