import request from '@/utils/request'

const apiUrl = process.env.VUE_APP_API_URL

export function get_receive_transaction(data) {
  return request({
    url: apiUrl + '/transaction_history/receive',
    method: 'get',
    data
  })
}

export function get_remit_transaction(data) {
  return request({
    url: apiUrl + '/transaction_history/remit',
    method: 'get',
    data
  })
}

export function get_debt_transaction(data) {
  return request({
    url: apiUrl + '/transaction_history/debt',
    method: 'get',
    data
  })
}
