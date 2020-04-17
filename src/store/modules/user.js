import { login, logout, getInfo, changePass, resetPassword, confirmReset } from '@/api/user'
import { getToken, getUsername, setToken, setUsername, removeToken, setResetToken, getResetToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: getUsername(),
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_RESET_TOKEN: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        commit('SET_NAME', username)
        setToken(data.token)
        setUsername(username)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.name).then(response => {
        const { data } = response.data

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, username, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', username)
        commit('SET_INTRODUCTION', introduction || '')
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  updatePassword({ commit }, input) {
    return new Promise((resolve, reject) => {
      changePass(input).then(response => {
        const { data } = response
        // console.log(data)
        if (data && data.status === 200) {
          resolve()
          return
        }
        reject()
      }).catch(error => {
        reject(error)
      })
    })
  },
  confirmResetPassword({ commit }, input) {
    return new Promise((resolve, reject) => {
      confirmReset({
        password: input.password,
        confirmPassword: input.confirmPassword,
        token: input.token,
        token2: getResetToken()
      }).then(response => {
        if (response.status === 200) {
          return resolve()
        }
        reject()
      }).catch(error => {
        reject(error)
      })
    })
  },
  resetPassword({ commit }, input) {
    return new Promise((resolve, reject) => {
      resetPassword({ email: input }).then(response => {
        const { data } = response
        const token = data.data ? data.data.token : null
        if (token) {
          commit('SET_RESET_TOKEN', token)
          setResetToken(token)
          return resolve()
        }
        reject()
      }).catch(error => {
        reject(error)
      })
    })
  },
  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

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
