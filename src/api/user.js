import request from '@/utils/request'

const apiUrl = process.env.VUE_APP_API_URL

export function login(data) {
  return request({
    url: apiUrl + '/auth/login',
    method: 'post',
    data
  })
}

export function getNewToken(data) {
  return request({
    url: apiUrl + '/auth/re-renderToken',
    method: 'post',
    data
  })
}

export function getInfo(username) {
  return request({
    url: apiUrl + '/user/' + username,
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}

export function changePass(data) {
  return request({
    url: apiUrl + '/user/updatePassword',
    method: 'put',
    data
  })
}

export function resetPassword(data) {
  return request({
    url: apiUrl + '/user/reset-password',
    method: 'post',
    data
  })
}

export function confirmReset(data) {
  return request({
    url: apiUrl + '/user/reset-password/confirm',
    method: 'post',
    data
  })
}
