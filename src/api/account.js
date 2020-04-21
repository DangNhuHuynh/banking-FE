import request from '@/utils/request'

// const apiUrl = process.env.VUE_APP_API_URL

export function getTransactions(accountId) {
  return request({
    url: '/vue-element-admin/account/transaction_history/' + accountId,
    method: 'get'
  })
}

export function getAll(input) {
  return request({
    url: '/vue-element-admin/account/list',
    method: 'get',
    params: input
  })
}

export function createAccount(data) {
  return request({
    url: '/vue-element-admin/account',
    method: 'post',
    data
  })
}

export function updateAccount(id, data) {
  return request({
    url: `/vue-element-admin/account/${id}`,
    method: 'put',
    data
  })
}

export function deleteAccount(id, data) {
  return request({
    url: `/vue-element-admin/account/${id}`,
    method: 'delete',
    data
  })
}

