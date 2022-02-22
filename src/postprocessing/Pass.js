import * as THREE from 'three'
import { RenderUtil } from '../util/RenderUtil'

export class Pass {
  constructor(app, width, height, needDepth, useScene, renderTargetParams) {
    this.app = app
    this.renderer = app.renderer
    this.needDepth = needDepth || false
    this.width = width || app.domElement.clientWidth
    this.height = height || app.domElement.clientHeight

    this.bindScope()

    this.initRenderTarget(renderTargetParams)
    this.initMaterial()
    this.initQuad(useScene)

    window.addEventListener('resize', this.onWindowResize)
  }

  bindScope() {
    this.onWindowResize = this.onWindowResize.bind(this)
  }

  initRenderTarget(renderTargetParams) {
    if (this.renderTarget) this.renderTarget.dispose()
    if (this.swapRenderTarget) this.swapRenderTarget.dispose()
    if (this.depthTexture) this.depthTexture.dispose()
    if (this.swapDepthTexture) this.swapDepthTexture.dispose()
    renderTargetParams = renderTargetParams || { format: THREE.RGBAFormat, type: THREE.UnsignedByteType }
    this.renderTarget = new THREE.WebGLRenderTarget(this.width, this.height, renderTargetParams)
    this.renderTarget.texture.magFilter = THREE.LinearFilter
    this.renderTarget.texture.minFilter = THREE.LinearFilter
    this.renderTarget.texture.generateMipmaps = false
    this.renderTarget.stencilBuffer = false
    this.renderTarget.depthBuffer = this.needDepth

    this.swapRenderTarget = new THREE.WebGLRenderTarget(this.width, this.height, renderTargetParams)
    this.swapRenderTarget.texture.magFilter = THREE.LinearFilter
    this.swapRenderTarget.texture.minFilter = THREE.LinearFilter
    this.swapRenderTarget.texture.generateMipmaps = false
    this.swapRenderTarget.stencilBuffer = false
    this.swapRenderTarget.depthBuffer = this.needDepth

    // 深度
    if (this.needDepth) {
      this.depthTexture = new THREE.DepthTexture(this.width, this.height)
      this.depthTexture.format = THREE.DepthFormat
      this.depthTexture.type = THREE.UnsignedShortType
      this.renderTarget.depthTexture = this.depthTexture

      this.swapDepthTexture = new THREE.DepthTexture(this.width, this.height)
      this.swapDepthTexture.format = THREE.DepthFormat
      this.swapDepthTexture.type = THREE.UnsignedShortType
      this.swapRenderTarget.depthTexture = this.swapDepthTexture
    }
  }

  initMaterial() {
    this.material = new THREE.ShaderMaterial()
  }

  initQuad(useScene) {
    if (useScene) {
      this.postScene = this.app.scene
      this.postCamera = this.app.camera
    } else {
      const postPlane = new THREE.PlaneBufferGeometry(2, 2)
      const postQuad = new THREE.Mesh(postPlane, this.material)
      this.postScene = new THREE.Scene()
      this.postScene.add(postQuad)
      this.postCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    }
  }

  render(renderToScreen, readBuffer, writeBuffer, resolveRender) {
    // 记录原始renderer状态
    RenderUtil.saveRendererState(this.renderer)

    this.renderer.autoClear = true
    this.renderer.autoClearColor = true
    this.renderer.autoClearDepth = true

    // 交换深度材质
    if (this.needDepth) {
      const tempDepth = this.depthTexture
      this.depthTexture = this._swapDepthTexture
      this._swapDepthTexture = tempDepth
    }

    // 交换rt
    const temp = this.renderTarget
    this.renderTarget = this.swapRenderTarget
    this.swapRenderTarget = temp

    writeBuffer = writeBuffer || (renderToScreen ? null : this.renderTarget)

    // 如果有后续处理，则执行
    if (resolveRender) {
      resolveRender(renderToScreen, readBuffer, writeBuffer)
    } else {
      // 如果没有后续逻辑，则直接渲染
      this.renderer.setRenderTarget(writeBuffer)
      this.renderer.render(this.postScene, this.postCamera)
      if (writeBuffer) this.renderer.setRenderTarget(null)
    }

    // 恢复原始渲染器状态
    RenderUtil.restoreRendererState(this.renderer)
  }

  onWindowResize() {
    this.resize(this.app.domElement.clientWidth, this.app.domElement.clientHeight)
  }

  resize(width, height) {
    const pixelRatio = this.renderer.getPixelRatio()
    this.renderTarget.setSize(width * pixelRatio, height * pixelRatio)
    this.swapRenderTarget.setSize(width * pixelRatio, height * pixelRatio)
    this.width = width
    this.height = height
    if (this.material.uniforms.uResolution) this.material.uniforms.uResolution.value = new THREE.Vector2(width, height)
  }
}
