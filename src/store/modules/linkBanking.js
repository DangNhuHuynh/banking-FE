import { getList } from '@/api/link-banking'

const state = {
  list: []
}

const mutations = {
  SET_LIST_BANKING(state, list) {
    state.list = list
  }
}

const actions = {
  getList({ commit }, input) {
    return new Promise((resolve, reject) => {
      getList(input).then(response => {
        const { data } = response

        commit('SET_LIST_BANKING', data.data)
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
