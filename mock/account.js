const data = [
  {
    id: 'acc_001',
    username: 'danghuynh',
    password: '123456',
    name: 'Đặng Huỳnh',
    email: 'dh@gmail.com',
    phone: '0986412',
    refresh_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1ZTUyMjUxNmE3MGUwZTNkZ...",
    status: 1,
    account_type: 2,
    created: "2020-03-23T08:58:54.013+00:00"
  },
  {
    id: 'acc_002',
    username: 'customer',
    password: '123456',
    name: 'Bèo',
    email: 'beo@gmail.com',
    phone: '0986412',
    refresh_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI1ZTUyMjUxNmE3MGUwZTNkZ...",
    status: 1,
    account_type: 1,
    created: "2020-03-23T08:58:54.013+00:00"
  }
]
export default [
  // create
  {
    url: '/vue-element-admin/account',
    type: 'post',
    response: {
      code: 20000,
      message: '',
      data : {
        id: 'acc_0999'
      }
    }
  },
  // update
  {
    url: '/vue-element-admin/account/[A-Za-z0-9]',
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
    url: '/vue-element-admin/account/[A-Za-z0-9]',
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
    url: '/vue-element-admin/account/list',
    type: 'get',
    response: config => {
      const { account_type } = config.query
      if(!account_type) {
        return {
          code: 20000,
          data: data
        }
      }
      let filteredData = data.filter(item => item.account_type == account_type)
      return {
        code: 20000,
        data: filteredData
      }
    }
  }
]
