import * as THREE from 'three'
import { Pass } from '../Pass'
import { RainGlassMaterial } from './RainGlassMaterial'

export class RainGlassPass extends Pass {
  constructor(app) {
    super(app)

    this.resolveRender = this.resolveRender.bind(this)
  }

  resolveRender(renderToScreen, readBuffer, writeBuffer) {
    readBuffer = readBuffer
    writeBuffer = writeBuffer || (renderToScreen ? null : this.renderTarget)

    this.material.uniforms.uTime.value = this.app.clock.getElapsedTime()
    if (readBuffer) this.material.uniforms.uSceneMap.value = readBuffer.texture
    this.renderer.setRenderTarget(writeBuffer)
    this.renderer.render(this.postScene, this.postCamera)
    if (writeBuffer) this.renderer.setRenderTarget(null)
  }

  render(renderToScreen, readBuffer, writeBuffer) {
    super.render(renderToScreen, readBuffer, writeBuffer, this.resolveRender)
  }

  initMaterial() {
    this.material = new RainGlassMaterial({
      resolution: new THREE.Vector2(this.app.domElement.clientWidth, this.app.domElement.clientHeight),
    })
  }
}
