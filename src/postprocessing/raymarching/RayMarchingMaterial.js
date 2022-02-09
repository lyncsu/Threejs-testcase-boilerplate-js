import * as THREE from 'three'
import { ShaderMaterial } from 'three'
// import VertexShader from './ray_marching_vert.vs'
import FragmentShader from './ray_marching_frag.fs'

export class RayMarchingMaterial extends ShaderMaterial {
  constructor(param) {
    super({
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: param.resolution },
        uCameraPosition: { value: param.cameraPosition },
        uCameraTarget: { value: param.cameraTarget },
        uFov: { value: param.fov },
        uRandomSeed: { value: null },
        uSceneMap: { value: null },
        uLightPosition: { value: param.lightPosition },
        uLightColor: { value: param.lightColor },
        // target: { value: this.target },
        uRaymarchMaximumDistance: { value: param.distance },
        uRaymarchPrecision: { value: param.precision },
      },
      // vertexShader: VertexShader.trim(),
      fragmentShader: FragmentShader.trim(),
    })
  }
}
