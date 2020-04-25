import { create_customer, transfer_money } from '@/api/employee'

const state = {
  customerList: [],
  accountList: [],
  infoTransfer: {}
}

const mutations = {
  SET_ACCOUNT(state, payload) {
    const index = state.accountList.findIndex(account => account.id === payload.id)
    if (index >= 0) {
      state.accountList.splice(index, 1, payload)
    }
  },
  ADD_PAYMENT_ACCOUNT: (state, payload) => {
    state.accountList.push(payload)
  },
  ADD_CUSTOMER: (state, payload) => {
    state.customerList.push(payload)
  }
}

const actions = {
  addCustomer({ commit }, input) {
    return new Promise((resolve, reject) => {
      create_customer(input).then(response => {
        const { data } = response
        if (response && response.status === 200) {
          commit('ADD_CUSTOMER', { ...data.data })
          commit('ADD_PAYMENT_ACCOUNT', { ...data.data.payment_account })
          resolve(data.data)
          return
        }
        reject()
      }).catch(error => {
        reject(error)
      })
    })
  },
  transferMoney({ commit }, input) {
    return new Promise((resolve, reject) => {
      transfer_money(input).then(response => {
        if (response && response.status === 200) {
          commit('SET_ACCOUNT', input)
          resolve()
          return
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
