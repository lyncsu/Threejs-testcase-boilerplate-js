import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Demo } from '../base/Demo'

/**
 * Google Draco模型测试用例
 */
export class DracoDemo extends Demo {
  constructor(root) {
    super(root)

    this.init()
  }

  async init() {
    const loader = new GLTFLoader()
    const res = await loader.loadAsync('static/assets/model/bunny.gltf')
    // const res = await loader.loadAsync('static/assets/model/bunny.gltf')

    console.info('draco demo init', res.scene)

    this.app.scene.add(res.scene)
  }
}
