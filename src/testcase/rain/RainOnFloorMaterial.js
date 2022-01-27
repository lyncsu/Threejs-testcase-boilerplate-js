import { ShaderMaterial } from 'three'
import VertexShader from './rain_on_floor_vert.vs'
import FragmentShader from './rain_on_floor_frag.fs'

export class RainOnFloorMaterial extends ShaderMaterial {
  constructor(params) {
    super({
      uniforms: {
        iTime: { value: 1.0 },
        tFloorDiffuse: { value: params.floorMap },
        tFloorNormal: { value: params.floorNormalMap },
      },
      vertexShader: VertexShader,
      fragmentShader: FragmentShader,
    })
  }
}
