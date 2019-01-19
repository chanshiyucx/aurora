/**
 * 生成范围内随机整数
 */
export const random = (a, b) => parseInt(Math.random() * (b - a + 1) + a, 10)
