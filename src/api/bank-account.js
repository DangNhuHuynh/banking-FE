import request from '@/utils/request'

const apiUrl = process.env.VUE_APP_API_URL

export function getList(input) {
  return request({
    url: apiUrl + '/account/me',
    method: 'get',
    params: input
  })
}

export function getTargetPaymentAccount(input) {
  return request({
    url: apiUrl + '/account/' + input.account_number,
    method: 'get'
  })
}
