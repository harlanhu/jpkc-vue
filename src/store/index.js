import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('accessToken') || null,
    kaptchaCode: null,
    accountInfo: JSON.parse(localStorage.getItem('accountInfo')) || null
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setAccount(state, account) {
      state.accountInfo = account
    },
    setKaptchaCode(state, code) {
      state.kaptchaCode = code
    }
  },
  actions: {
    setToken(context, token) {
      context.commit('setToken', token)
    },
    setAccount(context, accountInfo) {
      context.commit('setAccount', accountInfo)
    }
  },
  modules: {
  }
})
