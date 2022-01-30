import * as THREE from 'three'
import { Constant } from '../../Constant'
import { Demo } from '../base/Demo'
import { RainMaterial } from './RainMaterial'

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
    const light = new THREE.PointLight(0x666666)
    light.position.copy(lightPosition)
    this.app.scene.add(light)
    this.light = light
    const helper = new THREE.PointLightHelper(light, 1)
    this.app.scene.add(helper)

    const geometry = new THREE.PlaneBufferGeometry(10, 10, 1, 1)
    const loader = new THREE.TextureLoader()
    const floorDiffuse = await loader.loadAsync(`${Constant.STATIC_ASSETS_PATH}floor_diffuse.jpg`)
    const floorNormal = await loader.loadAsync(`${Constant.STATIC_ASSETS_PATH}floor_normal.jpg`)
    const rippleNormal = await loader.loadAsync(`${Constant.STATIC_ASSETS_PATH}ripple_normal.png`)
    rippleNormal.wrapS = rippleNormal.wrapT = THREE.RepeatWrapping
    this.material = new RainMaterial({ floorDiffuse, floorNormal, rippleNormal, light, resolution })

    const plane = new THREE.Mesh(geometry, this.material)
    plane.rotation.x = -Math.PI / 2
    this.app.scene.add(plane)
  }

  update() {
    const time = this.clock.getElapsedTime()
    this.light.position.x = 5 + Math.sin(time) * 3
    // this.light.position.y = 0 + Math.sin(time * 0.5) * 5
    this.light.position.z = 3 + Math.cos(time) * 10
    if (this.material) {
      this.material.uniforms.uTime.value = time
      this.material.uniforms.uLightPosition.value = this.light.position
    }
  }
}
