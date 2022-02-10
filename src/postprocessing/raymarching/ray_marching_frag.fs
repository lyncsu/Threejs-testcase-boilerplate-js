
#define raymarchSteps 50
#define shadowSteps 4
#define ambienOcclusionSteps 3
#define PI 3.14159

uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uSceneMap;
uniform samplerCube uEnvMap;
uniform vec3 uCameraPosition;
uniform vec3 uCameraTarget;
uniform float uFov;
uniform float uRaymarchMaximumDistance;
uniform float uRaymarchPrecision;
uniform vec3 uLightPosition;
uniform vec3 uLightColor;

uniform sampler2D uDropNormal;
uniform sampler2D uDropMask;
uniform sampler2D uDripNormal;
uniform sampler2D uDripMask;
uniform sampler2D uDripGray;

uvec3 k = uvec3(0x456789abu, 0x6789ab45u, 0x89ab4567u);
const uint max32 = 0xffffffffu;
mat2 rot2(float t){
    return mat2(sin(t),cos(t),-cos(t),sin(t));
}
mat3 rotX(float t){
    return mat3(
        1.,0.,0.,
        0.,sin(t),cos(t),
        0.,-cos(t),sin(t)
    );
}
uvec2 hash22u(uvec2 n) {
    n ^= (n.yx << 24);
    n ^= (n.yx >> 1);
    n *= k.xy;
    n ^= (n.yx << 1);
    return n * k.xy;
}
vec2 hash22(vec2 p) {
    uvec2 n = uvec2(p);
    vec2 v = vec2(hash22u(n)) / vec2(max32);
    return rot2(uTime)*normalize(2.0 * v - vec2(1.0));
}
uvec3 hash33u(uvec3 n) {
    n ^= (n.yzx << 24);
    n ^= (n.yzx >> 1);
    n *= k;
    n ^= (n.yzx << 1);
    return n * k;
}
vec3 hash33(vec3 p) {
        uvec3 n = uvec3(p);
        vec3 v = vec3(hash33u(n)) / vec3(max32);
        return rotX(uTime) * normalize(2.0 * v - vec3(1.0));
}
float gnoise31(vec3 p) {
    vec3 f = fract(p);
    p= floor(p);
    vec3 g000 = hash33(p);
    vec3 g001 = hash33(p + vec3(0.0, 0.0, 1.0));
    vec3 g010 = hash33(p + vec3(0.0, 1.0, 0.0));
    vec3 g011 = hash33(p + vec3(0.0, 1.0, 1.0));
    vec3 g100 = hash33(p + vec3(1.0, 0.0, 0.0));
    vec3 g101 = hash33(p + vec3(1.0, 0.0, 1.0));
    vec3 g110 = hash33(p + vec3(1.0, 1.0, 0.0));
    vec3 g111 = hash33(p + vec3(1.0, 1.0, 1.0));
    
    float v000 = dot(g000, f);
    float v001 = dot(g001, f - vec3(0.0, 0.0, 1.0));
    float v010 = dot(g010, f - vec3(0.0, 1.0, 0.0));
    float v011 = dot(g011, f - vec3(0.0, 1.0, 1.0));
    float v100 = dot(g100, f - vec3(1.0, 0.0, 0.0));
    float v101 = dot(g101, f - vec3(1.0, 0.0, 1.0));
    float v110 = dot(g110, f - vec3(1.0, 1.0, 0.0));
    float v111 = dot(g111, f - vec3(1.0, 1.0, 1.0));
    f = f * f * f * (10.0 - 15.0 * f + 6.0 * f * f);
    float xy0 = mix(mix(v000, v100, f.x), mix(v010, v110, f.x), f.y);
    float xy1 = mix(mix(v001, v101, f.x), mix(v011, v111, f.x), f.y);
    return 0.5 * mix(xy0, xy1, f.z) + 0.5;
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

vec2 sphere(vec3 p, float radius, vec3 pos, vec4 quat){
  mat3 transform = rotationMatrix3(quat.xyz, quat.w);
  float d = length((p * transform) - pos) - radius;
  return vec2(d, 0.0);
}

vec4 sphere(vec3 position, vec3 normal){
  vec2 uv = vec2(atan(normal.x, normal.z), acos(normal.y));
  vec3 color = texture2D(uDropMask, uv).xyz;
  vec3 textureM = texture2D(uDropMask, uv).xyz;  
  vec3 mapM = vec3(textureM * 2.0 - 1.0);
  vec3 textureN = texture2D(uDropNormal, uv).xyz; 
  vec3 mapN = vec3(textureN.rg * 2.0 - 1.0, 1.0);

  vec3 saturateM = clamp(mapM, 0.0, 1.0);
  saturateM.b *= fract(textureN.b - 0.2 * uTime);
  float staticM = -1.0 * mapM.r;
  vec3 drop = vec3(mapN.rg * (saturateM.b + staticM), 1.0);

  float maskY = clamp(smoothstep(uv.y, 0.0, 0.36) * 5.0, .0, 1.0);
  vec3 textureDripNormal = texture2D(uDripNormal, uv).xyz;
  vec3 textureDripGray = texture2D(uDripGray, uv).xyz;
  float mixB = mix(0.15, 0.5, textureDripGray.r);
  vec3 textureDripMask = texture2D(uDripMask, (-uTime + textureDripGray.r) * mixB + 0.1 * gnoise31(vec3(uv.x * 100., uv.y * 20., uTime)) - uv).xyz;
  vec3 drip = vec3(textureDripMask.r * floor(textureDripNormal.b + 0.5) * gnoise31(vec3(uv * 20.0, uTime)), 0.0, 0.0);
  mapN = vec3(drop.xy * maskY + drip.xy * (1.0 - maskY + 0.04), drop.z + drip.z);

  float ao = clamp(0.75 + 0.25 * normal.y, 0.0, 1.0);

  return vec4(mapN, ao);
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
vec2 smin(vec2 a, vec2 b, float k) { 
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
  // noise += time * .1;
  float pnoise = 1.0 + perlin(noise);
  // vec2 box = roundBox(position, vec3(7.2, 0.05, 0.05), 0.5, zero, quaternion + vec4(1.0, 1.0, 1.0, PI / 4.0));
  // vec2 box2 = roundBox(position, vec3(7.2, 0.05, 0.05), 0.5, zero, quaternion + vec4(1.0, 1.0, 1.0, -PI / 4.0));
  vec2 sph = sphere(position, 7.0, zero, quaternion);
  vec2 sph2 = sphere(position, 6.0, zero + 2.0 * sin(uTime), quaternion) + perlin( position + uTime ) * 0.015;
  vec2 sph3 = sphere(position, 3.0, zero + 4.0 * cos(uTime), quaternion) + perlin( position + uTime ) * 0.1;

  return smin(sph3, smin(sph, sph2, pnoise), pnoise);
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
vec2 raymarching(vec3 rayOrigin, vec3 rayDir, float maxd, float precis) {
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
    res = vec2(dist, type); 
  }
  return res;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution;
  vec2 screenPos = 2.0 * uv - 1.0;
  screenPos.x *= uResolution.x / uResolution.y;
  vec3 rayDirection = getRay(uCameraPosition, uCameraTarget, screenPos, uFov);
  vec3 outColor = texture2D(uSceneMap, uv).xyz;
  vec2 intersectPoint = raymarching(uCameraPosition, rayDirection, uRaymarchMaximumDistance, uRaymarchPrecision);
  if (intersectPoint.x > -0.5){
    // world position
    vec3 position = uCameraPosition + rayDirection * intersectPoint.x;
    // diffuse color
    vec3 color = vec3(intersectPoint.y);
    // normal vector
    vec3 normal = calNormal(position);
    vec3 reflectDirection = reflect(rayDirection, normal);
    vec4 mat = vec4(0.0);
    mat = sphere(position, normal);
    vec3 env = textureCube(uEnvMap, vec3(-reflectDirection.x, reflectDirection.yz)).xyz;

    vec3 baseLight = normalize(vec3(5.0, 5.0, 5.0));
    vec3 baseLightColor = max(0.0, dot(baseLight, normal * mat.xyz)) * vec3(0.5);
    vec3 baseLight2 = normalize(vec3(-5.0, -5.0, -5.0));
    vec3 baseLightColor2 = max(0.0, dot(baseLight2, normal * mat.xyz)) * vec3(0.5);
    vec3 finalBaseLight = mix(baseLightColor, baseLightColor2, 0.5) * 1.0;
    vec3 light = normalize(uLightPosition);
    vec3 lightColor = max(0.0, dot(light, normal * mat.xyz)) * 0.15 * uLightColor;//blend(vec4(normal, 1.0), vec4(mapN, 1.0)).xyz)

    float depth = 1.0 / log(intersectPoint.x);
    outColor += -0.001 * color * depth + mix(finalBaseLight + lightColor, env, 0.15) * pow(mat.w, 3.5) * 5.0;
  }

  gl_FragColor = vec4(outColor, 1.0);
}
