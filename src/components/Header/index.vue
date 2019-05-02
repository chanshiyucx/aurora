<template>
  <div id="header">
    <div class="inner">
      <RouterLink class="title" to="/">{{ $config.title }}</RouterLink>
      <span class="subtitle">{{ $config.subtitle }}</span>
      <ul>
        <li v-for="menu in displayMenus" :key="menu.name">
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
    const { archiveOpts, categoryOpts, tagOpts, moodOpts, bookOpts, friendOpts, aboutOpts } = this.$config
    return {
      menus: [
        { name: '/', display: true, icon: 'shop', title: '首页' },
        { name: '/archive', display: archiveOpts.display, icon: 'inbox', title: '归档' },
        { name: '/category', display: categoryOpts.display, icon: 'bookmark-empty', title: '分类' },
        { name: '/tag', display: tagOpts.display, icon: 'tag', title: '标签' },
        { name: '/mood', display: moodOpts.display, icon: 'comment', title: '心情' },
        { name: '/book', display: bookOpts.display, icon: 'pencil', title: '书单' },
        { name: '/friend', display: friendOpts.display, icon: 'heart', title: '友链' },
        { name: '/about', display: aboutOpts.display, icon: 'universal-access', title: '关于' }
      ]
    }
  },
  computed: {
    displayMenus() {
      return this.menus.filter(o => o.display)
    }
  }
}
</script>

<style lang="less" scope>
@import './index.less';
</style>
