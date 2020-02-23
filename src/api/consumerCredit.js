import request from '@/utils/request'

const apiUrl = 'http://localhost:3001'

export function getList() {
  return request({
    url: apiUrl + '/consumer_credits/me',
    method: 'get'
  })
}
