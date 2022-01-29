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
    const lightPosition = new THREE.Vector3(0, 5, 5)
    this.light = new THREE.PointLight(0xffffff)
    this.light.position.copy(lightPosition)
    this.app.scene.add(this.light)
    // const helper = new THREE.PointLightHelper(this.light, 1)
    // this.app.scene.add(helper)

    const geometry = new THREE.PlaneBufferGeometry(10, 10, 1, 1)
    const loader = new THREE.TextureLoader()
    const floorDiffuse = await loader.loadAsync(`${Constant.STATIC_ASSETS_PATH}floor_diffuse.jpg`)
    const floorNormal = await loader.loadAsync(`${Constant.STATIC_ASSETS_PATH}floor_normal.jpg`)
    const rainNormal = await loader.loadAsync(`${Constant.STATIC_ASSETS_PATH}rain_normal.png`)
    rainNormal.wrapS = rainNormal.wrapT = THREE.RepeatWrapping
    this.material = new RainMaterial({ floorDiffuse, floorNormal, rainNormal, light: this.light })

    const plane = new THREE.Mesh(geometry, this.material)
    plane.rotation.x = -Math.PI / 2
    this.app.scene.add(plane)
  }

  update() {
    const time = this.clock.getElapsedTime()
    this.light.position.x = Math.sin(time) * 15
    this.light.position.y = 5 + Math.sin(time * 0.5) * 5
    this.light.position.z = Math.cos(time) * 15
    if (this.material) {
      this.material.uniforms.uTime.value = time
      this.material.uniforms.uLightPosition.value = this.light.position
    }
  }
}
