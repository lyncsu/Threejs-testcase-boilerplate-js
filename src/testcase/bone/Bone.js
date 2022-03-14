import * as THREE from 'three'

/**
 * 骨头类
 */
export class Bone extends THREE.Object3D {
  /**
   * 是否为根节点
   */
  isRoot
  /**
   * 是否显示辅助线
   */
  isShowHelper
  /**
   * 骨骼矩阵
   */
  boneMatrix

  get rootBone() {
    if (this.isRoot) return this._rootBone
    return this.findRoot()
  }

  get parentBone() {
    return
  }

  constructor(length, isShowHelper = true, isRoot) {
    super()

    this.length = isRoot ? 0 : length
    this.isShowHelper = Boolean(isShowHelper)
    this.isRoot = Boolean(isRoot)
    if (this.isRoot) {
      this.boneId = 0
      this.count = 0
      this._rootBone = this.add(new THREE.Object3D())
    }
    this.matrixAutoUpdate = this.isRoot
    const endPosition = new THREE.Vector3().copy(this.position).add(new THREE.Vector3(0, this.length, 0))
    this.boneMatrix = this.isRoot ? this.matrix : new THREE.Matrix4().setPosition(endPosition)
    console.info(this.boneMatrix.toArray())
    if (this.isShowHelper) this.createBoneHelper()
  }

  createBoneHelper() {
    const helper = new THREE.Object3D()
    if (this.isRoot) {
      const geometry = new THREE.SphereBufferGeometry(0.125, 3, 2)
      const center = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff0077, wireframe: true }))
      helper.add(center)
    } else {
      const startPoint = new THREE.Vector3()
      const endPoint = new THREE.Vector3(0, this.length, 0)
      const buffer = [startPoint.x, startPoint.y, startPoint.z, endPoint.x, endPoint.y, endPoint.z]
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(buffer, 3))
      const material = new THREE.LineBasicMaterial({ color: 0xff0077 })
      const line = new THREE.LineSegments(geometry, material)
      helper.add(line)

      const arrowHeight = 0.25
      const arrowGeometry = new THREE.CylinderGeometry(0, 0.1, arrowHeight, 3, 1)
      arrowGeometry.translate(0, this.length - arrowHeight / 2, 0)
      const arrow = new THREE.Mesh(arrowGeometry, new THREE.MeshBasicMaterial({ color: 0xff0077, wireframe: true }))
      helper.add(arrow)
    }
    this.add(helper)
  }

  addChild(bone) {
    bone.setBoneMatrix(this.boneMatrix)
    bone.boneId = ++this.rootBone.count
    this.rootBone.add(bone)
  }

  setBoneMatrix(matrix) {
    this.boneMatrix.multiply(matrix)
  }

  findRoot(node) {
    const target = node || this

    console.info('node parent', target.parent.isRoot, this.parent)
    if (target.parent.isRoot) return target.parent
    return this.findRoot(target)
  }

  getMatrixPosition(matrix4) {
    return new THREE.Vector3(matrix4[12], matrix4[13], matrix4[14])
  }
}
