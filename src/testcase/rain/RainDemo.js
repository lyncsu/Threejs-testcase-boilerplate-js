import * as THREE from 'three'
import { Demo } from '../base/Demo'
import { RainOnFloorMaterial } from './RainOnFloorMaterial'

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
    const loader = new THREE.TextureLoader()
    const floorDiffuse = await loader.loadAsync('./static/assets/image/floor_diffuse.jpg')
    const floorNormal = await loader.loadAsync('./static/assets/image/floor_normal.jpg')
    const rainNormal = await loader.loadAsync('./static/assets/image/rain_normal.png')
    const material = new RainOnFloorMaterial({ floorMap: floorDiffuse, floorNormalMap: floorNormal, rainMap: rainNormal })
    const geometry = new THREE.PlaneBufferGeometry(10, 10, 1, 1)
    // geometry.computeTangents()
    // geometry.computeVertexNormals()
    const plane = new THREE.Mesh(geometry, material)
    plane.rotation.x = -Math.PI / 2
    this.app.scene.add(plane)
  }
}
