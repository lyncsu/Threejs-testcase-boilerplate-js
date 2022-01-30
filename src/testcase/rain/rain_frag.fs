varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vViewPosition;

uniform sampler2D uFloorDiffuse;
uniform sampler2D uFloorNormal;
uniform sampler2D uRainNormal;
uniform float uTime;
uniform vec3 uLightColor;
uniform vec3 uLightPosition;
uniform vec3 ambientLightColor;

mat3 tangentTransform(vec3 vViewPosition) {
  // normal mapping
  vec4 posAndU = vec4(-vViewPosition, vUv.x);
  // tangent is alongside the u-axis(x-axis, horizontal one.)
  vec4 dx = dFdx(posAndU), dy = dFdy(posAndU);
  vec3 tangent = dx.w * dx.xyz + dy.w * dy.xyz;
  vec3 normal = normalize(vNormal);
  vec3 binormal = normalize(cross(tangent, normal));
  // no normalization required
  tangent = cross(normal, binormal);
  mat3 tbn = mat3(tangent, binormal, normal);

  return tbn;
}

vec2 flip(vec2 uv, int division, int tiling, float time){
  float fDivision = float(division);
  float fTiling = float(tiling);
  vec2 delta = vec2(floor(time), floor(time / fDivision));
  vec2 offset = mod(delta, fDivision);
  
  return vec2(uv + offset / fTiling) / fDivision * fTiling;
}

void main() {
  vec4 diffuse = texture2D(uFloorDiffuse, vUv);
  vec3 normal = texture2D(uFloorNormal, vUv).xyz;
  vec3 rainNormal = texture2D(uRainNormal, flip(vUv, 4, 2, uTime * 8.0)).xyz;
  
  normal = mix(normal, rainNormal, 0.5);
  normal = normal * 2.0 - 1.0;

  mat3 tbn = tangentTransform(vViewPosition);
  normal = normalize(tbn * normal);

  // todo: multi lights 
  vec4 addedLights = vec4(0.0, 0.0, 0.0, 1.0);
  vec3 lightDirection = normalize(uLightPosition - vWorldPosition);
  // light diffuse
  addedLights.rgb += clamp(dot(lightDirection, normal), 0.0, 1.0) * uLightColor;

  // specular
  vec3 viewDir = normalize(vWorldPosition - vec3(vWorldPosition));
  vec3 lightInv = -lightDirection;
  vec3 reflectDir = reflect(lightInv, normal);
  float specularStrength = 0.8;
  float spec = pow(max(dot(viewDir, reflectDir), 0.0), 16.0);
  vec3 specular = specularStrength * spec * uLightColor;  
  addedLights.rgb += specular;

  // Debug
  // gl_FragColor = vec4(0.5,0.5,0.5,1.0);
  // gl_FragColor = vec4(uLightPosition / length(uLightPosition), 1.0);
  // gl_FragColor = diffuse;
  // gl_FragColor = vec4(normal,1.0);
  // gl_FragColor = addedLights;
  gl_FragColor = mix(vec4(diffuse.x, diffuse.y, diffuse.z, 1.0), addedLights, 0.5);
}