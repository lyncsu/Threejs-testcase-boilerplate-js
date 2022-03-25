import { Matrix4, Matrix3, Vector3, Quaternion } from 'three'

export default class MathUtil {
  /**
   * 提取方向
   * @param {*} matrix
   * @param {*} axis
   * @returns
   */
  static extractDirection(matrix, axis) {
    const direction = new Vector3()
    if (axis === 'y') matrix instanceof Matrix4 ? direction.setFromMatrixColumn(matrix, 1) : direction.setFromMatrix3Column(matrix, 1)
    else if (axis === 'z') matrix instanceof Matrix4 ? direction.setFromMatrixColumn(matrix, 2) : direction.setFromMatrix3Column(matrix, 2)
    else matrix instanceof Matrix4 ? direction.setFromMatrixColumn(matrix, 0) : direction.setFromMatrix3Column(matrix, 0)
    return direction.normalize()
  }

  /**
   * 提取位置
   */
  static extractPosition(matrix) {
    const { position } = this.decompose(matrix)
    return position
  }

  static composeMatrix3ByAxis(axisX, axisY, axisZ) {
    const elements = [axisX.x, axisX.y, axisX.z, axisY.x, axisY.y, axisY.z, axisZ.x, axisZ.y, axisZ.z]
    return new Matrix3().fromArray(elements)
  }

  static decompose(matrix) {
    const position = new Vector3()
    const quaternion = new Quaternion()
    const scale = new Vector3()
    matrix.decompose(position, quaternion, scale)

    return { position, quaternion, scale }
  }

  static getMatrixPosition(matrix4) {
    if (!matrix4 instanceof Matrix4) return new Vector3()
    const elements = matrix4.elements
    return new Vector3(elements[12], elements[13], elements[14])
  }

  /**
   * vector scalar less than
   * @param {*} v1
   * @param {*} v2
   */
  static lessThan(v1, v2) {
    if (!v1 || !v2 || !(v1 instanceof Vector3)) return false
    const v2v = new Vector3()
    if (v2 instanceof Vector3) v2v.copy(v2)
    else v2v.setScalar(Number(v2))
    if (v1.x >= v2v.x) return false
    if (v1.y >= v2v.y) return false
    if (v1.z >= v2v.z) return false
    return true
  }

  /**
   * 获取正负
   */
  static sign(n) {
    if (isNaN(n)) return 1
    if (n >= 0) return 1
    else return -1
  }
}
