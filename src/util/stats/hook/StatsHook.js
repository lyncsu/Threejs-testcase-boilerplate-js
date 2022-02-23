import { GlHook } from './GlHook'
import { TextureHook } from './TextureHook'

/**
 * 统计钩子类
 */
export class StatsHook {
  /**
   * 钩子构造函数
   * @param {*} glContext
   */
  constructor(glContext, info) {
    this._glHook = new GlHook(glContext, info)
    this._textureHook = new TextureHook(glContext)
  }

  /**
   * 更新计数
   */
  update() {
    // if (this.drawCallPanel) this.drawCallPanel.update(this.hook.deltaDrawCall, Math.max(500, this.hook.maxDeltaDrawCall))
    // if (this._texturePanel) this._texturePanel.update(this.hook.textureCount, Math.max(20, this.hook.maxTextureCount))
    // this._stats.update()
  }

  /**
   * 重置
   */
  reset() {
    if (this._glHook) this._glHook.reset()
    if (this._textureHook) this._textureHook.reset()
  }

  /**
   * 解绑hook
   */
  dispose() {
    if (this._glHook) this._glHook.dispose()
    if (this._textureHook) this._textureHook.dispose()
  }

  /**
   * 获取绘制次数
   */
  get drawCall() {
    return this._glHook.drawCall
  }

  /**
   * drawcall差值
   */
  get deltaDrawCall() {
    // 如果已注册info直接返回
    if (this._glHook && this._glHook.hasInfo) return this._glHook.drawCall

    if (this._drawCall === -1) {
      this._drawCall = this.drawCall
      return 0
    }

    const delta = this.drawCall - this._drawCall
    this._drawCall = this.drawCall
    this._maxDeltaDrawCall = Math.max(this._maxDeltaDrawCall, delta)
    return delta
  }

  /**
   * 材质数量
   */
  get textureCount() {
    if (this._textureHook) return this._textureHook.textureCount

    return 0
  }

  /**
   * 最大材质数量
   */
  get maxTextureCount() {
    if (this._textureHook) return this._textureHook.maxTextureCount
    return 0
  }
}
