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
      <p><i class="icon icon-copyright"></i>2017-2018 <i class="icon icon-heart"></i> 蝉時雨</p>
      <p>
        Theme -
        <a rel="noopener noreferrer" target="_blank" href="https://github.com/chanshiyucx/aurora">Aurora</a> |
        蝉鸣如雨 - 花宵道中
      </p>
    </div>
    <div v-if="!$isMobile" class="like" @mouseenter="handleHover('likeSite')">
      <i :class="['icon', 'icon-heart', 'cursor', isLikeSite && 'active']" @click="likeSite"></i>
      <p class="popup">
        已有 <span>{{ likeTimes }}</span> 人点赞了哦！
      </p>
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
      tool: [
        { icon: 'venus-double', type: 'switch' },
        { icon: 't-shirt', type: 'dressup' },
        { icon: 'camera', type: 'takephoto' },
        { icon: 'comment', type: 'talk' },
        { icon: 'cancel-outline', type: 'close' }
      ],
      isLikeSite: window.localStorage.getItem('isLikeSite', true),
      likeTimes: 0,
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
      this.queryLike()
    }
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
        tips = `要介绍<span style="color: #b854d4">${
          this.waifu === 'pio' ? ' 姐姐 Tia ' : ' 妹妹 Pio '
        } </span>给你认识么ヾ(●゜▽゜●)♡`
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
    handleUpdate(isMini) {
      this.isMini = isMini
    }
  }
}
</script>

<style lang="less" scope>
@import './index.less';
</style>
