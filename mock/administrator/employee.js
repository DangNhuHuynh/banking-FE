export default [
  {
    url: '/vue-element-admin/administrator/employee',
    type: 'post',
    response: {
      code: 20000,
      message: '',
      data : {
        id: 'nv_0999'
      }
    }
  },
  // update
  {
    url: '/vue-element-admin/administrator/employee/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },
  // delete
  {
    url: '/vue-element-admin/administrator/employee/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },
  //get list
  {
    url: '/vue-element-admin/administrator/employee',
    type: 'get',
    response: config => {
      return {
        message: '',
        data: [
          {
            id: 'nv01',
            ma_nv: '01',
            name: 'Bánh Bèo',
            phone: '098765431',
            id_card: '89076512',
            email: 'huynh@gmail.com',
            position: 'Giám đốc',
            department: '4',
            created: "2020-03-23T08:58:54.013+00:00"
          },
          {
            id: 'nv02',
            ma_nv: '02',
            name: 'Bèo Bèo',
            phone: '098765439',
            id_card: '89076513',
            email: 'beo@gmail.com',
            position: 'Nhân viên',
            department: '2',
            created: "2020-03-23T08:58:54.013+00:00"
          }]
        }
      }
    }
]
