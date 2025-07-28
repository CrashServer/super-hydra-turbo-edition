// DATABENDING EFFECTS
// Digital corruption and glitch effects inspired by data corruption

// Basic databending with bit shifting simulation
setFunction({
  name: 'databend',
  type: 'color',
  inputs: [
    {name: 'amount', type: 'float', default: 0.5},
    {name: 'shift', type: 'float', default: 0.1},
    {name: 'corruption', type: 'float', default: 0.3},
  ],
  glsl: `
  vec3 col = _c0.rgb;
  
  // Simulate bit shifting by quantizing and shifting color channels
  vec3 quantized = floor(col * 255.0) / 255.0;
  
  // Channel shifting simulation
  float r = quantized.r + shift * sin(time * 2.0 + quantized.g * 10.0);
  float g = quantized.g + shift * sin(time * 3.0 + quantized.b * 15.0);
  float b = quantized.b + shift * sin(time * 1.5 + quantized.r * 8.0);
  
  // Digital noise corruption
  vec3 noise = vec3(
    fract(sin(dot(vec2(r, g), vec2(12.9898, 78.233))) * 43758.5453),
    fract(sin(dot(vec2(g, b), vec2(12.9898, 78.233))) * 43758.5453),
    fract(sin(dot(vec2(b, r), vec2(12.9898, 78.233))) * 43758.5453)
  );
  
  vec3 corrupted = vec3(r, g, b) + corruption * (noise - 0.5);
  corrupted = clamp(corrupted, 0.0, 1.0);
  
  return vec4(amount * corrupted + (1.0 - amount) * _c0.rgb, _c0.a);
`})

// RGB channel separation databending
setFunction({
  name: 'rgbshift',
  type: 'color',
  inputs: [
    {name: 'amount', type: 'float', default: 1.0},
    {name: 'offset', type: 'float', default: 0.05},
    {name: 'chaos', type: 'float', default: 0.2},
  ],
  glsl: `
  // Simulate RGB channel corruption with pseudo-random offsets
  float timeVar = time * 0.5;
  
  // Generate pseudo-random values based on color content
  float rnd1 = fract(sin(_c0.r * 127.1 + timeVar) * 43758.5453);
  float rnd2 = fract(sin(_c0.g * 269.5 + timeVar) * 43758.5453);
  float rnd3 = fract(sin(_c0.b * 183.3 + timeVar) * 43758.5453);
  
  // Create chaotic channel shifts
  vec3 shifted = vec3(
    _c0.r + offset * chaos * (rnd1 - 0.5),
    _c0.g + offset * chaos * (rnd2 - 0.5) * 0.7,
    _c0.b + offset * chaos * (rnd3 - 0.5) * 1.3
  );
  
  // Clamp to valid range but allow some overflow for authentic corruption
  shifted = clamp(shifted, -0.1, 1.1);
  
  return vec4(amount * shifted + (1.0 - amount) * _c0.rgb, _c0.a);
`})

// Digital mosaic databending
setFunction({
  name: 'pixelcorrupt',
  type: 'color',
  inputs: [
    {name: 'amount', type: 'float', default: 1.0},
    {name: 'blocksize', type: 'float', default: 16.0},
    {name: 'corruption', type: 'float', default: 0.4},
  ],
  glsl: `
  // Simulate pixel block corruption
  vec3 col = _c0.rgb;
  
  // Create block coordinates
  vec2 blockCoord = floor(col.rg * blocksize) / blocksize;
  
  // Generate corruption pattern
  float corruptionSeed = fract(sin(dot(blockCoord, vec2(12.9898, 78.233)) + time * 0.1) * 43758.5453);
  
  vec3 corrupted = col;
  
  if (corruptionSeed < corruption) {
    // Apply different types of digital corruption
    float corruptType = fract(corruptionSeed * 7.0);
    
    if (corruptType < 0.3) {
      // Invert corruption
      corrupted = 1.0 - col;
    } else if (corruptType < 0.6) {
      // Channel swap
      corrupted = col.gbr;
    } else {
      // Quantization corruption
      corrupted = floor(col * 8.0) / 8.0;
    }
  }
  
  return vec4(amount * corrupted + (1.0 - amount) * _c0.rgb, _c0.a);
`})

// Compression artifact simulation
setFunction({
  name: 'compress',
  type: 'color',
  inputs: [
    {name: 'amount', type: 'float', default: 1.0},
    {name: 'quality', type: 'float', default: 8.0},
    {name: 'blockiness', type: 'float', default: 0.3},
  ],
  glsl: `
  // Simulate JPEG-like compression artifacts
  vec3 col = _c0.rgb;
  
  // DCT-like quantization simulation
  vec3 quantized = floor(col * quality) / quality;
  
  // Add blocking artifacts
  vec2 blockPos = fract(col.rg * 8.0);
  float blockEdge = smoothstep(0.0, 0.1, min(blockPos.x, blockPos.y)) * 
                   smoothstep(0.0, 0.1, min(1.0 - blockPos.x, 1.0 - blockPos.y));
  
  vec3 artifacts = quantized * (1.0 - blockiness * (1.0 - blockEdge));
  
  // Add some color bleeding
  float bleed = sin(time + col.r * 20.0) * 0.02;
  artifacts.g += bleed;
  artifacts.b -= bleed * 0.5;
  
  return vec4(amount * clamp(artifacts, 0.0, 1.0) + (1.0 - amount) * _c0.rgb, _c0.a);
`})

// DATABENDING COORDINATE EFFECTS
// Spatial distortions that simulate digital corruption

// Digital glitch coordinates
setFunction({
  name: 'glitchcoord',
  type: 'coord',
  inputs: [
    {name: 'amount', type: 'float', default: 0.1},
    {name: 'frequency', type: 'float', default: 10.0},
    {name: 'chaos', type: 'float', default: 0.5},
  ],
  glsl: `
  vec2 coord = _st;
  
  // Create digital noise pattern
  float noise1 = fract(sin(dot(coord, vec2(12.9898, 78.233)) + time * 2.0) * 43758.5453);
  float noise2 = fract(sin(dot(coord, vec2(93.9898, 67.345)) + time * 1.5) * 28754.2343);
  
  // Create scanline-like glitches
  float scanline = floor(coord.y * frequency) / frequency;
  float glitchTrigger = step(0.5 + 0.4 * sin(time * 3.0 + scanline * 20.0), noise1);
  
  // Apply horizontal displacement on affected scanlines
  coord.x += glitchTrigger * amount * chaos * (noise2 - 0.5);
  
  // Occasional vertical jumps
  float verticalGlitch = step(0.95, noise1) * amount * 0.5;
  coord.y += verticalGlitch * (noise2 - 0.5);
  
  return coord;
`})

// Pixel sorting effect on coordinates
setFunction({
  name: 'pixelsort',
  type: 'coord',
  inputs: [
    {name: 'amount', type: 'float', default: 0.2},
    {name: 'threshold', type: 'float', default: 0.5},
    {name: 'direction', type: 'float', default: 0.0}, // 0=horizontal, 1=vertical
  ],
  glsl: `
  vec2 coord = _st;
  
  // Choose direction
  vec2 sortDir = mix(vec2(1.0, 0.0), vec2(0.0, 1.0), direction);
  vec2 perpDir = vec2(sortDir.y, sortDir.x);
  
  // Project coordinate onto sorting direction
  float sortPos = dot(coord, sortDir);
  float perpPos = dot(coord, perpDir);
  
  // Create sorting trigger based on brightness-like function
  float brightness = fract(sin(perpPos * 50.0 + time * 0.5) * 43758.5453);
  
  if (brightness > threshold) {
    // Apply sorting displacement
    float displacement = amount * sin(sortPos * 20.0 + time * 2.0 + perpPos * 10.0);
    coord += sortDir * displacement;
  }
  
  return coord;
`})

// Memory corruption effect
setFunction({
  name: 'memcorrupt',
  type: 'coord',
  inputs: [
    {name: 'amount', type: 'float', default: 0.15},
    {name: 'blocksize', type: 'float', default: 32.0},
    {name: 'corruption', type: 'float', default: 0.3},
  ],
  glsl: `
  vec2 coord = _st;
  
  // Create memory block structure
  vec2 blockCoord = floor(coord * blocksize) / blocksize;
  vec2 localCoord = fract(coord * blocksize);
  
  // Generate corruption pattern per block
  float blockSeed = fract(sin(dot(blockCoord, vec2(12.9898, 78.233)) + time * 0.1) * 43758.5453);
  
  if (blockSeed < corruption) {
    // Apply different types of memory corruption
    float corruptType = fract(blockSeed * 5.0);
    
    if (corruptType < 0.2) {
      // Block swap
      coord = blockCoord + vec2(1.0 - localCoord.x, localCoord.y) / blocksize;
    } else if (corruptType < 0.4) {
      // Block rotation
      vec2 rotated = vec2(localCoord.y, 1.0 - localCoord.x);
      coord = blockCoord + rotated / blocksize;
    } else if (corruptType < 0.6) {
      // Block offset
      vec2 offset = amount * vec2(
        sin(blockSeed * 20.0),
        cos(blockSeed * 15.0)
      );
      coord += offset;
    } else {
      // Block mirror
      coord = blockCoord + vec2(1.0 - localCoord.x, 1.0 - localCoord.y) / blocksize;
    }
  }
  
  return coord;
`})

// Interlace corruption effect
setFunction({
  name: 'interlace',
  type: 'coord',
  inputs: [
    {name: 'amount', type: 'float', default: 0.1},
    {name: 'lines', type: 'float', default: 200.0},
    {name: 'drift', type: 'float', default: 0.05},
  ],
  glsl: `
  vec2 coord = _st;
  
  // Create interlace lines
  float line = floor(coord.y * lines);
  float isOddLine = mod(line, 2.0);
  
  // Apply different effects to odd/even lines
  if (isOddLine > 0.5) {
    // Horizontal drift for odd lines
    coord.x += amount * sin(time * 1.5 + line * 0.1) * drift;
    
    // Slight vertical offset
    coord.y += amount * 0.5 / lines;
  } else {
    // Different drift for even lines
    coord.x -= amount * cos(time * 2.0 + line * 0.15) * drift * 0.7;
  }
  
  return coord;
`})

// DATAMOSHING EFFECTS
// Temporal corruption and frame persistence effects

// Frame freezing effect - simulates P-frame corruption using spatial blocks
setFunction({
  name: 'framefreeze',
  type: 'combineCoord',
  inputs: [
    {name: 'amount', type: 'float', default: 0.3},
    {name: 'blocksize', type: 'float', default: 16.0},
    {name: 'persistence', type: 'float', default: 0.8},
    {name: 'glitch_freq', type: 'float', default: 0.3},
  ],
  glsl: `
  vec2 coord = _st;
  
  // Create macro blocks for compression simulation
  vec2 blockCoord = floor(coord * blocksize) / blocksize;
  vec2 localCoord = fract(coord * blocksize);
  
  // Generate semi-persistent corruption pattern
  float timeStep = floor(time * glitch_freq);
  float blockSeed = fract(sin(dot(blockCoord, vec2(12.9898, 78.233)) + timeStep * 0.1) * 43758.5453);
  
  // Simulate frame persistence by freezing certain blocks
  if (blockSeed < persistence) {
    // Create temporal displacement for frozen blocks
    float frozenTime = floor(time * glitch_freq - blockSeed * 10.0) / glitch_freq;
    
    // Apply different types of P-frame corruption
    float corruptType = fract(blockSeed * 5.0);
    
    if (corruptType < 0.3) {
      // Block freeze - offset to a "previous" position
      vec2 frozenOffset = amount * vec2(
        sin(frozenTime + blockSeed * 7.0),
        cos(frozenTime + blockSeed * 5.0)
      ) * 0.1;
      coord = blockCoord + frozenOffset + localCoord / blocksize;
    } else if (corruptType < 0.6) {
      // Block duplication/echo
      vec2 echoOffset = amount * vec2(
        sin(blockSeed * 15.0),
        cos(blockSeed * 12.0)
      ) * 0.05;
      coord += echoOffset;
    } else {
      // Temporal lag - sample from slightly shifted position
      float lag = amount * 0.02 * sin(frozenTime + blockSeed * 10.0);
      coord.x += lag;
    }
  }
  
  return coord;
`})

// Echo/ghosting effect from temporal compression errors
setFunction({
  name: 'temporaecho',
  type: 'color',
  inputs: [
    {name: 'amount', type: 'float', default: 0.6},
    {name: 'echo_delay', type: 'float', default: 0.5},
    {name: 'echo_decay', type: 'float', default: 0.7},
    {name: 'spatial_offset', type: 'float', default: 0.02},
  ],
  glsl: `
  vec3 col = _c0.rgb;
  
  // Simulate temporal echoes using time-shifted spatial patterns
  // Since we can't access previous frames, we create echo-like effects using spatial displacement
  
  // Create multiple time-shifted spatial patterns
  float baseTime = time;
  float echoTime1 = baseTime - echo_delay;
  float echoTime2 = baseTime - echo_delay * 2.0;
  
  // Generate echo patterns based on shifted spatial coordinates
  vec2 echoCoord1 = _st + spatial_offset * vec2(
    sin(echoTime1 * 2.0), 
    cos(echoTime1 * 1.8)
  );
  vec2 echoCoord2 = _st + spatial_offset * vec2(
    sin(echoTime2 * 1.5), 
    cos(echoTime2 * 2.2)
  );
  
  // Create echo colors using spatial hash functions
  float echo1Brightness = fract(sin(dot(echoCoord1 * 20.0, vec2(12.9898, 78.233)) + echoTime1) * 43758.5453);
  float echo2Brightness = fract(sin(dot(echoCoord2 * 25.0, vec2(93.9898, 67.345)) + echoTime2) * 28754.2343);
  
  // Apply echo effect by modulating the current color
  vec3 echo1Color = col * (0.8 + 0.4 * echo1Brightness);
  vec3 echo2Color = col * (0.6 + 0.6 * echo2Brightness);
  
  // Mix echoes with decay
  col = mix(col, echo1Color, amount * echo_decay * 0.3);
  col = mix(col, echo2Color, amount * echo_decay * echo_decay * 0.2);
  
  // Add some chromatic aberration for echo effect
  col.r = mix(col.r, echo1Color.r, amount * 0.1);
  col.b = mix(col.b, echo2Color.b, amount * 0.1);
  
  return vec4(clamp(col, 0.0, 1.0), _c0.a);
`})

// Macro block displacement (typical of MPEG corruption)
setFunction({
  name: 'macroblock',
  type: 'coord',
  inputs: [
    {name: 'amount', type: 'float', default: 0.3},
    {name: 'block_size', type: 'float', default: 16.0},
    {name: 'displacement', type: 'float', default: 0.1},
    {name: 'corruption_rate', type: 'float', default: 0.2},
  ],
  glsl: `
  vec2 coord = _st;
  
  // Create macro block grid
  vec2 blockId = floor(coord * block_size);
  vec2 blockCoord = blockId / block_size;
  vec2 localCoord = fract(coord * block_size);
  
  // Generate corruption pattern with temporal persistence
  float timeStep = floor(time * corruption_rate);
  float blockSeed = fract(sin(dot(blockId, vec2(12.9898, 78.233)) + timeStep) * 43758.5453);
  
  if (blockSeed < 0.3) {
    // Apply macro block displacement
    vec2 blockDisplacement = displacement * vec2(
      sin(blockSeed * 30.0 + timeStep),
      cos(blockSeed * 25.0 + timeStep * 1.1)
    );
    
    // Move the entire block
    coord = (blockCoord + blockDisplacement) + localCoord / block_size;
    
    // Add some additional chaos within the block
    if (blockSeed < 0.1) {
      coord += amount * 0.1 * vec2(
        sin(localCoord.x * 20.0 + timeStep),
        cos(localCoord.y * 15.0 + timeStep)
      ) / block_size;
    }
  }
  
  return coord;
`})