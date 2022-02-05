import { ScenePass } from './scene/ScenePass'

export class Composer {
  constructor(app) {
    this.app = app
    this.scenePass = new ScenePass(app)
  }

  render() {
    this.scenePass.render(true)
  }
}
