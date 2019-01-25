<template>
  <div id="header">
    <div class="inner">
      <RouterLink class="title" to="home">{{ $config.title }}</RouterLink>
      <span class="subtitle">{{ $config.subtitle }}</span>
      <ul>
        <li v-for="menu in menus" :key="menu.name">
          <RouterLink :class="['icon', `icon-${menu.icon}`]" :to="menu.name">{{
            menu.title
          }}</RouterLink>
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
        { name: 'archive', icon: 'shop', title: '归档' },
        { name: 'categorie', icon: 'shop', title: '分类' },
        { name: 'tag', icon: 'shop', title: '标签' },
        { name: 'mood', icon: 'heart', title: '心情' },
        { name: 'book', icon: 'pencil', title: '书单' },
        { name: 'friend', icon: 'shop', title: '友链' },
        { name: 'about', icon: 'shop', title: '关于' }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="less" scope>
@import './index.less';
</style>
