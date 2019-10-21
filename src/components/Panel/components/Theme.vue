<template>
  <ul class="theme">
    <li :class="['touhou', theme === 'touhou' && 'active']" @click="switchTheme('touhou')">
      <h3>千年幻想</h3>
      <div class="preview cursor">
        <div>
          <img src="https://raw.githubusercontent.com/chanshiyucx/poi/master/2019/touhou.png" alt="千年幻想" />
        </div>
      </div>
    </li>
    <li :class="['school', theme === 'school' && 'active']" @click="switchTheme('school')">
      <h3>琉璃の空</h3>
      <div class="preview cursor">
        <div>
          <img src="https://raw.githubusercontent.com/chanshiyucx/poi/master/2019/school.jpg" alt="玻璃の空" />
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Theme',
  props: {
    theme: {
      type: String,
      default: 'touhou'
    }
  },
  methods: {
    switchTheme(theme) {
      this.$emit('switchTheme', theme)
    }
  }
}
</script>

<style lang="scss" scoped>
.theme {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 14px 12px 0;

  h3 {
    margin-bottom: 14px;
    font-size: 18px;
    font-weight: normal;
    line-height: 40px;
  }

  .preview {
    position: relative;
    border-radius: 3px;

    > div {
      width: 212px;
      height: 110px;
      overflow: hidden;
      background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);
    }

    &::before {
      content: '';
      position: absolute;
      top: -4px;
      right: -4px;
      bottom: -4px;
      left: -4px;
      border-radius: 2px;
      border: #ffe4d8 solid 5px;
      transition-duration: 0.3s;
      transition-property: transform border;
    }

    &:hover::before {
      transform: scale(1.05, 1.1);
    }
  }

  .touhou {
    img {
      margin: 10px;
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
      color: var(--primary-color);
    }
    .preview::before {
      border: var(--light-color) solid 5px;
    }
  }
}
</style>
