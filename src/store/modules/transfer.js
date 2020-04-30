import { newTransferRequest, verificationTransferRequest } from '@/api/transfer'

const state = {}

const mutations = {}

const actions = {
  // user login
  newTransferRequest({ commit }, input) {
    return new Promise((resolve, reject) => {
      newTransferRequest(input).then(response => {
        if (response && response.status === 200) {
          return resolve(response.data.data)
        }
        reject()
      }).catch(error => {
        reject(error)
      })
    })
  },

  verificationTransferRequest({ commit }, input) {
    return new Promise((resolve, reject) => {
      verificationTransferRequest(input).then(response => {
        if (response && response.status === 200) {
          return resolve(response.data.data)
        }
        reject()
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
