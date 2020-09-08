<template>
  <footer>
    <div class="prpr" v-if="!$isMobile.value">
      <div class="waifu" v-if="showWaifu">
        <div v-show="tips && isMini" :class="['tips', this.waifu === 'tia' && 'tia']" v-html="tips"></div>
        <canvas @click="handleClickWaifu" id="live2d" width="280" height="250" />
      </div>
      <div class="tool">
        <div class="menu" v-if="showWaifu">
          <ul>
            <li
              class="cursor"
              v-for="item in menu"
              :key="item.type"
              @click="handleClick(item.type)"
              @mouseenter="handleHover(item.type)"
            >
              <i :class="['icon', `icon-${item.icon}`]"></i>
            </li>
          </ul>
          <div class="devil">
            <i class="icon icon-emo-devil"></i>
          </div>
        </div>
        <APlayer :class="isMini && 'mini'" :audio="audio" preload="none" fixed mini @update:mini="handleUpdate" />
      </div>
    </div>
    <div class="site-info">
      <p>
        <i class="icon icon-copyright"></i>2017-2020
        <i class="icon icon-heart"></i>
        {{ $config.title }}
      </p>
      <p>
        Theme -
        <a rel="noopener noreferrer" target="_blank" href="https://github.com/chanshiyucx/aurora">Aurora</a>
        | {{ $config.subtitle }}
      </p>
    </div>
    <img
      v-if="!$isMobile.value"
      class="sakura cursor"
      :src="sakura"
      @click="dropPanel"
      @mouseenter="handleHover('panel')"
      alt="sakura"
    />
  </footer>
</template>

<script>
import { mapState } from 'vuex'
import { random } from '@/utils'
import model from '@/assets/live2d/waifu.json'
import tips from '@/assets/live2d/tips.json'
import costume from '@/assets/live2d/costume.json'
import images from '@/assets/images'

const { waifuClick, hoverTips, clickTips, hitokotos } = tips
const { sakura } = images
const path = '/live2d/'

export default {
  name: 'Footer',
  data() {
    return {
      sakura,
      showWaifu: true,
      waifu: 'tia',
      menu: [
        { icon: 'venus-double', type: 'switch' },
        { icon: 't-shirt', type: 'dressup' },
        { icon: 'camera', type: 'takephoto' },
        { icon: 'comment', type: 'talk' },
        { icon: 'cancel-outline', type: 'close' },
      ],
      audio: this.$config.APlayer,
      isMini: true,
    }
  },
  computed: mapState({
    tips: (state) => state.tips,
    tipsUpdateAt: (state) => state.tipsUpdateAt,
  }),
  mounted() {
    if (!this.$isMobile.value) {
      this.dressup()
      this.loopTips()
    }
  },
  methods: {
    dressup(switchWaifu = false) {
      if (switchWaifu) this.waifu = this.waifu === 'tia' ? 'pio' : 'tia'
      // 获取装扮
      const waifuCostume = costume[this.waifu]
      let textures
      while (!textures || textures === model.textures[0]) {
        textures = waifuCostume[random(0, waifuCostume.length - 1)]
      }
      // 获取模型
      model.model = `moc/${this.waifu}.moc`
      model.textures = [textures]
      // 设置缩放比例
      model.layout.width = this.waifu === 'tia' ? 1.82 : 2
      window.waifuModel = model
      window.loadlive2d('live2d', path, '')
    },
    loopTips() {
      setTimeout(this.loopTips, 16 * 1000)
      const now = new Date()
      if (this.tips || (this.tipsUpdateAt && now - this.tipsUpdateAt < 6000)) return
      const inx = random(0, hitokotos.length - 1)
      const nextTips = hitokotos[inx].hitokoto
      this.$store.dispatch('showTips', { tips: nextTips })
    },
    handleClickWaifu() {
      let nextTips = this.tips
      while (nextTips === this.tips) {
        const inx = random(0, waifuClick.length - 1)
        nextTips = waifuClick[inx]
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
          const inx = random(0, hitokotos.length - 1)
          const tips = hitokotos[inx].hitokoto
          this.$store.dispatch('showTips', { tips })
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
    handleUpdate(isMini) {
      this.isMini = isMini
    },
    dropPanel() {
      this.$store.commit('setShowPanel', true)
    },
  },
}
</script>

<style lang="scss" scope>
@import './index.scss';
</style>
