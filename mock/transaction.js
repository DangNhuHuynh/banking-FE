const data = [
  {
    remitter: "209876",
    bank_remitter: "ACB - PGD THANH DA",
    receiver: "301111",
    bank_receiver: "DONGABANK - NH TMCP DONG A",
    deposit_money: "50000",
    description: "Chuyen tien abcd",
    type_settle: 0,
    status_transfer: 1,
    created: "2020-02-23T08:58:54.013+00:00"
  },
  {
    remitter: "209876",
    bank_remitter: "ACB - PGD THANH DA",
    receiver: "301111",
    bank_receiver: "DONGABANK - NH TMCP DONG A",
    deposit_money: "50000",
    description: "Chuyen tien abcd",
    type_settle: 1,
    status_transfer: 0,
    created: "2020-02-23T08:58:54.013+00:00"
  },
  {
    remitter: "19900",
    bank_remitter: "ACB - PGD THANH DA",
    receiver: "301111",
    bank_receiver: "DONGABANK - NH TMCP DONG A",
    deposit_money: "50000",
    description: "Chuyen tien abcd",
    type_settle: 1,
    status_transfer: 0,
    created: "2020-02-23T08:58:54.013+00:00"
  }
]

export default [
  // get history
  {
    url: '/vue-element-admin/account/transaction_history/[A-Za-z0-9]',
    type: 'get',
    response: config => {
      const accountNumber = config.originalUrl.split('/').pop()
      const filteredData = accountNumber == '19900' ? [data[2]] : [data[0], data[1]]

      return {
        message: "Get history.",
        data: filteredData
      }
    }
  }
]
