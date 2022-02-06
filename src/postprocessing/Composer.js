import { RainGlassPass } from './rain/RainGlassPass'
import { ScenePass } from './scene/ScenePass'

export class Composer {
  constructor(app) {
    this.app = app
    this.scenePass = new ScenePass(app)
    this.rainGlassPass = new RainGlassPass(app)
  }

  render() {
    this.scenePass.render()
    this.rainGlassPass.render(true, this.scenePass.renderTarget)
  }
}
