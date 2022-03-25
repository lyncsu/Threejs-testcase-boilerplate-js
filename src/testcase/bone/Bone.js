import * as THREE from 'three'
import { MathUtils } from 'three'
import { Constant } from '../../Constant'
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
   * 幅度迭代
   */
  get recursion() {
    return this.isRoot ? this.#recursion : this.rootBone.recursion
  }

  /**
   * 幅度迭代
   */
  set recursion(value) {
    this.#recursion = value
  }

  /**
   * 延迟响应
   */
  get delay() {
    return this.isRoot ? this.#delay : this.rootBone.delay
  }

  /**
   * 设置延迟响应
   */
  set delay(value) {
    this.#delay = value
  }

  /**
   * 拉伸幅度
   */
  get strength() {
    return 1
  }

  /**
   * 获取根节点
   */
  get rootBone() {
    if (this.isRoot) return this
    return this.findRoot()
  }

  /**
   * 获取下一节点
   */
  get nextBone() {
    return this.getChildBoneById(this.boneId + 1)
  }

  /**
   * 是否为根节点
   */
  isRoot

  /**
   * 调试模式
   */
  debugMode

  /**
   * 是否显示辅助线
   */
  isShowHelper

  /**
   * 骨骼初始姿态矩阵
   */
  boneLength

  /**
   * 父级节点
   */
  parentBone

  /**
   * 实现delay的递归次数
   */
  iteration

  /**
   * 上一步迭代矩阵记录
   */
  prevMatrix

  /**
   * 阈值
   */
  #threshold = 0.001

  /**
   * 延迟
   */
  #delay = 1

  /**
   * 幅度迭代
   */
  #recursion = 0.99

  /**
   * 骨头类构造函数
   * @param {*} length 长度
   * @param {*} isShowHelper 是否显示辅助器
   * @param {*} isRoot 是否设置为根节点
   */
  constructor(length, isShowHelper = true, isRoot, scene) {
    super()

    this.length = length
    this.isShowHelper = Boolean(isShowHelper)
    this.isRoot = Boolean(isRoot)
    this.boneLength = new THREE.Vector3(0, this.length, 0)
    if (this.isRoot) {
      this.boneId = 0
      this.count = 0
      this.scene = scene
    }
    this.recordDirection = new THREE.Vector3(0, 5, 0)
    if (this.isShowHelper) this.#createBoneHelper()
  }

  /**
   * 添加子骨骼
   * @param {*} bone
   */
  addChild(bone) {
    bone.boneId = ++this.rootBone.count
    bone.parentBone = this
    this.childBone = bone
    this.rootBone.scene.add(bone)
  }

  /**
   * 获取骨头
   * @param {*} boneId
   */
  getChildBoneById(boneId) {
    const index = this.rootBone.scene.children.findIndex(
      child => child instanceof Bone && child.boneId === boneId && child.parentBone == this
    )
    if (index !== -1) return this.rootBone.scene.children[index]
  }

  /**
   * 查找根节点
   * @param {*} node
   * @returns
   */
  findRoot(node) {
    node = node || this
    if (node.isRoot) return node
    return this.findRoot(node.parentBone)
  }

  /**
   * 迭代旋转（从第二节开始迭代）
   */
  iterate() {
    if (this.boneId === 0) return this.childBone && this.childBone.iterate()

    // phase1
    const parentMatrixInv = new THREE.Matrix4().multiplyMatrices(this.rootBone.matrixWorld, this.parentBone.matrix).invert()
    const localMatrix = new THREE.Matrix4().multiplyMatrices(this.rootBone.matrixWorld, parentMatrixInv)
    const boneMatrix = new THREE.Matrix4().copy(localMatrix).transpose()
    const bonePosition = new THREE.Vector3().copy(this.parentBone.boneLength).applyMatrix4(this.parentBone.matrix)
    const prevDirectionY = new THREE.Vector3().copy(Constant.AXIS_Y)
    const boneDirectionY = MathUtil.extractDirection(boneMatrix, 'y')
    const diffY = Math.acos(MathUtils.clamp(new THREE.Vector3().copy(prevDirectionY).dot(boneDirectionY), 0, 1))
    const axis = new THREE.Vector3().crossVectors(prevDirectionY, boneDirectionY).normalize()
    const rotateMatrix = new THREE.Matrix4().makeRotationAxis(axis, diffY)
    const nextMatrix = new THREE.Matrix4().copy(rotateMatrix)

    // phase2
    const nextDirectionX = MathUtil.extractDirection(nextMatrix, 'x')
    const boneDirectionX = MathUtil.extractDirection(boneMatrix, 'x')
    const dotValue = nextDirectionX.dot(boneDirectionX)
    let roll
    if (dotValue > 1) roll = 0
    else roll = Math.acos(dotValue)
    roll = roll / this.delay

    const checkDirection = new THREE.Vector3().crossVectors(nextDirectionX, boneDirectionX)
    if (checkDirection.dot(boneDirectionY) < 0) roll = -roll
    const axisZ = MathUtil.extractDirection(nextMatrix, 'z')
    rotateMatrix.makeRotationAxis(axisZ, roll)
    nextMatrix.multiply(rotateMatrix)

    // phase3
    const childPosition = new THREE.Vector3().copy(this.boneLength).applyMatrix4(this.matrix)
    const directionY = new THREE.Vector3().subVectors(childPosition, bonePosition).normalize()
    const nextDirectionY = MathUtil.extractDirection(nextMatrix, 'y')
    const recursionDirection = new THREE.Vector3().copy(this.recordDirection).multiplyScalar(this.recursion)
    const strengthened = new THREE.Vector3().copy(directionY).multiplyScalar(this.strength)
    const phase = new THREE.Vector3().addVectors(nextDirectionY, strengthened).divideScalar(this.delay).sub(recursionDirection)

    if (MathUtil.lessThan(phase, this.#threshold)) phase.set(0, 0, 0)
    this.recordDirection.copy(phase)

    directionY.add(phase).normalize()
    const nextDirectionZ = MathUtil.extractDirection(nextMatrix, 'z')
    const directionX = new THREE.Vector3().crossVectors(directionY, nextDirectionZ).normalize()
    const directionZ = new THREE.Vector3().crossVectors(directionX, directionY).normalize()
    nextMatrix.makeBasis(directionX, directionY, directionZ)

    // record for next iteration
    const quaternion = new THREE.Quaternion().setFromRotationMatrix(nextMatrix)
    this.position.copy(bonePosition)
    this.quaternion.copy(quaternion)
    this.updateMatrix()

    // next iterate
    if (this.childBone) this.childBone.iterate()

    if (this.debugMode) {
      // debug
      if (this.boneId === 1) {
        console.info('boneId', this.boneId)
        // this.#createMatrixHelper(nextMatrix)
        // this.#createDirectionHelper(phase)
        // this.#createPositionHelper(bonePosition)
      }
    }
  }

  /**
   * 重置参数
   */
  reset() {
    // this.recordDirection.set(0, 5, 0)
    if (this.childBone) this.childBone.reset()
  }

  /**
   * 方向辅助
   */
  #createDirectionHelper(target, name, color = 0x00ff00) {
    let hasHelper = false
    this.rootBone.scene.children.forEach(child => {
      if (child instanceof THREE.ArrowHelper) {
        if (child.uuid === this.boneId + `_${name ? name : 'helperTarget'}`) {
          hasHelper = true
          child.setDirection(target)
          child.setLength(target.length())
          child.position.copy(this.position)
        }
      }
    })
    if (!hasHelper) {
      const helper = new THREE.ArrowHelper(target, this.position, target.length(), color)
      helper.uuid = this.boneId + `_${name ? name : 'helperTarget'}`
      this.rootBone.scene.add(helper)
    }
  }

  /**
   * 位置辅助
   */
  #createPositionHelper(target) {
    let hasHelper = false
    this.rootBone.scene.children.forEach(child => {
      if (child instanceof THREE.AxesHelper) {
        if (child.uuid === this.boneId) {
          hasHelper = true
          child.position.copy(target)
        }
      }
    })
    if (!hasHelper) {
      const helper = new THREE.AxesHelper(0.5)
      helper.uuid = this.boneId
      helper.position.copy(target)
      this.rootBone.scene.add(helper)
    }
  }

  /**
   * todo matrix helper
   * @returns
   */
  #createMatrixHelper(target, name) {
    name = name || 'targetMatrix'
    const axisX = MathUtil.extractDirection(target, 'x')
    const axisY = MathUtil.extractDirection(target, 'y')
    const axisZ = MathUtil.extractDirection(target, 'z')
    this.#createDirectionHelper(axisX, 'axisX', 0xff0000)
    this.#createDirectionHelper(axisY, 'axisY', 0x00ff00)
    this.#createDirectionHelper(axisZ, 'axisZ', 0x0000ff)
  }

  /**
   * 创建辅助器
   */
  #createBoneHelper() {
    const helper = new THREE.Object3D()
    this.add(helper)

    if (this.isRoot) {
      const geometry = new THREE.SphereBufferGeometry(0.125, 3, 2)
      const center = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: Bone.HELPER_COLOR, wireframe: true }))
      helper.add(center)
      return
    }

    const arrowHeight = 0.25
    const arrowGeometry = new THREE.CylinderGeometry(0, 0.1, arrowHeight, 3, 1)
    arrowGeometry.translate(0, this.length - arrowHeight / 2, 0)
    const arrow = new THREE.Mesh(arrowGeometry, new THREE.MeshBasicMaterial({ color: Bone.HELPER_COLOR, wireframe: true }))
    helper.add(arrow)
    const startPoint = new THREE.Vector3(0, this.isRoot ? 0.125 : 0, 0)
    const endPoint = new THREE.Vector3(0, this.length, 0)
    const buffer = [startPoint.x, startPoint.y, startPoint.z, endPoint.x, endPoint.y, endPoint.z]
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(buffer, 3))
    const material = new THREE.LineBasicMaterial({ color: Bone.HELPER_COLOR })
    const line = new THREE.LineSegments(geometry, material)
    helper.add(line)
  }
}
