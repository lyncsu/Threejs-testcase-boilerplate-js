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
    const num = 2
    const max = 2
    const min = 1
    const step = (max - min) / (num - 1)
    const rootBone = new Bone(max + step, true, true)
    this.app.scene.add(rootBone)
    this.rootBone = rootBone

    let parentBone = rootBone
    for (let i = 0; i < num; i++) {
      const len = max - (isNaN(step * i) ? 0 : step * i)
      const child = new Bone(len)
      parentBone.addChild(child)
      parentBone = child
    }
  }

  update() {
    console.info('update--------------------')
    const time = this.app.clock.getElapsedTime() * 2
    this.rootBone.rotation.z = (Math.sin(time) * Math.PI) / 4
    // this.rootBone.rotation.y = Math.cos(-time) * Math.PI
    this.rootBone.children.forEach(bone => {
      if (bone instanceof Bone) bone.iterate()
    })
  }
}
