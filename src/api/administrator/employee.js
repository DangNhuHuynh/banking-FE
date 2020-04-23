import request from '@/utils/request'

const apiUrl = process.env.VUE_APP_API_URL

export function getAll() {
  return request({
    url: apiUrl + '/employee',
    method: 'get'
  })
}

export function getInfoByIdCard(id_card) {
  console.log(id_card)
  return request({
    url: '/vue-element-admin/debt/administrator/employee/' + id_card,
    method: 'get'
  })
}

export function createEmployee(data) {
  return request({
    url: apiUrl + `/employee`,
    method: 'post',
    data
  })
}

export function updateEmployee(id, data) {
  return request({
    url: apiUrl + `/employee/${id}`,
    method: 'put',
    data
  })
}

export function deleteEmployee(id) {
  return request({
    url: apiUrl + `/employee/${id}`,
    method: 'delete'
  })
}
