import { Demo } from '../base/Demo'
import { Bone } from './Bone'
import gsap from 'gsap'
import Stats from '../../util/stats/Stats'
import * as THREE from 'three'
import BlenderUtil from './BlenderUtil'

const tweenObject = { t: 0 }
/**
 * 骨骼测试demo
 */
export class BoneDemo extends Demo {
  constructor(root) {
    super(root)

    this.bindScope()
    this.init()
    Stats.addTable('Bone', true)
    Stats.addSlide('Delay', Bone.DEFAULT_DELAY, 1, 10, 1, 'Bone', (value) => {
      this.rootBone.delay = value
    })
    Stats.addSlide('Recursion', Bone.DEFAULT_RECURSION, 1, 10, 1, 'Bone', (value) => {
      this.rootBone.recursion = value
    })
  }

  bindScope() {}

  init() {
    const container = new THREE.Object3D()
    const rotation = new THREE.Euler((Math.PI / 180) * 40, 0, (Math.PI / 180) * -22.5)
    // container.rotation.copy(rotation)
    container.visible = false

    // const geometry = new THREE.ConeBufferGeometry(0.1, 0.2, 10)
    const geometry = new THREE.BoxBufferGeometry(1, 1, 1)
    geometry.center()
    geometry.scale(0.1, 0.2, 0.3)
    // geometry.translate(0, 0.1, 0)
    const object = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial())
    object.matrixAutoUpdate = false
    this.app.scene.add(object)
    // IN BLENDER
    // method 1
    /* const objectPosition = new THREE.Vector3(0.5, 1, 2)
    const objectQuaternion = new THREE.Quaternion(0.492404, -0.369616, 0.492404, 0.615191)
    const objectRotation = new THREE.Euler().setFromQuaternion(objectQuaternion)
    const axisX = new THREE.Vector3(0, 0, 1)
    const axisY = new THREE.Vector3(1, 0, 0)
    const axisZ = new THREE.Vector3(0, 1, 0)
    const RX = new THREE.Matrix4().makeRotationAxis(axisX, objectRotation.x)
    const RY = new THREE.Matrix4().makeRotationAxis(axisY, objectRotation.y)
    const RZ = new THREE.Matrix4().makeRotationAxis(axisZ, objectRotation.z)
    objectPosition.applyMatrix4(BlenderUtil.THREE_MATRIX)
    const T = new THREE.Matrix4().setPosition(objectPosition)
    const matrix = new THREE.Matrix4().multiply(RX).multiply(RY).multiply(RZ).copyPosition(T) */

    // console.info(matrix)
    // const objectMatrixInThree = BlenderUtil.toThree(objectMatrix)
    // console.info(objectMatrixInThree)
    // Vt=(Rx90Ry90Vb)I
    const Vb = new THREE.Vector3(0.5, 1, 2)
    const Qb = new THREE.Quaternion(0.492404, -0.369616, 0.492404, 0.615191)
    const axisX = new THREE.Vector3(1, 0, 0)
    const axisY = new THREE.Vector3(0, 1, 0)
    const Rx90 = new THREE.Matrix4().makeRotationAxis(axisX, Math.PI / 2)
    const Ry90 = new THREE.Matrix4().makeRotationAxis(axisY, Math.PI / 2)
    const M = new THREE.Matrix4().multiplyMatrices(Rx90, Ry90).invert()
    const Vt = new THREE.Vector3().copy(Vb).applyMatrix4(M)

    // method 2
    const Rb = new THREE.Euler().setFromQuaternion(Qb)
    const Ax = new THREE.Vector3()
    const Ay = new THREE.Vector3()
    const Az = new THREE.Vector3()
    M.extractBasis(Ax, Ay, Az)
    const Rx = new THREE.Matrix4().makeRotationAxis(Ax, Rb.x)
    const Ry = new THREE.Matrix4().makeRotationAxis(Ay, Rb.y)
    const Rz = new THREE.Matrix4().makeRotationAxis(Az, Rb.z)
    const Rt = new THREE.Matrix4().multiply(Rx).multiply(Ry).multiply(Rz)
    M.copy(Rt).setPosition(Vt)

    // method 3
    // const I = new THREE.Matrix4().copy(M).invert()
    // const mb = new THREE.Matrix4().makeRotationFromQuaternion(Qb)
    // // mb.multiply(I).setPosition(Vt)
    // const V = new THREE.Vector3().copy(Vb).applyMatrix4(mb)
    // object.position.copy(V)
    // object.updateMatrix()
    // tweenObject.rotation = objectRotation
    // tweenObject.object = object

    // const rotationMatrix = new THREE.Matrix4().makeRotationFromEuler(rotation)
    // container.matrixAutoUpdate = false
    // container.matrix.copy(rotation)
    // container.updateMatrixWorld()
    // console.info(container.rotation.order)
    // container.rotation.x = (Math.PI / 180) * 40
    // container.rotation.z = (Math.PI / 180) * -22.5
    // container.updateMatrix()

    // const rotateMatrix = new THREE.Matrix4()
    // rotateMatrix.extractRotation(container.matrix)
    // in blender: 0.875426, 0.408218, -0.109382, -0.23457
    // console.info('amt', rotateMatrix.toArray())
    this.app.scene.add(container)
    // this.app.scene.add(new THREE.AxesHelper(1))

    const childNum = 2
    const max = 0.7
    const min = 0.5 //0.2
    const step = (max - min) / (childNum - 1)
    const rootBone = new Bone({ length: 1, isShowHelper: true, isRoot: true, scene: this.app.scene })
    container.add(rootBone)
    this.rootBone = rootBone

    let parentBone = rootBone
    for (let i = 0; i < childNum; i++) {
      // const length = max - (isNaN(step * i) ? 0 : step * i)
      const length = 1
      const child = new Bone({ length })
      parentBone.addChild(child)
      parentBone = child
    }

    /* gsap.to(tweenObject, {
      repeat: -1,
      repeatDelay: 5,
      duration: 3,
      keyframes: {
        ease: 'none',
        // easeEach: 'power1',
        t: [0, 1, -1, 0]
      },
      onRepeat: () => {
        tweenObject.t = 0
        rootBone.reset()
      },
      onUpdate: () => {
        this.rootBone.rotation.z = (tweenObject.t * Math.PI) / 4
        // this.rootBone.rotation.y = (tweenObject.t * Math.PI) / 2
      }
    }) */

    // this.#initHelper()
  }

  update() {
    this.rootBone.iterate()
    // tweenObject.rotation.x += (1 / 180) * Math.PI
    // const rotation = BlenderUtil.toThree(tweenObject.rotation)
    // tweenObject.object.rotation.copy(rotation)
  }

  #initHelper() {
    // const helper = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0).normalize(), this.rootBone.position, 2.1, 0x00ff00)
    // this.app.scene.add(helper)
    // const helper2 = new THREE.ArrowHelper(new THREE.Vector3(-1, 0, 0).normalize(), this.rootBone.position, 2.1, 0x00ff00)
    // this.app.scene.add(helper2)
  }
}
