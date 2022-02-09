import * as THREE from 'three'
import { Vector3 } from 'three'
import { Vector2 } from 'three'
import { Constant } from '../../Constant'
import { RainFallMaterial } from '../../postprocessing/rain/RainFallMaterial'
import { Demo } from '../base/Demo'
import { RainDropMaterial } from './RainDropMaterial'
import { RainRippleMaterial } from './RainRippleMaterial'

/**
 * 雨滴效果用例
 */
export class RainDemo extends Demo {
  /**
   * 雨滴效果用例构造函数
   * @param {*} root
   */
  constructor(root) {
    super(root)

    this.init()
  }

  /**
   * 初始化
   */
  async init() {
    const resolution = new THREE.Vector2(this.app.domElement.clientWidth, this.app.domElement.clientHeight)
    const light = this.app.light
    // ripple on floor
    const geometry = new THREE.PlaneBufferGeometry(10, 10, 1, 1)
    const loader = new THREE.TextureLoader()
    const floorDiffuse = await loader.loadAsync(`${Constant.STATIC_ASSETS_PATH}floor_diffuse.jpg`)
    const floorNormal = await loader.loadAsync(`${Constant.STATIC_ASSETS_PATH}floor_normal.jpg`)
    const rippleNormal = await loader.loadAsync(`${Constant.STATIC_ASSETS_PATH}ripple_normal.png`)
    rippleNormal.wrapS = rippleNormal.wrapT = THREE.RepeatWrapping
    this.rippleMaterial = new RainRippleMaterial({ floorDiffuse, floorNormal, rippleNormal, light, resolution })

    const plane = new THREE.Mesh(geometry, this.rippleMaterial)
    plane.rotation.x = -Math.PI / 2
    plane.position.y = -2.5
    this.app.scene.add(plane)

    // drop
    // const dropGeometry = new THREE.BoxBufferGeometry(3, 3, 3)
    const dropGeometry = new THREE.SphereBufferGeometry(2.5, 32, 32)
    const dropNormal = await loader.loadAsync(`${Constant.STATIC_ASSETS_PATH}drop_normal.png`)
    const dropMask = await loader.loadAsync(`${Constant.STATIC_ASSETS_PATH}drop_mask.png`)
    const dripNormal = await loader.loadAsync(`${Constant.STATIC_ASSETS_PATH}drip_normal.png`)
    const dripMask = await loader.loadAsync(`${Constant.STATIC_ASSETS_PATH}drip_mask.png`)
    const dripGray = await loader.loadAsync(`${Constant.STATIC_ASSETS_PATH}drip_grayscale.png`)
    dropNormal.wrapS = dropNormal.wrapT = dripNormal.wrapS = dripNormal.wrapT = THREE.RepeatWrapping
    dropMask.wrapS = dropMask.wrapT = dripMask.wrapS = dripMask.wrapT = THREE.RepeatWrapping

    this.dropMaterial = new RainDropMaterial({
      envMap: this.app.textureCube,
      normalMap: dropNormal,
      dropMask,
      dripNormal,
      dripMask,
      dripGray,
    })

    const cube = new THREE.Mesh(dropGeometry, this.dropMaterial)
    cube.geometry.computeTangents()
    cube.position.y = 0
    cube.updateMatrixWorld()
    // this.app.scene.add(cube)
    this.cube = cube

    // this.app.camera.updateProjectionMatrix()
    // this.app.camera.updateMatrixWorld()
    // this.app.camera.updateWorldMatrix()
    // const viewMatrixCamera = this.app.camera.matrixWorldInverse
    // const projectionMatrixCamera = this.app.camera.projectionMatrix
    // const modelMatrixCamera = this.app.camera.matrixWorld

    this.dropMaterial.userData.uTime = { value: 0 }
    // this.dropMaterial.userData.viewMatrixCamera = { type: 'm4', value: viewMatrixCamera }
    // this.dropMaterial.userData.projectionMatrixCamera = { type: 'm4', value: projectionMatrixCamera }
    // this.dropMaterial.userData.modelMatrixCamera = { type: 'mat4', value: modelMatrixCamera }
    // this.dropMaterial.userData.savedModelMatrix = { type: 'mat4', value: cube.matrixWorld }
    // this.dropMaterial.userData.projectionPosition = { type: 'v3', value: this.app.camera.position }
    this.dropMaterial.needsUpdate = true

    // fall effect
    this.fallAmount = 500
    const fallAlpha = await loader.loadAsync(`${Constant.STATIC_ASSETS_PATH}fall_alpha.png`)
    // const fallNormal = await loader.loadAsync(`${Constant.STATIC_ASSETS_PATH}fall_normal.png`)
    fallAlpha.wrapS = fallAlpha.wrapT = THREE.RepeatWrapping
    // const fallGeometry = new THREE.PlaneBufferGeometry(8, 16)
    const fallGeometry = this.getRainFallGeometry()
    const fallRange = 5
    const rainFallMaterial = new RainFallMaterial({ alphaMap: fallAlpha, envMap: this.app.textureCube })
    const rainFall = new THREE.InstancedMesh(fallGeometry, rainFallMaterial, this.fallAmount)
    rainFall.instanceMatrix.setUsage(THREE.DynamicDrawUsage)
    this.rainFall = rainFall
    this.rainFallParam = []

    for (let i = 0; i < this.fallAmount; i++) {
      const scaleSeed = 0.2 + Math.random() * 0.8
      this.rainFallParam.push({
        position: new Vector3(fallRange * (-1 + Math.random() * 2), Math.random() * 50, fallRange * (-1 + Math.random() * 2)),
        scale: new Vector2((0.15 / scaleSeed) * Math.random(), scaleSeed),
      })
    }
    this.app.scene.add(rainFall)
  }

  getRainFallGeometry() {
    const points = []
    const n = 24
    for (let i = 0; i < n; i++) {
      const result = this.getPath(i, n)
      if (result.x < 0) points.push(result)
    }
    points.sort((a, b) => b.y - a.y)
    const geometry = new THREE.LatheGeometry(points, 16, 0, Math.PI * 2)
    geometry.computeVertexNormals()
    return geometry
  }

  getPath(t, segment) {
    const delta = (t * 2 * Math.PI) / segment
    const x = 0.1 * (1 - Math.sin(delta)) * Math.cos(delta)
    const y = 1.8 * (Math.sin(delta) - 1) + 5
    return new THREE.Vector2(x, y)
  }

  update() {
    const time = this.app.clock.getElapsedTime()
    this.app.light.position.x = 5 + Math.sin(time) * 3
    this.app.light.position.y = 5 + Math.sin(time * 0.5) * 5
    this.app.light.position.z = 3 + Math.cos(time) * 10

    if (this.rippleMaterial) {
      this.rippleMaterial.uniforms.uTime.value = time
      this.rippleMaterial.uniforms.uLightPosition.value = this.app.light.position
    }

    if (this.dropMaterial) {
      this.dropMaterial.userData.uTime.value = time
      // this.updateCameraMatrices()
    }

    if (this.rainFall) this.updateRainFall()
  }

  updateRainFall() {
    const time = this.app.clock.getElapsedTime()
    const amount = this.fallAmount
    const speed = 13
    const dummy = new THREE.Object3D()
    const bounding = new THREE.Vector2(0, 50)

    for (let i = 0; i < amount; i++) {
      dummy.position.x = this.rainFallParam[i].position.x
      dummy.position.z = this.rainFallParam[i].position.z
      dummy.scale.x = dummy.scale.z = this.rainFallParam[i].scale.x
      dummy.scale.y = this.rainFallParam[i].scale.y
      dummy.position.y = this.clamp(-time * speed * (0.8 + dummy.scale.y) + this.rainFallParam[i].position.y, bounding)
      dummy.updateMatrix()

      this.rainFall.setMatrixAt(i++, dummy.matrix)
      this.rainFall.instanceMatrix.needsUpdate = true
    }
  }

  clamp(value, bounding) {
    if (value < bounding.x) return bounding.y + (value % Math.abs(bounding.y - bounding.x)) - 1
    return value - 1
  }

  updateCameraMatrices() {
    // make sure the camera matrices are updated
    this.app.camera.updateProjectionMatrix()
    this.app.camera.updateMatrixWorld()
    this.app.camera.updateWorldMatrix()

    // update the uniforms from the camera so they're
    const viewMatrixCamera = this.app.camera.matrixWorldInverse
    const projectionMatrixCamera = this.app.camera.projectionMatrix

    this.dropMaterial.userData.viewMatrixCamera.value.copy(viewMatrixCamera)
    this.dropMaterial.userData.projectionMatrixCamera.value.copy(projectionMatrixCamera)
    this.dropMaterial.userData.projectionPosition.value.copy(this.app.camera.position)
    this.cube.updateMatrixWorld()
    this.dropMaterial.userData.savedModelMatrix.value.copy(this.cube.matrixWorld)
    // this.dropMaterial.userData.projectionDirection.value.set(0, 0, 1).applyMatrix4(modelMatrixCamera)
  }
}
