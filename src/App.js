import * as THREE from 'three'
import { Testcase } from './testcase/Testcase'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { Constant } from './Constant'
import Stats from 'three/examples/jsm/libs/stats.module.js'
import { Composer } from './postprocessing/Composer'

export class App {
  constructor(domElement) {
    this.domElement = domElement

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
    this.initRenderer()
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

    // const directional = new THREE.DirectionalLight(0xffffff, 0.15)
    // directional.position.set(0, 300, -2000)
    // this.app.scene.add(directional)
    // directional.target = this.app.scene

    const ambient = new THREE.AmbientLight(0xeeeeee, 0.75)
    this.scene.add(ambient)

    const lightPosition = new THREE.Vector3(15, 2.5, 5)
    const light = new THREE.PointLight(0x684b7c, 0.5)
    light.position.copy(lightPosition)
    this.scene.add(light)
    this.light = light

    const helper = new THREE.PointLightHelper(light, 1)
    this.scene.add(helper)

    const grid = new THREE.GridHelper(15, 30)
    this.scene.add(grid)
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.autoClear = true
    this.renderer.setClearColor(0x000000)
    // this.renderer.setPixelRatio(1)
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
    this.stats = new Stats()
    this.domElement.appendChild(this.stats.dom)
  }

  render() {
    // this.renderer.render(this.scene, this.camera)
    if (this.composer) this.composer.render()
    // if (this.testcase) this.testcase.update()
    if (this.stats) this.stats.update()
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

new App(document.getElementById('webgl-container'))
