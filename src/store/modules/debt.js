import { getDebt } from '@/api/debt'

const state = {
  debtList: []
}

const mutations = {
  SET_LIST_DEBT(state, list) {
    state.debtList = list
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
