import { Demo } from '../base/Demo'
import { Bone } from './Bone'
import gsap from 'gsap'

const tweenObject = { t: 0 }
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
    const num = 1
    const max = 1
    const min = 0.5
    const step = (max - min) / (num - 1)
    const rootBone = new Bone(2, true, true)
    this.app.scene.add(rootBone)
    this.rootBone = rootBone

    let parentBone = rootBone
    for (let i = 0; i < num; i++) {
      const len = max - (isNaN(step * i) ? 0 : step * i)
      const child = new Bone(len)
      parentBone.addChild(child)
      parentBone = child
    }

    gsap.to(tweenObject, {
      repeat: -1,
      repeatDelay: 3,
      duration: 3,
      keyframes: {
        ease: 'none',
        // easeEach: 'power1',
        t: [0, 1, -1, 1, -1, 0],
      },
    })
  }

  update() {
    const z = (tweenObject.t * Math.PI) / 3

    this.rootBone.rotation.z = z
    this.rootBone.iterate()
    // this.rootBone.children.forEach(bone => {
    //   if (bone instanceof Bone) bone.iterate()
    // })
  }
}
