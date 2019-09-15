module.exports = {
  productionSourceMap: false,
  chainWebpack(config) {
    const cdn = {
      css: ['//fonts.googleapis.com/css?family=Noto+Serif+SC'],
      js: [
        '//cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.min.js',
        '//cdn.jsdelivr.net/npm/jquery-backstretch@2.1.17/jquery.backstretch.min.js'
      ]
    }
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
  }
}
