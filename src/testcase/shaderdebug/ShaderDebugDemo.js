import { PMREMGenerator } from 'three'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { Demo } from '../base/Demo'
import * as FragementShader from './StandardFragment.fs'
import { ShaderDebugMaterial } from '../../debug/shader/ShaderDebugMaterial'

/**
 * Shader调试Demo用例
 */
export class ShaderDebugDemo extends Demo {
  constructor(root) {
    super(root)

    this.init()
  }

  init() {
    let debugMaterial
    const pmremGenerator = new PMREMGenerator(this.app.renderer)
    pmremGenerator.compileEquirectangularShader()

    new RGBELoader().setPath('./static/assets/image/hdr/').load('royal_esplanade_1k.hdr', async texture => {
      const envMap = pmremGenerator.fromEquirectangular(texture).texture
      this.app.scene.environment = envMap
      texture.dispose()
      pmremGenerator.dispose()

      const result = await new GLTFLoader().loadAsync('./static/assets/model/helmet.gltf')
      result.scene.traverse(child => {
        if (child.isMesh) {
          const originalMaterial = child.material
          const newMaterial = new THREE.ShaderMaterial(THREE.ShaderLib.standard)
          newMaterial.uniforms.map.value = originalMaterial.map
          newMaterial.uniforms.normalMap.value = originalMaterial.normalMap
          newMaterial.uniforms.normalScale.value = originalMaterial.normalScale
          newMaterial.uniforms.roughnessMap.value = originalMaterial.roughnessMap
          newMaterial.uniforms.roughness.value = originalMaterial.roughness
          newMaterial.uniforms.metalnessMap.value = originalMaterial.metalnessMap
          newMaterial.uniforms.metalness.value = originalMaterial.metalness
          newMaterial.uniforms.emissiveMap.value = originalMaterial.emissiveMap
          newMaterial.uniforms.aoMap.value = originalMaterial.aoMap
          newMaterial.uniforms.aoMapIntensity.value = originalMaterial.aoMapIntensity
          newMaterial.uniforms.envMap.value = envMap
          newMaterial.uniforms.flipEnvMap.value = 1
          newMaterial.uniforms.envMapIntensity.value = 0.25
          newMaterial.fragmentShader = FragementShader
          newMaterial.uniforms.emissive.value.copy(originalMaterial.emissive)
          newMaterial.uniforms.diffuse.value.copy(originalMaterial.color)
          newMaterial.lights = true
          newMaterial.extensions.derivatives = true
          newMaterial.extensions.shaderTextureLOD = true
          newMaterial.defines.TEXTURE_LOD_EXT = ''
          newMaterial.defines.USE_UV = ''
          newMaterial.defines.USE_MAP = ''
          newMaterial.defines.USE_NORMALMAP = ''
          newMaterial.defines.USE_AOMAP = ''
          newMaterial.defines.TANGENTSPACE_NORMALMAP = ''
          newMaterial.defines.USE_ROUGHNESSMAP = ''
          newMaterial.defines.USE_METALNESSMAP = ''
          newMaterial.defines.USE_EMISSIVEMAP = ''
          newMaterial.defines.USE_ENVMAP = ''
          newMaterial.defines.ENVMAP_MODE_REFLECTION = ''
          newMaterial.defines.ENVMAP_TYPE_CUBE_UV = ''
          newMaterial.defines.ENVMAP_BLENDING_NONE = ''
          newMaterial.needsUpdate = true

          child.material = newMaterial
          debugMaterial = new ShaderDebugMaterial(newMaterial)
          this.app.renderer.debugMaterial = debugMaterial

          console.info(debugMaterial)
          child.castShadow = true
          child.receiveShadow = true
        }

        result.scene.position.y = 3
        result.scene.scale.set(3, 3, 3)
        this.app.scene.add(result.scene)
        this.app.shaderDebug.update()
      })
    })
  }
}
