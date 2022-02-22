import * as dat from 'dat.gui'
import * as numeral from 'numeral'

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
    this.gui = new dat.GUI()
  }

  /**
   * 注册gl实例
   * @param {*} gl
   */
  register(gl) {
    this.glContext = gl
    console.info(
      'VERSION:',
      this.glContext.getParameter(this.glContext.VERSION),
      'MAX_TEXTURE_SIZE:',
      this.glContext.getParameter(this.glContext.MAX_TEXTURE_SIZE),
      'MAX_RENDERBUFFER_SIZE:',
      this.glContext.getParameter(this.glContext.MAX_RENDERBUFFER_SIZE)
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

    const table = this.tables.get(tableName)
    if (!table) return this.gui.add(this.data, key, value)
    return this.tables.get(tableName).add(this.data, key, value)
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
}

export default new Stats()
