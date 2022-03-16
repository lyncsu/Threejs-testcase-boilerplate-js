import * as THREE from 'three'
import { MathUtils } from 'three'
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
  maxIteration = 10

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

  get parentRotationZ() {
    if (this.isRoot) return this.rotation.z
    return this.parentBone.rotation.z
  }

  /**
   * 骨头类构造函数
   * @param {*} length 长度
   * @param {*} isShowHelper 是否显示辅助器
   * @param {*} isRoot 是否设置为根节点
   */
  constructor(length, isShowHelper = true, isRoot) {
    super()

    this.length = length
    this.isShowHelper = Boolean(isShowHelper)
    this.isRoot = Boolean(isRoot)
    if (this.isRoot) {
      this.boneId = -1
      this.count = 0
      this.#rootBone = this
    }
    this.matrixAutoUpdate = this.isRoot
    const endPosition = new THREE.Vector3(0, this.length, 0)
    this.boneMatrix = new THREE.Matrix4().setPosition(endPosition)
    if (this.isShowHelper) this.#createBoneHelper()
  }

  /**
   * 添加子骨骼
   * @param {*} bone
   */
  addChild(bone) {
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

    const rotationMatrix = new THREE.Matrix4().extractRotation(this.parentBone.matrix)
    const parentPosition = new THREE.Vector3()
    const parentQuaternion = new THREE.Quaternion()
    const scale = new THREE.Vector3()
    this.parentBone.matrix.decompose(parentPosition, parentQuaternion, scale)
    const bonePosition = MathUtil.getMatrixPosition(this.parentBone.boneMatrix)
    if (this.boneId < 2) this.position.copy(bonePosition)
    else this.position.copy(bonePosition).applyMatrix4(rotationMatrix).add(parentPosition)
    const boneDirection = new THREE.Vector3(0, this.length, 0)
    const direction = new THREE.Vector3().copy(this.position).sub(parentPosition).normalize()
    const n = new THREE.Vector3().copy(direction)
    const axis = new THREE.Vector3(0, 0, 1)
    const resistanceDirection = new THREE.Vector3().crossVectors(n, axis)
    // const clamped = MathUtils.clamp(this.parentBone.parentRotationZ, -Math.PI, 0)
    resistanceDirection.setScalar(this.parentBone.parentRotationZ)
    const targetDirection = new THREE.Vector3().copy(direction).add(resistanceDirection)
    const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(direction, targetDirection)
    const helperTarget = direction
    let hasHelper = false
    this.rootBone.children.forEach(child => {
      if (child instanceof THREE.ArrowHelper) {
        if (child.uuid === this.boneId) {
          hasHelper = true
          child.setDirection(helperTarget)
          child.position.copy(this.position)
          // child.setLength(resistanceDirection.length())
        }
      }
    })
    if (!hasHelper) {
      // dir helper
      const helper = new THREE.ArrowHelper(direction, this.position)
      helper.uuid = this.boneId
      this.rootBone.add(helper)
    }

    this.quaternion.copy(targetQuaternion)
    this.updateMatrix()

    console.info('boneId', this.boneId, 'bonePosition', bonePosition, 'parentPosition', parentPosition)
    console.info('\t    ', 'position', this.position, 'quaternion', this.quaternion)
    console.info('\t    ', 'rotationMatrix', rotationMatrix.toArray())
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
    }

    const startPoint = new THREE.Vector3(0, this.isRoot ? 0.125 : 0, 0)
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

    this.add(helper)
  }
}
