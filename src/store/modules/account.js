import { getAll, createAccount, getTransactions } from '@/api/account'

const state = {
  transactions: [],
  accountList: [],
  infoAccount: {}
}

const mutations = {
  SET_LIST_ACCOUNT(state, list) {
    state.accountList = list
  },
  ADD_ACCOUNT: (state, payload) => {
    state.accountList.push(payload)
  },
  SET_LIST_TRANSACTION(state, list) {
    state.transactions = list
  }
}

const actions = {
  getList({ commit }, input) {
    return new Promise((resolve, reject) => {
      getAll(input).then(response => {
        const { data } = response
        const list = data.data
        commit('SET_LIST_ACCOUNT', list)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  createAccount({ commit }, payload) {
    return new Promise((resolve, reject) => {
      createAccount(payload).then(response => {

        const { data } = response
        console.log(data.data)
        if (data.data && data.code === 20000) {
          commit('ADD_ACCOUNT', { ...payload, id: data.data.id })
          resolve()
          return
        }
        reject()
      }).catch(error => {
        reject(error)
      })
    })
  },
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
