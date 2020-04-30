import { getAll } from '@/api/customer/debt_reminder'

const state = {
  debtList: []
}

const mutations = {
  SET_LIST_DEBT(state, list) {
    state.debtList = list
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
