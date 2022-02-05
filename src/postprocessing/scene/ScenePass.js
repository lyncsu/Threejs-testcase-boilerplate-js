import { App } from '../../App'
import { Pass } from '../Pass'

/**
 * 场景pass
 */
export class ScenePass extends Pass {
  /**
   * 场景pass构造函数
   * @param app
   */
  constructor(app) {
    super(app, null, null, true, true)
  }

  /**
   * 渲染
   */
  render(renderToScreen, readBuffer, writeBuffer) {
    super.render(renderToScreen, readBuffer, writeBuffer)
  }
}
