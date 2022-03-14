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

    const child1 = new Bone(3)
    rootBone.addChild(child1)

    const child2 = new Bone(2)
    child1.addChild(child2)

    // const child3 = new Bone(1)
    // child2.addChild(child3)
  }

  update() {
    console.info('update--------------------')
    // this.rootBone.position.x = Math.sin(this.app.clock.getElapsedTime())
    this.rootBone.rotation.z = Math.sin(this.app.clock.getElapsedTime())
    this.rootBone.children.forEach(bone => {
      if (bone instanceof Bone) {
        const position = new THREE.Vector3()
        const quaternion = new THREE.Quaternion()
        const scale = new THREE.Vector3()
        console.info(bone.boneId, bone.boneMatrix)
        bone.boneMatrix.compose(position, quaternion, scale)
        bone.position.copy(position)
        bone.quaternion.copy(quaternion)
        bone.updateMatrix()
        console.info(bone.matrix.toArray())
      }
    })
  }
}
