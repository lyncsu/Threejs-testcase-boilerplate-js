import { RainDemo } from './rain/RainDemo'
import * as dat from 'dat.gui'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils'

/**
 * 测试用例类
 */
export class Testcase {
  data = {
    rainFallGPUMemory: '0 bytes',
    ballGPUMemory: '0 bytes',
  }

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
    const gui = new dat.GUI()
    this.rain = new RainDemo(this.app)

    const folder = gui.addFolder('Memory Info')
    folder.open()
    this.fallDisplay = folder.add(this.data, 'rainFallGPUMemory', '0 bytes')
    this.ballDisplay = folder.add(this.data, 'ballGPUMemory', '0 bytes')
  }

  /**
   * 更新demo
   */
  update() {
    if (this.rain) {
      const { rainFallGeometry, ballGeometry } = this.rain.update()
      if (ballGeometry) this.ballDisplay.setValue(BufferGeometryUtils.estimateBytesUsed(ballGeometry) + ' bytes')
      if (rainFallGeometry) this.fallDisplay.setValue(BufferGeometryUtils.estimateBytesUsed(rainFallGeometry) + ' bytes')
    }
  }
}
