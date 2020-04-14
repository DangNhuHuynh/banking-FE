import request from '@/utils/request'

// const apiUrl = process.env.VUE_APP_API_URL

export function getDebt() {
  return request({
    url: '/vue-element-admin/debt',
    method: 'get'
  })
}
