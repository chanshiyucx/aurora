module.exports = {
  productionSourceMap: false,
  chainWebpack(config) {
    const cdn = {
      css: [
        '//fonts.googleapis.com/css?family=Noto+Serif+SC',
        '//cdn.jsdelivr.net/npm/lightgallery.js@1.1.2/dist/css/lightgallery.min.css'
      ],
      js: [
        '//cdn.jsdelivr.net/npm/lightgallery.js@1.1.2/dist/js/lightgallery.min.js',
        '//cdn.jsdelivr.net/npm/lg-autoplay.js@1.0.0/dist/lg-autoplay.min.js',
        '//cdn.jsdelivr.net/npm/lg-pager.js@1.0.0/dist/lg-pager.min.js',
        '//cdn.jsdelivr.net/npm/lg-zoom.js@1.0.1/dist/lg-zoom.min.js',
        '//cdn.jsdelivr.net/npm/lg-thumbnail.js@1.1.0/dist/lg-thumbnail.min.js',
        '//cdn.jsdelivr.net/npm/lg-fullscreen.js@1.1.0/dist/lg-fullscreen.min.js'
      ]
    }
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
  }
}
