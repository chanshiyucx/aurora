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
    clientID: "7115ac2208f62884d865", // GitHub Application Client ID
    clientSecret: "e5785cea183393a883212edd7a069ee220279f43", // GitHub Application Client Secret
    repo: "miyuesc.github.io", // 存放评论的仓库
    owner: "miyuesc", // 仓库的创建者，
    admin: ["miyuesc"], // 如果仓库有多个人可以操作，那么在这里以数组形式写出
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
    // {
    //   path: "/tag",
    //   label: "Tag",
    //   icon: "icon_synergy"
    // },
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
  ],

  /**
   * 首页背景图片 配置
   */
  homeBgs: [
    "http://ww1.sinaimg.cn/large/0067sbCSly1g4df43b60jj31hc0u0qhw.jpg",
    "http://ww1.sinaimg.cn/large/0067sbCSly1g4df1yby5mj31z4140avg.jpg",
    "http://ww1.sinaimg.cn/large/0067sbCSly1g4df4n9p9bj31hc0u045a.jpg",
    "http://ww1.sinaimg.cn/large/0067sbCSly1g4df5cdoujj31hc0u04qq.jpg",
    "http://ww1.sinaimg.cn/large/0067sbCSly1g4df5hfmnuj31hc0u011f.jpg"
  ],

  /**
   * 联系方式 配置
   */
  contact: [
    {
      icon: require("../assets/icons/mail-send-fill.svg"),
      link:
        "http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=P0dWUQYKDw1-WVBHUl5WUxFcUFI"
    },
    {
      icon: require("../assets/icons/github-fill.svg"),
      link: "https://github.com/miyuesc"
    },
    {
      icon: require("../assets/icons/zhihu-fill.svg"),
      link: "https://www.zhihu.com/people/miyuesc/activities"
    },
    {
      icon: require("../assets/icons/netease-cloud-music-fill.svg"),
      link: "https://music.163.com/m/user/home?id=256780134"
    },
    {
      icon: require("../assets/icons/wechat-fill.svg"),
      code: "http://ww1.sinaimg.cn/large/0067sbCSly1g4gtiwmudnj30gm0gr0uk.jpg"
    },
    {
      icon: require("../assets/icons/juejin.svg"),
      link: "https://juejin.im/user/5cdb5ff5f265da03904c3980"
    }
  ]
};
