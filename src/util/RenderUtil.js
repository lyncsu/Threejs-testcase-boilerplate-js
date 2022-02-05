import * as THREE from 'three'

/**
 * 记录主渲染器state
 */
const state = {
  clearColor: new THREE.Color(0x000000),
  clearAlpha: 1,
  autoClearDepth: true,
  autoClearStencil: true,
  autoClearColor: true,
  autoClear: true,
}

/**
 * 供拷贝用的场景三件套
 */
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
const scene = new THREE.Scene()
const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial())
scene.add(mesh)

/**
 * 渲染工具
 */
export class RenderUtil {
  /**
   * 检查可用性
   */
  static isDepthTextureAvaliable(renderer) {
    if (renderer.capabilities.isWebGL2 === false && renderer.extensions.get('WEBGL_depth_texture') === false) return false
    return true
  }

  /**
   * 保存渲染器状态
   * @param renderer
   */
  static saveRendererState(renderer) {
    state.autoClear = renderer.autoClear
    state.autoClearStencil = renderer.autoClearStencil
    state.autoClearColor = renderer.autoClearColor
    state.autoClearDepth = renderer.autoClearDepth
    state.clearAlpha = renderer.getClearAlpha()
    renderer.getClearColor(state.clearColor)
  }

  /**
   * 恢复渲染器状态
   * @param renderer
   */
  static restoreRendererState(renderer) {
    renderer.autoClear = state.autoClear
    renderer.autoClearStencil = state.autoClearStencil
    renderer.autoClearColor = state.autoClearColor
    renderer.autoClearDepth = state.autoClearDepth
    renderer.setClearAlpha(state.clearAlpha)
    renderer.setClearColor(state.clearColor)
  }
}
