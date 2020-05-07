import { getAll, createDebt, updateDebt, requestPaymentDebt, verificationPaymentDebt } from '@/api/customer/debt_reminder'

const state = {
  debtList: [],
  curTransaction: null
}

const mutations = {
  SET_LIST_DEBT(state, list) {
    state.debtList = list
  },
  SET_DEBT(state, payload) {
    const index = state.debtList.findIndex(debt => debt._id === payload._id)
    if (index >= 0) {
      state.debtList.splice(index, 1, payload)
    }
  },
  ADD_DEBT: (state, payload) => {
    state.debtList.push(payload)
  },
  REMOVE_DEBT(state, payload) {
    const index = state.debtList.findIndex(debt => debt._id === payload._id)
    if (index >= 0) {
      state.debtList.splice(index, 1)
    }
  },
  SET_CURRENT_TRANSACTION(state, transaction) {
    state.curTransaction = transaction
  }
}

const actions = {
  getList({ commit }, input) {
    return new Promise((resolve, reject) => {
      getAll(input).then(response => {
        const { data } = response
        const list = data.data
        commit('SET_LIST_DEBT', list)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  createDebt({ commit }, input) {
    return new Promise((resolve, reject) => {
      createDebt(input).then(response => {
        const { data } = response
        if (response && response.status === 200) {
          commit('ADD_DEBT', { ...input, id: data.data._id })
          resolve()
          return
        }
        reject()
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateDebt({ commit }, input) {
    return new Promise((resolve, reject) => {
      updateDebt(input._id, input).then(response => {
        const { data } = response
        if (response && response.status === 200) {
          commit('SET_DEBT', data.data)
          resolve()
          return
        }
        reject()
      }).catch(error => {
        reject(error)
      })
    })
  },
  requestPaymentDebt({ commit }, input) {
    return new Promise((resolve, reject) => {
      requestPaymentDebt(input._id).then(response => {
        if (response && response.status === 200) {
          commit('SET_CURRENT_TRANSACTION', response.data.data)

          return resolve()
        }
        reject()
      }).catch(error => {
        reject(error)
      })
    })
  },
  verificationPayment({ commit }, input) {
    return new Promise((resolve, reject) => {
      verificationPaymentDebt(input._id).then(response => {
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
