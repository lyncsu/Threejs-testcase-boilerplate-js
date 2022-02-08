uniform float uTime;
uniform sampler2D dropMask;
uniform sampler2D dripNormal;
uniform sampler2D dripMask;
uniform sampler2D dripGray;
// varying vec4 vWorldPosition;
// varying vec4 vTexCoords;
// uniform vec3 projectionPosition;

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