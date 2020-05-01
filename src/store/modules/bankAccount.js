import { getList, getTargetPaymentAccount } from '@/api/bank-account'

const state = {
  list: [],
  targetAccount: null
}

const mutations = {
  SET_LIST_ACCOUNT(state, list) {
    state.list = list
  },
  SET_TARGET_ACCOUNT(state, account) {
    state.targetAccount = account
  }
}

const actions = {
  // user login
  getList({ commit }, input) {
    return new Promise((resolve, reject) => {
      getList(input).then(response => {
        const { data } = response

        commit('SET_LIST_ACCOUNT', data.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getTargetPaymentAccount({ commit }, input) {
    return new Promise((resolve, reject) => {
      getTargetPaymentAccount(input).then(response => {
        const { data } = response

        commit('SET_TARGET_ACCOUNT', data.data)
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
