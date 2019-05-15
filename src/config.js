/**
 * Aurora 主题配置文件
 * 食用指南：https://github.com/chanshiyucx/blog/issues/41
 * 联系作者：Blog https://chanshiyu.com     QQ 1124590931
 */

export default {
  /**
   * ========================================
   *               站点功能【必需】
   * ========================================
   **/

  /**
   * 站点标题
   */
  title: '弥月',
  subtitle: '梦醒时分 月当此时明',

  /**
   * Github Issues 配置【文章、说说、书单、友链】
   */
  username: 'miyuesc', // github 用户名
  //repository: 'blog', // 文章仓库地址
  // token 从中间任意位置拆开成两部分，避免 github 代码检测失效
  //token: ['0ad1a0539c5b96fd18fa', 'aaafba9c7d1362a5746c'],

  /**
   * Gitalk 配置【评论功能】，详细文档参见：https://github.com/gitalk/gitalk
   */
  gitalk: {
    clientID: '864b1c2cbc4e4aad9ed8',
    clientSecret: '6ca16373efa03347e11a96ff92e355c5cea189bb',
    repo: 'Comment', // 评论仓库地址
    owner: 'chanshiyucx',
    admin: ['chanshiyucx'],
    distractionFreeMode: false // 是否开始无干扰模式【背景遮罩】
  },

  /**
   * leancloud 配置 【文章浏览次数】
   */
  leancloud: {
    appId: 'b6DWxsCOWuhurfp4YqbD5cDE-gzGzoHsz',
    appKey: 'h564RR5uVuJV5uSeP7oFTBye'
  },

  /**
   * ========================================
   *                页面设置
   * ========================================
   */

  /**
   * 归档页面
   */
  archiveOpts: {
    display: true, // 是否显示该页面
    enableComment: false, // 是否开启评论功能
    qoute: '文章千古事，得失寸心知' // 页面顶部一言
  },

  /**
   * 分类页面【与 Github Issues 的 Milestone 对应】
   */
  categoryOpts: {
    display: true,
    enableComment: false,
    qoute: '华枝春满，天心月圆'
  },

  /**
   * 标签配置
   */
  tagOpts: {
    display: true,
    enableComment: false,
    qoute: '列卒周匝，星罗云布'
  },

  /**
   * 心情页面
   */
  moodOpts: {
    display: true,
    enableComment: true,
    qoute: '欲言又止，止言又欲'+
  },

  /**
   * 书单页面
   */
  bookOpts: {
    display: true,
    enableComment: true,
    qoute: '吾生也有涯，而知也无涯'
  },

  /**
   * 友链页面
   */
  friendOpts: {
    display: true,
    enableComment: true,
    qoute: '青青子衿，悠悠我心'
  },

  /**
   * 关于页面
   */
  aboutOpts: {
    display: true,
    enableComment: true,
    qoute: '蝉鸣如雨，花宵道中',
    avatar: 'https://i.loli.net/2018/12/09/5c0cc2b4e0195.png',
    graduated: 'University of Electronic Science and Technology of China (UESTC)',
    college: 'Communication&Information Engineering',
    // 联系方式，可自由添加
    contact: [
      {
        icon: 'https://i.loli.net/2019/01/25/5c4b2a7558ad7.png',
        link: 'http://mail.qq.com/cgi-bin/qm_share?t=qm_mailme&email=tNnR9Nfc1drH3N3NwZrX29k'
      },
      {
        icon: 'https://i.loli.net/2019/01/25/5c4b2982b5687.png',
        link: 'https://github.com/chanshiyucx'
      },
      {
        icon: 'https://i.loli.net/2018/12/09/5c0cc518dc4f4.png',
        link: 'https://www.zhihu.com/people/ichanshiyu/activities'
      },
      {
        icon: 'https://i.loli.net/2018/12/09/5c0cc51ae4f0c.png',
        link: 'https://music.163.com/#/user/home?id=103060582'
      }
    ]
  },

  /**
   * ========================================
   *                主题自定义
   * ========================================
   */

  /**
   * 赛钱箱
   */
  qrcode: [
    {
      name: '支付宝',
      img: 'https://i.loli.net/2019/04/27/5cc4744a2b0d2.png'
    },
    {
      name: '微信',
      img: 'https://i.loli.net/2019/04/27/5cc4707401e0a.png'
    }
  ],

  /**
   * 加载动画
   */
  loadingImg: 'https://i.loli.net/2018/12/15/5c14be28964d2.gif',

  /**
   * 文章默认图
   */
  defaultCover: 'https://i.loli.net/2019/01/24/5c49bd8dad2f5.jpg',

  /**
   * 背景特效，请酌量食用
   */
  effect: {
    firework: true, // 点击烟花特效
    fairyDustCursor: false // 光标小星星特效
  },

  /**
   * 音乐播放器,
   */
  APlayer: [
    {
      name: 'うたかたの风と蝉时雨',
      artist: 'Little Planet',
      url: 'https://files.catbox.moe/wo7zjt.mp3',
      cover: 'https://i.loli.net/2018/12/09/5c0cc3ca1081b.jpg'
    },
    {
      name: '春の凑に',
      artist: 'TUMENECO',
      url: 'https://files.catbox.moe/ducy49.mp3',
      cover: 'https://i.loli.net/2018/12/11/5c0f196d01a3a.jpg'
    },
    {
      name: '夏阳炎',
      artist: '天威梦方',
      url: 'https://files.catbox.moe/7migen.mp3',
      cover: 'https://i.loli.net/2018/12/09/5c0cc3cee372a.jpg'
    },
    {
      name: '秋风のとおり道',
      artist: '风神华伝',
      url: 'https://files.catbox.moe/b58fq6.mp3',
      cover: 'https://i.loli.net/2018/12/09/5c0cc3d13844a.jpg'
    },
    {
      name: '冬のわすれもの',
      artist: 'ハルノカゼ',
      url: 'https://files.catbox.moe/vwnawp.mp3',
      cover: 'https://i.loli.net/2018/12/09/5c0cc3d36349c.jpg'
    }
  ],

  /**
   * 主题配色，目前主要用于文章、说说、关于等卡片配色，以后可能会有其他用途
   * 推荐一个好看的取色站，日本の伝統色：http://nipponcolors.com/
   */
  themeColors: [
    '#B28FCE', // 薄
    '#86C166', // 苗
    '#F9BF45', // 玉子
    '#FAD689', // 浅黄
    '#F596AA', // 桃
    '#E79460', // 洗柿
    '#2EA9DF', // 露草
    '#FFBA84', // 洒落柿
    '#7DB9DE', // 勿忘草
    '#FF99FF'
  ]
}
