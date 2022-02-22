import { RainGlassPass } from './rain/RainGlassPass'
import { RayMarchingPass } from './raymarching/RayMarchingPass'
import { ScenePass } from './scene/ScenePass'

export class Composer {
  constructor(app) {
    this.app = app
    this.scenePass = new ScenePass(app)
    // this.rayMarchingPass = new RayMarchingPass(app)
    // this.rainGlassPass = new RainGlassPass(app)
  }

  render() {
    this.scenePass.render(true)
    // this.rayMarchingPass.render(false, this.scenePass.renderTarget)
    // this.rainGlassPass.render(true, this.rayMarchingPass.renderTarget)
  }
}
