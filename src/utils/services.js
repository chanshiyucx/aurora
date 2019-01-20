import AV from 'leancloud-storage'
import config from '../config'

const { blog, pre, suf, creator } = config
const token = `access_token=${pre}${suf}`
const open = `creator=${creator}&state=open&${token}`
const closed = `creator=${creator}&state=closed&${token}`
const isDev = window.location.href.includes('localhost')

// 状态检测
const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) return response
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

// 获取文章列表
export const queryPosts = async (page = 1, pageSize = 10) => {
  try {
    const url = `${blog}/issues?${open}&page=${page}&per_page=${pageSize}`
    const response = await fetch(url)
    checkStatus(response)
    const data = await response.json()
    return data
  } catch (err) {
    console.log(err)
  }
}

// 文章热度
export const queryHot = async postList => {
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
              o.times = counter.get('time')
              resolve(o)
            } else {
              // 不存在则新建
              const newcounter = new Counter()
              newcounter.set('title', title)
              newcounter.set('id', id)
              newcounter.set('time', 1)
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
