import request from '@/utils/request'

export function getAll() {
  return request({
    url: '/vue-element-admin/administrator/employee',
    method: 'get'
  })
}

export function createEmployee(data) {
  return request({
    url: `/vue-element-admin/administrator/employee`,
    method: 'post',
    data
  })
}

export function updateEmployee(id, data) {
  return request({
    url: `/vue-element-admin/administrator/employee/${id}`,
    method: 'put',
    data
  })
}

export function deleteEmployee(id) {
  return request({
    url: `/vue-element-admin/administrator/employee/${id}`,
    method: 'delete'
  })
}
