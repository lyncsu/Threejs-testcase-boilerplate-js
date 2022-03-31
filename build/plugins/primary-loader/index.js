const { dom, css, script } = require('./default')

/**
 * 原初加载器
 * @description 在webpack模块之前的一段白屏时间显示加载样式
 */
class PrimaryLoader {
  /**
   * 原初加载器构造函数
   * @param {*} params
   */
  constructor(params) {
    const finalParams = { showText: true, delay: 0 }
    Object.assign(finalParams, params)
    this.showText = finalParams.showText
    this.showSpiner = finalParams.showSpiner
    this.delay = finalParams.delay
    // console.log('Hello PrimaryLoader', finalParams)
  }

  /**
   * webpack apply
   * @param {*} compiler
   */
  apply(compiler) {
    if (compiler.hooks) {
      compiler.hooks.compilation.tap('HtmlWebpackPluginHooks', compilation => {
        const htmlWebpackPluginAfterEmit = (htmlPluginData, callback) => {
          const { outputName } = htmlPluginData
          const cssToPrepend = css
          const scriptToAppend = script.replace(
            `new PrimaryLoader()`,
            `new PrimaryLoader({ showText: ${this.showText}, delay: ${this.delay}})`
          )
          let html = compilation.assets[outputName].source()
          html = html.replace(/\<body>/g, `${cssToPrepend}<body>`)
          html = html.replace(/\<body>/g, `<body>${dom}${scriptToAppend}`)
          compilation.assets[outputName].source = () => html

          if (callback) {
            callback(null, htmlPluginData)
          } else {
            return Promise.resolve(htmlPluginData)
          }
        }
        compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync('PrimaryLoader', htmlWebpackPluginAfterEmit)
      })
    }
  }
}

module.exports = PrimaryLoader
