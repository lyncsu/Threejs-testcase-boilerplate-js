import * as THREE from 'three'
import { ShaderMaterial } from 'three'
import FragmentShader from './rain_glass_frag.fs'
import VertexShader from './rain_glass_vert.vs'

export class RainGlassMaterial extends ShaderMaterial {
  constructor(param) {
    super({
      uniforms: { uResolution: { value: param.resolution }, uSceneMap: { value: null }, uTime: { value: 0.0 } },
      vertexShader: VertexShader.trim(),
      fragmentShader: FragmentShader.trim(),
    })
  }
}
