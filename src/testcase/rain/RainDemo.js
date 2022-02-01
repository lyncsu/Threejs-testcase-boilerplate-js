import * as THREE from 'three'
import { Constant } from '../../Constant'
import { Demo } from '../base/Demo'
import { RainDropMaterial } from './RainDropMaterial'
import { RainRippleMaterial } from './RainRippleMaterial'

/**
 * 雨滴效果用例
 */
export class RainDemo extends Demo {
  /**
   * 雨滴效果用例构造函数
   * @param {*} root
   */
  constructor(root) {
    super(root)

    this.init()
  }

  /**
   * 初始化
   */
  async init() {
    const resolution = new THREE.Vector2(this.app.domElement.clientWidth, this.app.domElement.clientHeight)
    const lightPosition = new THREE.Vector3(15, 2.5, 5)
    const light = new THREE.PointLight(0x666666, 0.5)
    light.position.copy(lightPosition)
    this.app.scene.add(light)
    this.light = light
    const helper = new THREE.PointLightHelper(light, 1)
    this.app.scene.add(helper)

    // ripple on floor
    const geometry = new THREE.PlaneBufferGeometry(10, 10, 1, 1)
    const loader = new THREE.TextureLoader()
    const floorDiffuse = await loader.loadAsync(`${Constant.STATIC_ASSETS_PATH}floor_diffuse.jpg`)
    const floorNormal = await loader.loadAsync(`${Constant.STATIC_ASSETS_PATH}floor_normal.jpg`)
    const rippleNormal = await loader.loadAsync(`${Constant.STATIC_ASSETS_PATH}ripple_normal.png`)
    rippleNormal.wrapS = rippleNormal.wrapT = THREE.RepeatWrapping
    this.rippleMaterial = new RainRippleMaterial({ floorDiffuse, floorNormal, rippleNormal, light, resolution })

    const plane = new THREE.Mesh(geometry, this.rippleMaterial)
    plane.rotation.x = -Math.PI / 2
    this.app.scene.add(plane)

    // drop
    // const dropGeometry = new THREE.BoxBufferGeometry(3, 3, 3)
    const dropGeometry = new THREE.SphereBufferGeometry(2.5, 32, 32)
    const dropNormal = await loader.loadAsync(`${Constant.STATIC_ASSETS_PATH}drop_normal.png`)
    const dropMask = await loader.loadAsync(`${Constant.STATIC_ASSETS_PATH}drop_mask.png`)
    dropNormal.wrapS = dropNormal.wrapT = dropMask.wrapS = dropMask.wrapT = THREE.RepeatWrapping

    this.dropMaterial = new RainDropMaterial({ normalMap: dropNormal, normalMaskMap: dropMask, normalScale: new THREE.Vector2(1.0, 1.0) })
    this.dropMaterial.userData.uTime = { value: 1 }
    this.dropMaterial.needsUpdate = true
    const cube = new THREE.Mesh(dropGeometry, this.dropMaterial)
    cube.geometry.computeTangents()
    cube.position.y = 2.7
    this.app.scene.add(cube)
  }

  update() {
    const time = this.clock.getElapsedTime()
    this.light.position.x = 5 + Math.sin(time) * 3
    this.light.position.y = 5 + Math.sin(time * 0.5) * 5
    this.light.position.z = 3 + Math.cos(time) * 10
    if (this.rippleMaterial) {
      this.rippleMaterial.uniforms.uTime.value = time
      this.rippleMaterial.uniforms.uLightPosition.value = this.light.position
    }

    if (this.dropMaterial) {
      this.dropMaterial.userData.uTime.value = time
    }
  }
}
