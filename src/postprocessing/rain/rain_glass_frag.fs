#define PI 3.1415926

uniform sampler2D uSceneMap;
uniform float uTime;
uniform vec2 uResolution;
varying vec2 vUv;

vec3 blend(vec4 n1, vec4 n2){
  n1 = n1.xyzz * vec4(2.0, 2.0, 2.0, -2.0) + vec4(-1.0, -1.0, -1.0, 1.0);
  n2 = n2 * 2.0 - 1.0;
  vec3 r;
  r.x = dot(n1.zxx, n2.xyz);
  r.y = dot(n1.yzy, n2.xyz);
  r.z = dot(n1.xyw, -n2.xyz);
  return normalize(r);
}

vec2 rand(vec2 c){
  mat2 m = mat2(12.9898,.16180,78.233,.31415);
	return fract(sin(m * c) * vec2(43758.5453, 14142.1));
}

vec2 noise(vec2 p){
	vec2 co = floor(p);
	vec2 mu = fract(p);
	mu = 3.*mu*mu-2.*mu*mu*mu;
	vec2 a = rand((co+vec2(0.,0.)));
	vec2 b = rand((co+vec2(1.,0.)));
	vec2 c = rand((co+vec2(0.,1.)));
	vec2 d = rand((co+vec2(1.,1.)));
	return mix(mix(a, b, mu.x), mix(c, d, mu.x), mu.y);
}

float voronoi(){
  vec2 scale = vUv;
  scale.x *= uResolution.x / uResolution.y;
  scale *= vec2(1.0, 1.0);
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

float range(vec2 uv, vec2 center, float radius){
  float dist = length(center - uv * uResolution);
  return step(dist, radius);
}

vec4 screenMask(){
  const float radius = 400.0;
  vec2 center;  
  bool inRange = false;
  
  if(gl_FragCoord.x < radius / 2.0) {
    inRange = true;
    center.x = radius / 2.0;
  } else if(gl_FragCoord.x > uResolution.x - radius / 2.0) {
    inRange = true;
    center.x = uResolution.x - radius / 2.0;
  }
  
  if (inRange) {
    if(gl_FragCoord.y < radius / 2.0) {
      center.y = radius / 2.0;
    } else if(gl_FragCoord.y > uResolution.y - radius / 2.0) {
      inRange = true;
      center.y = uResolution.y - radius / 2.0;
    } else {
      inRange = false;
    }
  }
  
  vec4 mask = vec4(1.0, 0.0, 0.0, 1.0);
  if(inRange){
    mask *= range(vUv, center, radius / 2.0);
  }

  return mask;
}

void main() {
  vec2 u = vUv;
  vec2 v = vec2(0.05 * vUv.x);
  vec2 n = noise(v * 2000.0);

  vec3 sceneTexture = texture2D(uSceneMap, vUv).xyz;
  gl_FragColor = texture2D(uSceneMap, vUv);
  
  float mask = voronoi();
  vec4 rangeMask = screenMask();

  for (float r = 4.0; r > 0.0 ; r--) {
    // Number of potential drops (in a grid)
    vec2 x = uResolution * r * 0.02,
    x2 = uResolution * r * 0.1,
    p = 2.0 * PI * u * x + (n - 0.5),
    p2 = 2.0 * PI * u * x2 + (n - 0.5),
    s = sin(p),
    s2 = sin(p2),
    v = round(u * x - 0.25) / x,
    v2 = round(u * x2 - 0.25) / x2;
    vec4 d = vec4(noise(v * 200.0), noise(v));
    vec4 d2 = vec4(noise(v2 * 200.0), noise(v2));
    
    // Drop shape and fading
    float t = (s.x + s.y * clamp(mask, 0.8, 1.0)) * max(0., 1. - fract(0.2 * uTime * (d.b + .1) + d.g) * 2.);
    float t2 = (s2.x + s2.y) * max(0., 1. - fract(0.4 * uTime * (d2.b + .1) + d2.g) * 2.);
    
    vec4 bigLayer, smallLayer;
    // d.r -> only x% of drops are kept on, with x depending on the size of drops
    if(d.r < (2.0 - r) * 0.12 && t > 0.5 && rangeMask.r != 0.0){
      // Drop normal
      vec3 v = normalize(-vec3(cos(p), mix(0.2, 2.0, t - 0.5)));
      // debug
      // bigLayer = vec4(v * 0.5 + 0.5, 1.0);
      gl_FragColor = texture2D(uSceneMap, (u - v.xy * 0.3))* rangeMask.r;
    }
  
    if(d2.r < (2.0 - r) * 0.069 && t2 > 0.5 && rangeMask.r != 0.0) {
      vec3 v2 = normalize(-vec3(cos(p), mix(0.2, 2.0, t2 - 0.5)));
      // smallLayer = vec4(v2 * 0.5 + 0.5, 1.0);
      gl_FragColor = texture2D(uSceneMap, (u - v2.xy * 0.3)) * rangeMask.r;
    }
  }
}
