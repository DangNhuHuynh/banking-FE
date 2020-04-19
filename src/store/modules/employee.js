import { getAll, createEmployee, updateEmployee, deleteEmployee } from '@/api/administrator/employee'

const state = {
  employeeList: []
}

const mutations = {
  SET_LIST_EMPOYEE(state, list) {
    state.employeeList = list
  },
  ADD_EMPOYEE: (state, payload) => {
    state.employeeList.push(payload)
  },
  SET_EMPOYEE(state, payload) {
    const index = state.employeeList.findIndex(employee => employee.id === payload.id)
    if (index >= 0) {
      state.employeeList.splice(index, 1, payload)
    }
  },
  REMOVE_EMPLOYEE(state, payload) {
    const index = state.employeeList.findIndex(emp => emp.id === payload.id)
    if (index >= 0) {
      state.employeeList.splice(index, 1)
    }
  }
}

const actions = {
  getList({ commit }) {
    return new Promise((resolve, reject) => {
      getAll().then(response => {
        const { data } = response
        const list = data.data
        commit('SET_LIST_EMPOYEE', list)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  create({ commit }, input) {
    return new Promise((resolve, reject) => {
      createEmployee(input).then(response => {
        const { data } = response
        if (data.data && data.code === 20000) {
          commit('ADD_EMPOYEE', { ...input, id: data.data.id })
          resolve()
          return
        }
        reject()
      }).catch(error => {
        reject(error)
      })
    })
  },
  update({ commit }, input) {
    return new Promise((resolve, reject) => {
      updateEmployee(input.id, input).then(response => {
        const { data } = response
        if (data && data.code === 20000) {
          commit('SET_EMPOYEE', input)
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
      deleteEmployee(input.id).then(response => {
        const { data } = response
        if (data && data.code === 20000) {
          commit('REMOVE_EMPLOYEE', input)
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
