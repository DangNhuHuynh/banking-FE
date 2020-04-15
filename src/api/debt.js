import request from '@/utils/request'

const apiUrl = process.env.VUE_APP_API_URL

export function getDebt() {
  return request({
    url: '/vue-element-admin/debt',
    method: 'get'
  })
}

export function getInfoAccount(acc_num) {
  console.log(acc_num)
  return request({
    url: '/vue-element-admin/debt/account-info/' + acc_num,
    method: 'get'
  })
}

export function updateInfoDebt(id, data) {
  return request({
    url: `/vue-element-admin/debt/${id}`,
    method: 'put',
    data
  })
}

export function deleteDebt(id) {
  return request({
    url: `/vue-element-admin/debt/${id}`,
    method: 'delete'
  })
}
