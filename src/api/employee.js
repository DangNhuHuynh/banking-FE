import request from '@/utils/request'

const apiUrl = process.env.VUE_APP_API_URL

export function create_customer(data) {
  return request({
    url: apiUrl + '/customer',
    method: 'post',
    data
  })
}

export function transfer_money(data) {
  return request({
    url: apiUrl + '/transfer_money/deposit',
    method: 'post',
    data
  })
}
