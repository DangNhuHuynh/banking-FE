import request from '@/utils/request'

const apiUrl = process.env.VUE_APP_API_URL

export function getList(input) {
  return request({
    url: apiUrl + '/link_banking',
    method: 'get',
    params: input
  })
}

export function getListTransactions(input) {
  return request({
    url: apiUrl + '/link_banking/transaction',
    method: 'get',
    params: input
  })
}
