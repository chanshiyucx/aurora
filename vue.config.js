module.exports = {
  productionSourceMap: false,
  devServer: {
    // proxy: {
    //   '/api': {
    //     target: 'http://192.168.23.179:8016/',
    //     changeOrigin: true
    //   }
    // },
    port: 9000
  },
  chainWebpack(config) {
    const jsdelivrCDN = {
      css: [
        '//fonts.googleapis.com/css?family=Noto+Serif+SC',
        '//cdn.jsdelivr.net/npm/lightgallery@1.6.12/dist/css/lightgallery.min.css'
      ],
      js: [
        '//cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js',
        '//cdn.jsdelivr.net/npm/jquery-backstretch@2.1.17/jquery.backstretch.min.js',
        '//cdn.jsdelivr.net/npm/lightgallery@1.6.12/dist/js/lightgallery-all.min.js'
      ]
    }
    const bootCDN = {
      css: [
        '//fonts.googleapis.com/css?family=Noto+Serif+SC',
        '//cdn.bootcss.com/lightgallery/1.6.12/css/lightgallery.min.css'
      ],
      js: [
        'https://cdn.bootcss.com/jquery/3.4.0/jquery.slim.min.js',
        'https://cdn.jsdelivr.net/npm/lightgallery@1.6.12/dist/js/lightgallery-all.min.js',
        // 'https://cdn.bootcss.com/lightgallery/1.6.12/js/lightgallery-all.min.js',
        // 'https://cdn.bootcss.com/lightgallery/1.6.12/js/lightgallery.min.js',
        // 'https://cdn.bootcss.com/lg-autoplay/1.0.4/lg-autoplay.min.js',
        // 'https://cdn.bootcss.com/lg-pager/1.0.2/lg-pager.min.js',
        // 'https://cdn.bootcss.com/lg-zoom/1.1.0/lg-zoom.min.js',
        // 'https://cdn.bootcss.com/lg-thumbnail/1.1.0/lg-thumbnail.min.js',
        // 'https://cdn.bootcss.com/lg-fullscreen/1.1.0/lg-fullscreen.min.js'
      ]
    }
    /**
     * 因为bootCDN拉取的是CDNJS那里的，但是那里并没有增加不依赖jQuery的这些库，所以去提交issue，暂时不用bootcdn的
     * 或者引入jQuery
     */
    config.plugin('html').tap(args => {
      args[0].cdn = bootCDN
      return args
    })
  }
}
