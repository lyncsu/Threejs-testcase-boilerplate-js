// import { RainDemo } from './rain/RainDemo'
import { DracoDemo } from './draco/DracoDemo'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils'
import Stats from '../util/stats/Stats'

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
    Stats.register(this.app.renderer.getContext(), this.app.renderer.info.render)
    // this.rain = new RainDemo(this.app)
    this.draco = new DracoDemo(this.app)
  }

  /**
   * 更新demo
   */
  update() {
    if (this.draco) this.draco.update()
    if (this.rain) {
      const { rainFallGeometry, ballGeometry } = this.rain.update()
      // if (ballGeometry) this.ballDisplay.setValue(BufferGeometryUtils.estimateBytesUsed(ballGeometry) + ' bytes')
      // if (rainFallGeometry) this.fallDisplay.setValue(BufferGeometryUtils.estimateBytesUsed(rainFallGeometry) + ' bytes')
    }
  }
}
