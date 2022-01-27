// varying vec3 vNormal;
// varying vec3 vTangent;
// varying vec3 vBitangent;
// varying vec3 vViewPosition;
varying vec2 vUv;
uniform mat3 uvTransform;

#include <common>
// #include<uv_pars_vertex>
// #include<color_pars_vertex>
// #include<normal_pars_vertex>
// #include<clipping_planes_pars_vertex>

void main() {
  vUv = (uvTransform * vec3(uv, 1)).xy;
  // vec3 transformed=vec3(position);
  // vec3 objectNormal=vec3(normal);
  // vec3 transformedNormal=objectNormal;
  // transformedNormal=normalMatrix*transformedNormal;
  // vec3 objectTangent=vec3(tangent.xyz);
  // vec3 transformedTangent=(modelViewMatrix*vec4(objectTangent,0.)).xyz;
  // vNormal=normalize(transformedNormal);
  // vTangent=normalize(transformedTangent);
  // vBitangent=normalize(cross(vNormal,vTangent)*tangent.w);
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}