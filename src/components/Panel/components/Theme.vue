<template>
  <ul class="theme">
    <li :class="['touhou', theme === 'touhou' && 'active']" @click="switchTheme('touhou')">
      <h3>千年幻想</h3>
      <div class="preview cursor">
        <div>
          <img :src="touhou" alt="千年幻想" />
        </div>
      </div>
    </li>
    <li :class="['school', theme === 'school' && 'active']" @click="switchTheme('school')">
      <h3>琉璃の空</h3>
      <div class="preview cursor">
        <div>
          <img :src="school" alt="玻璃の空" />
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import images from '@/assets/images'

const { preview } = images

export default {
  name: 'Theme',
  props: {
    theme: {
      type: String,
      default: 'touhou',
    },
  },
  data() {
    return {
      touhou: preview.touhou,
      school: preview.school,
    }
  },
  methods: {
    switchTheme(theme) {
      this.$emit('switchTheme', theme)
    },
  },
}
</script>

<style lang="scss" scoped>
.theme {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 14px 12px;

  h3 {
    margin-bottom: 14px;
    font-size: $font-size-larger;
    font-weight: $font-weight-normal;
    line-height: 40px;
  }

  .preview {
    position: relative;
    border-radius: 3px;

    > div {
      display: flex;
      width: 212px;
      height: 110px;
      overflow: hidden;
      background-image: linear-gradient(to top, $panel-theme-bg-from-color 0%, $panel-theme-bg-to-color 100%);
    }

    &::before {
      content: '';
      position: absolute;
      top: -4px;
      right: -4px;
      bottom: -4px;
      left: -4px;
      border-radius: 3px;
      border: $panel-theme-border solid 5px;
      transition-duration: 0.3s;
      transition-property: transform border;
    }

    &:hover::before {
      transform: scale(1.05, 1.1);
    }
  }

  .touhou {
    img {
      width: 192px;
      height: 90px;
    }
  }
  .school {
    img {
      width: 212px;
      height: 110px;
    }
  }

  .active {
    h3 {
      color: $purple-deep;
    }
    .preview::before {
      border: $purple solid 5px;
    }
  }
}
</style>
