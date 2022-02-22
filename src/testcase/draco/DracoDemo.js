import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Stats from '../../util/stats/Stats'
import { Demo } from '../base/Demo'
import * as numeral from 'numeral'

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
    this.app.scene.add(res.scene)

    Stats.addTable('GPU Memory', true)
    const totalBytes = Stats.stat(this.app.scene)
    Stats.add('Total', `${numeral(totalBytes).format('0,0')} bytes`, 'GPU Memory')
    Stats.addButton('button', () => {
      console.info('todo')
    })
  }
}
