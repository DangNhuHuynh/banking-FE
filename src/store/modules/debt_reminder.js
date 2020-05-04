import { getAll, updateDebt, deleteDebt } from '@/api/customer/debt_reminder'

const state = {
  debtList: []
}

const mutations = {
  SET_LIST_DEBT(state, list) {
    state.debtList = list
  },
  SET_DEBT(state, payload) {
    const index = state.debtList.findIndex(debt => debt.id === payload.id)
    if (index >= 0) {
      state.debtList.splice(index, 1, payload)
    }
  },
  REMOVE_DEBT(state, payload) {
    const index = state.debtList.findIndex(debt => debt.id === payload.id)
    if (index >= 0) {
      state.debtList.splice(index, 1)
    }
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
  updateDebt({ commit }, input) {
    return new Promise((resolve, reject) => {
      updateDebt(input._id, input).then(response => {
        const { data } = response
        // console.log(data)
        if (data && data.code === 20000) {
          commit('SET_DEBT', input)
          resolve()
          return
        }
        reject()
      }).catch(error => {
        reject(error)
      })
    })
  },
  delete({ commit }, input) {
    return new Promise((resolve, reject) => {
      deleteDebt(input._id).then(response => {
        if (response && response.status === 200) {
          commit('REMOVE_DEBT', input)
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
