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
                  <div><img src="https://i.loli.net/2019/04/25/5cc09717f2cce.png" alt="千年幻想" /></div>
                </div>
              </div>
              <div :class="['school', theme === 'schoolbg' && 'active']" @click="switchTheme(1)">
                <h3>玻璃の空</h3>
                <div class="preview">
                  <div><img src="https://i.loli.net/2019/04/25/5cc0976f58a9d.jpg" alt="玻璃の空" /></div>
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
export default {
  name: 'Panel',
  data() {
    return {
      bgNode: '',
      theme: '',
      initTheme: '',
      likeTimes: 0,
      isLikeSite: window.localStorage.getItem('isLikeSite', true)
    }
  },
  computed: {
    likeBtnText() {
      return this.isLikeSite ? "谢谢点赞 (●'◡'●)" : '点赞一下 (<ゝω・)☆'
    }
  },
  mounted() {
    this.queryLike()
    this.initThemeBg()
  },
  methods: {
    // 初始化背景主题
    initThemeBg() {
      const theme = this.getInitTheme()
      const initTheme = theme === 'touhoubg' ? 'initTouhoubg' : 'initSchoolbg'
      this.theme = theme
      this.initTheme = initTheme
      this.createBgNode()
      localStorage.setItem('theme', theme)
      localStorage.setItem('themeChangeDate', new Date().toISOString())
    },
    // 获取初始化主题
    getInitTheme() {
      let theme = localStorage.getItem('theme')
      const themeChangeDate = localStorage.getItem('themeChangeDate')
      const themeList = ['touhoubg', 'schoolbg']
      const randomInx = Math.floor(Math.random() * 2)

      // 还没有设置过主题
      if (!theme || !themeChangeDate) {
        return themeList[randomInx]
      }
      // 主题设置超过一天
      const now = new Date().getDate()
      const last = new Date(themeChangeDate).getDate()
      if (now - last > 1) {
        return themeList[randomInx]
      }
      return theme
    },
    // 创建背景节点
    createBgNode() {
      const bgNode = document.createElement('ul')
      bgNode.id = 'bg'
      bgNode.classList.add(this.initTheme)
      for (let i = 0; i < 10; i++) {
        const imgNode = document.createElement('li')
        bgNode.appendChild(imgNode)
      }
      const appNode = document.getElementById('app')
      document.body.insertBefore(bgNode, appNode)
      this.bgNode = bgNode

      // 延时载入背景图片
      setTimeout(() => {
        setTimeout(() => {
          this.bgNode.classList.remove(this.initTheme)
        }, 2000)
        this.bgNode.classList.add(this.theme)
      }, 4000)
    },
    // 切换主题
    switchTheme(inx) {
      const themeList = ['touhoubg', 'schoolbg']
      const newTheme = themeList[inx]
      const isSame = this.bgNode.classList.contains(newTheme)
      if (isSame) return
      this.bgNode.className = newTheme
      this.theme = newTheme
      localStorage.setItem('theme', newTheme)
      localStorage.setItem('themeChangeDate', new Date().toISOString())
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
