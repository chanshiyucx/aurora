import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let tipsTimer = ''

export default new Vuex.Store({
  state: {
    tips: '',
    tipsUpdateAt: ''
  },
  mutations: {
    setTips(state, { tips, tipsUpdateAt }) {
      state.tips = tips
      state.tipsUpdateAt = tipsUpdateAt
    }
  },
  actions: {
    async showTips({ commit }, { tips }) {
      clearTimeout(tipsTimer)
      let tipsUpdateAt = new Date()
      commit('setTips', { tips, tipsUpdateAt })
      tipsTimer = setTimeout(() => {
        commit('setTips', { tips: '', tipsUpdateAt: new Date() })
      }, 6000)
    }
  }
})
