<template>
  <div id="footer">
    <div v-if="showWaifu && !$isMobile" class="waifu">
      <div v-show="tips && isMini" :class="['tips', this.waifu === 'tia' && 'tia']" v-html="tips"></div>
      <canvas @click="handleClickWaifu" id="live2d" width="280" height="250" />
    </div>
    <div class="menu" v-if="!$isMobile">
      <div class="tool" v-if="showWaifu">
        <ul>
          <li
            class="cursor"
            v-for="item in tool"
            :key="item.type"
            @click="handleClick(item.type)"
            @mouseenter="handleHover(item.type)"
          >
            <i :class="['icon', `icon-${item.icon}`]"></i>
          </li>
        </ul>
        <div class="arrow"><i class="icon icon-emo-devil"></i></div>
      </div>
      <APlayer :class="isMini && 'mini'" :audio="audio" fixed mini @update:mini="handleUpdate" />
    </div>
    <div class="site-info">
      <p><i class="icon icon-copyright"></i>2017-2019 <i class="icon icon-heart"></i> {{ $config.title }}</p>
      <p>
        Theme -
        <a rel="noopener noreferrer" target="_blank" href="https://github.com/chanshiyucx/aurora">Aurora</a> |
        {{ $config.subtitle }}
      </p>
    </div>
    <div v-if="!$isMobile" class="sakura cursor" @click="dropPanel" @mouseenter="handleHover('panel')">
      <img :src="sakura" alt="theme" />
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

const sakura =
  'data:image/png;base64,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'

export default {
  name: 'Footer',
  data() {
    return {
      sakura,
      waifu: 'tia',
      showWaifu: true,
      textures: '',
      tipsTimer: '',
      tool: [
        { icon: 'venus-double', type: 'switch' },
        { icon: 't-shirt', type: 'dressup' },
        { icon: 'camera', type: 'takephoto' },
        { icon: 'comment', type: 'talk' },
        { icon: 'cancel-outline', type: 'close' }
      ],
      audio: this.$config.APlayer,
      isMini: true
    }
  },
  computed: mapState({
    tips: state => state.tips,
    tipsUpdateAt: state => state.tipsUpdateAt
  }),
  mounted() {
    if (!this.$isMobile) {
      this.dressup()
      this.loopTips()
    }
  },
  methods: {
    // 换装
    dressup(switchWaifu) {
      if (switchWaifu) this.waifu = this.waifu === 'tia' ? 'pio' : 'tia'
      const path = '/live2d/'
      // 获取装扮
      const waifuCostume = costume[this.waifu]
      let textures = ''
      while (!textures || this.textures === textures) {
        textures = waifuCostume[random(0, waifuCostume.length - 1)]
      }
      this.textures = textures
      // 获取模型
      model.model = `moc/${this.waifu || 'tia'}.moc`
      model.textures = [textures]
      // 设置不同的缩放比例
      model.layout.width = this.waifu === 'tia' ? 1.82 : 2
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
    handleClickWaifu() {
      let nextTips
      while (!nextTips || nextTips === this.tips) {
        let index = random(0, waifuClick.length - 1)
        nextTips = waifuClick[index]
      }
      this.$store.dispatch('showTips', { tips: nextTips })
    },
    handleHover(type) {
      let tips
      if (type === 'switch') {
        tips = `要召唤<span style="color: #b854d4">${
          this.waifu === 'pio' ? ' 欧内酱 Tia ' : ' 一抹多 Pio '
        } </span>么(◍˃̶ᗜ˂̶◍)✩`
      } else {
        tips = hoverTips[type]
      }
      if (!tips) return
      this.$store.dispatch('showTips', { tips })
    },
    // 看板娘交互
    handleClick(type) {
      switch (type) {
        case 'switch':
          this.dressup(true)
          break
        case 'dressup':
          this.dressup()
          break
        case 'takephoto':
          window.Live2D.captureName = 'waifu.png'
          window.Live2D.captureFrame = true
          this.$store.dispatch('showTips', { tips: clickTips.takePhoto })
          break
        case 'talk':
          {
            const index = random(0, hitokotos.length - 1)
            const tips = hitokotos[index].hitokoto
            this.$store.dispatch('showTips', { tips })
          }
          break
        case 'close':
          this.$store.dispatch('showTips', { tips: clickTips.close })
          setTimeout(() => {
            this.showWaifu = false
          }, 2000)
          break
        default:
          return
      }
    },
    // 播放器最小化
    handleUpdate(isMini) {
      this.isMini = isMini
    },
    // 打开面板
    dropPanel() {
      this.$emit('dropPanel')
    }
  }
}
</script>

<style lang="less" scope>
@import './index.less';
</style>
