export default [
  {
    url: '/vue-element-admin/debt/account-info/[A-Za-z0-9]',
    type: 'get',
    response: config => {
      const acc_num = config.originalUrl.split('/').pop()
      if (acc_num == '900876') {
        return {
          message: "Info account.",
          data: {
            user_name: 'Đặng Huỳnh',
            // account_number: '900876',
            bank_name: 'ACB - PGD THANH DA'
          }
        }
      }
       return {
        message: "not fount.",
        data: {}
      }
    }
  },
  // update info
  {
    url: '/vue-element-admin/debt/[A-Za-z0-9]',
    type: 'put',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },
  // delete debt
  {
    url: '/vue-element-admin/debt/[A-Za-z0-9]',
    type: 'delete',
    response: {
      code: 20000,
      data: {
        status: 'success'
      }
    }
  },
  {
    url: '/vue-element-admin/debt',
    type: 'get',
    response: config => {
      return {
        message: '',
        data: [
          {
            id: "abchd1233",
            account_number: "900876",
            user_name: "Đặng Huỳnh",
            amount: "5.000.000",
            description: "Đã thanh toán 500000",
            status: 1,
            created: "2020-03-23T08:58:54.013+00:00"
         },
         {
            id: "abchd1234",
            account_number: "900876",
            user_name: "Đặng Huỳnh",
            amount: "1.000.000",
            description: "Chưa thanh toán 1000000",
            status: 0, // Chưa thành toán
            created: "2020-03-23T08:58:54.013+00:00"
          },
          {
            id: "abchd1235",
            account_number: "900876",
            user_name: "Đặng Huỳnh",
            amount: "1.000.000",
            description: "Đã thanh toán 1000000",
            status: 1, // Đã thanh toán
            created: "2020-03-23T08:58:54.013+00:00"
          },
          {
            id: "abchd1235",
            account_number: "900876",
            user_name: "Đặng Huỳnh",
            amount: "3.000.000",
            description: "Hủy nhắc nợ",
            status: 2,
            created: "2020-03-23T08:58:54.013+00:00"
          }
        ]
      }
    }
  }
]
