import { newTransferRequest, verificationTransferRequest } from '@/api/transfer'

const state = {
  curTransaction: null
}

const mutations = {
  SET_CURRENT_TRANSACTION(state, transaction) {
    state.curTransaction = transaction
  }
}

const actions = {
  // user login
  newTransferRequest({ commit }, input) {
    return new Promise((resolve, reject) => {
      newTransferRequest(input).then(response => {
        if (response && response.status === 200) {
          commit('SET_CURRENT_TRANSACTION', response.data.data)

          return resolve()
        }
        reject()
      }).catch(error => {
        error.message = error.response.data
          ? error.response.data.message || error.message
          : error.message
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
