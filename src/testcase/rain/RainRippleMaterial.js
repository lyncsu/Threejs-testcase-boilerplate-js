import { Matrix3, Matrix4, ShaderMaterial } from 'three'
import VertexShader from './ripple_vert.vs'
import FragmentShader from './ripple_frag.fs'

export class RainRippleMaterial extends ShaderMaterial {
  constructor(params) {
    super({
      uniforms: {
        uTime: { value: 1.0 },
        uFloorDiffuse: { value: params.floorDiffuse },
        uFloorNormal: { value: params.floorNormal },
        uRippleNormal: { value: params.rippleNormal },
        uResolution: { value: params.resolution },
        uLightColor: { value: params.light.color },
        uLightPosition: { value: params.light.position },
        // for three internal use
        transform: {
          type: 'm4',
          value: new Matrix4(),
        },
        updatedNormalMatrix: {
          type: 'm3',
          value: new Matrix3(),
        },
      },
      vertexShader: VertexShader,
      fragmentShader: FragmentShader,
    })
  }
}
