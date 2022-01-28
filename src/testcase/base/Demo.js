import { Clock } from 'three'
import { EventDispatcher } from 'three'
import { App } from '../../App'
import { Testcase } from '../Testcase'

/**
 * 测试用例基类
 */
export class Demo extends EventDispatcher {
  /**
   * 测试用例基类构造函数
   */
  constructor(root) {
    super()

    if (!root) return

    if (root instanceof App) {
      this.app = root
      this.testcase = root.testcase
    } else if (root instanceof Testcase) {
      this.testcase = root
      this.app = root.app
    }

    this.clock = new Clock()
  }

  update() {
    console.info('testcase update')
  }
}
