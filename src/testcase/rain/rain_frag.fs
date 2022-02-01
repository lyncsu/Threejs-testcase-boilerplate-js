#define PI 3.1415926

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;
varying vec3 vViewPosition;

uniform sampler2D uFloorDiffuse;
uniform sampler2D uFloorNormal;
uniform sampler2D uRippleNormal;
uniform float uTime;
uniform vec3 uLightColor;
uniform vec3 uLightPosition;
uniform vec2 uResolution;
// three internal use
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
  vec2 divided = mod(delta, fDivision);
  
  return vec2(uv + divided / fTiling) / fDivision * fTiling;
}

vec2 flip(vec2 uv, int division, int tiling, float time, vec2 offset){
  float fDivision = float(division);
  float fTiling = float(tiling);
  vec2 delta = vec2(floor(time), floor(time / fDivision));
  vec2 divided = mod(delta, fDivision) + offset;
  
  return vec2(uv + divided / fTiling) / fDivision * fTiling;
}

vec3 blend(vec4 n1, vec4 n2){
  n1 = n1.xyzz * vec4(2.0, 2.0, 2.0, -2.0) + vec4(-1.0, -1.0, -1.0, 1.0);
  n2 = n2 * 2.0 - 1.0;
  vec3 r;
  r.x = dot(n1.zxx, n2.xyz);
  r.y = dot(n1.yzy, n2.xyz);
  r.z = dot(n1.xyw, -n2.xyz);
  return normalize(r);
}

vec2 noise(vec2 p){
  vec2 d0 = vec2(127.1, 311.7);
  vec2 d1 = vec2(269.5, 183.3);
  return fract(sin(vec2(dot(p, d0), dot(p, d1))) * 43758.5453);
}

float voronoi(){
  vec2 scale = vUv;
  scale.x *= uResolution.x / uResolution.y;
  scale *= vec2(2.5, 2.5);
  vec2 floorPosition = floor(scale);
  vec2 fractionPosition  = fract(scale);
  float minDistance = 1.0;
  
  for(int i = -1; i <= 1; i++){
    for(int j = -1; j <= 1; j++){
      vec2 neighbor = vec2(i, j);
      vec2 featurePosition = noise(floorPosition + neighbor);
      featurePosition = 0.5 + 0.5 * sin(uTime * 1.0 + 2.0 * PI * featurePosition);
      
      vec2 diff = neighbor + featurePosition - fractionPosition;
      minDistance = min(minDistance, length(diff) * 1.8);
    }
  }

  return minDistance;
}

void main() {
  vec4 diffuse = texture2D(uFloorDiffuse, vUv);
  vec3 normal = texture2D(uFloorNormal, vUv).xyz;
  vec3 rippleNormal = texture2D(uRippleNormal, flip(vUv, 4, 4, uTime * 8.0)).xyz;
  vec3 ripple2Normal = texture2D(uRippleNormal, flip(vUv, 4, 2, uTime * 10.0, vec2(0.35))).xyz;
  
  float mask = voronoi();
  vec3 rippleFinal = mix(ripple2Normal, rippleNormal, mask);
  normal= normal * 2.0 - 1.0;
  // normal = mix(normal, rippleFinal, 1.0 - mask);
  normal = blend(vec4(normal, 1.0), vec4(rippleFinal * 0.65, 1.0));
  // normal = mix(normal, rippleFinal, 0.1);

  mat3 tbn = tangentTransform(vViewPosition);
  normal = normalize(tbn * normal);

  // normal = perturbNormal2Arb( -vViewPosition, normal );

  // todo: multi lights 
  vec4 addedLights = vec4(0.0, 0.0, 0.0, 1.0);
  vec3 lightDirection = normalize(uLightPosition - vWorldPosition);
  // light on diffuse
  addedLights.rgb += clamp(dot(lightDirection, normal), 0.0, 1.0) * uLightColor;

  // specular
  vec3 viewDir = normalize(vWorldPosition - vec3(vWorldPosition));
  vec3 lightInv = -lightDirection;
  vec3 reflectDir = reflect(lightInv, normal);
  float specularStrength = 0.8;
  float spec = pow(max(dot(viewDir, reflectDir), 0.0), 8.0);
  vec3 specular = specularStrength * spec * uLightColor;  
  addedLights.rgb += specular;

  // Debug
  gl_FragColor = mix(vec4(vec3(diffuse), 1.0), addedLights, 0.5);
  // gl_FragColor = vec4(0.5,0.5,0.5,1.0);
  // gl_FragColor = vec4(uLightPosition / length(uLightPosition), 1.0);
  // gl_FragColor = diffuse;
  // gl_FragColor = vec4(rippleFinal, 1.0);
  // gl_FragColor = addedLights;
  // gl_FragColor = vec4(vec3(mask), 1.0);
  
}