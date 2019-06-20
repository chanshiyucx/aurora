export default {
  /**
   * ========================================
   *               站点功能【必需】
   * ========================================
   **/

  /**
   * 站点标题
   */
  title: "MiyueSC Official Blog",
  subTitle: "",
  /**
   * Github Issues 配置【文章、说说、书单、友链】
   */
  username: "miyuesc", // github 用户名
  repository: "blog", // 文章仓库地址
  // token 从中间任意位置拆开成两部分，避免 github 代码检测失效
  token: ["5abe3a9d4db78b317a4", "090e160f4626e1a6ec84c"],

  /**
   * Gitalk 配置【评论功能】，详细文档参见：https://github.com/gitalk/gitalk
   */
  gitalk: {
    clientID: "456cb49191e9fe7bba1d",
    clientSecret: "f5bcfa9bf9c55b25a644975cfece6c0e4e3fd985",
    repo: "Comment", // 评论仓库地址
    owner: "miyuesc",
    admin: ["miyuesc"],
    distractionFreeMode: false // 是否开始无干扰模式【背景遮罩】
  },

  /**
   * leancloud 配置 【文章浏览次数】
   */
  leancloud: {
    appId: "WjYf487MObMry0cHSYl81Go4-gzGzoHsz",
    appKey: "NNN0MuqGdFH1CLzJRgeU0amH"
  },

  /**
   * 导航 配置
   */
  menus: [
    {
      path: "/",
      label: "Home",
      icon: "icon_homepage"
    },
    {
      path: "/Blog",
      label: "Blog",
      icon: "icon_file"
    },
    {
      path: "/tag",
      label: "Tag",
      icon: "icon_synergy"
    },
    {
      path: "/archive",
      label: "Archive",
      icon: "icon_timeline"
    },
    {
      path: "/about",
      label: "About",
      icon: "icon_warn"
    }
  ]
};
