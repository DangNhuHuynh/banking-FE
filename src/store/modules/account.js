import { getTransactions } from '@/api/account'

const state = {
  transactions: []
}

const mutations = {
  SET_LIST_TRANSACTION(state, list) {
    state.transactions = list
  }
}

const actions = {
  getTransactions({ commit }, accountId) {
    return new Promise((resolve, reject) => {
      getTransactions(accountId).then(response => {
        const { data } = response
        const list = data.data
        commit('SET_LIST_TRANSACTION', list)
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
