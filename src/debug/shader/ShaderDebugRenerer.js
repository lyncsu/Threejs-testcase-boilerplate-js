import { CanvasContainer } from './CanvasContainer'
import * as THREE from 'three'

const VISIBLE_SYMBOL = Symbol()
const MATERIAL_SYMBOL = Symbol()
const container = new CanvasContainer()
const vec2 = new THREE.Vector2()

export class ShaderDebugRenderer extends THREE.WebGLRenderer {
  constructor(options) {
    options = { preserveDrawingBuffer: true, ...options }

    super(options)

    this.bindScope()

    const readTarget = new THREE.WebGLRenderTarget(1, 1, {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    })

    this.enableDebug = false
    this.debugMaterial = null
    this.readTarget = readTarget
    this._originalRender = this.render
    this.render = this._proxyRender
    this.containerScale = 20
    this.containerDimensions = 5
  }

  bindScope() {
    this._proxyRender = this._proxyRender.bind(this)
  }

  _proxyRender(scene, camera) {
    const debugMaterial = this.debugMaterial
    let found = false
    if (this.enableDebug) {
      scene.traverse(c => {
        if (c.material) {
          found = found || c.material === debugMaterial || c.material === debugMaterial.targetMaterial
        }
      })
    }

    if (found && debugMaterial) {
      scene.traverse(c => {
        if (c.material) {
          c[VISIBLE_SYMBOL] = c.visible
          c[MATERIAL_SYMBOL] = c.material

          if (c.material === debugMaterial || c.material === debugMaterial.targetMaterial) {
            c.material = debugMaterial
          } else {
            c.visible = false
          }
        }
      })

      const originalClearColor = new THREE.Color()
      this.getClearColor(originalClearColor)
      const originalClearAlpha = this.clearAlpha
      const originalBackground = scene.background

      this.setClearAlpha(0)
      this.setClearColor(0)
      scene.background = null

      this._originalRender(scene, camera)
      this._updateReadTarget(scene, camera)

      this.setClearAlpha(originalClearAlpha)
      this.setClearColor(originalClearColor)
      scene.background = originalBackground
      scene.traverse(c => {
        if (c.material) {
          c.visible = c[VISIBLE_SYMBOL]
          c.material = c[MATERIAL_SYMBOL]

          delete c[VISIBLE_SYMBOL]
          delete c[MATERIAL_SYMBOL]
        }
      })
    } else {
      this._originalRender(scene, camera)
    }
  }

  readPixel(x, y, type) {
    const readTarget = this.readTarget
    const buffer = new Float32Array(4)
    const height = readTarget.texture.image.height
    this.readRenderTargetPixels(readTarget, x, height - 1 - y, 1, 1, buffer)

    let result

    switch (type) {
      case 'int':
      case 'uint':
        return [Math.round(buffer[0])]

      case 'bool':
        return [buffer[0] > 0.5]

      case 'float':
        return [buffer[0]]

      case 'vec2':
        result = [...buffer]
        result.length = 2
        return result

      case 'vec3':
        result = [...buffer]
        result.length = 3
        return result

      case 'vec4':
        result = [...buffer]
        result.length = 4
        return result

      default:
        return [...buffer]
    }
  }

  _updateReadTarget(scene, camera) {
    if (!this.enableDebug) return

    const debugMaterial = this.debugMaterial
    const readTarget = this.readTarget
    const originalRenderTarget = this.getRenderTarget()
    const originalClearColor = new THREE.Color()
    this.getClearColor(originalClearColor)
    const originalClearAlpha = this.clearAlpha
    const originalBackground = scene.background
    const originalMultiplier = debugMaterial.multiplier
    const originalOffset = debugMaterial.offset

    this.getSize(vec2).multiplyScalar(this.getPixelRatio())
    vec2.x = Math.floor(vec2.x)
    vec2.y = Math.floor(vec2.y)
    readTarget.setSize(vec2.x, vec2.y)
    this.setClearColor(0xff0000)
    this.setClearAlpha(0)
    scene.background = null
    debugMaterial.multiplier = 1.0
    debugMaterial.offset = 0.0

    this.setRenderTarget(readTarget)
    this.clear()
    this._originalRender(scene, camera)

    this.setRenderTarget(originalRenderTarget)
    this.setClearColor(originalClearColor)
    this.setClearAlpha(originalClearAlpha)
    scene.background = originalBackground
    debugMaterial.multiplier = originalMultiplier
    debugMaterial.offset = originalOffset
  }
}
