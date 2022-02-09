
#define raymarchSteps 50
#define shadowSteps 4
#define ambienOcclusionSteps 3
#define PI 3.14159

uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uSceneMap;
uniform vec3 uCameraPosition;
uniform vec3 uCameraTarget;
uniform float uFov;
uniform float uRaymarchMaximumDistance;
uniform float uRaymarchPrecision;
uniform vec3 uLightPosition;
uniform vec3 uLightColor;

//https://github.com/stackgl/glsl-look-at/blob/gh-pages/index.glsl
mat3 calcLookAtMatrix(vec3 origin, vec3 target, float roll) {
  vec3 rr = vec3(sin(roll), cos(roll), 0.0);
  vec3 ww = normalize(target - origin);
  vec3 uu = normalize(cross(ww, rr));
  vec3 vv = normalize(cross(uu, ww));
  return mat3(uu, vv, ww);
}

// https://github.com/stackgl/glsl-camera-ray
vec3 getRay(mat3 camMat, vec2 screenPos, float lensLength) {
  return normalize(camMat * vec3(screenPos, lensLength));
}

vec3 getRay(vec3 origin, vec3 target, vec2 screenPos, float lensLength) {
  mat3 camMat = calcLookAtMatrix(origin, target, 0.0);
  return getRay(camMat, screenPos, lensLength);
}

mat3 rotationMatrix3(vec3 axis, float angle){
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;

    return mat3(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c          );
}

// primitives
vec2 roundBox(vec3 p, vec3 size, float corner, vec3 pos, vec4 quat){
  mat3 transform = rotationMatrix3(quat.xyz, quat.w);
  return vec2(length(max(abs((p - pos) * transform) - size, 0.0)) - corner, 1.0);
}

vec2 sphere( vec3 p, float radius, vec3 pos, vec4 quat){
    mat3 transform = rotationMatrix3(quat.xyz, quat.w);
    float d = length((p * transform) - pos) - radius;
    return vec2(d, 0.0);
}

// http://www.pouet.net/topic.php?post=367360
const vec3 pa = vec3(1.0, 57.0, 21.);
const vec4 pb = vec4(0.0, 57.0, 21.0, 78.);
float perlin(vec3 p) {
	vec3 i = floor(p);
	vec4 a = dot(i, pa) + pb;
	vec3 f = cos((p - i) * acos(-1.0)) * (-0.5) + 0.5;
	a = mix(sin(cos(a)*a), sin(cos(1.0 + a) * (1. + a)), f.x);
	a.xy = mix(a.xz, a.yw, f.y);
	return mix(a.x, a.y, f.z);
}

vec2 unite(vec2 a, vec2 b){
  return vec2(min(a.x, b.x),1.0);
}
vec2 intersection(vec2 a, vec2 b){
  return vec2(max(a.x, b.x), 1.0);
}
vec2 blend( vec2 a, vec2 b, float t ){ 
  return vec2(mix(a.x, b.x, t), 1.0);
}
vec2 subtract(vec2 a, vec2 b){ 
  return vec2(max(-a.x, b.x), 1.0);
}
// http://iquilezles.org/www/articles/smin/smin.htm
vec2 smin( vec2 a, vec2 b, float k ) { 
  float h = clamp( 0.5 + 0.5 * (b.x - a.x)/k, 0.0, 1.0); 
  return vec2(mix(b.x, a.x, h) - k * h * (1.0 - h), 1.0); 
}

vec2 sdf(vec3 position){
  // repetition
  vec3 r = vec3(9.0, 0.0, 9.0);
  vec3 zero = vec3(0.0);
  vec4 quaternion = vec4(1.0, sin(uTime) * 0.1, 0.0, uTime * 0.2);
  // noise
  vec3 noise = position * 0.25;
  //noise += time * .1;
  float pnoise = 1.0 + perlin(noise);
  vec2 box = roundBox(position, vec3(7.5, 0.15, 0.15), 0.5, zero, quaternion + vec4(1.0, 1.0, 1.0, PI / 4.0));
  vec2 sph = sphere(position, 7.0, zero, quaternion);
  vec2 sph2 = sphere(position, 2.0, zero + 5.0 * sin(uTime), quaternion );// + perlin( position + uTime ) * 0.12;
  vec2 sph3 = sphere(position, 3.0, zero + 5.0 * cos(uTime), quaternion );// + perlin( position + uTime ) * 0.15;

  return smin(sph3, smin(sph2, smin(sph, box, pnoise), pnoise), pnoise);
}

// https://github.com/stackgl/glsl-sdf-normal
vec3 calNormal(vec3 pos, float eps) {
  const vec3 v1 = vec3( 1.0, -1.0, -1.0);
  const vec3 v2 = vec3(-1.0, -1.0, 1.0);
  const vec3 v3 = vec3(-1.0, 1.0, -1.0);
  const vec3 v4 = vec3( 1.0, 1.0, 1.0);

  return normalize( v1 * sdf( pos + v1*eps ).x +
                    v2 * sdf( pos + v2*eps ).x +
                    v3 * sdf( pos + v3*eps ).x +
                    v4 * sdf( pos + v4*eps ).x );
}

vec3 calNormal(vec3 pos) {
  return calNormal(pos, 0.002);
}

//https://github.com/stackgl/glsl-raytrace/blob/master/index.glsl
vec2 raymarching( vec3 rayOrigin, vec3 rayDir, float maxd, float precis ) {
  float latest = precis * 2.0;
  float dist = 0.0;
  float type = -1.0;
  for (int i = 0; i < raymarchSteps; i++) {
      if (latest < precis || dist > maxd) break;
      vec2 result = sdf(rayOrigin + rayDir * dist);
      latest = result.x;
      dist += latest;
      type = result.y;
  }

  vec2 res = vec2(-1.0, -1.0);
  if (dist < maxd) { 
    res = vec2( dist, type ); 
  }
  return res;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 screenPos = 2.0 * uv - 1.0;
  screenPos.x *= uResolution.x / uResolution.y;
  vec3 rayDirection = getRay(uCameraPosition, uCameraTarget, screenPos, uFov);
  vec2 intersectPoint = raymarching(uCameraPosition, rayDirection, uRaymarchMaximumDistance, uRaymarchPrecision);
  if (intersectPoint.x > -0.5){
    // world position
    vec3 pos = uCameraPosition + rayDirection * intersectPoint.x;
    // diffuse color
    vec3 color = vec3(intersectPoint.y);
    // normal vector
    vec3 normal = calNormal(pos);
    vec3 light = normalize(uLightPosition);
    vec3 lightColor = max(0.0, dot(light, normal)) * uLightColor;
    vec3 diffuse = vec3(1.0, 1.0, 1.0);

    float depth = 1.0 / log(intersectPoint.x);
    gl_FragColor = vec4((color + lightColor + diffuse) * depth, 1.);// + lightColor1 
  } else {
    gl_FragColor = vec4(texture2D(uSceneMap, uv).xyz, 1.0);
  }
}