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
    // const lightPosition = new THREE.Vector3(5, 5, 5)
    // const spot = new THREE.SpotLight({ color: '#ff0000', intensity: 0.5 })
    // spot.position.copy(lightPosition)
    // this.app.scene.add(spot)

    const geometry = new THREE.PlaneBufferGeometry(10, 10, 1, 1)
    geometry.computeTangents()
    const loader = new THREE.TextureLoader()
    const floorDiffuse = await loader.loadAsync(`${Constant.STATIC_ASSETS_PATH}floor_diffuse.jpg`)
    const floorNormal = await loader.loadAsync(`${Constant.STATIC_ASSETS_PATH}floor_normal.jpg`)
    const rainNormal = await loader.loadAsync(`${Constant.STATIC_ASSETS_PATH}rain_normal.png`)
    floorNormal.wrapS = floorNormal.wrapT = THREE.RepeatWrapping
    const material = new RainMaterial({ floorDiffuse, floorNormal, rainNormal })

    const plane = new THREE.Mesh(geometry, material)
    plane.rotation.x = -Math.PI / 2
    this.app.scene.add(plane)
  }
}
