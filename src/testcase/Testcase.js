// import { RainDemo } from './rain/RainDemo'
import { DracoDemo } from './draco/DracoDemo'
import * as dat from 'dat.gui'
import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils'
import GeometryStats from '../util/performance/GeometryStats'

/**
 * 测试用例类
 */
export class Testcase {
  data = {
    bunnyGPUMemory: '0 bytes',
    totalGPUMemory: '0 bytes',
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
    GeometryStats.registerRenderer(this.app.renderer)
    // this.rain = new RainDemo(this.app)
    this.draco = new DracoDemo(this.app)

    // dat.gui
    const gui = new dat.GUI()
    const folder = gui.addFolder('Memory Info')
    folder.open()
    this.bunnyInfo = folder.add(this.data, 'bunnyGPUMemory', '0 bytes')
    this.totalInfo = folder.add(this.data, 'totalGPUMemory', '0 bytes')
    // this.fallDisplay = folder.add(this.data, 'rainFallGPUMemory', '0 bytes')
    // this.ballDisplay = folder.add(this.data, 'ballGPUMemory', '0 bytes')
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
