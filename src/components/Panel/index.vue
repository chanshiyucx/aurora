<template>
  <div id="panel">
    <div class="mask" @click="hidePanel"></div>
    <div class="container">
      <div class="wrapper">
        <div class="short-line">
          <div></div>
          <div></div>
        </div>
        <div class="main">
          <div class="header">
            <div class="inner">{{ $config.title }}</div>
          </div>
          <div class="body">
            <div class="theme">
              <div :class="['touhou', theme === 'touhoubg' && 'active']" @click="switchTheme(0)">
                <h3>千年幻想</h3>
                <div class="preview">
                  <div><img src="https://i.loli.net/2019/04/24/5cbf3ca6d83c4.png" alt="千年幻想" /></div>
                </div>
              </div>
              <div :class="['school', theme === 'schoolbg' && 'active']" @click="switchTheme(1)">
                <h3>玻璃の空</h3>
                <div class="preview">
                  <div><img src="https://i.loli.net/2019/04/23/5cbf1354a41b6.jpg" alt="玻璃の空" /></div>
                </div>
              </div>
            </div>
            <div class="like">
              <p>
                已有 <span>{{ likeTimes }}</span> 人点赞了哦！
              </p>
            </div>
          </div>
          <div class="footer"><div class="cursor" :data-title="likeBtnText" @click="likeSite"></div></div>
        </div>
        <div class="long-line">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const theme = localStorage.getItem('theme') || 'touhoubg'
const initTheme = theme === 'touhoubg' ? 'initTouhoubg' : 'initSchoolbg'

export default {
  name: 'Panel',
  data() {
    return {
      bgNode: document.getElementById('bg'),
      theme,
      isLikeSite: window.localStorage.getItem('isLikeSite', true),
      likeTimes: 0
    }
  },
  computed: {
    likeBtnText() {
      return this.isLikeSite ? "谢谢点赞(●'◡'●)" : '点赞一下 (<ゝω・)☆'
    }
  },
  mounted() {
    // 延时载入背景图片
    this.bgNode.classList.add(initTheme)
    setTimeout(() => {
      setTimeout(() => {
        this.bgNode.classList.remove(initTheme)
      }, 2000)
      this.bgNode.classList.add(this.theme)
    }, 4000)
  },
  methods: {
    // 切换主题
    switchTheme(inx) {
      const themeList = ['touhoubg', 'schoolbg']
      const newTheme = themeList[inx]
      const isSame = this.bgNode.classList.contains(newTheme)
      if (isSame) return
      this.bgNode.className = newTheme
      this.theme = newTheme
      localStorage.setItem('theme', newTheme)
    },
    // 点赞数
    async queryLike() {
      this.likeTimes = await this.$store.dispatch('queryLike', 'getTimes')
    },
    // 点赞
    async likeSite() {
      if (this.isLikeSite) return
      this.likeTimes = await this.$store.dispatch('queryLike')
      this.isLikeSite = true
      window.localStorage.setItem('isLikeSite', true)
    },
    // 关闭面板
    hidePanel() {
      this.$emit('hidePanel')
    }
  }
}
</script>

<style lang="less" scoped>
@import url('./index.less');
</style>
