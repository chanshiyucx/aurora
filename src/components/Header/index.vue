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

      <div
        style="border-radius: 10px 10px 10px 10px;font-size:13px;    color: #555555;width: 666px;font-family:'Century Gothic','Trebuchet MS','Hiragino Sans GB',微软雅黑,'Microsoft Yahei',Tahoma,Helvetica,Arial,'SimSun',sans-serif;margin:50px auto;border:1px solid #eee;max-width:100%;background: #ffffff repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);"
      >
        <div
          style="width:100%;background:#49BDAD;color:#ffffff;border-radius: 10px 10px 0 0;background-image: -moz-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));background-image: -webkit-linear-gradient(0deg, rgb(67, 198, 184), rgb(255, 209, 244));height: 66px;"
        >
          <p
            style="font-size:15px;word-break:break-all;padding: 23px 32px;margin:0;background-color: hsla(0,0%,100%,.4);border-radius: 10px 10px 0 0;"
          >
            <a style="text-decoration:none;color: #ffffff;" href="${SITE_URL}">您的小站『${SITE_NAME}』</a
            >上有新评论啦！
          </p>
        </div>
        <div style="margin:40px auto;width:90%">
          <p>『${NICK}』发表评论：</p>
          <div
            style="background: #fafafa repeating-linear-gradient(-45deg,#fff,#fff 1.125rem,transparent 1.125rem,transparent 2.25rem);box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);margin:20px 0px;padding:15px;border-radius:5px;font-size:14px;color:#555555;"
          >
            ${COMMENT}
          </div>
          <p>
            您可以点击<a style="text-decoration:none; color:#12addb" href="${POST_URL}#comments"
              >查看回复的完整內容</a
            >，欢迎再次光临<a style="text-decoration:none; color:#12addb" href="${SITE_URL}">${SITE_NAME}</a
            >。
          </p>
          <style type="text/css">
            a:link {
              text-decoration: none;
            }
            a:visited {
              text-decoration: none;
            }
            a:hover {
              text-decoration: none;
            }
            a:active {
              text-decoration: none;
            }
          </style>
        </div>
      </div>
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
