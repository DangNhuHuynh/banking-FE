import request from '@/utils/request'

const apiUrl = 'http://localhost:3001'

export function login(data) {
  return request({
    url: apiUrl + '/auth/login',
    method: 'post',
    data
  })
}

export function getInfo(username) {
  return request({
    url: apiUrl + '/accounts/' + username,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
