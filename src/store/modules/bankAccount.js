import { getList } from '@/api/bank-account'

const state = {
  list: []
}

const mutations = {
  SET_LIST_ACCOUNT(state, list) {
    state.list = list
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
