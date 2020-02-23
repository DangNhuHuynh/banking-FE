import { getList } from '@/api/consumerCredit'

const state = {
  list: []
}

const mutations = {
  SET_LIST_CREDITS(state, list) {
    state.list = list
  }
}

const actions = {
  // user login
  getList({ commit }) {
    return new Promise((resolve, reject) => {
      getList().then(response => {
        const { data } = response
        const list = data.data.map(credit => {
          return {
            account_number: credit.account_number,
            balance: credit.balance,
            type: 2
          }
        })

        commit('SET_LIST_CREDITS', list)
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
