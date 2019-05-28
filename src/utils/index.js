/**
 * @description 生成范围内随机整数
 */
export const random = (a, b) => parseInt(Math.random() * (b - a + 1) + a, 10)

/**
 * Fisher–Yates Shuffle 洗牌算法
 */
export const shuffle = array => {
  let m = array.length
  let i

  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--)
    // And swap it with the current element.
    ;[array[m], array[i]] = [array[i], array[m]]
  }

  return array
}
/**
 * url 转换
 */
export const getLocation = href => {
  const a = document.createElement('a')
  a.href = href
  return a
}
