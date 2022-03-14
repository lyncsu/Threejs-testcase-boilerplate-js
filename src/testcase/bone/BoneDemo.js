import { Demo } from '../base/Demo'
import { Bone } from './Bone'
import * as THREE from 'three'

/**
 * 骨骼测试demo
 */
export class BoneDemo extends Demo {
  rootBone
  constructor(root) {
    super(root)

    this.bindScope()
    this.init()
  }

  bindScope() {}

  init() {
    const rootBone = new Bone(null, true, true)
    this.app.scene.add(rootBone)
    this.rootBone = rootBone

    let parentBone = rootBone
    const num = 3
    const max = 2
    const min = 1
    for (let i = 0; i < num; i++) {
      const len = max - ((max - min) / (num - 1)) * i
      const child = new Bone(len)
      console.info('length', len)
      parentBone.addChild(child)
      parentBone = child
    }
  }

  update() {
    console.info('update--------------------')
    const time = this.app.clock.getElapsedTime() * 2
    this.rootBone.rotation.z = (Math.sin(time) * Math.PI) / 4
    this.rootBone.rotation.y = Math.cos(-time) * Math.PI
    this.rootBone.children.forEach(bone => {
      if (bone instanceof Bone) {
        const position = new THREE.Vector3()
        const quaternion = new THREE.Quaternion()
        const scale = new THREE.Vector3()
        // console.info(bone.boneId, bone.boneMatrix.toArray())
        bone.parentBone.boneMatrix.decompose(position, quaternion, scale)
        bone.position.copy(position)
        bone.updateMatrix()
      }
    })
  }
}
