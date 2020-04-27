import { get_receive_transaction, get_remit_transaction, get_debt_transaction } from '@/api/customer/transaction_history'

const state = {
  historyList: []
}

const mutations = {
  SET_HISTORY_LIST(state, list) {
    state.historyList = list
  }
}

const actions = {
  getReceiveTransaction({ commit }, input) {
    return new Promise((resolve, reject) => {
      get_receive_transaction(input).then(response => {
        const { data } = response
        const list = data.data
        commit('SET_HISTORY_LIST', list)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getRemitTransaction({ commit }, input) {
    return new Promise((resolve, reject) => {
      get_remit_transaction(input).then(response => {
        const { data } = response
        const list = data.data
        commit('SET_HISTORY_LIST', list)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getDebtTransaction({ commit }, input) {
    return new Promise((resolve, reject) => {
      get_debt_transaction(input).then(response => {
        const { data } = response
        const list = data.data
        commit('SET_HISTORY_LIST', list)
        resolve()
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
