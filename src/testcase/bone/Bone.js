import * as THREE from 'three'
import MathUtil from '../../util/MathUtil'
import BlenderUtil from './BlenderUtil'

/**
 * 骨头类
 */
export class Bone extends THREE.Object3D {
  /**
   * 辅助器颜色
   */
  static HELPER_COLOR = 0x000077

  /**
   * 默认延迟
   */
  static DEFAULT_DELAY = 1

  /**
   * 默认摆幅
   */
  static DEFAULT_RECURSION = 5

  /**
   * 摆幅迭代
   */
  get recursion() {
    return this.isRoot ? this.#recursion : this.rootBone.recursion
  }

  /**
   * 摆幅迭代
   */
  set recursion(value) {
    this.#recursion = value / 100
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
    return this.recursion * 100
  }

  /**
   * 获取根节点
   */
  get rootBone() {
    if (this.isRoot) return this
    return this.findRoot()
  }

  /**
   * 是否为根节点
   */
  isRoot

  /**
   * 调试模式
   */
  debugMode = true

  /**
   * 是否显示辅助线
   */
  isShowHelper

  /**
   * 骨骼长度
   */
  length

  /**
   * 骨骼总长度
   */
  totalLength

  /**
   * 父级节点
   */
  parentBone

  /**
   * 上次矩阵记录
   */
  prevMatrix

  /**
   * 结束姿态
   */
  endMatrix

  /**
   * 阈值
   */
  #threshold = 0.001

  /**
   * 延迟
   */
  #delay = Bone.DEFAULT_DELAY

  /**
   * 幅度迭代
   */
  #recursion = Bone.DEFAULT_RECURSION / 100

  /**
   * blender调试器初始化完成
   */
  #blenderHelperInited

  #blenderMatrix

  /**
   * 骨头类构造函数
   * @param {*} length 长度
   * @param {*} isShowHelper 是否显示辅助器
   * @param {*} isRoot 是否设置为根节点
   */
  constructor(params = { length, isShowHelper, isRoot, container, delay, recursion }) {
    super()

    const finalParams = { isShowHelper: true, isRoot: false, length: 0, delay: Bone.DEFAULT_DELAY, recursion: Bone.DEFAULT_RECURSION }
    Object.assign(finalParams, params)
    if (finalParams.isRoot) {
      this.isRoot = true
      this.boneId = 0
      this.count = 0
      // debug
      this.scene = finalParams.scene
    }
    this.length = finalParams.length
    this.delay = finalParams.delay
    this.recursion = finalParams.recursion
    this.recordDirection = new THREE.Vector3()
    this.endMatrix = new THREE.Matrix4().copy(this.matrix)
    this.prevMatrix = new THREE.Matrix4().copy(this.endMatrix)
    if (finalParams.isShowHelper) this.#createBoneHelper()
  }

  /**
   * 添加子骨骼
   * @param {*} bone
   */
  addChild(bone) {
    bone.boneId = ++this.rootBone.count
    bone.parentBone = this
    this.childBone = bone
    this.add(bone)
    this.rootBone.totalLength = this.rootBone.computeTotalLength()
    this.recordDirection.set(0, this.rootBone.totalLength, 0)

    const bonePosition = new THREE.Vector3(0, bone.parentBone.length, 0)
    bone.position.copy(bonePosition)
    bone.updateMatrix()
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
   * 迭代旋转
   */
  iterate() {
    if (this.isRoot) {
      this.prevMatrix.copy(this.matrixWorld)
      this.childBone && this.childBone.iterate()
      // this.#createMatrixHelper(BlenderUtil.BLENDER_MATRIX)
      return
    }

    // phase1
    const nextMatrix = new THREE.Matrix4()
    const rootMatrix = new THREE.Matrix4().copy(this.rootBone.matrixWorld)
    const cur_p_mt = BlenderUtil.toBlender(rootMatrix)
    // ✔️
    // console.info(currentParentMatrix.elements)
    // const currentParentBlender = new THREE.Matrix4().multiplyMatrices(currentParentMatrix, this.#blenderMatrix)
    // const currentParentT = new THREE.Matrix4().copy(cur_p_mt).transpose()
    // console.info('T', currentParentT.elements)
    // // const prevMatrix = this.#toBlender(this.prevMatrix)
    // const boneLengthVector = new THREE.Vector3(0, this.parentBone.length, 0)
    // const boneLengthMatrix = new THREE.Matrix4().setPosition(boneLengthVector)
    // const boneLengthMatrixBlender = BlenderUtil.toBlender(boneLengthMatrix)
    // const boneLengthMatrixThree = BlenderUtil.toThree(boneLengthMatrixBlender)
    // const targetMatrix = new THREE.Matrix4().multiplyMatrices(boneLengthMatrixThree, cur_p_mt)
    /* const parentMatrixWorld = new THREE.Matrix4().copy(this.parent.matrixWorld)
    const parentMatrix = new THREE.Matrix4().copy(this.parent.matrix)
    
    const targetMatrix = new THREE.Matrix4().multiplyMatrices(parentMatrixWorld, parentMatrix).transpose().invert()
    const targetDirectionY = MathUtil.extractDirection(targetMatrix, 'y')
    const prevDirectionY = MathUtil.extractDirection(this.prevMatrix, 'y')
    const dotY = new THREE.Vector3().copy(prevDirectionY).dot(targetDirectionY)
    const angleY = Math.acos(MathUtils.clamp(dotY, 0, 1)) // / 1.5
    const axis = new THREE.Vector3()
    const rotateMatrix = new THREE.Matrix4()
    if (angleY !== 0) {
      axis.crossVectors(prevDirectionY, targetDirectionY).normalize()
      rotateMatrix.makeRotationAxis(axis, angleY)
    }
    rotateMatrix.multiply(this.parent.matrixWorld)
    // nextMatrix.copy(rotateMatrix) */

    /*
    // phase2
    const nextDirectionX = MathUtil.extractDirection(nextMatrix, 'x')
    const targetDirectionX = MathUtil.extractDirection(targetMatrix, 'x')
    const dotX = nextDirectionX.dot(targetDirectionX)
    let roll
    if (dotX > 1) roll = 0
    else roll = Math.acos(dotX)
    roll = roll / this.delay
    const checkDirection = new THREE.Vector3().crossVectors(nextDirectionX, targetDirectionX)
    if (checkDirection.dot(targetDirectionY) < 0) roll = -roll
    const axisRoll = MathUtil.extractDirection(nextMatrix, 'z')
    rotateMatrix.makeRotationAxis(axisRoll, roll)
    nextMatrix.multiply(rotateMatrix) */

    // phase3
    /*const childPosition = new THREE.Vector3(0, this.length, 0).applyMatrix4(this.matrixWorld)
    const bonePosition = new THREE.Vector3().copy(this.position).applyMatrix4(this.parent.matrixWorld)
    const directionY = new THREE.Vector3().subVectors(childPosition, bonePosition).normalize()
    // const nextDirectionY = MathUtil.extractDirection(nextMatrix, 'y')
    const recursion = new THREE.Vector3().copy(this.recordDirection).multiplyScalar(this.recursion)
    const strengthened = new THREE.Vector3().copy(directionY).multiplyScalar(this.strength)
    const phase = new THREE.Vector3().addVectors(nextDirectionY, strengthened).divideScalar(this.delay).sub(recursion)
    
    if (MathUtil.lessThan(phase, this.#threshold)) phase.set(0, 0, 0)
    this.recordDirection.copy(phase)

    directionY.add(phase).normalize()
    const nextDirectionZ = MathUtil.extractDirection(nextMatrix, 'z')
    const directionX = new THREE.Vector3().crossVectors(directionY, nextDirectionZ).normalize()
    const directionZ = new THREE.Vector3().crossVectors(directionX, directionY).normalize()
    nextMatrix.makeBasis(directionX, directionY, directionZ)
    */
    // update matrix
    const quaternion = new THREE.Quaternion().setFromRotationMatrix(nextMatrix)
    this.quaternion.copy(quaternion)
    this.updateMatrix()

    this.prevMatrix.copy(nextMatrix).multiply(this.parent.matrixWorld)

    // next iterate
    if (this.childBone) this.childBone.iterate()

    // debug
    if (this.debugMode) {
      if (this.boneId === 1) {
        // this.#createDirectionHelper(boneLengthVectorBlender)
        // this.#createDirectionHelper(targetDirectionY, 'targetDirectionX', 0xff000e)
        // this.#createPositionHelper(bonePosition)
        this.#createMatrixHelper(cur_p_mt, null, true)
        // this.#createAxesHelper(currentParentMatrix)
      }
    }
  }

  /**
   * 重置参数
   */
  reset() {
    this.recordDirection.set(0, this.rootBone.totalLength, 0)
    if (this.childBone) this.childBone.reset()
  }

  /**
   * 计算总长度
   */
  computeTotalLength(value) {
    let length = value || this.length
    if (this.childBone) length += this.length + this.childBone.computeTotalLength(length)
    return length
  }

  /**
   * 方向辅助
   */
  #createDirectionHelper(
    target,
    name = 'directionHelperTarget',
    color = 0x00ff00,
    noWorldTransform = false,
    targetPosition = new THREE.Vector3()
  ) {
    let hasHelper = false
    this.rootBone.scene.children
      .filter((child) => this.#isHelperExsit(child, name, THREE.ArrowHelper))
      .forEach((child) => {
        hasHelper = true
        const worldTarget = new THREE.Vector3().copy(target).applyMatrix4(child.parent.matrixWorld)
        child.setDirection(worldTarget)
        child.setLength(worldTarget.length())
        if (!noWorldTransform) {
          const worldPosition = new THREE.Vector3().copy(child.position).applyMatrix4(child.parent.matrixWorld)
          child.position.copy(worldPosition)
        }
      })
    if (!hasHelper) {
      if (!noWorldTransform) {
        const worldPosition = new THREE.Vector3().copy(this.position).applyMatrix4(this.parent.matrixWorld)
        const worldTarget = new THREE.Vector3().copy(target).applyMatrix4(this.parent.matrixWorld)
        const helper = new THREE.ArrowHelper(worldTarget, worldPosition, worldTarget.length(), color)

        helper.uuid = `${this.boneId}_${name}`
        this.rootBone.scene.add(helper)
      } else {
        const helper = new THREE.ArrowHelper(target, targetPosition, target.length(), color)

        helper.uuid = `${this.boneId}_${name}`
        this.rootBone.scene.add(helper)
      }
    }
  }

  /**
   * 位置辅助
   */
  #createPositionHelper(target, name = 'positionHelperTarget') {
    let hasHelper = false
    this.rootBone.scene.children
      .filter((child) => this.#isHelperExsit(child, name, THREE.AxesHelper))
      .forEach((child) => {
        hasHelper = true
        child.position.copy(target)
      })
    if (!hasHelper) {
      const helper = new THREE.AxesHelper(0.5)
      helper.uuid = `${this.boneId}_${name}`
      helper.position.copy(target)
      this.rootBone.scene.add(helper)
    }
  }

  /**
   * matrix辅助器
   * @returns
   */
  #createMatrixHelper(target, name = 'matrixHelper', noWorldTransform = false) {
    if (!target) target = new THREE.Matrix4()
    const axisX = MathUtil.extractDirection(target, 'x')
    const axisY = MathUtil.extractDirection(target, 'y')
    const axisZ = MathUtil.extractDirection(target, 'z')
    const position = new THREE.Vector3(target.elements[12], target.elements[13], target.elements[14])
    this.#createDirectionHelper(axisX, name + 'axisX', 0xff0000, noWorldTransform, position)
    this.#createDirectionHelper(axisY, name + 'axisY', 0x00ff00, noWorldTransform, position)
    this.#createDirectionHelper(axisZ, name + 'axisZ', 0x0000ff, noWorldTransform, position)
  }

  #createAxesHelper(target, name = 'axesHelper') {
    let hasHelper = false
    this.rootBone.scene.children
      .filter((child) => this.#isHelperExsit(child, name, THREE.AxesHelper))
      .forEach((child) => {
        hasHelper = true
        child.matrix.copy(target)
        child.updateWorldMatrix(true, false)
      })
    if (!hasHelper) {
      const helper = new THREE.AxesHelper(1.5)
      helper.matrixAutoUpdate = false
      helper.uuid = `${this.boneId}_${name}`
      this.rootBone.scene.add(helper)
    }
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

  /**
   * 检查是否存在
   * @param {*} child
   * @param {*} name
   * @param {*} ClassType
   * @returns
   */
  #isHelperExsit(child, name, ClassType) {
    if (child instanceof ClassType) {
      if (child.uuid === this.boneId + `_${name}`) return true
    }
  }
}
