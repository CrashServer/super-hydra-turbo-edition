setFunction({name:"databend",type:"color",inputs:[{name:"amount",type:"float",default:.5},{name:"shift",type:"float",default:.1},{name:"corruption",type:"float",default:.3}],glsl:`
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
`});setFunction({name:"rgbshift",type:"color",inputs:[{name:"amount",type:"float",default:1},{name:"offset",type:"float",default:.05},{name:"chaos",type:"float",default:.2}],glsl:`
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
`});setFunction({name:"pixelcorrupt",type:"color",inputs:[{name:"amount",type:"float",default:1},{name:"blocksize",type:"float",default:16},{name:"corruption",type:"float",default:.4}],glsl:`
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
`});setFunction({name:"compress",type:"color",inputs:[{name:"amount",type:"float",default:1},{name:"quality",type:"float",default:8},{name:"blockiness",type:"float",default:.3}],glsl:`
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
`});setFunction({name:"glitchcoord",type:"coord",inputs:[{name:"amount",type:"float",default:.1},{name:"frequency",type:"float",default:10},{name:"chaos",type:"float",default:.5}],glsl:`
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
`});setFunction({name:"pixelsort",type:"coord",inputs:[{name:"amount",type:"float",default:.2},{name:"threshold",type:"float",default:.5},{name:"direction",type:"float",default:0}],glsl:`
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
`});setFunction({name:"memcorrupt",type:"coord",inputs:[{name:"amount",type:"float",default:.15},{name:"blocksize",type:"float",default:32},{name:"corruption",type:"float",default:.3}],glsl:`
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
`});setFunction({name:"interlace",type:"coord",inputs:[{name:"amount",type:"float",default:.1},{name:"lines",type:"float",default:200},{name:"drift",type:"float",default:.05}],glsl:`
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
`});
