import { getDebt, getInfoAccount, updateInfoDebt } from '@/api/debt'

const state = {
  debtList: [],
  infoAccount: {}
}

const mutations = {
  SET_LIST_DEBT(state, list) {
    state.debtList = list
  },
  SET_INFO_ACCOUNT(state, list) {
    state.infoAccount = list
  },
  SET_DEBT(state, payload) {
    const index = state.debtList.findIndex(debt => debt.id === payload.id)
    if (index >= 0) {
      state.debtList.splice(index, 1, payload)
    }
  }
}

const actions = {
  getListDebt({ commit }) {
    return new Promise((resolve, reject) => {
      getDebt().then(response => {
        const { data } = response
        const list = data.data
        commit('SET_LIST_DEBT', list)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getInfoAccount({ commit }, acc_num) {
    return new Promise((resolve, reject) => {
      getInfoAccount(acc_num).then(response => {
        const { data } = response
        const list = data.data
        commit('SET_INFO_ACCOUNT', list)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  updateDebtInfo({ commit }, input) {
    return new Promise((resolve, reject) => {
      updateInfoDebt(input.id, input).then(response => {
        const { data } = response
        // console.log(data)
        if (data && data.code == 20000) {
          commit('SET_DEBT', input)
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
