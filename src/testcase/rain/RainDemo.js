import * as THREE from 'three'
import { Demo } from '../base/Demo'

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
  init() {
    const plane = new THREE.Mesh(new THREE.PlaneBufferGeometry(10, 10, 1, 1), new THREE.MeshNormalMaterial())
    plane.rotation.x = -Math.PI / 2
    this.app.scene.add(plane)
  }
}
