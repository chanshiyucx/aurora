import { format } from 'timeago.js'
import { parseTime } from './index'
import config from '../config'

/**
 * 格式化文章
 */
const regex = /^(.+)?\r\n\s*(.+)?\r\n/
const coverRegex = /^\[(.+)\].*(http.*(?:jpg|jpeg|png|gif))/
export const formatPost = post => {
  const { body, created_at } = post
  const result = regex.exec(body)
  const cover = coverRegex.exec(result[1])
  post.cover = {
    title: cover[1] || 'defaultCover',
    src: cover[2] || config.defaultCover
  }
  post.description = result[2]
  post.created_at = format(created_at, 'zh_CN').replace(/\s/, '')
  return post
}

/**
 * 格式化分类
 */
export const formatCategory = category => {
  category.forEach(o => {
    const description = o.description.split('\r\n')
    o.summary = description[0].split('summary:')[1]
    o.cover = description[1].split('cover:')[1]
  })
  return category
}

/**
 * 格式化灵感
 */
export const formatInspiration = inspiration => {
  inspiration.forEach(o => (o.date = parseTime(o.created_at, '{y}年{m}月{d}日')))
  return inspiration
}

/**
 * 格式化书单 & 友链 & 关于
 */
export const formatPage = (data, type) => {
  if (!data || !data.body) return []
  let section = data.body.split('## ').filter(o => o.length)

  switch (type) {
    case 'book':
      section = section.map(o => {
        const content = o.split('\r\n').filter(o => o.length)
        return {
          name: content[0],
          author: content[1].split('author:')[1],
          published: content[2].split('published:')[1],
          progress: content[3].split('progress:')[1],
          rating: content[4].split('rating:')[1],
          postTitle: content[5].split('postTitle:')[1],
          postLink: content[6].split('postLink:')[1],
          cover: content[7].split('cover:')[1],
          description: content[9].split('description:')[1]
        }
      })
      break
    case 'friend':
      section = section.map(o => {
        const content = o.split('\r\n').filter(o => o.length)
        return {
          name: content[0],
          link: content[1].split('link:')[1],
          cover: content[2].split('cover:')[1],
          avatar: content[3].split('avatar:')[1]
        }
      })
      break
    case 'about':
      section = section.map(o => {
        const title = o.match(/.+?\r\n/)[0]
        return {
          title,
          content: o.slice(title.length)
        }
      })
      break
    default:
      break
  }
  // 移除首尾空格
  section.forEach(item => {
    Object.keys(item).forEach(k => {
      item[k] = item[k].trim()
    })
  })

  return section
}
