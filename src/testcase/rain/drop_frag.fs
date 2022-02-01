vec3 textureM = texture2D(normalMaskMap, vUv * 4.0).xyz;
vec3 mapM = vec3(textureM * 2.0 - 1.0);
vec3 textureN = texture2D(normalMap, vUv * 4.0).xyz; 
vec3 mapN = vec3(textureN.rg * 2.0 - 1.0, 1.0);

// saturate
vec3 saturateM = clamp(mapM, 0.0, 1.0);
saturateM.b *= fract(textureN.b - 0.2 * uTime);

float staticM = -1.0 * mapM.r;
mapN = vec3(mapN.rg * (saturateM.b + staticM), 1.0);

// mapN *= step(-vViewPosition.y, 200.);
// mapN = 
mapN.xy *= normalScale * smoothstep(vUv.y, 0.0, 0.35);
normal = normalize( vTBN * mapN );