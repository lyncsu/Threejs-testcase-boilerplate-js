varying vec2 vUv;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;
varying vec3 vNormal;
// no use identity matrix
uniform mat4 transform; 

void main() {
  vUv = uv;
  vNormal = normal;
  vec4 modelViewPosition =  viewMatrix * transform * modelMatrix * vec4(position, 1.0);
  vWorldPosition = modelViewPosition.xyz;
  vViewPosition = -vWorldPosition;
  vNormal = normalize(normalMatrix *  normal);

  gl_Position = projectionMatrix * modelViewPosition;
}