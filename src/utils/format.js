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

/**
 * 格式化书单 & 友链 & 关于
 */
export const formatPage = (data, type) => {
  if (!data.body) return
  let section
  switch (type) {
    case 'friends':
      section = data.body
        .trim()
        .split('## ')
        .filter(o => o.length)
        .map(o => {
          const content = o.split('\r\n').filter(o => o.length)
          return {
            name: content[0],
            link: content[1].split('link:')[1],
            cover: content[2].split('cover:')[1],
            avatar: content[3].split('avatar:')[1]
          }
        })
      break

    default:
      break
  }
  console.log('section', section)
  return section
}
