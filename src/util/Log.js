/**
 * 日志样式
 */
class LogStyle {
  static GREEN = 'background:#32cd85;color:#ffffff;padding:2px 7px 2px 3px;margin-right:7px;'
  static BLUE_BACKGROUND = 'background:#e9eff6;padding:2px 0px 2px 0px'
  static YELLOW = 'background:#fffbdb;color:#5c3c00;padding-left:3px;padding-right:7px'
  static RED = 'background:#fff0f0;color:#ff0000;padding-left:3px;padding-right:7px'
  static DEFAULT = 'color:#000000;padding-left:3px;padding-right:7px'
}

/**
 * 日志类
 */
class Log {
  /**
   * 日志级别打印
   * @param  {...any} rest
   * @returns
   */
  info() {
    const args = [].slice.call(arguments)
    console.info(...this._parse([[`%c${args.shift()} →%c`, LogStyle.GREEN], ...args]))
  }

  /**
   *
   * @param {*} text
   * @returns
   */
  green(text) {
    return [`%c${text}%c`, LogStyle.GREEN]
  }

  /**
   * 蓝底
   * @param {*} text
   */
  blueBg(text) {
    return [`%c${text}%c`, LogStyle.BLUE_BACKGROUND]
  }

  /**
   * 解析样式
   * @param {*} args
   */
  _parse() {
    const result = { content: '', style: [] }
    const style = []
    const args = [].concat(...arguments)
    args.forEach((child) => {
      if (child instanceof Array) {
        // 如果%c出现2次
        const reg = /(%c)[^\2]{0,}\1/g
        if (reg.test(String(child[0]))) {
          result.content += child[0]
          style.push(child[1])
          style.push('')
        }
      } else {
        result.content += child
      }
    })
    style.forEach((item) => {
      result.style.push(item)
    })

    return [result.content, ...result.style]
  }
}

export default new Log()
