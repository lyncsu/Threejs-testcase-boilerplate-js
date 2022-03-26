import { Demo } from '../base/Demo'
import { Bone } from './Bone'
import gsap from 'gsap'
import Stats from '../../util/stats/Stats'

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
    const childNum = 7
    const max = 1.4
    const min = 0.2
    const step = (max - min) / (childNum - 1)
    const rootBone = new Bone(null, true, true, this.app.scene)
    this.app.scene.add(rootBone)
    this.rootBone = rootBone

    let parentBone = rootBone
    for (let i = 0; i < childNum; i++) {
      const len = max - (isNaN(step * i) ? 0 : step * i)
      const child = new Bone(len)
      parentBone.addChild(child)
      parentBone = child
    }

    gsap.to(tweenObject, {
      repeat: -1,
      repeatDelay: 5,
      duration: 3,
      keyframes: {
        ease: 'none',
        // easeEach: 'power1',
        t: [0, 1, -1, 1, -1, 0],
      },
      onRepeat: () => {
        tweenObject.t = 0
        rootBone.reset()
      },
      onUpdate: () => {
        this.rootBone.rotation.z = (tweenObject.t * Math.PI) / 4
        // this.rootBone.rotation.y = (tweenObject.t * Math.PI) / 2
      },
    })
  }

  update() {
    this.rootBone.iterate()
  }
}
