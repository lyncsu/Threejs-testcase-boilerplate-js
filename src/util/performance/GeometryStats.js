class GeometryStats {
  constructor() {}

  registerRenderer(renderer) {
    this.renderer = renderer
    this.glContext = renderer.getContext()

    console.info(renderer, renderer.getContext(), 'MAX_TEXTURE_SIZE:', this.glContext.getParameter(this.glContext.MAX_TEXTURE_SIZE))
  }

  /**
   * 评估模型现存占用
   * @param {*} geometry
   * @returns
   */
  estimateBytesUsed(geometry) {
    // Return the estimated memory used by this geometry in bytes
    // Calculate using itemSize, count, and BYTES_PER_ELEMENT to account
    // for InterleavedBufferAttributes.
    let memory = 0
    for (const name in geometry.attributes) {
      const attr = geometry.getAttribute(name)
      memory += attr.count * attr.itemSize * attr.array.BYTES_PER_ELEMENT
    }

    const indices = geometry.getIndex()
    memory += indices ? indices.count * indices.itemSize * indices.array.BYTES_PER_ELEMENT : 0
    return memory
  }
}

export default new GeometryStats()
