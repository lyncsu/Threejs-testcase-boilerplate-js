import { Matrix4 } from 'three'
import { Vector3 } from 'three'

export class Constant {
  static STATIC_ASSETS_PATH = './static/assets/image/'
  static ZERO_VECTOR = new Vector3()
  static IDENTITY_MATRIX = new Matrix4()
  static AXIS_X = new Vector3(1, 0, 0)
  static AXIS_Y = new Vector3(0, 1, 0)
  static AXIS_Z = new Vector3(0, 0, 1)
}
