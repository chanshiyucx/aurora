import { format } from 'timeago.js'
import { parseTime } from './index'
import config from '../config'

/**
 * 格式化文章
 */
const regex = /^(.+)?\r\n\s*(.+)?\r\n/
const coverRegex = /^\[(.+)\].*(http.*(?:jpg|jpeg|png|gif))/
export const formatPost = (post) => {
  const { body, created_at } = post
  const result = regex.exec(body)
  const cover = coverRegex.exec(result[1])
  post.cover = {
    title: cover[1] || 'defaultCover',
    src: cover[2] || config.defaultCover,
  }
  post.description = result[2]
  post.created_at = format(created_at, 'zh_CN').replace(/\s/, '')
  return post
}

/**
 * 格式化分类
 */
export const formatCategory = (category) => {
  category.forEach((o) => {
    const description = o.description.split('\r\n')
    o.summary = description[0].split('summary:')[1]
    o.cover = description[1].split('cover:')[1]
  })
  return category
}

/**
 * 格式化灵感
 */
export const formatInspiration = (inspiration) => {
  inspiration.forEach((o) => (o.date = parseTime(o.created_at, '{y}年{m}月{d}日')))
  return inspiration
}

/**
 * 格式化书单 & 友链 & 关于
 */
export const formatPage = (data, type) => {
  if (!data || !data.body) return []
  let section = data.body.split('## ').filter((o) => o.length)

  switch (type) {
    case 'book':
    case 'friend':
      section = section.map((o) => {
        const content = o.split('\r\n').filter((o) => o.length)
        const result = {}
        content.forEach((row, index) => {
          if (index === 0) {
            result.name = row
          } else {
            const inx = row.indexOf(':')
            const key = row.slice(0, inx)
            const value = row.slice(inx + 1)
            result[key] = value
          }
        })
        return result
      })
      break
    case 'about':
      section = section.map((o) => {
        const title = o.match(/.+?\r\n/)[0]
        return {
          title,
          content: o.slice(title.length),
        }
      })
      break
    default:
      break
  }
  // 移除首尾空格
  section.forEach((item) => {
    Object.keys(item).forEach((k) => {
      item[k] = item[k].trim()
    })
  })

  return section
}
