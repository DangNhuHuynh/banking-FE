export default [
  {
    url: '/vue-element-admin/debt',
    type: 'get',
    response: config => {
      return {
        message: '',
        data: [
          {
            account_number: "900876",
            user_name: "Đặng Huỳnh",
            amount: "5.000.000",
            description: "Đã thanh toán 500000",
            status: 1,
            created: "2020-03-23T08:58:54.013+00:00"
         },
         {
            account_number: "900876",
            user_name: "Đặng Huỳnh",
            amount: "1.000.000",
            description: "Chưa thanh toán 1000000",
            status: 0, // Chưa thành toán
            created: "2020-03-23T08:58:54.013+00:00"
          },
          {
            account_number: "900876",
            user_name: "Đặng Huỳnh",
            amount: "1.000.000",
            description: "Đã thanh toán 1000000",
            status: 1, // Đã thanh toán
            created: "2020-03-23T08:58:54.013+00:00"
          },
          {
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
