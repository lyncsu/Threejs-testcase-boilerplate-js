import { MeshStandardMaterial, DoubleSide } from 'three'

export class RainFallMaterial extends MeshStandardMaterial {
  constructor(param) {
    super({
      alphaMap: param.alphaMap,
      envMap: param.envMap,
      // normalMap: param.normalMap,
      metalness: 0.8,
      roughness: 0.5,
      transparent: true,
      side: DoubleSide,
      // wireframe: true,
    })

    const scope = this
    this.onBeforeCompile = function (shader) {
      shader.uniforms.uTime = scope.userData.uTime
    }
  }
}
