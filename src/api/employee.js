import request from '@/utils/request'

const apiUrl = process.env.VUE_APP_API_URL

export function create_customer(data) {
  return request({
    url: apiUrl + '/customer',
    method: 'post',
    data
  })
}

export function transfer_money(input) {
  return request({
    url: apiUrl + '/transfer_money/deposit',
    method: 'post',
    params: input
  })
}

export function get_recive_transaction(input) {
  return request({
    url: apiUrl + '/transaction_history/receive',
    method: 'get',
    params: input
  })
}

export function get_remit_transaction(input) {
  return request({
    url: apiUrl + '/transaction_history/remit',
    method: 'get',
    params: input
  })
}
