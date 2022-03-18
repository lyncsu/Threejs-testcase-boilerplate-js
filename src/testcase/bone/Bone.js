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
   * 每一级的幅度迭代次数
   */
  recursion = 3

  /**
   * 拉伸幅度
   */
  strength = 5

  /**
   * 延迟响应
   */
  delay = 2

  /**
   * 实现delay的递归次数
   */
  iteration

  /**
   * 迭代初始化完成状态
   */
  #ready

  /**
   * 衰减度
   */
  #attenuation

  #finished

  /**
   * 获取根节点
   */
  get rootBone() {
    if (this.isRoot) return this
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
      this.boneId = 0
      this.count = 0
    }
    this.matrixAutoUpdate = this.isRoot
    const endPosition = new THREE.Vector3(0, this.length, 0)
    this.boneMatrix = new THREE.Matrix4().setPosition(endPosition)
    this.iteration = 0
    this.#ready = false
    this.#finished = false
    this.delay *= 100
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
   * 迭代旋转（从第二节开始迭代）
   */
  iterate() {
    if (!this.#ready) this.#prepare()

    const allow = this.#check()
    const { parentPosition, rotationMatrix } = this.#decomposeParentBone()
    const bonePosition = MathUtil.getMatrixPosition(this.parentBone.boneMatrix)
    const offset = new THREE.Vector3().copy(this.position).sub(parentPosition)
    const direction = new THREE.Vector3().copy(offset).normalize()
    const axis = new THREE.Vector3(0, 0, -1).normalize()
    const resistanceDirection = new THREE.Vector3().crossVectors(direction, axis).normalize()
    const rootRotation = -this.rootBone.parentRotationZ * this.strength
    const p = Math.min(this.iteration, this.delay) / this.delay
    const targetRotation = MathUtils.clamp(rootRotation * p * this.#attenuation, -Math.PI / 3, Math.PI / 3)
    const resistanceVector = new THREE.Vector3().copy(resistanceDirection).setLength(targetRotation)
    const targetVector = new THREE.Vector3().addVectors(offset, resistanceVector)
    const targetDirection = new THREE.Vector3().copy(targetVector).normalize()
    const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(direction, targetDirection)
    const quaternion = new THREE.Quaternion().slerp(targetQuaternion, 1)

    this.position.copy(bonePosition)
    if (this.boneId < 2) {
      this.quaternion.copy(quaternion)
    } else {
      this.position.applyMatrix4(rotationMatrix).add(parentPosition)
      this.quaternion.setFromRotationMatrix(rotationMatrix).multiply(quaternion)
    }
    this.updateMatrix()

    if (allow) {
      if (this.iteration < this.delay) this.iteration++
      else this.#finished = true
    }

    const helperTarget = targetDirection
    let hasHelper = false
    this.rootBone.children.forEach(child => {
      if (child instanceof THREE.ArrowHelper) {
        if (child.uuid === this.boneId) {
          hasHelper = true
          child.setDirection(helperTarget)
          child.setLength(helperTarget.length())
          child.position.copy(this.position)
        }
      }
    })
    if (!hasHelper) {
      const helper = new THREE.ArrowHelper(helperTarget, this.position, helperTarget.length(), 0x00ff00)
      helper.uuid = this.boneId
      this.rootBone.add(helper)
    }

    // console.info('boneId', this.boneId, 'iteration', this.iteration)
  }

  /**
   * 准备衰减参数
   */
  #prepare() {
    this.#attenuation = Math.pow(Math.min(this.recursion, this.rootBone.count) / this.rootBone.count, this.boneId)
    this.#ready = true
  }

  /**
   * 检查是否结束
   */
  #check() {
    // 检测是否结束后重启，重启则可放行
    if (this.#finished) {
      // 当再次转动，则重启迭代
      if (!this.rotation.equals(this.rootBone.rotation)) {
        this.iteration = 0
        this.#finished = false
        return true
      }
      return false
    }
    return true
  }

  /**
   * 解构父级
   * @returns
   */
  #decomposeParentBone() {
    const parentPosition = new THREE.Vector3()
    const parentQuaternion = new THREE.Quaternion()
    const parentScale = new THREE.Vector3()
    this.parentBone.matrix.decompose(parentPosition, parentQuaternion, parentScale)
    const rotationMatrix = new THREE.Matrix4().extractRotation(this.parentBone.matrix)

    return { parentPosition, parentQuaternion, parentScale, rotationMatrix }
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
