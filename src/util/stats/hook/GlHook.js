/**
 * DrawCall计数钩子
 */
export class GlHook {
  _drawCall = -1
  _originalGlDrawElements
  _originalGlDrawArrays

  /**
   * GL计数钩子构造函数
   * @param glContext 原生gl对象
   */
  constructor(glContext, info) {
    if (!glContext || !glContext.drawElements) return
    this.glContext = glContext
    // 如果有rendererInfo
    if (info) {
      this.info = info
      this.hasInfo = true
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
   * 重置
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
}
