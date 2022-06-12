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
    Stats.addSlide('Delay', Bone.DEFAULT_DELAY, 1, 10, 1, 'Bone', value => {
      this.rootBone.delay = value
    })
    Stats.addSlide('Recursion', Bone.DEFAULT_RECURSION, 1, 10, 1, 'Bone', value => {
      this.rootBone.recursion = value
    })
  }

  bindScope() {}

  init() {
    const container = new THREE.Object3D()
    const rotationInBlender = new THREE.Euler((Math.PI / 180) * 40, 0, (Math.PI / 180) * -22.5)
    const rotation = BlenderUtil.toThree(rotationInBlender)
    container.rotation.copy(rotation)
    // const rotationMatrix = new THREE.Matrix4().makeRotationFromEuler(rotationInBlender)
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
  }

  #initHelper() {
    // const helper = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0).normalize(), this.rootBone.position, 2.1, 0x00ff00)
    // this.app.scene.add(helper)
    // const helper2 = new THREE.ArrowHelper(new THREE.Vector3(-1, 0, 0).normalize(), this.rootBone.position, 2.1, 0x00ff00)
    // this.app.scene.add(helper2)
  }
}
