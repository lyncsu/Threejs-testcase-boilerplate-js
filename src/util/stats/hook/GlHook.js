/**
 * DrawCall计数钩子
 */
export class GlHook {
  _drawCall = -1

  /**
   * GL计数钩子构造函数
   * @param glContext 原生gl对象
   * @param info three渲染器绘制信息
   */
  constructor(glContext, rendererInfo) {
    if (!glContext || !glContext.drawElements) return
    this.glContext = glContext
    // 使用threejs原生统计renderer.info.render
    if (rendererInfo) {
      this.info = rendererInfo
      return
    }

    // 记录原方法
    this._originalGlDrawElements = glContext.drawElements
    this._originalGlDrawArrays = glContext.drawArrays
    // 更新为hack方法
    this.glContext.drawElements = this.drawElements.bind(this)
    this.glContext.drawArrays = this.drawArrays.bind(this)
  }

  /**
   * 劫持原有gl.drawElements绘制方法
   */
  drawElements() {
    this._drawCall++
    this._originalGlDrawElements.call(this.glContext, ...arguments)
  }

  /**
   * 劫持原有gl.drawArray绘制方法
   */
  drawArrays() {
    this._drawCall++
    this._originalGlDrawArrays.call(this.glContext, ...arguments)
  }

  /**
   * 重置计数
   */
  reset() {
    this._drawCall = 0
  }

  /**
   * 还原被hack的方法
   */
  dispose() {
    this.glContext.drawElements = this._originalGlDrawElements
    this._originalGlDrawElements = null
    this.glContext.drawArrays = this._originalGlDrawArrays
    this._originalGlDrawArrays = null
    this.glContext = null
    this.drawCall = null
  }

  /**
   * 获取draw call 次数
   */
  get drawCall() {
    return this.info ? (this._drawCall = this.info.calls) : this._drawCall
  }

  /**
   * 面数
   */
  get faceCount() {
    return this.info ? this.info.triangles : 0
  }
}
