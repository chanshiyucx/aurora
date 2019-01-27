<template>
  <div id="footer">
    <div v-if="showWaifu && !$isMobile" class="waifu">
      <div v-show="tips" :class="['tips', this.waifu === 'tia' && 'tia']" v-html="tips"></div>
      <canvas id="live2d" width="280" height="250" />
    </div>
    <div class="site-info">
      <p><i class="icon icon-copyright"></i>2017-2018 <i class="icon icon-heart"></i> 蝉時雨</p>
      <p>Theme - Aurora | 蝉鸣如雨 - 花宵道中</p>
    </div>
    <div class="like">
      <i :class="['icon', 'icon-heart', 'cursor', isLikeSite && 'active']" @click="likeSite"></i>
      <span class="popup">已有 {{ likeTimes }} 人点赞了哦！ </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { random } from '@/utils'
import model from '@/assets/live2d/waifu.json'
import tips from '@/assets/live2d/tips.json'
import costume from '@/assets/live2d/costume.json'

const { waifuClick, hoverTips, clickTips, hitokotos } = tips

export default {
  name: 'Footer',
  data() {
    return {
      waifu: 'tia',
      showWaifu: true,
      textures: '',
      tipsTimer: '',
      isLikeSite: window.localStorage.getItem('isLikeSite', true),
      likeTimes: 0
    }
  },
  computed: mapState({
    tips: state => state.tips,
    tipsUpdateAt: state => state.tipsUpdateAt
  }),
  mounted() {
    this.dressup()
    this.loopTips()
    this.queryLike()
  },
  methods: {
    // 换装
    dressup(switchWaifu) {
      if (switchWaifu) {
        this.waifu = this.waifu === 'tia' ? 'pio' : 'tia'
      }
      const path = '/live2d/'
      // 获取装扮
      const waifuCostume = costume[this.waifu]
      let textures = ''
      while (this.textures === textures) {
        textures = waifuCostume[random(0, waifuCostume.length - 1)]
      }
      this.textures = textures
      // 获取模型
      model.model = `moc/${this.waifu || 'tia'}.moc`
      model.textures = [textures]
      window.waifuModel = model
      window.loadlive2d('live2d', path, '')
    },
    // 一言轮播
    loopTips() {
      this.tipsTimer = setTimeout(this.loopTips, 16 * 1000)
      const now = new Date()
      if (this.tips || (!!this.tipsUpdateAt && now - this.tipsUpdateAt < 6000)) return
      const inx = random(0, hitokotos.length - 1)
      const nextTips = hitokotos[inx].hitokoto
      this.$store.dispatch('showTips', { tips: nextTips })
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
    }
  }
}
</script>

<style lang="less" scope>
@import './index.less';
</style>
