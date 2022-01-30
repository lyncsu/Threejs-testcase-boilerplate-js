import * as THREE from 'three'
import { Testcase } from './testcase/Testcase'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

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
    this.initEventListener()
    this.initScene()
    this.initCamera()
    this.initRenderer()
    this.intTestcase()
    this.initOrbit()
  }

  initCamera() {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000)
    this.camera.position.set(10, 10, 10)
  }

  initEventListener() {
    window.addEventListener('resize', this.resize)
  }

  initScene() {
    this.scene = new THREE.Scene()

    // const directional = new THREE.DirectionalLight(0xffffff, 0.15)
    // directional.position.set(0, 300, -2000)
    // this.app.scene.add(directional)
    // directional.target = this.app.scene

    const ambient = new THREE.AmbientLight(0xffffff, 0.75)
    this.scene.add(ambient)

    // const grid = new THREE.GridHelper(15, 30)
    // this.scene.add(grid)
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.autoClear = true
    this.renderer.setClearColor(0x000000)
    // this.renderer.setPixelRatio(1)
    this.renderer.domElement.style.outline = 'none'
    this.domElement.appendChild(this.renderer.domElement)
  }

  intTestcase() {
    this.testcase = new Testcase(this)
  }

  initOrbit() {
    new OrbitControls(this.camera, this.domElement)
  }

  render() {
    this.renderer.render(this.scene, this.camera)
    if (this.testcase) this.testcase.update()
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
    console.info('resize')
  }

  animate() {
    this.render()
    requestAnimationFrame(this.animate)
  }
}

new App(document.getElementById('webgl-container'))
