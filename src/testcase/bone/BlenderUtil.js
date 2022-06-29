import * as THREE from 'three'

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
   * @param {*} matrixInThree
   */
  makeBlenderMatrix() {
    // α = 绕z轴逆时针旋转，β = 继续绕x轴旋转后的轴，逆时针旋转
    // M = Rz(α)·Rz(π/2 - α)·Ry(β)·Rz(α - π/2)·T(x, y, z)
    const axisX = new THREE.Vector3(0, 1, 0)
    const axisY = new THREE.Vector3(0, 0, 1)
    const axisZ = new THREE.Vector3(1, 0, 0)
    const blenderMatrix = new THREE.Matrix4().makeBasis(axisX, axisY, axisZ)
    return blenderMatrix
  }

  /**
   * 转换到blender坐标系
   */
  toBlender(target) {
    /* if (target instanceof THREE.Vector3) {
      const vectorBlender = new THREE.Vector3().copy(target).applyMatrix4(this.BLENDER_MATRIX)
      return vectorBlender
    } else if (target instanceof THREE.Euler) {
      // const eulerBlender = new THREE.Euler(target.z, target.x, target.y)
      const eulerBlender = new THREE.Euler().copy(target)
      return eulerBlender
    } else if (target instanceof THREE.Matrix4) {
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
   * 转换为three坐标系
   * @param {*} target
   */
  toThree(target) {
    if (target instanceof THREE.Vector3) {
      const vectorThree = new THREE.Vector3().copy(target).applyMatrix4(this.THREE_MATRIX)
      return vectorThree
    } else if (target instanceof THREE.Euler) {
      const eulerThree = new THREE.Euler(target.y, target.z, target.x)
      return eulerThree
    } else if (target instanceof THREE.Matrix4) {
      this.BLENDER_MATRIX
      // const positionBlender = new THREE.Vector3(target.elements[12], target.elements[13], target.elements[14])
      // const positionThree = this.toThree(positionBlender)
      // const matrixThree = new THREE.Matrix4().multiplyMatrices(target, this.THREE_MATRIX)
      // matrixThree.setPosition(positionThree)
      return target
    }
  }
}

export default new BlenderUtil()
