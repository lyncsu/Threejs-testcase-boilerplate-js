/**
 * 材质计数钩子
 */
export class TextureHook {
  /**
   * GL计数钩子构造函数
   * @param glContext 原生gl对象
   * @param info three渲染器绘制信息
   */
  constructor(glContext, memoryInfo) {
    if (!glContext || !glContext.createTexture) return
    this.glContext = glContext
    this.textures = []
    // 使用threejs原生统计renderer.info.memory.texture
    if (memoryInfo) {
      this.info = memoryInfo
      return
    }

    this._originalGlCreateTexture = glContext.createTexture
    this._originalGlDeleteTexture = glContext.deleteTexture
    this.glContext.createTexture = this.createTexture.bind(this)
    this.glContext.deleteTexture = this.deleteTexture.bind(this)
  }

  /**
   * 劫持gl.createTexture创建材质
   */
  createTexture() {
    const texture = this._originalGlCreateTexture.call(this.glContext)
    console.info('createTexture', texture)
    this.textures.push(texture)
    return texture
  }

  /**
   * 劫持gl.deleteTexture删除材质
   */
  deleteTexture() {
    const index = this.textures.indexOf(texture)
    if (index === -1) return
    this.textures.splice(index, 1)
    this._originalGlDeleteTexture.call(this.glContext, texture)
  }

  /**
   * 重置计数
   */
  reset() {
    // if (this.textures) this.textures.length = 0
  }

  /**
   * 释放
   */
  dispose() {
    this.glContext.createTexture = this._originalGlCreateTexture
    this.glContext.deleteTexture = this._originalGlDeleteTexture
    this._originalGlDeleteTexture = null
    this._originalGlCreateTexture = null
    this.glContext = null
    this.textures = null
  }

  /**
   * 获取材质call
   */
  get textureCall() {
    return this.info ? (this._textureCall = this.info.textures) : this.textures.length
  }
}
