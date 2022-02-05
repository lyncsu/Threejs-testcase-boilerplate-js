import * as THREE from 'three'
import { Constant } from '../../Constant'
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
    const lightPosition = new THREE.Vector3(15, 2.5, 5)
    const light = new THREE.PointLight(0x684b7c, 0.5)
    light.position.copy(lightPosition)
    this.app.scene.add(light)
    this.light = light
    const helper = new THREE.PointLightHelper(light, 1)
    this.app.scene.add(helper)

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
    cube.position.y = 2.5
    cube.updateMatrixWorld()
    this.app.scene.add(cube)
    this.cube = cube

    // this.app.camera.updateProjectionMatrix()
    // this.app.camera.updateMatrixWorld()
    // this.app.camera.updateWorldMatrix()

    // const viewMatrixCamera = this.app.camera.matrixWorldInverse
    // const projectionMatrixCamera = this.app.camera.projectionMatrix
    // const modelMatrixCamera = this.app.camera.matrixWorld

    this.dropMaterial.userData.uTime = { value: 1 }
    // this.dropMaterial.userData.viewMatrixCamera = { type: 'm4', value: viewMatrixCamera }
    // this.dropMaterial.userData.projectionMatrixCamera = { type: 'm4', value: projectionMatrixCamera }
    // this.dropMaterial.userData.modelMatrixCamera = { type: 'mat4', value: modelMatrixCamera }
    // this.dropMaterial.userData.savedModelMatrix = { type: 'mat4', value: cube.matrixWorld }
    // this.dropMaterial.userData.projectionPosition = { type: 'v3', value: this.app.camera.position }
    this.dropMaterial.needsUpdate = true
  }

  update() {
    const time = this.clock.getElapsedTime()
    this.light.position.x = 5 + Math.sin(time) * 3
    this.light.position.y = 5 + Math.sin(time * 0.5) * 5
    this.light.position.z = 3 + Math.cos(time) * 10

    if (this.rippleMaterial) {
      this.rippleMaterial.uniforms.uTime.value = time
      this.rippleMaterial.uniforms.uLightPosition.value = this.light.position
    }

    if (this.dropMaterial) {
      this.dropMaterial.userData.uTime.value = time
      // this.updateCameraMatrices()
    }
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
    // console.info(this.dropMaterial.userData.projectionPosition.value)
    // tell the shader we've projected
    // this.uniforms.isTextureProjected.value = true
  }
}
