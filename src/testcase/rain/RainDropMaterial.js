import { MeshStandardMaterial } from 'three'
import VertexShaderParam from './drop_vert_pars.vs'
import VertexShader from './drop_vert.vs'
import FragmentShaderParam from './drop_frag_pars.fs'
import FragmentShader from './drop_frag.fs'

export class RainDropMaterial extends MeshStandardMaterial {
  constructor(params) {
    super({
      normalMap: params.normalMap,
      envMap: params.envMap,
      color: 0xf0dbff,
      metalness: 0.96,
      roughness: 0.1,
    })

    const scope = this

    this.onBeforeCompile = function (shader) {
      shader.uniforms.uTime = scope.userData.uTime
      // shader.uniforms.projectionPosition = scope.userData.projectionPosition
      // shader.uniforms.viewMatrixCamera = scope.userData.viewMatrixCamera
      // shader.uniforms.projectionMatrixCamera = scope.userData.projectionMatrixCamera
      // shader.uniforms.modelMatrixCamera = scope.userData.modelMatrixCamera
      // shader.uniforms.savedModelMatrix = scope.userData.savedModelMatrix
      shader.uniforms.dropMask = { value: params.dropMask }
      shader.uniforms.dripNormal = { value: params.dripNormal }
      shader.uniforms.dripMask = { value: params.dripMask }
      shader.uniforms.dripGray = { value: params.dripGray }
      shader.vertexShader = shader.vertexShader.replace(
        `#include <normal_pars_vertex>`,
        `#include <normal_pars_vertex>
         ${VertexShaderParam}
        `
      )
      shader.vertexShader = shader.vertexShader.replace(
        `#include <normal_vertex>`,
        `#include <normal_vertex>
         ${VertexShader}
        `
      )
      shader.fragmentShader = shader.fragmentShader.replace(
        `#include <normalmap_pars_fragment>`,
        `#include <normalmap_pars_fragment>
         ${FragmentShaderParam}
        `
      )
      shader.fragmentShader = shader.fragmentShader.replace(`#include <normal_fragment_maps>`, `${FragmentShader}`)
      // debug
      // shader.fragmentShader = shader.fragmentShader.replace(
      //   `#include <output_fragment>`,
      //   `#include <output_fragment>
      //    // debug
      //    gl_FragColor = vec4(debugMask, 1.0);`
      // )
    }
  }
}
