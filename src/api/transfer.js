import request from '@/utils/request'

const apiUrl = process.env.VUE_APP_API_URL

export function newTransferRequest(input) {
  return request({
    url: apiUrl + '/transfer_money/transfer',
    method: 'post',
    body: input
  })
}

export function verificationTransferRequest(input) {
  return request({
    url: apiUrl + '/transfer_money/transfer/verification',
    method: 'post',
    body: input
  })
}
