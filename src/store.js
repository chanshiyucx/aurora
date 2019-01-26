import Vue from 'vue'
import Vuex from 'vuex'
import { queryPosts, queryPost, queryHot, queryPage } from './utils/services'
import { formatPost, formatPage } from './utils/format'

Vue.use(Vuex)

let tipsTimer = ''

export default new Vuex.Store({
  state: {
    tips: '',
    tipsUpdateAt: '',
    page: 0,
    pageSize: 10,
    maxPage: 0,
    posts: [],
    hasMore: true
  },
  mutations: {
    // 设置一言
    setTips(state, { tips, tipsUpdateAt }) {
      state.tips = tips
      state.tipsUpdateAt = tipsUpdateAt
    },
    // 设置当前页
    setPage(state, { page }) {
      state.page = page
      if (!state.hasMore && !state.maxPage) state.maxPage = page
    },
    // 设置文章列表
    setPosts(state, { posts }) {
      state.posts = state.posts.concat(posts)
      state.hasMore = posts.length === state.pageSize
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
      commit('setPage', { page: page + 1 })
      commit('setPosts', { posts: data })
    },
    // 获取归档
    async queryArchive({ commit, state }, { type = 'next' }) {
      const { page, pageSize } = state
      // 先查询在 posts 列表是否存在
      const start = type === 'prev' ? page - 2 : page
      const end = type === 'prev' ? page - 1 : page + 1
      let data = state.posts.slice(start * pageSize, end * pageSize)
      const queryPage = start + 1
      if (!data.length) {
        data = await queryPosts({
          page: queryPage,
          pageSize
        })
        data.forEach(formatPost)
        data = await queryHot(data)
        commit('setPosts', { posts: data })
      }
      commit('setPage', { page: queryPage })
      return data
    },
    // 获取文章详情
    async queryPost({ state }, { number }) {
      // 获取本篇
      let post = state.posts.find(o => o.number === number)
      // TODO:获取前篇后篇
      if (!post) {
        post = await queryPost(number)
        post = await queryHot(post)
        post = formatPost(post)
      }
      return post
    },
    // 获取书单 & 友链 & 关于
    async queryPage(context, { type }) {
      let data = await queryPage(type)
      data = formatPage(data, type)
      return data
    }
  }
})
