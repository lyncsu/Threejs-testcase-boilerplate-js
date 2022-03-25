import * as dat from 'dat.gui'
import * as numeral from 'numeral'
import { WebGLCapabilities } from 'three/src/renderers/webgl/WebGLCapabilities'
import { StatsHook } from './hook/StatsHook'

/**
 * 统计模块类
 */
class Stats {
  /**
   * 统计模块构造函数
   */
  constructor() {
    this.init()
  }

  /**
   * 初始化
   */
  init() {
    this.data = {}
    this.input = {}
    this.gui = new dat.GUI()
  }

  /**
   * 注册gl实例
   * @param {*} glContext
   */
  register(renderer) {
    if (!renderer) return
    this.glContext = renderer.getContext()
    // 打印gl信息
    this.info(['VERSION', 'MAX_TEXTURE_SIZE', 'MAX_SAMPLES'])
    const capabilities = new WebGLCapabilities(this.glContext, this.glContext.getSupportedExtensions(), {})
    this.info('FLOAT_TEXTURE', capabilities.floatVertexTextures)
    // 注册钩子
    this.hook = new StatsHook(this.glContext, renderer.info)
    this.initMemoryStats()
  }

  /**
   * 初始化GPU内存字段
   */
  initMemoryStats() {
    this.addTable('GPU Memory', true)
    this.input['Draw call'] = this.add('Draw call', this.hook.drawCall, 'GPU Memory')
    this.input['Texture call'] = this.add('Texture call', this.hook.textureCall, 'GPU Memory')
  }

  /**
   * 打印gl节点
   * @param {*} key
   */
  info(key, value) {
    if (value) {
      console.info(
        `Stats %c ${key}: ${value}`,
        'background:#fffbdb;color:#5c3c00;padding-left:1px;padding-right:6px;border-left:solid 1px #5c3c00;'
      )
    } else if (key instanceof Array) key.forEach(item => this.info(item))
    else
      console.info(
        `Stats %c ${key}: ${this.glContext.getParameter(this.glContext[key])}`,
        'background:#fffbdb;color:#5c3c00;padding-left:1px;padding-right:6px;border-left:solid 1px #5c3c00;'
      )
  }

  /**
   * 注册表格
   * @param {*} name
   * @param {*} opened
   */
  addTable(name, opened) {
    if (!this.tables) this.tables = new Map()
    const table = this.gui.addFolder(name)
    if (opened) table.open()
    this.tables.set(name, table)
  }

  /**
   * 获取某个表格
   * @param {*} name
   * @returns
   */
  getTable(name) {
    return this.tables.get(name)
  }

  /**
   * 添加监测项
   * @param {*} key
   * @param {*} value
   * @param {*} tableName
   * @returns
   */
  add(key, value, tableName) {
    if (this.data[key] === undefined) this.data[key] = value

    if (!this.tables) this.tables = new Map()
    const table = this.tables.get(tableName)
    if (!table) return this.gui.add(this.data, key, value)
    return this.tables.get(tableName).add(this.data, key, value)
  }

  /**
   * 添加slider
   * @param {*} key
   * @param {*} value
   * @param {*} min
   * @param {*} max
   * @param {*} tableName
   * @returns
   */
  addSlide(key, value, min, max, step, tableName, callback) {
    if (this.data[key] === undefined) this.data[key] = value

    if (!this.tables) this.tables = new Map()
    const table = this.tables.get(tableName)
    if (!table)
      return this.gui.add(this.data, key, min, max, step).onChange(value => {
        callback(value)
      })
    return this.tables
      .get(tableName)
      .add(this.data, key, min, max, step)
      .onChange(value => {
        callback(value)
      })
  }

  /**
   * 添加按钮
   * @param {*} name
   * @param {*} callback
   */
  addButton(name, callback) {
    if (!this.data[callback]) this.data[callback] = callback
    this.gui.add(this.data, callback).name(name)
  }

  /**
   * 统计集合
   * @param {*} parent
   * @returns
   */
  stat(parent) {
    let totalBytes = 0
    if (!parent || !parent.children || !parent.children.length) return totalBytes
    parent.children.forEach(child => {
      // 不统计辅助Helper
      if (child.type === 'Mesh') {
        const bytes = this.statGeometry(child.geometry)
        this.add(child.name, `${numeral(bytes).format('0,0')} bytes`, 'GPU Memory')
        totalBytes += bytes
      } else if (child.type === 'Group') {
        totalBytes += this.stat(child)
      }
    })
    return totalBytes
  }

  /**
   * 几何统计
   * @param {*} geometry
   */
  statGeometry(geometry) {
    let bytes = 0
    for (const name in geometry.attributes) {
      const attr = geometry.getAttribute(name)
      bytes += attr.count * attr.itemSize * attr.array.BYTES_PER_ELEMENT
    }

    const indices = geometry.getIndex()
    bytes += indices ? indices.count * indices.itemSize * indices.array.BYTES_PER_ELEMENT : 0
    return bytes
  }

  reset() {
    if (this.hook) this.hook.reset()
  }

  /**
   * 更新统计hook
   */
  update() {
    if (this.hook) {
      this.hook.update()

      this.input['Draw call'].setValue(this.hook.drawCall)
      this.input['Texture call'].setValue(this.hook.textureCall)
    }
  }
}

export default new Stats()
