varying vec2 vUv;
varying vec3 vViewPosition;
varying vec3 vWorldPosition;
varying vec3 vNormal;
varying vec3 viewPos;
uniform mat4 transform; 

void main() {
  vUv = uv;
  vNormal = normal;
  vec4 mvPosition =  viewMatrix * transform * modelMatrix * vec4(position, 1.0);
  vWorldPosition = mvPosition.xyz;
  vViewPosition = -vWorldPosition;
  vNormal = normalize(normalMatrix *  normal);

  gl_Position = projectionMatrix * mvPosition;
}