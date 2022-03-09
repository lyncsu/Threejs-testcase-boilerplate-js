import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import ShaderDebugUtil from './ShaderDebugUtil'

/**
 * Shader调试器类
 */
export class ShaderDebug {
  set renderer(renderer) {
    this.debugRenderer = renderer
  }

  get debugMaterial() {
    return this.debugRenderer.debugMaterial
  }

  /**
   * Shader调试器构造函数
   */
  constructor() {
    this.bindScope()
    this.init()
  }

  bindScope() {
    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseOut = this.onMouseOut.bind(this)
    this.onClick = this.onClick.bind(this)
  }

  init() {
    const textContainer = document.createElement('div')
    document.body.appendChild(textContainer)
    textContainer.id = 'text-container'
    textContainer.addEventListener('mouseover', this.onMouseOver)
    textContainer.addEventListener('mouseout', this.onMouseOut)
    textContainer.addEventListener('click', this.onClick)
    this.textContainer = textContainer

    const editorContainer = document.createElement('div')
    editorContainer.id = 'right-container'
    editorContainer.append(textContainer)
    document.body.appendChild(editorContainer)
  }

  onMouseOver(e) {
    if (!this.debugRenderer || !this.debugRenderer.debugMaterial) return
    const target = e.target
    if (target.tagName === 'SPAN') {
      const name = target.getAttribute('name')
      const index = Number(target.getAttribute('index')) || null
      const type = target.getAttribute('type')

      this.debugMaterial.setFragmentOutputVariable(name, type, index)
      this.debugRenderer.enableDebug = true
    }
  }

  onMouseOut(e) {
    if (!this.debugRenderer || !this.debugRenderer.debugMaterial) return
    if (e.target.tagName === 'SPAN') {
      if (this.savedVars) {
        this.debugMaterial.setFragmentOutputVariable(...this.savedVars)
      } else {
        this.debugMaterial.clearOutputVariable()
        this.debugRenderer.enableDebug = false
      }
    }
  }

  onClick(e) {
    if (!this.debugRenderer || !this.debugRenderer.debugMaterial) return
    const prevSelected = document.querySelector('.selected')
    if (prevSelected) {
      prevSelected.classList.remove('selected')
    }

    const target = e.target
    if (target.tagName === 'SPAN') {
      const name = target.getAttribute('name')
      const index = Number(target.getAttribute('index')) || null
      const type = target.getAttribute('type')
      this.savedVars = [name, type, index]
      target.classList.add('selected')
    } else {
      this.debugMaterial.clearOutputVariable()
      this.savedVars = null
      this.debugRenderer.enableDebug = false
    }
  }

  /**
   * 更新调试代码视窗
   */
  update() {
    if (!this.debugRenderer || !this.debugRenderer.debugMaterial) return

    const { varyings, attributes, uniforms, localVariables, includes } = this.debugMaterial.fragmentDefinitions
    const variables = [...varyings, ...attributes, ...uniforms, ...localVariables]
    const replaceIndices = []
    const commentIndices = []

    let fragmentShader = this.debugMaterial.fragmentShader
    // 除去注释
    fragmentShader = fragmentShader.replace(/\/\/(.*)?\n/g, function (match, content) {
      return '//' + content.replace(/./g, ' ') + '\n'
    })
    fragmentShader = ShaderDebugUtil.replaceMainIncludes(fragmentShader, includes)
    variables.sort((a, b) => b.length - a.length)
    variables.forEach(v => {
      const name = v.name
      const type = v.type
      const prefix = v.prefix
      const regex = new RegExp(`([^\\w<>"\\.])${name}([^\\w<>"])`, 'g')
      // 查找变量所在的索引
      let lastResult
      while ((lastResult = regex.exec(fragmentShader))) {
        const semiRegex = /;/g
        semiRegex.lastIndex = lastResult.index
        semiRegex.exec(fragmentShader)
        replaceIndices.push({
          name,
          type,
          prefix,
          before: lastResult.index + 1,
          after: lastResult.index + 1 + name.length,
          insertIndex: semiRegex.lastIndex,
        })
      }
    })

    let accumOffset = 0
    let resultShader = this.debugMaterial.fragmentShader
    resultShader = ShaderDebugUtil.replaceMainIncludes(resultShader, includes)
    replaceIndices.sort((a, b) => a.before - b.before)
    replaceIndices.forEach(info => {
      const { name, type, prefix, before, after, insertIndex } = info
      const arr = ['float', 'bool', 'int', 'vec2', 'vec3', 'vec4']
      const replacing = resultShader.substr(before + accumOffset, after - before)
      if (replacing === name && arr.includes(type)) {
        const insert = `<span
            title="${type} ${name}"
            index="${insertIndex}"
            name="${name}"
            type="${type}"
          >${name}</span>`.replace(/\n/g, '')
        const delta = insert.length - name.length
        resultShader = ShaderDebugUtil.splice(resultShader, insert, before + accumOffset, after - before)
        accumOffset += delta
      }
    })
    resultShader.replace(/<(\s+)>/, '&lt;$1&gt;')

    const mainRegex = /^([\s\S]*)?void(\s+)main/g
    resultShader = resultShader.replace(mainRegex, 'void$2main')

    const lines = resultShader.split(/\n/g)
    this.textContainer.innerHTML = lines
      .map(line => {
        return `<div${line.indexOf('//') === -1 ? '' : ' class="comment"'}>${line || '&nbsp;'}</div>`
      })
      .join('')
  }
}
