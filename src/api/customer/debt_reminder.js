import request from '@/utils/request'

const apiUrl = process.env.VUE_APP_API_URL

// Nợ mình tạo
export function getAll(input) {
  return request({
    url: apiUrl + '/debt_reminder/me',
    params: input
  })
}

export function createDebt(data) {
  return request({
    url: apiUrl + `/debt_reminder`,
    method: 'post',
    data
  })
}

export function updateDebt(id, data) {
  return request({
    url: apiUrl + `/debt_reminder/${id}`,
    method: 'put',
    data
  })
}

export function requestPaymentDebt(id, input) {
  return request({
    url: apiUrl + `/debt_reminder/${id}/pay`,
    method: 'post',
    data: input
  })
}

export function verificationPaymentDebt(id, input) {
  return request({
    url: apiUrl + `/debt_reminder/${id}/pay/verification`,
    method: 'post',
    data: input
  })
}
