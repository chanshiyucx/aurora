import Vue from 'vue'
import Vuex from 'vuex'
import { queryPosts, queryHot } from './utils/services'
import { formatPost } from './utils/format'

Vue.use(Vuex)

let tipsTimer = ''

export default new Vuex.Store({
  state: {
    tips: '',
    tipsUpdateAt: '',
    page: 0,
    pageSize: 10,
    posts: [],
    hasMore: true
  },
  mutations: {
    // 设置一言
    setTips(state, { tips, tipsUpdateAt }) {
      state.tips = tips
      state.tipsUpdateAt = tipsUpdateAt
    },
    // 设置文章列表
    setPosts(state, { posts }) {
      state.page += 1
      state.posts = state.posts.concat(posts)
      state.hasMore = posts.length <= state.pageSize
    },
    // 重置文章列表
    resetPosts(state) {
      state.page = 0
      state.posts = []
      state.hasMore = true
    }
  },
  actions: {
    // 显示一言
    async showTips({ commit }, { tips }) {
      clearTimeout(tipsTimer)
      let tipsUpdateAt = new Date()
      commit('setTips', {
        tips,
        tipsUpdateAt
      })
      tipsTimer = setTimeout(() => {
        commit('setTips', {
          tips: '',
          tipsUpdateAt: new Date()
        })
      }, 6000)
    },
    // 获取文章列表
    async queryPosts({ commit, state }) {
      const { page, pageSize, hasMore } = state
      if (!hasMore) return
      let data = await queryPosts({
        page: page + 1,
        pageSize
      })
      data.forEach(formatPost)
      data = await queryHot(data)
      commit('setPosts', {
        posts: data
      })
    },
    // 获取文章详情
    async queryPost({ commit }, { number }) {
      // 获取前篇后篇
    }
  }
})
