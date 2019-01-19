<template>
  <div id="footer">
    <div v-if="showWaifu" class="waifu">
      <div :class="['tips', this.waifu === 'tia' && 'tia']"><MarkDown :content="tips" /></div>
      <canvas id="live2d" width="280" height="250" />
    </div>
    <div class="site-info"></div>
  </div>
</template>

<script>
import MarkDown from '../MarkDown'
import { random } from '@/utils'
import model from '@/assets/live2d/waifu.json'
import tips from '@/assets/live2d/tips.json'
import costume from '@/assets/live2d/costume.json'

export default {
  name: 'Footer',
  components: {
    MarkDown
  },
  data() {
    return {
      waifu: 'tia',
      showWaifu: true,
      textures: '',
      tips: ''
    }
  },
  mounted() {
    this.dressup()
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
      window.modelObj = model
      window.loadlive2d('live2d', path, '')
    }
  }
}
</script>

<style lang="less" scope>
@import './index.less';
</style>
