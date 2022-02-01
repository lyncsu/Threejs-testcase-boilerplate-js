import { MeshStandardMaterial } from 'three'
import FragmentShaderParam from './drop_frag_pars.fs'
import FragmentShader from './drop_frag.fs'

export class RainDropMaterial extends MeshStandardMaterial {
  constructor(params) {
    super({
      normalMap: params.normalMap,
      envMap: params.envMap,
      metalness: 1,
      roughness: 0.1,
    })

    const scope = this

    this.onBeforeCompile = function (shader) {
      shader.uniforms.normalMaskMap = { value: params.normalMaskMap }
      shader.uniforms.uTime = scope.userData.uTime
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
      //    gl_FragColor = vec4(normal, 1.0);`
      // )
    }
  }
}
