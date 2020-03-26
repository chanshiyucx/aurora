import AV from 'leancloud-storage'
import config from '../config'
import documents from './documents'

const GRAPHQL_URL = 'https://api.github.com/graphql'
const GITHUB_API = 'https://api.github.com/repos'

const { username, repository, token } = config
const blog = `${GITHUB_API}/${username}/${repository}`
const access_token = `token ${token.join('')}`
const isDev = /^(192\.168|localhost)/.test(window.location.host)

// 状态检测
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) return response
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

// github fetch
const githubFetch = async (url, isQueryPage = false) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: access_token,
      },
    })
    checkStatus(response)
    const data = await response.json()
    return isQueryPage ? data[0] : data
  } catch (error) {
    console.log(error)
  }
}

// 构建 GraphQL
const createCall = async (document) => {
  try {
    const payload = JSON.stringify({ query: document })
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        Authorization: access_token,
      },
      body: payload,
    })
    checkStatus(response)
    const body = await response.json()
    return body.data
  } catch (err) {
    console.log(err)
  }
}

// 获取文章数量
export const queryArchivesCount = () => createCall(documents.queryArchivesCount({ username, repository }))

// 获取灵感数量
export const queryInspirationCount = () => createCall(documents.queryInspirationCount({ username, repository }))

// 按分类 & 标签筛选文章
export const queryFilterArchivesCount = ({ label, milestone }) =>
  createCall(documents.queryFilterArchivesCount({ username, repository, label, milestone }))

// 获取文章列表
export const queryPosts = ({ page = 1, pageSize = 10, filter = '' }) => {
  const url = `${blog}/issues?state=open&page=${page}&per_page=${pageSize}${filter}`
  return githubFetch(url)
}

// 获取单篇文章
export const queryPost = (number) => {
  const url = `${blog}/issues/${number}?state=open`
  return githubFetch(url)
}

// 获取分类
export const queryCategory = () => {
  const url = `${blog}/milestones`
  return githubFetch(url)
}

// 获取标签
export const queryTag = () => {
  const url = `${blog}/labels?page=1&per_page=100`
  return githubFetch(url)
}

// 获取灵感
export const queryInspiration = ({ page = 1, pageSize = 10 }) => {
  const url = `${blog}/issues?state=closed&labels=inspiration&page=${page}&per_page=${pageSize}`
  return githubFetch(url)
}

// 获取书单 & 友链 & 关于
export const queryPage = (type) => {
  const upperType = type.replace(/^\S/, (s) => s.toUpperCase())
  const url = `${blog}/issues?state=closed&labels=${upperType}`
  return githubFetch(url, true)
}

// 文章热度
export const queryHot = async (ids) => {
  return new Promise((resolve) => {
    if (isDev) return resolve([])
    const query = new AV.Query('Counter')
    query.containedIn('id', ids)
    query
      .find()
      .then((res) => {
        const hot = {}
        res.forEach((o) => (hot[o.attributes.id] = o.attributes.time))
        resolve(hot)
      })
      .catch(console.error)
  }).catch(console.error)
}

// 增加热度
export const increaseHot = (post) => {
  return new Promise((resolve) => {
    if (isDev) return resolve(1)
    const query = new AV.Query('Counter')
    const Counter = AV.Object.extend('Counter')
    const { title, id } = post
    query.equalTo('id', id)
    query
      .find()
      .then((res) => {
        if (res.length > 0) {
          // 已存在则返回热度
          const counter = res[0]
          counter
            .increment('time', 1)
            .save(null, { fetchWhenSave: true })
            .then((counter) => {
              const time = counter.get('time')
              resolve(time)
            })
            .catch(console.error)
        } else {
          // 不存在则新建
          const newcounter = new Counter()
          newcounter.set('title', title)
          newcounter.set('id', id)
          newcounter.set('time', 1)
          newcounter.set('site', location.href)
          newcounter
            .save()
            .then(() => resolve(1))
            .catch(console.error)
        }
      })
      .catch(console.error)
  }).catch(console.error)
}

// Nya~~
export const queryLike = async (type) => {
  return new Promise((resolve) => {
    if (isDev) return resolve(0)
    const query = new AV.Query('Counter')
    const Counter = AV.Object.extend('Counter')
    query.equalTo('title', 'site')
    query
      .first()
      .then((res) => {
        if (res) {
          if (type === 'getTimes') {
            resolve(res.get('time'))
          } else {
            res
              .increment('time', 1)
              .save(null, { fetchWhenSave: true })
              .then((counter) => resolve(counter.get('time')))
              .catch(console.error)
          }
        } else {
          const newcounter = new Counter()
          newcounter.set('title', 'site')
          newcounter.set('time', 1)
          newcounter.set('site', location.href)
          newcounter
            .save()
            .then((counter) => resolve(counter.get('time')))
            .catch(console.error)
        }
      })
      .catch(console.error)
  }).catch(console.error)
}

// 访问来源
export const visitorStatistics = async (referrer) => {
  return new Promise((resolve) => {
    if (isDev) return resolve()
    const query = new AV.Query('Visitor')
    const Visitor = AV.Object.extend('Visitor')
    query.equalTo('referrer', referrer)
    query
      .first()
      .then((res) => {
        if (res) {
          res
            .increment('time', 1)
            .save(null, { fetchWhenSave: true })
            .then(() => resolve())
            .catch(console.error)
        } else {
          const newVisitor = new Visitor()
          newVisitor.set('referrer', referrer)
          newVisitor.set('time', 1)
          newVisitor
            .save()
            .then(() => resolve())
            .catch(console.error)
        }
      })
      .catch(console.error)
  }).catch(console.error)
}
