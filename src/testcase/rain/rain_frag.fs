varying vec2 vUv;
varying vec3 vNormal;
uniform float time; 
varying vec3 viewPos;
varying vec3 worldPos;
uniform sampler2D uFloorDiffuse;
uniform sampler2D uFloorNormal;

varying vec3 vViewPosition;



           uniform vec3 pointLightColor;
           uniform vec3 pointLightPosition;
           uniform float pointLightDistance;


uniform vec3 ambientLightColor;


vec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {

    vec2 normalScale = vec2(1.0,1.0);

    // Workaround for Adreno 3XX dFd*( vec3 ) bug. See #9988

    vec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );
    vec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );
    vec2 st0 = dFdx( vUv.st );
    vec2 st1 = dFdy( vUv.st );

    float scale = sign( st1.t * st0.s - st0.t * st1.s ); // we do not care about the magnitude

    vec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );
    vec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );
    vec3 N = normalize( surf_norm );
    mat3 tsn = mat3( S, T, N );

    vec3 mapN = texture2D( uFloorNormal, vUv ).xyz * 2.0 - 1.0;

//                mapN.xy *= normalScale;
//                mapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );

    return normalize( tsn * mapN );
//                return ( tsn * mapN );

}

mat3 tangentTransform(vec3 vViewPosition) {

  // normal mapping

  vec4 posAndU = vec4( -vViewPosition, vUv.x );
  // tangent is alongside the u-axis(x-axis, horizontal one.)
  vec4 posAndU_dx = dFdx( posAndU ),  posAndU_dy = dFdy( posAndU );
  vec3 tangent = posAndU_dx.w * posAndU_dx.xyz + posAndU_dy.w * posAndU_dy.xyz;
  vec3 normal = normalize( vNormal );
  vec3 binormal = normalize( cross( tangent, normal ) );
  tangent = cross( normal, binormal );    // no normalization required
  mat3 tsb = mat3( tangent, binormal, normal );

  return tsb;
}

void main() {
    vec4 diffuse = texture2D(uFloorDiffuse, vUv);
    vec3 samNorm = texture2D(uFloorNormal, vUv).xyz;
    samNorm = samNorm * 2.0 - 1.0;

    vec3 normal = 1.0 * samNorm;

    // // option1
              //  normal = perturbNormal2Arb( -vViewPosition, normal ); // this also works

    // option2 
    mat3 tsb = tangentTransform( vViewPosition );
    normal = normalize(tsb * normal);

    vec4 addedLights = vec4(0.0,0.0,0.0, 1.0);
                     vec3 lightPos = vec3(-10.0,0.0,20.0); // debugging
                     vec3 lightColor = vec3(1.0,1.0,1.0); // debugging

        vec3 lightDir = normalize(lightPos - worldPos);

        // diffuse lighting
        addedLights.rgb += clamp(dot(lightDir, normal), 0.0, 1.0) * lightColor; 

        // specular lighting 
        float specularStrength = 0.8;
        vec3 viewDir = normalize(viewPos - vec3(worldPos));
        vec3 inlight = -lightDir;
        vec3 reflectDir = reflect(inlight, normal);
        float spec = pow(max(dot(viewDir, reflectDir), 0.0), 16.0);
        vec3 specular = specularStrength * spec * lightColor;   
        addedLights.rgb += specular;
    gl_FragColor = mix(vec4(diffuse.x, diffuse.y, diffuse.z, 1.0), addedLights, 0.5);
              //  gl_FragColor = vec4(0.5,0.5,0.5,1.0);
              //  gl_FragColor = vec4(lightPos / length(lightPos), 1.0);
            //  gl_FragColor = diffuse;
            //  gl_FragColor =  vec4(normal,1.0);
            //  gl_FragColor = addedLights;
}