import { getListTransactions } from '@/api/link-banking'

const state = {
  transactions: []
}

const mutations = {
  SET_LIST_TRANSACTIONS(state, list) {
    state.transactions = list
  }
}

const actions = {
  // user login
  getList({ commit }, input) {
    return new Promise((resolve, reject) => {
      getListTransactions(input).then(response => {
        const { data } = response

        commit('SET_LIST_TRANSACTIONS', data.data)
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
