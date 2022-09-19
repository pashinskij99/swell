const causticSnippet = /* glsl */ `
  uniform sampler2D u_caustics_map;
  uniform float u_time;
  uniform float u_causticIntensity;
  uniform float u_caustics_scale;
  uniform float u_caustic_speed;

  vec3 sampleOffset(sampler2D map, vec2 uv, float offset) {

    vec3 color = vec3(0.);

    color.r = texture2D(map, uv + vec2(offset, -offset)).r;
    color.g = texture2D(map, uv + vec2(offset, offset)).g;
    color.b = texture2D(map, uv + vec2(-offset, offset)).b;

    return color * u_causticIntensity;
  }

  vec3 getCaustics(vec2 vUv) {
    vec2 uv = vUv * u_caustics_scale;

    float speed = u_caustic_speed;
    float rgbOffset = 0.0015;

    // first sample
    vec2 firstSamplePoint = uv + (u_time * 0.1 * speed);
    vec3 x = sampleOffset(u_caustics_map, firstSamplePoint, rgbOffset);

    // second sample
    vec2 secondSamplePoint = (uv + vec2(0.3, 0.5)) + u_time * 0.23 * speed;
    vec3 y = sampleOffset(u_caustics_map, secondSamplePoint, rgbOffset);

    return min(x,y);
  }
`;

export default causticSnippet;
