export default class ShaderDebugUtil {
  /**
   * 切割字符串
   * @param {*} str
   * @param {*} newSubStr
   * @param {*} start
   * @param {*} delCount
   * @returns
   */
  static splice(str, newSubStr, start, delCount = 0) {
    return str.slice(0, start) + newSubStr + str.slice(start + delCount)
  }

  /**
   * 解析全局变量
   * @param {*} prefix
   * @param {*} text
   * @returns
   */
  static parseGlobals(prefix, text) {
    // Find the declarations
    const result = []
    const regex = new RegExp(`${prefix}\\s+(\\w+)?\\s+(\\w+)?\\s*;`, 'g')

    let lastResult = null
    while ((lastResult = regex.exec(text))) {
      const type = lastResult[1]
      const name = lastResult[2]
      result.push({
        index: lastResult.index + lastResult[0].length - 1,
        type,
        name,
        prefix,
      })
    }

    return result
  }

  /**
   * 获取主函数内部局部变量
   * @param {*} text
   * @returns
   */
  static parseLocalVariables(text) {
    const result = []
    const mainRegex = /void\s*main\s*\(.*?\)[\s\S]*\{/
    const startIndex = mainRegex.exec(text).index

    const braceRegex = /[{}]/g
    braceRegex.lastIndex = startIndex

    let lastResult = null
    let braceIndices = [startIndex]
    while ((lastResult = braceRegex.exec(text)) && braceIndices.length !== 0) {
      const brace = lastResult[0]
      if (brace === '{') {
        braceIndices.push(lastResult.index)
      } else {
        const startIndex = braceIndices.pop()
        const endIndex = lastResult.index

        result.push(...this.parseDeclarations(text, startIndex, endIndex))
        for (let i = 0, l = result.length; i < l; i++) {
          result[i].scope = braceIndices.length
        }

        const content = text.substr(startIndex, endIndex)
        const replaced = content.replace(/[^\n]/g, ' ')
        text = this.splice(text, replaced, startIndex, endIndex - startIndex + 1)
      }
    }

    // Sort the variables to be in line first order, character order next
    result.sort((a, b) => {
      return a.index - b.index
    })

    // Find any local variables tha didn't have types found
    for (let i = 0, l = result.length; i < l; i++) {
      const item = result[i]
      if (item.type === null) {
        const name = item.name
        for (let j = i; j >= 0; j--) {
          const otherItem = result[j]
          if (otherItem.scope <= item.scope && otherItem.name === name && otherItem.type) {
            item.type = otherItem.type
            break
          }
        }
      }
    }

    return result
  }

  /**
   * 解析变量声明
   * @param {*} body
   * @param {*} startIndex
   * @param {*} endIndex
   * @returns
   */
  static parseDeclarations(body, startIndex, endIndex) {
    body = body.substr(0, endIndex)

    const result = []
    const declarationRegex = /(vec[1234]|float|int|uint|bool)(.+)?;/g
    declarationRegex.lastIndex = startIndex
    let lastResult = null
    while ((lastResult = declarationRegex.exec(body))) {
      const line = lastResult[0]
      const type = lastResult[1]
      const rest = lastResult[2].replace(/\(.*?\)/g, '')
      const index = lastResult.index + line.length

      const splits = rest.split(',')
      for (let i = 0, l = splits.length; i < l; i++) {
        const item = splits[i]
        let name
        if (/=/.test(item)) {
          name = item.split('=')[0].trim()

          result.push({
            index,
            type,
            name,
            prefix: null,
          })
        }
      }
    }

    const semiRegexp = /;/g
    const setRegexp = /(\w+?)\s*=\s*\w+?(;|,)/g
    setRegexp.lastIndex = startIndex
    while ((lastResult = setRegexp.exec(body))) {
      const line = lastResult[0]
      const name = lastResult[1]

      semiRegexp.index = lastResult.index
      semiRegexp.exec(body)
      const index = semiRegexp.index + line.length

      result.push({
        index,
        type: null,
        prefix: null,
        name,
      })
    }

    // remove duplicates
    for (let i = 0; i < result.length; i++) {
      const item = result[i]
      for (let j = i + 1; j < result.length; j++) {
        const item2 = result[j]
        if (item.name === item2.name && item.line === item2.line && item.column === item2.column) {
          result.splice(j, 1)
          j--
        }
      }
    }

    return result
  }

  /**
   * 获取索引值
   * @param {*} text
   * @param {*} line
   * @param {*} column
   * @returns
   */
  static lineColToIndex(text, line, column) {
    const lines = text.split(/\n/g)
    if (line >= lines.length) return -1

    let result = 0
    for (let i = 0; i < line; i++) {
      const line = lines.shift()
      result += line.length + 1
    }

    result += column
    return result
  }

  /**
   * 获取作用域
   * @param {*} text
   * @param {*} index
   * @returns
   */
  static getScopeDepth(text, index) {
    const braceRegex = /[{}]/g
    let braceCount = 0
    let lastResult
    while ((lastResult = braceRegex.exec)) {
      if (lastResult.lastIndex > index) {
        return braceCount
      } else {
        if (lastResult[0] === '{') {
          braceCount++
        } else {
          braceCount--
        }
      }
    }

    return braceCount
  }

  /**
   * 获取括号内容
   * @param {*} text
   * @returns
   */
  static getMainExtents(text) {
    const mainRegex = /void\s*main\s*\(.*?\)[\s\S]*?\{/g
    const mainResult = mainRegex.exec(text)
    const braceRegex = /[{}]/g
    braceRegex.lastIndex = mainRegex.lastIndex + mainResult[0].length

    const before = mainRegex.lastIndex - mainResult[0].length
    const after = mainRegex.lastIndex
    let end = 0

    let braceCount = 1
    let lastResult
    while ((lastResult = braceRegex.exec(text))) {
      const brace = lastResult[0]
      if (brace === '{') {
        braceCount++
      } else {
        braceCount--
        if (braceCount === 0) {
          end = lastResult.index - 1
          break
        }
      }
    }

    return { before, after, end }
  }

  // 获取主程序内的uniforms, attributes, varyings等调试变量
  static parseVariables(text) {
    // If there's no main function lets bail
    const mainRegex = /void\s*main\s*\(.*?\)[\s\S]*\{/
    const matches = text.match(mainRegex)
    if (!matches) {
      return null
    }

    // Get the globals
    const varyings = this.parseGlobals('varying', text)
    const uniforms = this.parseGlobals('uniform', text)
    const attributes = this.parseGlobals('attribute', text)

    // Get the locals
    const localVariables = this.parseLocalVariables(text)
    const beforeMainIndex = matches.index
    const afterMainIndex = matches.index + matches[0].length

    return {
      varyings,
      uniforms,
      attributes,
      localVariables,
    }
  }
}
