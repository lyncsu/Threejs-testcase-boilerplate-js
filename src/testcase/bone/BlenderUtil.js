import * as THREE from 'three'
import { Constant } from '../../Constant'

/**
 * blender转换工具
 */
class BlenderUtil {
  /**
   * blender矩阵
   */
  BLENDER_MATRIX

  /**
   * three矩阵
   */
  THREE_MATRIX

  /**
   * blender转换工具构造函数
   */
  constructor() {
    this.BLENDER_MATRIX = this.makeBlenderMatrix()
    this.THREE_MATRIX = new THREE.Matrix4().copy(this.BLENDER_MATRIX).invert()
  }

  /**
   * blender转换矩阵
   * Mt=(Rx-90Ry-90Mb)I
   * @param {*} matrixInThree
   */
  makeBlenderMatrix() {
    const Ax = new THREE.Vector3(1, 0, 0)
    const Ay = new THREE.Vector3(0, 1, 0)
    const Rxn90 = new THREE.Matrix4().makeRotationAxis(Ax, -Math.PI / 2)
    const Ryn90 = new THREE.Matrix4().makeRotationAxis(Ay, -Math.PI / 2)
    const Mb = new THREE.Matrix4().premultiply(Rxn90).premultiply(Ryn90)
    return Mb
  }

  /**
   * 转换到three坐标系
   */
  toThree(target) {
    if (target instanceof THREE.Vector3) {
      const Vb = new THREE.Vector3().copy(target)
      const Vt = new THREE.Vector3().copy(Vb).applyMatrix4(this.BLENDER_MATRIX)
      return Vt
    } else if (target instanceof THREE.Quaternion) {
      const Qb = new THREE.Quaternion().copy(target)
      const Ax = new THREE.Vector3()
      const Ay = new THREE.Vector3()
      const Az = new THREE.Vector3()
      this.BLENDER_MATRIX.extractBasis(Ax, Ay, Az)
      const Rb = new THREE.Euler().setFromQuaternion(Qb)
      const Rx = new THREE.Matrix4().makeRotationAxis(Ax, Rb.x)
      const Ry = new THREE.Matrix4().makeRotationAxis(Ay, Rb.y)
      const Rz = new THREE.Matrix4().makeRotationAxis(Az, Rb.z)
      const Rt = new THREE.Matrix4().multiply(Rx).multiply(Ry).multiply(Rz)
      const Qt = new THREE.Quaternion().setFromRotationMatrix(Rt)

      return Qt
    } /*else if (target instanceof THREE.Matrix4) {
      // 提取位置
      const position = new THREE.Vector3(target.elements[12], target.elements[13], target.elements[14])
      // 还原至原点
      const positionBlender = this.toBlender(position)
      const matrixBlender = new THREE.Matrix4().multiplyMatrices(target, this.BLENDER_MATRIX)
      matrixBlender.setPosition(positionBlender)
      return matrixBlender
    } */
    return target
  }

  /**
   * 转换为blender坐标系
   * @param {*} target
   */
  toBlender(target) {
    if (target instanceof THREE.Matrix4) {
      // method 1 success
      /* const Mt = new THREE.Matrix4().copy(target)
      const Pt = new THREE.Vector3(target.elements[12], target.elements[13], target.elements[14])
      const Rt = new THREE.Matrix4().extractRotation(Mt)
      const Ax = new THREE.Vector3()
      const Ay = new THREE.Vector3()
      const Az = new THREE.Vector3()
      Rt.extractBasis(Ax, Ay, Az)
      const Rx90 = new THREE.Matrix4().makeRotationAxis(Ax, Math.PI / 2).invert()
      const Ry90 = new THREE.Matrix4().makeRotationAxis(Ay, Math.PI / 2).invert()
      const Mb = new THREE.Matrix4().copy(Mt).premultiply(Rx90).premultiply(Ry90).setPosition(Pt) */

      const Mt = new THREE.Matrix4().copy(target)
      const Mb = new THREE.Matrix4().multiplyMatrices(Mt, this.BLENDER_MATRIX)

      return Mb
    }
  }
}

export default new BlenderUtil()
