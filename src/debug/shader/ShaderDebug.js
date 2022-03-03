import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

/**
 * Shader调试器类
 */
export class ShaderDebug {
  /**
   * Shader调试器构造函数
   */
  constructor() {
    this.init()

    this.bindScope()
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
  }

  onMouseOver(e) {
    const target = e.target
    if (target.tagName === 'SPAN') {
      const name = target.getAttribute('name')
      const index = Number(target.getAttribute('index')) || null
      const type = target.getAttribute('type')

      debugMaterial.setFragmentOutputVariable(name, type, index)
      renderer.enableDebug = true
    }
  }

  onMouseOut(e) {
    if (e.target.tagName === 'SPAN') {
      if (savedVars) {
        debugMaterial.setFragmentOutputVariable(...savedVars)
      } else {
        debugMaterial.clearOutputVariable()
        renderer.enableDebug = false
      }
    }
  }

  onClick(e) {
    const prevSelected = document.querySelector('.selected')
    if (prevSelected) {
      prevSelected.classList.remove('selected')
    }

    const target = e.target
    if (target.tagName === 'SPAN') {
      const name = target.getAttribute('name')
      const index = Number(target.getAttribute('index')) || null
      const type = target.getAttribute('type')
      savedVars = [name, type, index]
      target.classList.add('selected')
    } else {
      debugMaterial.clearOutputVariable()
      savedVars = null
      renderer.enableDebug = false
    }
  }
}
