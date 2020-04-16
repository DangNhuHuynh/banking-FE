import request from '@/utils/request'

const apiUrl = process.env.VUE_APP_API_URL

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

export function changePass(data) {
  return request({
    url: apiUrl + '/accounts/updatePassword',
    method: 'put',
    data
  })
}

export function resetPassword(data) {
  return request({
    url: apiUrl + '/accounts/reset-password',
    method: 'post',
    data
  })
}

export function confirmReset(data) {
  return request({
    url: apiUrl + '/accounts/reset-password/confirm',
    method: 'post',
    data
  })
}
