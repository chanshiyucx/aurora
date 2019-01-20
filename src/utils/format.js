import { format } from 'timeago.js'
import config from '../config'

let { covers } = config
covers = covers.reverse()

/**
 * 格式化文章
 */
export const formatPost = (post, index) => {
  const { body, created_at } = post
  const desc = body.split('<!-- more -->')[0]
  post.desc = desc
  post.content = body
  post.cover = covers[index % covers.length]
  post.created_at = format(created_at, 'zh_CN')
  return post
}
