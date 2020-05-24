import request from '@/utils/request'

const apiUrl = process.env.VUE_APP_API_URL

export function getList(input) {
  return request({
    url: apiUrl + '/account/me',
    method: 'get',
    params: input
  })
}

export function removeAccount(input) {
  return request({
    url: apiUrl + '/account/' + input.account_number,
    method: 'delete'
  })
}

export function transferAndRemoveAccount(data) {
  return request({
    url: apiUrl + '/account/transfer_and_delete',
    method: 'post',
    data
  })
}

export function getTargetPaymentAccount(input) {
  return request({
    url: apiUrl + '/account/' + input.account_number,
    method: 'get'
  })
}

export function getLinkTargetPaymentAccount(input) {
  return request({
    url: apiUrl + '/account/' + input.bank_id + '/' + input.account_number,
    method: 'get'
  })
}

export function getListReceiver() {
  return request({
    url: apiUrl + '/list_receiver/me',
    method: 'get'
  })
}

export function saveNewReceiver(input) {
  return request({
    url: apiUrl + '/list_receiver',
    method: 'post',
    data: input
  })
}
