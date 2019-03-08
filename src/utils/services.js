import AV from 'leancloud-storage'
import config from '../config'

const { blog, token, creator } = config
const access_token = `access_token=${token.join('')}`
const open = `creator=${creator}&state=open&${access_token}`
const closed = `creator=${creator}&state=closed&${access_token}`
const isDev = window.location.href.includes('localhost')

// 状态检测
const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) return response
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

// 获取文章列表
export const queryPosts = async ({ page = 1, pageSize = 10, filter = '' }) => {
  try {
    const url = `${blog}/issues?${open}&page=${page}&per_page=${pageSize}${filter}`
    const response = await fetch(url)
    checkStatus(response)
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

// 获取单篇文章
export const queryPost = async number => {
  try {
    const url = `${blog}/issues/${number}?${open}`
    const response = await fetch(url)
    checkStatus(response)
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

// 获取分类
export const queryCategory = async () => {
  try {
    const url = `${blog}/milestones?${access_token}`
    const response = await fetch(url)
    checkStatus(response)
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

// 获取标签
export const queryTag = async () => {
  try {
    const url = `${blog}/labels?${access_token}`
    const response = await fetch(url)
    checkStatus(response)
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

// 获取心情
export const queryMood = async ({ page = 1, pageSize = 10 }) => {
  try {
    const url = `${blog}/issues?${closed}&labels=mood&page=${page}&per_page=${pageSize}`
    const response = await fetch(url)
    checkStatus(response)
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

// 获取书单 & 友链 & 关于
export const queryPage = async type => {
  try {
    const upperType = type.replace(/^\S/, s => s.toUpperCase())
    const url = `${blog}/issues?${closed}&labels=${upperType}`
    const response = await fetch(url)
    checkStatus(response)
    const data = await response.json()
    return data[0]
  } catch (err) {
    console.log(err)
  }
}

// 文章热度
export const queryHot = async (postList, add) => {
  return new Promise(resolve => {
    if (isDev) return resolve(postList)
    const seq = postList.map(o => {
      return new Promise(resolve => {
        const query = new AV.Query('Counter')
        const Counter = AV.Object.extend('Counter')
        const { title, id } = o
        query.equalTo('id', id)
        query
          .find()
          .then(res => {
            if (res.length > 0) {
              // 已存在则返回热度
              const counter = res[0]
              // 是否增接热度
              if (add) {
                counter
                  .increment('time', 1)
                  .save(null, { fetchWhenSave: true })
                  .then(counter => {
                    o.times = counter.get('time')
                    resolve(o)
                  })
                  .catch(console.error)
              } else {
                o.times = counter.get('time')
                resolve(o)
              }
            } else {
              // 不存在则新建
              const newcounter = new Counter()
              newcounter.set('title', title)
              newcounter.set('id', id)
              newcounter.set('time', 1)
              newcounter.set('site', location.href)
              newcounter
                .save()
                .then(() => resolve(o))
                .catch(console.error)
            }
          })
          .catch(console.error)
      }).catch(console.error)
    })
    Promise.all(seq)
      .then(data => resolve(data))
      .catch(console.error)
  }).catch(console.error)
}

// 喜欢小站
export const likeSite = async type => {
  return new Promise(resolve => {
    const query = new AV.Query('Counter')
    const Counter = AV.Object.extend('Counter')
    query.equalTo('title', 'site')
    query
      .first()
      .then(res => {
        if (res) {
          if (type === 'getTimes') {
            resolve(res.get('time'))
          } else {
            res
              .increment('time', 1)
              .save(null, { fetchWhenSave: true })
              .then(counter => resolve(counter.get('time')))
              .catch(console.error)
          }
        } else {
          // 不存在则新建
          const newcounter = new Counter()
          newcounter.set('title', 'site')
          newcounter.set('time', 1)
          newcounter.set('site', location.href)
          newcounter
            .save()
            .then(counter => resolve(counter.get('time')))
            .catch(console.error)
        }
      })
      .catch(console.error)
  }).catch(console.error)
}
