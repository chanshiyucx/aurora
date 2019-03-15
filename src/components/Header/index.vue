<template>
  <div id="header">
    <div class="inner">
      <RouterLink class="title" to="/">{{ $config.title }}</RouterLink>
      <span class="subtitle">{{ $config.subtitle }}</span>
      <ul>
        <li v-for="menu in menus" :key="menu.name">
          <RouterLink :class="['icon', `icon-${menu.icon}`]" :to="menu.name">{{ menu.title }}</RouterLink>
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
      menus: [
        { name: '/', icon: 'shop', title: '首页' },
        { name: '/archive', icon: 'inbox', title: '归档' },
        { name: '/category', icon: 'bookmark-empty', title: '分类' },
        { name: '/tag', icon: 'tag', title: '标签' },
        { name: '/mood', icon: 'comment', title: '心情' },
        { name: '/book', icon: 'pencil', title: '书单' },
        { name: '/friend', icon: 'heart', title: '友链' },
        { name: '/about', icon: 'universal-access', title: '关于' }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="less" scope>
@import './index.less';
</style>
