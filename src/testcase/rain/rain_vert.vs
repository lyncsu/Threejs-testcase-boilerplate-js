varying vec2 vUv;
varying vec3 viewPos;
varying vec3 worldPos;
varying vec3 vNormal;
varying vec3 vViewPosition;
uniform mat4 transform; // 在本程序中没用，是个 identity 矩阵
//            uniform vec3 cameraPosition;
//            uniform mat3 normalMatrix; // = inverse transpose of modelViewMatrix
//            uniform mat4 viewMatrix;
//            uniform mat4 projectionMatrix;
//            uniform mat4 modelViewMatrix;
//            uniform mat4 modelMatrix;
void main() {
  vUv = uv;
  vNormal = normal;
  worldPos = (viewMatrix*transform*modelMatrix*vec4( position, 1.0 )).xyz;
  //   viewPos = cameraPosition; // world-space lighting
  viewPos = vec3(0.0,0.0,0.0); // view-space lighting

  vNormal = normalize( normalMatrix *  normal );
  vec4 mvPosition =  viewMatrix * transform * modelMatrix * vec4(position, 1.0);
  vViewPosition = -mvPosition.xyz;

  gl_Position = projectionMatrix * mvPosition;
}