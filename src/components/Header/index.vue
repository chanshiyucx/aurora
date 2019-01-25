<template>
  <div id="header">
    <div class="inner">
      <router-link class="title" to="home">{{ $config.title }}</router-link>
      <span class="subtitle">{{ $config.subtitle }}</span>
      <ul>
        <li v-for="menu in menus" :key="menu.name">
          <router-link :class="['icon', `icon-${menu.icon}`]" :to="menu.name">{{
            menu.title
          }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      menus: [{ name: 'home', icon: 'shop', title: '首页' }]
    }
  },
  methods: {}
}
</script>

<style lang="less" scope>
@import './index.less';
</style>
