import { getList, removeAccount, transferAndRemoveAccount, getTargetPaymentAccount, getLinkTargetPaymentAccount, getListReceiver, saveNewReceiver } from '@/api/bank-account'

const state = {
  list: [],
  listReceiver: [],
  targetAccount: null
}

const mutations = {
  SET_LIST_ACCOUNT(state, list) {
    state.list = list
  },
  SET_TARGET_ACCOUNT(state, account) {
    state.targetAccount = account
  },
  SET_LIST_RECEIVER(state, listReceiver) {
    state.listReceiver = listReceiver
  },
  PUSH_NEW_RECEIVER(state, receiver) {
    state.listReceiver.push(receiver)
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
  },
  getLinkTargetPaymentAccount({ commit }, input) {
    return new Promise((resolve, reject) => {
      getLinkTargetPaymentAccount(input).then(response => {
        const { data } = response

        commit('SET_TARGET_ACCOUNT', data.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getListReceiver({ commit }) {
    return new Promise((resolve, reject) => {
      getListReceiver().then(response => {
        const { data } = response

        commit('SET_LIST_RECEIVER', data.data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveNewReceiver({ commit }, input) {
    return new Promise((resolve, reject) => {
      saveNewReceiver(input).then(response => {
        const { data } = response

        commit('PUSH_NEW_RECEIVER', data.data)
        resolve()
      }).catch(error => {
        error.message = error.response.data
          ? error.response.data.message || error.message
          : error.message
        reject(error)
      })
    })
  },
  deleteAccount({ commit, dispatch }, input) {
    return new Promise((resolve, reject) => {
      removeAccount(input).then(async response => {
        if (response && response.status === 200) {
          await dispatch('getList')
          resolve()
          return
        }
        reject()
      }).catch(error => {
        error.message = error.response.data
          ? error.response.data.message || error.message
          : error.message
        reject(error)
      })
    })
  },
  transferAndRemoveAccount({ commit, dispatch }, input) {
    return new Promise((resolve, reject) => {
      transferAndRemoveAccount(input).then(async response => {
        if (response && response.status === 200) {
          await dispatch('getList')
          resolve()
          return
        }
        reject()
      }).catch(error => {
        error.message = error.response.data
          ? error.response.data.message || error.message
          : error.message
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
