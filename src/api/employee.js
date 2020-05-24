import request from '@/utils/request'

const apiUrl = process.env.VUE_APP_API_URL

export function create_customer(data) {
  return request({
    url: apiUrl + '/customer',
    method: 'post',
    data
  })
}

export function create_payment_account(data) {
  return request({
    url: apiUrl + '/account/' + data.email,
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

export function get_receive_transaction(input) {
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

export function get_debt_transaction(input) {
  return request({
    url: apiUrl + '/transaction_history/debt',
    method: 'get',
    params: input
  })
}
