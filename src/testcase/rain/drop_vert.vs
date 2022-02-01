varying vec2 vUv;
varying vec3 vWorldPosition;

void main() {
  vUv = uv;

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}