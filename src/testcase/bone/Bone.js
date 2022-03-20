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
   * 每一级的幅度迭代次数
   */
  get recursion() {
    return 1
  }

  /**
   * 拉伸幅度
   */
  get strength() {
    return 1
  }

  /**
   * 延迟响应
   */
  get delay() {
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
    this.boneLength = new THREE.Vector3(0, this.length, 0)
    if (this.isRoot) {
      this.boneId = 0
      this.count = 0
    }
    this.prevMatrix = new THREE.Matrix4().setPosition(this.boneLength)
    this.iteration = 0
    this.recordDirection = new THREE.Vector3()
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
    this.rootBone.add(bone)
  }

  /**
   * 获取骨头
   * @param {*} boneId
   */
  getChildBoneById(boneId) {
    const index = this.rootBone.children.findIndex(child => child instanceof Bone && child.boneId === boneId && child.parentBone == this)
    if (index !== -1) return this.rootBone.children[index]
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
    if (this.boneId === 0) return this.childBone && this.childBone.iterate()

    // phase1
    const parentBoneMatrix = new THREE.Matrix4().setPosition(this.parentBone.boneLength).multiply(this.parentBone.matrixWorld)
    const prevMatrix = new THREE.Matrix4().copy(this.prevMatrix)
    const nextMatrix = new THREE.Matrix4().copy(this.prevMatrix)
    const bonePosition = MathUtil.extractPosition(parentBoneMatrix)
    const prevDirectionY = MathUtil.extractDirection(prevMatrix, 'y')
    const boneDirectionY = MathUtil.extractDirection(parentBoneMatrix, 'y')
    const diffY = Math.acos(MathUtils.clamp(new THREE.Vector3().copy(prevDirectionY).dot(boneDirectionY), 0, 1))
    const axisZ = new THREE.Vector3().crossVectors(prevDirectionY, boneDirectionY).normalize()

    nextMatrix.makeRotationAxis(axisZ, diffY).setPosition(bonePosition)

    // phase2
    const nextDirectionX = MathUtil.extractDirection(nextMatrix, 'x')
    const boneMatrixTransposed = new THREE.Matrix4().copy(parentBoneMatrix).transpose()
    const boneDirectionX = MathUtil.extractDirection(boneMatrixTransposed, 'x')
    const dotValue = new THREE.Vector3().copy(nextDirectionX).dot(boneDirectionX)
    let roll
    if (dotValue > 1) roll = 0
    else roll = -Math.acos(dotValue)
    roll = roll / this.delay

    const checkDirection = new THREE.Vector3().crossVectors(nextDirectionX, boneDirectionX)
    // todo: np.dot(check_vec, tag_y_vec) < 0.0
    if (checkDirection.dot(Constant.AXIS_Z) > 0) roll = -roll

    const nextTransposed = new THREE.Matrix4().copy(nextMatrix).transpose()
    const axis = new THREE.Vector3().copy(MathUtil.extractDirection(nextTransposed, 'z'))
    nextMatrix.makeRotationAxis(axis, roll).setPosition(bonePosition)

    // phase3
    const boneMatrix = new THREE.Matrix4().multiply(this.matrixWorld).setPosition(this.parentBone.boneLength)
    const childBonePosition = MathUtil.extractPosition(boneMatrix)
    // const directionY = new THREE.Vector3().subVectors(childBonePosition, bonePosition).normalize()
    // const nextDirectionY = MathUtil.extractDirection(nextMatrix, 'y')
    // const recursionDirection = new THREE.Vector3().copy(this.recordDirection).multiplyScalar(this.recursion)
    // directionY.multiplyScalar(this.strength)
    // const phaseDirection = new THREE.Vector3().subVectors(nextDirectionY, directionY) //.add(recursionDirection)

    // if (MathUtil.lessThan(phaseDirection, this.#threshold)) phaseDirection.set(0, 0, 0)
    // this.recordDirection.copy(phaseDirection)

    // const nextDirectionZ = MathUtil.extractDirection(nextMatrix, 'z')
    // // directionY.add(phaseDirection).normalize()
    // const directionX = new THREE.Vector3().crossVectors(directionY, nextDirectionZ).normalize()
    // const directionZ = new THREE.Vector3().crossVectors(directionX, directionY).normalize()
    // const matrix3 = MathUtil.composeMatrix3ByAxis(directionX, directionY, directionZ)
    nextMatrix.setPosition(childBonePosition)

    // record
    // this.prevMatrix.copy(nextMatrix)
    const { position, quaternion } = MathUtil.decompose(nextMatrix)
    this.position.copy(position)
    this.quaternion.copy(quaternion)
    this.updateMatrix()

    // next iterate
    if (this.childBone) this.childBone.iterate()

    // debug
    if (this.boneId === 2) {
      console.info('boneId', this.boneId, this.parentBone.matrixWorld)

      const helperTarget = bonePosition
      // this.#createDirectionHelper(helperTarget)
      this.#createPositionHelper(helperTarget)
    }
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

  /**
   * 方向辅助
   */
  #createDirectionHelper(target) {
    let hasHelper = false
    this.rootBone.children.forEach(child => {
      if (child instanceof THREE.ArrowHelper) {
        if (child.uuid === this.boneId) {
          hasHelper = true
          child.setDirection(target)
          child.setLength(target.length())
          child.position.copy(this.position)
        }
      }
    })
    if (!hasHelper) {
      const helper = new THREE.ArrowHelper(target, this.position, target.length(), 0x00ff00)
      helper.uuid = this.boneId
      this.rootBone.add(helper)
    }
  }

  /**
   * 位置辅助
   */
  #createPositionHelper(target) {
    let hasHelper = false
    this.rootBone.children.forEach(child => {
      if (child instanceof THREE.AxesHelper) {
        if (child.uuid === this.boneId) {
          hasHelper = true
          child.position.copy(this.position)
        }
      }
    })
    if (!hasHelper) {
      const helper = new THREE.AxesHelper(0.5)
      helper.uuid = this.boneId
      helper.position.copy(target)
      this.rootBone.add(helper)
    }
  }
}
