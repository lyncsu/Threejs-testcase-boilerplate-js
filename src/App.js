import * as THREE from 'three'
import { Testcase } from './testcase/Testcase'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Constant } from './Constant'
import FPS from 'three/examples/jsm/libs/stats.module.js'
import Stats from './util/stats/Stats'
import { Composer } from './postprocessing/Composer'
import { ShaderDebugRenderer } from './debug/shader/ShaderDebugRenerer'
import { ShaderDebug } from './debug/shader/ShaderDebug'

export class App {
  constructor(domElement, shaderDebugMode) {
    this.domElement = domElement
    this.isShaderDebugMode = shaderDebugMode

    this.init()
    this.resize()
    this.animate()
  }

  bindScope() {
    this.resize = this.resize.bind(this)
    this.render = this.render.bind(this)
    this.animate = this.animate.bind(this)
  }

  init() {
    console.info('hello world')

    this.bindScope()
    this.initClock()
    this.initEventListener()
    this.initScene()
    this.initCamera()
    if (this.isShaderDebugMode) this.shaderDebug = new ShaderDebug()
    this.initRenderer(this.isShaderDebugMode)
    this.initComposer()
    this.intTestcase()
    this.initOrbit()
    this.initStats()
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000)
    this.camera.position.set(10, 10, 10)
    this.camera.target = new THREE.Vector3()
  }

  initEventListener() {
    window.addEventListener('resize', this.resize)
  }

  initScene() {
    this.scene = new THREE.Scene()

    const cubeLoader = new THREE.CubeTextureLoader()
    cubeLoader.setPath(`${Constant.STATIC_ASSETS_PATH}env/`)
    const textureCube = cubeLoader.load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'])
    textureCube.encoding = THREE.sRGBEncoding
    this.textureCube = textureCube
    this.scene.background = textureCube
    this.scene.fog = new THREE.Fog(0x000000, 0.1, 100)

    // this.scene.fog = new THREE.FogExp2(0xffffff, 1)
    // const floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(), new THREE.ShadowMaterial({ side: 2, transparent: true, opacity: 0.25 }))
    // floor.scale.set(10, 10, 10)
    // floor.position.set(0, -1, 0)
    // floor.rotation.x = -Math.PI / 2
    // floor.receiveShadow = true
    // this.scene.add(floor)

    // Lights
    const ambient = new THREE.AmbientLight(0xeeeeee, 0.75)
    this.scene.add(ambient)

    // const lightPosition = new THREE.Vector3(15, 2.5, 5)
    // const light = new THREE.PointLight(0x684b7c, 0.5)
    // light.position.copy(lightPosition)
    // this.scene.add(light)
    // this.light = light

    // const helper = new THREE.PointLightHelper(light, 1)
    // this.scene.add(helper)

    this.scene.add(new THREE.HemisphereLight(0xffc107, 0x552233, 0.2))

    const directionalLight = new THREE.DirectionalLight(0xffffff, 4)
    directionalLight.position.set(2.5, 4, 2)
    // directionalLight.shadow.mapSize.set(2048, 2048)
    // directionalLight.castShadow = true
    this.scene.add(directionalLight)

    const grid = new THREE.GridHelper(15, 30)
    this.scene.add(grid)
  }

  initRenderer(shaderDebugMode) {
    if (shaderDebugMode) {
      this.renderer = new ShaderDebugRenderer()
      this.renderer.shadowMap.enabled = true
      this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
      this.renderer.outputEncoding = THREE.sRGBEncoding
      this.renderer.setClearColor(0x0d1113)
      this.shaderDebug.renderer = this.renderer
    } else {
      this.renderer = new THREE.WebGLRenderer()
      this.renderer.autoClear = true
      this.renderer.setClearColor(0x000000)
    }
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.domElement.style.outline = 'none'
    this.domElement.appendChild(this.renderer.domElement)
  }

  initComposer() {
    this.composer = new Composer(this)
  }

  intTestcase() {
    this.testcase = new Testcase(this)
  }

  initOrbit() {
    new OrbitControls(this.camera, this.domElement)
  }

  initClock() {
    this.clock = new THREE.Clock()
  }

  initStats() {
    this.fps = new FPS()
    this.domElement.appendChild(this.fps.dom)
  }

  render() {
    // 重制drawElement计数器
    Stats.reset()
    this.renderer.render(this.scene, this.camera)
    // if (this.composer) this.composer.render()
    if (this.testcase) this.testcase.update()
    if (this.fps) this.fps.update()
  }

  resize() {
    const width = this.domElement.clientWidth
    const height = this.domElement.clientHeight

    if (this.renderer) this.renderer.setSize(width, height)
    if (this.camera) {
      const aspect = width / height
      this.camera.aspect = aspect
      this.camera.updateProjectionMatrix()
    }

    this.render()
  }

  animate() {
    this.render()
    requestAnimationFrame(this.animate)
  }
}

const isShaderDebugMode = Boolean(process.env === 'SHADER_DEBUG')
const leftContainer = document.createElement('div')
leftContainer.id = 'left-container'
document.body.appendChild(leftContainer)
const webglContainer = document.createElement('div')
webglContainer.id = 'webgl-container'
webglContainer.style.width = leftContainer.style.width = isShaderDebugMode ? '50vw' : '100vw'
leftContainer.appendChild(webglContainer)
leftContainer.appendChild(Stats.gui.domElement)
export default new App(webglContainer, isShaderDebugMode)
