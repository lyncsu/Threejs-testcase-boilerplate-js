import { RainDemo } from './rain/RainDemo'

/**
 * 测试用例类
 */
export class Testcase {
  /**
   * 测试用例构造函数
   */
  constructor(app) {
    this.app = app

    this.bindScope()
    this.init()
  }

  /**
   * 绑定作用域
   */
  bindScope() {}

  /**
   * 初始化
   */
  init() {
    new RainDemo(this.app)
  }
}
