import request from '@/utils/request'
import store from '../store'

export function deleteComment(id) {
  return request({
    url: '/comment/delete',
    method: 'get',
    params: {
      id
    }
  })
}

export function getAllComment() {
  return request({
    url: '/comment/getAll',
    method: 'get',
    params: {
    }
  })
}

