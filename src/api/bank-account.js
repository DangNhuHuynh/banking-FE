import request from '@/utils/request'

const apiUrl = process.env.VUE_APP_API_URL

export function getList(input) {
  return request({
    url: apiUrl + '/account/me',
    method: 'get',
    params: input
  })
}
