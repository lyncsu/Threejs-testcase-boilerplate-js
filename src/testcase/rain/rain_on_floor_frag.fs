varying vec2 vUv;
uniform float iTime;
uniform sampler2D tFloorDiffuse;
uniform sampler2D tFloorNormal;

void main() {
  
  // vec3 normal = texture2D(tFloorNormal, vUv).rgb;
  // normal = normalize(normal * 2.0 - 1.0);
  gl_FragColor.rgb = texture2D(tFloorDiffuse, vUv).rgb;
}