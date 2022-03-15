import * as THREE from 'three'
import MathUtil from '../../util/MathUtil'

/**
 * 骨头类
 */
export class Bone extends THREE.Object3D {
  /**
   * 辅助器颜色
   */
  static HELPER_COLOR = 0xff0077

  /**
   * 是否为根节点
   */
  isRoot

  /**
   * 是否显示辅助线
   */
  isShowHelper

  /**
   * 骨骼初始姿态矩阵
   */
  boneMatrix

  /**
   * 父级节点
   */
  parentBone

  /**
   * 迭代次数
   */
  maxIteration = 2

  /**
   * 根节点
   */
  #rootBone

  /**
   * 获取根节点
   */
  get rootBone() {
    if (this.isRoot) return this.#rootBone
    return this.findRoot()
  }

  /**
   * 骨头类构造函数
   * @param {*} length 长度
   * @param {*} isShowHelper 是否显示辅助器
   * @param {*} isRoot 是否设置为根节点
   */
  constructor(length, isShowHelper = true, isRoot) {
    super()

    this.length = isRoot ? 0 : length
    this.isShowHelper = Boolean(isShowHelper)
    this.isRoot = Boolean(isRoot)
    if (this.isRoot) {
      this.boneId = -1
      this.count = 0
      this.#rootBone = this
    }
    this.matrixAutoUpdate = this.isRoot
    const endPosition = new THREE.Vector3().copy(this.position).add(new THREE.Vector3(0, this.length, 0))
    this.boneMatrix = this.isRoot ? this.matrix : new THREE.Matrix4().setPosition(endPosition)
    console.info(this.boneMatrix.toArray())
    if (this.isShowHelper) this.#createBoneHelper()
  }

  /**
   * 添加子骨骼
   * @param {*} bone
   */
  addChild(bone) {
    bone.setBoneMatrix(this.boneMatrix)
    bone.boneId = ++this.rootBone.count
    bone.parentBone = this
    this.rootBone.add(bone)
  }

  /**
   * 设置骨骼矩阵
   * @param {*} matrix
   */
  setBoneMatrix(matrix) {
    this.boneMatrix.multiply(matrix)
  }

  /**
   * 查找根节点
   * @param {*} node
   * @returns
   */
  findRoot(node) {
    const target = node || this

    if (target.parent.isRoot) return target.parent
    return this.findRoot(target)
  }

  /**
   * 迭代旋转
   */
  iterate() {
    if (!this.parentBone) return
    // 第二段开始缓冲
    if (this.boneId < 2) return

    const rootBoneMatrix = this.rootBone.matrix
    console.info('rootBoneMatrix', rootBoneMatrix.toArray())
    const rootBoneInvMatrix = new THREE.Matrix4().copy(rootBoneMatrix)

    const boneMatrix = this.parentBone.matrix
    const boneInvMatrix = new THREE.Matrix4().copy(this.parentBone.matrix).invert()
    const bonePosition = MathUtil.getMatrixPosition(this.parentBone.boneMatrix)
    // const boneInvPosition = new THREE.Vector3().copy(bonePosition).negate()
    const parentPosition = new THREE.Vector3()
    const parentQuaternion = new THREE.Quaternion()
    const position = new THREE.Vector3()
    const quaternion = new THREE.Quaternion()
    const scale = new THREE.Vector3()
    const parentMatrix = new THREE.Matrix4().copy(this.parentBone.matrix)
    if (this.boneId === 2) {
      rootBoneMatrix.decompose(position, parentQuaternion, scale)
      parentMatrix.decompose(parentPosition, quaternion, scale)
      this.position.copy(bonePosition)
      this.quaternion.copy(parentQuaternion)
    } else {
      // const parentInvMatrix = new THREE.Matrix4().copy(parentMatrix).invert()
      parentMatrix.decompose(parentPosition, parentQuaternion, scale)

      bonePosition.applyMatrix4(boneInvMatrix).applyQuaternion(parentQuaternion).applyMatrix4(boneMatrix)
      this.position.copy(bonePosition)
      this.quaternion.copy(parentQuaternion)
    }

    console.info('boneId', this.boneId, bonePosition, '----------------', parentPosition, parentQuaternion, quaternion)

    // bonePosition.applyMatrix4(boneInvMatrix).applyQuaternion(parentQuaternion).applyMatrix4(boneMatrix)

    // const quaternionInv = new THREE.Quaternion().copy(parentQuaternion).invert()
    // this.quaternion.slerp(quaternionInv, 1)
    // this.quaternion.copy(quaternion)
    this.updateMatrix()
  }

  /**
   * 创建辅助器
   */
  #createBoneHelper() {
    const helper = new THREE.Object3D()
    if (this.isRoot) {
      const geometry = new THREE.SphereBufferGeometry(0.125, 3, 2)
      const center = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: Bone.HELPER_COLOR, wireframe: true }))
      helper.add(center)
    } else {
      const startPoint = new THREE.Vector3()
      const endPoint = new THREE.Vector3(0, this.length, 0)
      const buffer = [startPoint.x, startPoint.y, startPoint.z, endPoint.x, endPoint.y, endPoint.z]
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(buffer, 3))
      const material = new THREE.LineBasicMaterial({ color: Bone.HELPER_COLOR })
      const line = new THREE.LineSegments(geometry, material)
      helper.add(line)

      const arrowHeight = 0.25
      const arrowGeometry = new THREE.CylinderGeometry(0, 0.1, arrowHeight, 3, 1)
      arrowGeometry.translate(0, this.length - arrowHeight / 2, 0)
      const arrow = new THREE.Mesh(arrowGeometry, new THREE.MeshBasicMaterial({ color: Bone.HELPER_COLOR, wireframe: true }))
      helper.add(arrow)
    }
    this.add(helper)
  }
}
