import { Matrix3, Matrix4, RepeatWrapping, ShaderMaterial, UniformsLib, UniformsUtils, Vector3 } from 'three'
import VertexShader from './rain_vert.vs'
import FragmentShader from './rain_frag.fs'

export class RainMaterial extends ShaderMaterial {
  constructor(params) {
    super({
      uniforms: {
        uTime: { value: 1.0 },
        uFloorDiffuse: { value: params.floorDiffuse },
        uFloorNormal: { value: params.floorNormal },
        transform: {
          type: 'm4',
          value: new Matrix4(),
        },
        updatedNormalMatrix: {
          type: 'm3',
          value: new Matrix3(),
        },
        uLightColor: { value: params.light.color },
        uLightPosition: { value: params.light.position },
      },
      vertexShader: VertexShader,
      fragmentShader: FragmentShader,
    })
  }
}
