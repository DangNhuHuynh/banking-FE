import request from '@/utils/request'

// const apiUrl = process.env.VUE_APP_API_URL

export function getTransactions(accountId) {
  return request({
    url: '/vue-element-admin/account/transaction_history/' + accountId,
    method: 'get'
  })
}
