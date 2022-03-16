import { Matrix4, Vector3 } from 'three'

export default class MathUtil {
  /**
   * 获取矩阵位置
   * @param {*} matrix4
   * @returns
   */
  static getMatrixPosition(matrix4) {
    if (!matrix4 instanceof Matrix4) return new Vector3()
    const elements = matrix4.elements
    return new Vector3(elements[12], elements[13], elements[14])
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
