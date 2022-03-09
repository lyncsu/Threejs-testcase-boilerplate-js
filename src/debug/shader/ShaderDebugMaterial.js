import { ShaderMaterial } from 'three'
import ShaderDebugUtil from './ShaderDebugUtil.js'

/**
 * Shader调试材质类
 */
export class ShaderDebugMaterial extends ShaderMaterial {
  get offset() {
    return this.uniforms._offset.value
  }

  set offset(value) {
    this.uniforms._offset.value = value
  }

  /**
   * Shader调试材质构造函数
   * @param {*} shaderOrMaterial
   */
  constructor(shaderOrMaterial) {
    let shader, material

    if (shaderOrMaterial.isShaderMaterial) {
      material = shaderOrMaterial
      shader = {
        extensions: material.extensions,
        uniforms: material.uniforms,
        defines: material.defines,
        fragmentShader: material.fragmentShader,
        vertexShader: material.vertexShader,
      }
    } else {
      shader = shaderOrMaterial
      material = new ShaderMaterial(shader)
    }

    super(shader)
    this.uniforms._offset = { value: 0.1 }
    this.targetMaterial = material
    this._currType = null
    this.vertexDefinitions = null
    this.fragmentDefinitions = null

    this.updateDefinitions()
  }

  updateDefinitions() {
    this.clearOutputVariable()

    this.vertexDefinitions = ShaderDebugUtil.parseVariables(this.vertexShader)
    this.fragmentDefinitions = ShaderDebugUtil.parseVariables(this.fragmentShader)
  }

  setVertexOutputVariable(name, type, index = null, condition = null) {
    this.clearOutputVariable()

    const vertexShader = this.vertexShader
    const extents = ShaderDebugUtil.getMainExtents(vertexShader)
    if (index === null) {
      index = extents.end
    }

    if (index < extents.after || index > extents.end) {
      throw new Error('ShaderDebugMaterial: Can only insert code in main body.')
    }

    this.fragmentShader = this.fragmentShader.replace(/gl_FragColor[^;=]*?=[^;]*;/g, ';')
    this.fragmentShader = ShaderDebugUtil.splice(
      this.fragmentShader,
      '\ngl_FragColor = _varying_output + _offset; return;\n',
      ShaderDebugUtil.getMainExtents(this.fragmentShader).after
    )
    this.fragmentShader = ShaderDebugUtil.splice(
      this.fragmentShader,
      '\nvarying vec4 _varying_output;\nuniform float _multiplier;\nuniform float _offset\n;',
      ShaderDebugUtil.getMainExtents(this.fragmentShader).before
    )

    let output
    if (/gl_FragColor\s*=/.test(name)) {
      output = name.replace('gl_FragColor', '_varying_output')
    } else {
      switch (type) {
        case 'float':
          output = `_varying_output = vec4( ${name} );`
          break
        case 'uint':
          output = `_varying_output = vec4( float( ${name} ) );`
          break
        case 'int':
          output = `_varying_output = vec4( float( ${name} ) );`
          break
        case 'int':
          output = `_varying_output = vec4( float( ${name} ) );`
          break
        case 'bool':
          output = `_varying_output = vec4( float( ${name} ) );`
          break
        case 'vec2':
          output = `_varying_output = vec4( ${name}.xy, 0.0, 0.0 );`
          break
        case 'vec3':
          output = `_varying_output = vec4( ${name}.xyz, 0.0 );`
          break
        case 'vec4':
          output = `_varying_output = ${name};`
          break
      }
    }

    let result
    if (condition) {
      result = `

			if ( ${condition} ) {

				${output}
				return;

			}

			`
    } else {
      result = `

			${output}
			return;

			`
    }

    this.vertexShader = ShaderDebugUtil.splice(this.vertexShader, result, index)
    this.vertexShader = ShaderDebugUtil.splice(
      this.vertexShader,
      '\nvarying vec4 _varying_output;\n',
      ShaderDebugUtil.getMainExtents(this.vertexShader).before
    )
    this.needsUpdate = true
    this._currType = type
  }

  setFragmentOutputVariable(name, type, index = null, condition = null) {
    this.clearOutputVariable()

    const fragmentShader = ShaderDebugUtil.replaceMainIncludes(this.fragmentShader, this.fragmentDefinitions.includes)
    const extents = ShaderDebugUtil.getMainExtents(fragmentShader)
    if (index === null) {
      index = extents.end
    }

    if (index < extents.after || index > extents.end) {
      throw new Error('ShaderDebugMaterial: Can only insert code in main body.')
    }

    let output
    if (/gl_FragColor\s*=/.test(name)) {
      output = name
    } else {
      switch (type) {
        case 'float':
          output = `gl_FragColor = vec4( ${name} ) + _offset;`
          break
        case 'int':
          output = `gl_FragColor = vec4( float( ${name} ) ) + _offset;`
          break
        case 'uint':
          output = `gl_FragColor = vec4( float( ${name} ) ) + _offset;`
          break
        case 'bool':
          output = `gl_FragColor = vec4( float( ${name} ) ) + _offset;`
          break
        case 'vec2':
          output = `gl_FragColor = vec4( ${name}.xy, 0.0, 0.0 ) + _offset;`
          break
        case 'vec3':
          output = `gl_FragColor = vec4( ${name}.xyz, 0.0 ) + _offset;`
          break
        case 'vec4':
          output = `gl_FragColor = ${name} + _offset;`
          break
      }
    }

    let result
    if (condition) {
      result = `

			if ( ${condition} ) {

				${output};
				return;

			}

			`
    } else {
      result = `

			${output};
			return;

			`
    }

    result = result.replace(/gl_FragColor/g, 'gl$FragColor')
    this.fragmentShader = ShaderDebugUtil.replaceMainIncludes(this.fragmentShader, this.fragmentDefinitions.includes)
    this.fragmentShader = ShaderDebugUtil.splice(this.fragmentShader, result, index)
    this.fragmentShader = this.fragmentShader.replace(/gl_FragColor[^;=]*?=[^;]*;/g, ';')
    this.fragmentShader = ShaderDebugUtil.splice(
      this.fragmentShader,
      '\nuniform float _multiplier;\nuniform float _offset;\n',
      ShaderDebugUtil.getMainExtents(this.fragmentShader).before
    )
    this.fragmentShader = this.fragmentShader.replace(/gl\$FragColor/g, 'gl_FragColor')

    this.needsUpdate = true
    this._currType = type
  }

  clearOutputVariable() {
    const targetMaterial = this.targetMaterial
    this.vertexShader = targetMaterial.vertexShader
    this.fragmentShader = targetMaterial.fragmentShader
    this.needsUpdate = true
    this._currType = null
  }

  reset() {
    this.clearOutputVariable()
    this.copy(this.targetMaterial)
  }
}
