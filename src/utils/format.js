import { format } from 'timeago.js'

/**
 * 格式化文章
 */
export const formatPost = post => {
  const { body, created_at } = post
  const temp = body.split('\r\n')
  const regex = /^\[(.+)\].*(http.*(?:jpg|jpeg|png|gif))/g
  const cover = regex.exec(temp[0])
  post.cover = {
    title: cover[1],
    src: cover[2]
  }
  post.desc = temp[2]
  post.created_at = format(created_at, 'zh_CN')
  return post
}
