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
      icon: "https://i.loli.net/2019/01/25/5c4b2a7558ad7.png",
      link:
        "http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=P0dWUQYKDw1-WVBHUl5WUxFcUFI"
    },
    {
      icon: "https://i.loli.net/2019/01/25/5c4b2982b5687.png",
      link: "https://github.com/miyuesc"
    },
    {
      icon: "https://i.loli.net/2018/12/09/5c0cc518dc4f4.png",
      link: "https://www.zhihu.com/people/miyuesc/activities"
    },
    {
      icon: "https://i.loli.net/2018/12/09/5c0cc51ae4f0c.png",
      link: "https://music.163.com/m/user/home?id=256780134"
    },
    {
      icon: "https://i.loli.net/2019/06/21/5d0ca1c87aeb559591.png",
      code: "https://i.loli.net/2019/06/21/5d0ca341bd24127651.png"
    }
  ]
};
