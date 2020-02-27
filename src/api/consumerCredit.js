import request from '@/utils/request'

const apiUrl = process.env.VUE_APP_API_URL

export function getList() {
  return request({
    url: apiUrl + '/consumer_credits/me',
    method: 'get'
  })
}
