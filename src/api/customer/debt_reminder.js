import request from '@/utils/request'

const apiUrl = process.env.VUE_APP_API_URL

// Nợ mình tạo
export function getAll(input) {
  return request({
    url: apiUrl + '/debt_reminder/me',
    params: input
  })
}
