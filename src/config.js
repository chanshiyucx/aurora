/**
 * Aurora 主题配置文件
 * 食用指南：https://github.com/chanshiyucx/blog/issues/41
 * 联系作者：Blog https://chanshiyu.com      QQ 1124590931
 */

export default {
  /**
   * =========================================================
   *                      站点功能【必需】
   * =========================================================
   */

  /**
   * 站点标题
   */
  title: '鹿鸣人',
  subtitle: '呦呦鹿鸣 食野之苹',

  /**
   * Github Issues 配置
   */
  username: 'iamsonglu', // github 用户名
  repository: 'blog', // 文章仓库地址
  
  token: ['ghp_ECezr5v8BicQXo0B', 'WS16nuirRZYcQT3QAtYt '],
  // token: ['0ad1a0539c5b96fd18fa', 'aaafba9c7d1362a5746c']
  // token 从中间任意位置拆开成两部分，避免 github 代码检测失效

  /**
   * Gitalk 配置，文档详见：https://github.com/gitalk/gitalk
   */
  gitalk: {
    clientID: '73cb7d56a480069af667',
    clientSecret: '5c344a98ac20ff12cbe555855ac6e79d94b597b5',
    repo: 'comment', // 评论仓库地址
    owner: 'iamsonglu',
    admin: ['iamsonglu'],
    distractionFreeMode: false, // 是否开始无干扰模式【背景遮罩】
    proxy: 'https://bokegitalkcors.herokuapp.com/https://github.com/login/oauth/access_token',
  },

  /**
   * leancloud 配置 【注意切换为国际版】
   */
  leancloud: {
    appId: 'of6DT79PpzLIV4U6GSQpwGHX-MdYXbMMI',
    appKey: '1c1l8GCvD4YPHLNabmBtz7Eg',
  },

  /**
   * =========================================================
   *                        页面设置
   * =========================================================
   */

  /**
   * 归档页面
   */
  archiveOpts: {
    display: true, // 是否显示该页面
    enableComment: false, // 是否开启评论功能
    qoute: '秩秩斯幹，幽幽南山', // 页面顶部一言
  },

  /**
   * 分类页面
   */
  categoryOpts: {
    display: true,
    enableComment: false,
    qoute: '山有嘉卉，侯栗侯梅',
  },

  /**
   * 标签配置
   */
  tagOpts: {
    display: true,
    enableComment: false,
    qoute: '雝雝鸣鴈，旭日始旦',
  },

  /**
   * 灵感页面
   */
  inspirationOpts: {
    display: true,
    enableComment: true,
    qoute: '雨雪瀌瀌，见晛日消',
  },

  /**
   * 书单页面
   */
  bookOpts: {
    display: true,
    enableComment: true,
    qoute: '春日载阳，有鸣仓庚',
  },

  /**
   * 友链页面
   */
  friendOpts: {
    display: true,
    enableComment: true,
    qoute: '青青子衿，悠悠我心',
  },

  /**
   * 关于页面
   */
  aboutOpts: {
    display: true,
    enableComment: true,
    qoute: '呦呦鹿鸣，食野之苹',
    avatar: '//cdn.jsdelivr.net/gh/iamsonglu/blogimg/blogs/iavatar_sl.jpg',
    graduated: 'Jilin University of Finance and Economics',
    intrduction: '业余程序爱好者，生命不止，折腾不息',
    contact: [
      {
        icon: '//cdn.jsdelivr.net/gh/iamsonglu/blogimg/blogs/email.png',
        link: 'http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=z7ygoaijurymj6mgt6KupqPhrKCi',
        
      },
      {
        icon: '//cdn.jsdelivr.net/gh/iamsonglu/blogimg/blogs/github.png',
        link: 'https://github.com/iamsonglu',
      },
     /*
      {
        icon: '//cdn.jsdelivr.net/gh/iamsonglu/blogimg/blog/music.png',
        link: 'https://music.163.com/#/user/home?id=103060582',
      },
      
      {
        icon: '//cdn.jsdelivr.net/gh/iamsonglu/blogimg/blog/telegram.png',
        link: 'https://t.me/chan_shi_yu',
      },
      {
        icon: '//cdn.jsdelivr.net/gh/chanshiyucx/yoi/blog/twitter.png',
        link: 'https://twitter.com/chanshiyucx',
      },*/
      // {
      //   icon: '//cdn.jsdelivr.net/gh/chanshiyucx/yoi/blog/rsshub.png',
      //   link: 'https://rsshub.app/github/issue/chanshiyucx/blog',
      // },
    ],
  },

  /**
   * =========================================================
   *                         主题自定义
   * =========================================================
   */

  /**
   * 加载动画
   */
  loadingImg: '//cdn.jsdelivr.net/gh/iamsonglu/blogimg/blogs/loading_pink.gif',

  /**
   * 文章默认图,jpej格式不行，只要是1920*1080的图片，修改尺寸后就是1200*675
   */
  defaultCover: '//cdn.jsdelivr.net/gh/iamsonglu/blogimg/bd/defaultCover_2.jpg',

  /**
   * 赛钱箱
   */
  qrcode: [
    {
      name: '支付宝',
      img: '//cdn.jsdelivr.net/gh/iamsonglu/blogimg/blogs/zfb_sl.png',
    },
    {
      name: '微信',
      img: '//cdn.jsdelivr.net/gh/iamsonglu/blogimg/blogs/wx_sl.png',
    },
  ],

  /**
   * 音乐播放器,
   */
  APlayer: [
    {
      name: 'うたかたの风と蝉时雨',
      artist: 'Little Planet',
      url: 'https://files.catbox.moe/wo7zjt.mp3',
      cover: '//cdn.jsdelivr.net/gh/iamsonglu/blogimg/blogs/cover1.jpg',
    },
    {
      name: '春の凑に',
      artist: 'TUMENECO',
      url: 'https://files.catbox.moe/ducy49.mp3',
      cover: '//cdn.jsdelivr.net/gh/iamsonglu/blogimg/blogs/cover2.jpg',
    },
    {
      name: '夏阳炎',
      artist: '天威梦方',
      url: 'https://files.catbox.moe/7migen.mp3',
      cover: '//cdn.jsdelivr.net/gh/iamsonglu/blogimg/blogs/cover3.jpg',
    },
    {
      name: '秋风のとおり道',
      artist: '风神华伝',
      url: 'https://files.catbox.moe/b58fq6.mp3',
      cover: '//cdn.jsdelivr.net/gh/iamsonglu/blogimg/blogs/cover4.jpg',
    },
    {
      name: '冬のわすれもの',
      artist: 'ハルノカゼ',
      url: 'https://files.catbox.moe/vwnawp.mp3',
      cover: '//cdn.jsdelivr.net/gh/iamsonglu/blogimg/blogs/cover5.jpg',
    },
  ],

  /**
   * 主题配色，主要用于文章、灵感、关于等卡片配色
   * 推荐一个超棒的取色站，日本の伝統色：http://nipponcolors.com/
   */
  themeColors: [
    '#B28FCE', // 薄
    '#86C166', // 苗
    '#F596AA', // 桃
    '#F19483', // 曙
    '#F9BF45', // 玉子
    '#FAD689', // 浅黄
    '#E79460', // 洗柿
    '#2EA9DF', // 露草
    '#FB966E', // 洗朱
    '#BC9F77', // 白茶
    '#867835', // 黄海松茶
    '#B9887D', // 水がき
  ],
}
