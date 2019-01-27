<template>
  <div id="footer">
    <div v-if="showWaifu && !$isMobile" class="waifu">
      <div v-show="tips && isMini" :class="['tips', this.waifu === 'tia' && 'tia']" v-html="tips"></div>
      <canvas @click="handleClickWaifu" id="live2d" width="280" height="250" />
    </div>
    <div class="menu" v-if="!$isMobile">
      <div class="tool">
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
        <div class="arrow"><i class="icon icon-angle-double-right"></i></div>
      </div>

      <aplayer
        autoplay
        theme="#b28fce"
        :class="!isMini && 'player'"
        :mini="isMini"
        :list="musicList"
        :music="{
          title: 'うたかたの风と蝉时雨',
          artist: 'Silent Siren',
          src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
          pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
        }"
      >
        <div slot="display" class="arrow cursor" @click="handlePlayer">
          <i class="icon icon-angle-double-right"></i>
        </div>
      </aplayer>
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
      <span class="popup">已有 {{ likeTimes }} 人点赞了哦！ </span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Aplayer from 'vue-aplayer'
import { random } from '@/utils'
import model from '@/assets/live2d/waifu.json'
import tips from '@/assets/live2d/tips.json'
import costume from '@/assets/live2d/costume.json'

Aplayer.disableVersionBadge = true
const { waifuClick, hoverTips, clickTips, hitokotos } = tips

export default {
  name: 'Footer',
  components: {
    Aplayer
  },
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
      isMini: true,
      musicList: [
        {
          title: 'うたかたの风と蝉时雨',
          artist: 'Little Planet',
          src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
          pic: 'https://i.loli.net/2018/12/09/5c0cc3ca1081b.jpg'
        },
        {
          title: '春の凑に',
          artist: 'TUMENECO',
          src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
          pic: 'https://i.loli.net/2018/12/11/5c0f196d01a3a.jpg'
        },
        {
          title: '夏阳炎',
          artist: '天威梦方',
          src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
          pic: 'https://i.loli.net/2018/12/09/5c0cc3cee372a.jpg'
        },
        {
          title: '秋风のとおり道',
          artist: '风神华伝',
          src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
          pic: 'https://i.loli.net/2018/12/09/5c0cc3d13844a.jpg'
        },
        {
          title: '冬のわすれもの',
          artist: 'ハルノカゼ',
          src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
          pic: 'https://i.loli.net/2018/12/09/5c0cc3d36349c.jpg'
        }
      ]
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
    // 切换模式
    handlePlayer() {
      this.isMini = !this.isMini
    }
  }
}
</script>

<style lang="less" scope>
@import './index.less';
</style>
