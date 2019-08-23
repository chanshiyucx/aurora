module.exports = {
  productionSourceMap: false,
  chainWebpack(config) {
    const cdn = {
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
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
  }
}
