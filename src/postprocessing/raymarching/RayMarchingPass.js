import * as THREE from 'three'
import { Pass } from '../Pass'
import { RayMarchingMaterial } from './RayMarchingMaterial'

export class RayMarchingPass extends Pass {
  constructor(app) {
    super(app)

    this.resolveRender = this.resolveRender.bind(this)
  }

  resolveRender(renderToScreen, readBuffer, writeBuffer) {
    readBuffer = readBuffer
    writeBuffer = writeBuffer || renderToScreen ? null : this.renderTarget

    this.material.uniforms.uRandomSeed.value = Math.random()
    // this.material.uniforms.uFov.value = (this.app.camera.fov * Math.PI) / 180
    // this.material.uniforms.uRaymarchMaximumDistance.value = this.distance
    // this.material.uniforms.uRaymarchPrecision.value = this.precision
    this.material.uniforms.uCameraPosition.value = this.app.camera.position
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
    this.precision = 0.01
    this.material = new RayMarchingMaterial({
      resolution: new THREE.Vector2(this.app.domElement.clientWidth, this.app.domElement.clientHeight),
      fov: (this.app.camera.fov * Math.PI) / 180,
      cameraPosition: this.app.camera.position,
      cameraTarget: this.app.camera.target,
      lightPosition: this.app.light.position,
      lightColor: this.app.light.color,
      distance: 50,
      precision: 0.01,
    })
  }
}
