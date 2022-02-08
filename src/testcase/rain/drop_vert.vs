// varying vec2 vUv;
// varying vec3 vWorldPosition;
// varying vec3 vNormal;
// varying vec4 vTexCoords;
// uniform mat4 savedModelMatrix;
// uniform mat4 viewMatrixCamera;
// uniform mat4 projectionMatrixCamera;
// uniform mat4 modelMatrixCamera;

// void main() {
//   vUv = uv;

//   vec4 modelViewPosition = viewMatrix * transform * modelMatrix * vec4(position, 1.0);
  
  // vNormal = mat3(savedModelMatrix) * normal;
  // vWorldPosition = viewMatrix * modelMatrix * vec4(position, 1.0);
  // vTexCoords = viewMatrixCamera * vWorldPosition;
  // vTexCoords = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
//   gl_Position = projectionMatrix * modelViewPosition;
// }