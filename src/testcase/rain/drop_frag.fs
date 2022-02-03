vec3 textureM = texture2D(dropMask, vUv * 4.0).xyz;
vec3 mapM = vec3(textureM * 2.0 - 1.0);
vec3 textureN = texture2D(normalMap, vUv * 4.0).xyz; 
vec3 mapN = vec3(textureN.rg * 2.0 - 1.0, 1.0);

// saturate
vec3 saturateM = clamp(mapM, 0.0, 1.0);
saturateM.b *= fract(textureN.b - 0.2 * uTime);

float staticM = -1.0 * mapM.r;
vec3 drop = vec3(mapN.rg * (saturateM.b + staticM), 1.0);
// mapN = vec3(mapN.rg * (saturateM.b + staticM), 1.0);

float maskY = clamp(smoothstep(vUv.y, 0.0, 0.36) * 5.0, .0, 1.0);
drop *= maskY;
// mapN.xy *= normalScale * maskY;
// normal = normalize( vTBN * mapN );

vec3 textureDripNormal = texture2D(dripNormal, vUv * 1.0).xyz;
// vec3 mapN = vec3(textureDripNormal.r, 1.0, textureDripNormal.b);
// mapN.xy *= normalScale;
// normal = normalize( vTBN * mapN );
// vec2 tUv = (vTexCoords.xy / vTexCoords.w) * 0.5 + 0.5;
vec3 textureDripGray = texture2D(dripGray, vUv).xyz;
float mixB = mix(0.15, 0.5, textureDripGray.r);
vec3 textureDripMask = texture2D(dripMask, (-uTime + textureDripGray.r) * mixB + 0.1 * gnoise31(vec3(vUv.x * 100., vUv.y * 20., uTime)) - vUv).xyz;
// vec3 textureDripMask = texture2D(dripMask, (-uTime + textureDripGray.r) - vUv).xyz;
// vec3 mapN = vec3(textureDripMask.r * floor(textureDripNormal.b + 0.5), 1.0, 1.0);
// vec3 mapN = vec3(textureDripMask.r * floor(textureDripNormal.b + 0.5) * gnoise31(vec3(vUv*100., uTime)), 1.0, 1.0);
vec3 drip = vec3(textureDripMask.r * floor(textureDripNormal.b + 0.5) * gnoise31(vec3(vUv * 20.0, uTime)), 1.0, 1.0);
drip *= 1.0 - maskY + 0.08;
mapN = drip + drop;
// mapN = vec3(textureDripMask.r, 1.0, 1.0);
// mapN = vec3(cnoise(gl_FragCoord.xy)*2.0);
// vec3 debugMask = vec3(textureDripMask.r * floor(textureDripNormal.b + 0.5) * gnoise31(vec3(vUv * 20.0, uTime)), 0.0, 0.0);
// vec3 debugMask = textureDripMask;
mapN.xy *= normalScale;
normal = normalize(vTBN * mapN);