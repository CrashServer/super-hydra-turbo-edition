import CodeMirror from 'codemirror';

const sources = {
  noise: 'noise(scale, offset)\nGenerates Perlin noise. \nscale: noise scale (default: 10)\noffset: noise offset (default: 0.1)',
  voronoi: 'voronoi(scale, speed, blending)\nGenerates a Voronoi pattern. \nscale: pattern scale (default: 5)\nspeed: animation speed (default: 0.3)\nblending: edge smoothing (default: 0.3)',
  osc: 'osc(frequency, sync, offset)\nSinusoidal oscillator. \nfrequency: oscillation frequency (default: 60)\nsync: synchronization (default: 0.1)\noffset: phase offset (default: 0)',
  shape: 'shape(sides, radius, smoothing)\nCreates a geometric shape. \nsides: number of sides (default: 3)\nradius: shape radius (default: 0.3)\nsmoothing: edge smoothing (default: 0.01)',
  gradient: 'gradient(speed)\nGenerates an animated gradient. \nspeed: animation speed (default: 0)',
  solid: 'solid(r, g, b, a)\nCreates a solid color. \nr,g,b: color components (0-1)\na: alpha channel (default: 1)',
  src: 'src(input)\nRetrieves a video source. \ninput: source name (o0-o3, s0-s3)',

  whitenoise: 'whitenoise(size, dynamic)\nBlack and white high frequency noise.\nsize: float (default: 10.0)\ndynamic: float (default: 0.0)',
  colornoise: 'colornoise(size, dynamic)\nColored high frequency noise.\nsize: float (default: 10.0)\ndynamic: float (default: 0.0)',
  unoise: 'unoise(scale, offset)\nUnsigned Perlin noise scaled to 0..1.\nscale: float (default: 10.0)\noffset: float (default: 0.1)',
  turb: 'turb(scale, offset, octaves)\nTurbulent noise (signed value).\nscale: float (default: 10.0)\noffset: float (default: 0.1)\noctaves: float (default: 3.0)',
  uturb: 'uturb(scale, offset, octaves)\nUnsigned turbulent noise scaled to 0..1.\nscale: float (default: 10.0)\noffset: float (default: 0.1)\noctaves: float (default: 3.0)',
  warp: 'warp(scalei, offset, octaves, octavesinner, scale)\nDomain warping noise.\nscalei: float (default: 10.0)\noffset: float (default: 0.1)\noctaves: float (default: 2.0)\noctavesinner: float (default: 3.0)\nscale: float (default: 1.0)',
  cwarp: 'cwarp(scalei, offset, octaves, octavesinner, scale, focus)\nCentered domain warping noise.\nscalei: float (default: 10.0)\noffset: float (default: 0.1)\noctaves: float (default: 2.0)\noctavesinner: float (default: 3.0)\nscale: float (default: 1.0)\nfocus: float (default: 0.5)',
  ncontour: 'ncontour(thresh, smooth, octaves, scale, speed, step)\nContour from noise.\nthresh: float (default: 0.5)\nsmooth: float (default: 0.1)\noctaves: int (default: 3)\nscale: float (default: 5.0)\nspeed: float (default: 0.5)\nstep: float (default: 2.0)',

  brick: 'brick(width, height, gap)\nBrick pattern.\n\nsee: Ebert, Musgrave, Peachey, Perlin Worley\n"Texturing and Modeling – A Procedural Approach"\nDarwyn Peachey, Building Procedural Textures, page 37\n\nwidth: float (default: 0.25)\nheight: float (default: 0.08)\ngap: float (default: 0.01)',
  checker: 'checker()\nCheckerboard pattern.\n\nrepeats: float (default: 10.0)',
  concentric: 'concentric(scale, centerX, centerY)\nConcentric circles pattern.\n\nscale: float (default: 100.0)\ncenterX: float (default: 0.5)\ncenterY: float (default: 0.5)',
  hextile: 'hextile(tiles)\nHex tiles pattern.\n\ntiles: float (default: 10.0)',
  lissa: 'lissa(time, frequ, loops, thick)\nLissajous curve pattern.\n\ntime: float (default: 0.0)\nfrequ: float (default: 10.0)\nloops: float (default: 3.0)\nthick: float (default: 0.025)',
  pulse: 'pulse(edge, width, epsilon)\nPulse pattern.\n\nedge: float (default: 0.5)\nwidth: float (default: 0.05)\nepsilon: float (default: 0.001)',
  pulsetrain: 'pulsetrain(train, edge, width, epsilon)\nPulse train pattern.\n\ntrain: float (default: 3.0)\nedge: float (default: 0.5)\nwidth: float (default: 0.05)\nepsilon: float (default: 0.001)',
  spiral: 'spiral(a, b, thickness)\nSpiral pattern.\n\na: float (default: 1.0)\nb: float (default: 5.0)\nthickness: float (default: 0.1)',
  wave: 'wave(time, frequ, loops, thick)\nWave pattern.\n\ntime: float (default: 0.0)\nfrequ: float (default: 10.0)\nloops: float (default: 3.0)\nthick: float (default: 0.025)',
  blinking: 'blinking(tiles, scale, speed, phase)\nBlinking grid: Looks like a grid of colorful square lamps.\ntiles: float (default: 5.0)\nscale: float (default: 5.0)\nspeed: float (default: 0.5)\nphase: float (default: 0.03)',
  blobs: 'blobs(speed, tresh, soft)\nThree blobs are dancing around.\nspeed: float (default: 0.1)\ntresh: float (default: 0.2)\nsoft: float (default: 0.05)',
  concentric2: 'concentric2(base, octaves, ampscale, speed)\nHarmonic concentric rings pattern.\nbase: float (default: 5.0)\noctaves: float (default: 2.0)\nampscale: float (default: 0.5)\nspeed: float (default: 1.0)',
  phasenoise: 'phasenoise(base, range, scale, speed, phase)\nNoise in HSV with phase shifting.\nbase: float (default: 0.0)\nrange: float (default: 0.1)\nscale: float (default: 5.0)\nspeed: float (default: 0.5)\nphase: float (default: 0.03)',
  sdfmove: 'sdfmove(speed1, speed2, speed3)\nMoving ramp pattern.\nspeed1: float (default: 0.73)\nspeed2: float (default: 1.0)\nspeed3: float (default: -0.5)',
  smoothsun: 'smoothsun(threshold, border, speed, ampscale)\nSmooth sun pattern.\nthreshold: float (default: 0.3)\nborder: float (default: 0.2)\nspeed: float (default: 1.0)\nampscale: float (default: 0.5)'
};

const initSources = {
  'initCam': 's0.initCam()\nInitializes webcam as video source',
  'initImage': 's0.initImage(url)\nInitializes an image as video source',
  'initVideo': 's0.initVideo(url)\nInitializes a video as video source',
  'initScreen': 's0.initScreen()\nInitializes screen capture as video source',
};

const transformations = {
  add: 'add(texture, amount)\nAdds a texture with another. \ntexture: texture to add \namount: addition strength (default: 1)',
  sub: 'sub(texture, amount)\nSubtracts a texture from another. \ntexture: texture to subtract \namount: subtraction strength (default: 1)',
  mult: 'mult(texture, amount)\nMultiplies a texture with another. \ntexture: multiplicative texture \namount: multiplication strength (default: 1)',
  blend: 'blend(texture, amount)\nBlends a texture with another. \ntexture: texture to blend \namount: blend strength (default: 0.5)',
  diff: 'diff(texture)\nCreates absolute difference between two textures. \ntexture: texture to compare',
  layer: 'layer(texture)\nLayers a texture on top of another. \ntexture: texture to layer',
  mask: 'mask(texture)\nMasks a texture with another. \ntexture: masking texture (black = transparent, white = opaque)',
  modulate: 'modulate(texture, amount)\nModulates UV coordinates with a texture. \ntexture: modulation texture \namount: modulation intensity (default: 0.1)',
  modulateRepeat: 'modulateRepeat(texture, repeatX, repeatY, offsetX, offsetY)\nRepeats texture using brightness of another. \ntexture: modulation texture \nrepeatX/Y: number of repetitions (default: 3) \noffsetX/Y: offset (default: 0.5)',
  modulateRotate: 'modulateRotate(texture, multiple, offset)\nRotates texture based on brightness of another. \ntexture: modulation texture \nmultiple: rotation multiplier (default: 1) \noffset: rotation offset (default: 0)',
  modulateScale: 'modulateScale(texture, multiple, offset)\nScales texture based on brightness of another. \ntexture: modulation texture \nmultiple: scale multiplier (default: 1) \noffset: scale offset (default: 1)',
  modulatePixelate: 'modulatePixelate(texture, multiple, offset)\nPixelates texture based on brightness of another. \ntexture: modulation texture \nmultiple: pixelation multiplier (default: 10) \noffset: pixelation offset (default: 3)',
  modulateKaleid: 'modulateKaleid(texture, nSides)\nApplies modulated kaleidoscope effect. \ntexture: modulation texture \nnSides: number of sides (default: 4)',
  modulateScrollX: 'modulateScrollX(texture, scrollX, speed)\nModulated horizontal scrolling. \ntexture: modulation texture \nscrollX: scroll amount (default: 0.5) \nspeed: scroll speed (default: 0)',
  modulateScrollY: 'modulateScrollY(texture, scrollY, speed)\nModulated vertical scrolling. \ntexture: modulation texture \nscrollY: scroll amount (default: 0.5) \nspeed: scroll speed (default: 0)',
  out: 'out(buffer)\nSends result to an output buffer. \nbuffer: destination buffer (o0-o3, default: o0)',
};

const effects = {
  brightness: 'brightness(amount)\nAdjusts brightness. \namount: brightness level (default: 0.4)',
  contrast: 'contrast(amount)\nAdjusts contrast. \namount: contrast level (default: 1.6)',
  color: 'color(r, g, b)\nAdjusts RGB colors. \nr, g, b: channel multipliers (default: 1)',
  colorama: 'colorama(amount)\nShifts HSV colors. \namount: shift intensity (default: 0.005)',
  invert: 'invert(amount)\nInverts colors. \namount: inversion intensity (default: 1)',
  luma: 'luma(threshold, tolerance)\nFilters by brightness. \nthreshold: threshold (default: 0.5) \ntolerance: tolerance (default: 0.1)',
  posterize: 'posterize(bins, gamma)\nReduces number of colors. \nbins: number of levels (default: 3) \ngamma: gamma adjustment (default: 0.6)',
  saturate: 'saturate(amount)\nAdjusts saturation. \namount: saturation level (default: 2)',
  hue: 'hue(amount)\nShifts hue. \namount: shift amount (default: 0.4)',
  thresh: 'thresh(threshold, tolerance)\nThresholds pixels. \nthreshold: threshold (default: 0.5) \ntolerance: tolerance (default: 0.04)',
  kaleid: 'kaleid(nSides)\nKaleidoscope effect. \nnSides: number of sides (default: 4)',
  pixelate: 'pixelate(pixelX, pixelY)\nPixelates the image. \npixelX, pixelY: pixel size (default: 20, 20)',
  repeat: 'repeat(repeatX, repeatY, offsetX, offsetY)\nRepeats the image. \nrepeatX, repeatY: number of repetitions (default: 3, 3) \noffsetX, offsetY: offset (default: 0, 0)',
  repeatX: 'repeatX(reps, offset)\nRepeats image horizontally. \nreps: number of repetitions (default: 3) \noffset: offset (default: 0)',
  repeatY: 'repeatY(reps, offset)\nRepeats image vertically. \nreps: number of repetitions (default: 3) \noffset: offset (default: 0)',
  rotate: 'rotate(angle, speed)\nRotates the image. \nangle: angle in radians (default: 10) \nspeed: rotation speed (default: 0)',
  scale: 'scale(amount, xMult, yMult, offsetX, offsetY)\nScales the image. \namount: size (default: 1.5) \nxMult, yMult: x/y multipliers (default: 1, 1) \noffsetX, offsetY: center offset (default: 0.5, 0.5)',
  scrollX: 'scrollX(scrollX, speed)\nHorizontal scrolling. \nscrollX: scroll amount (default: 0.5) \nspeed: speed (default: 0)',
  scrollY: 'scrollY(scrollY, speed)\nVertical scrolling. \nscrollY: scroll amount (default: 0.5) \nspeed: speed (default: 0)',
};

const utilities = {
  render: 'render(buffer)\nDisplays a buffer on screen. \nbuffer: buffer to render (default: o0)',
  update: 'update = callback => {...}\nAdds a function to execute each frame',
  setResolution: 'setResolution(width, height)\nAdjusts canvas resolution',
  setFunction: 'setFunction(objects)\nDefines custom functions',
  setBins: 'setBins(numBins)\nSets number of bins for audio analysis',
  setCutoff: 'setCutoff(cutoff)\nSets threshold value for audio analysis',
  setSmooth: 'setSmooth(smooth)\nSets smoothing for audio analysis',
  setScale: 'setScale(scale)\nSets scale for audio analysis',
  hide: 'hide()\nHides the canvas',
  show: 'show()\nShows the canvas',
};

const arrayMethods = {
  smooth: 'array.smooth()\nSmoothes transitions between values in an array',
  fast: 'array.fast(speed)\nControls value change speed. \nspeed: speed (default: 1)',
  ease: 'array.ease(easing)\nApplies easing function. \neasing: easing type (default: "linear")',
  offset: 'array.offset(amount)\nShifts values by a constant. \namount: offset value',
  fit: 'array.fit(low, high)\nRescales values to a range. \nlow, high: destination range',
};

const mathFunctions = {
  time: 'time\nVariable that increments automatically',
  sinrange: 'sinrange(x, min, max, freq)\nSine wave in a range. \nx: time or value \nmin: minimum value (default: 0)\nmax: maximum value (default: 1)\nfreq: frequency (default: 1)',
  cosrange: 'cosrange(x, min, max, freq)\nCosine wave in a range. \nx: time or value \nmin: minimum value (default: 0)\nmax: maximum value (default: 1)\nfreq: frequency (default: 1)',
  tanrange: 'tanrange(x, min, max, freq)\nTangent wave in a range. \nx: time or value \nmin: minimum value (default: 0)\nmax: maximum value (default: 1)\nfreq: frequency (default: 1)',
  mouse: 'mouse\nMouse position (x and y between 0 and 1)',
  'a.fft': 'a.fft[index]\nAccesses audio frequency analysis',
  sin: 'Math.sin(x)\nCalculates sine of x',
  cos: 'Math.cos(x)\nCalculates cosine of x',
  tan: 'Math.tan(x, amp=3, freq=1)\nCalculates tangent of x',
  saw: 'Math.saw(x)\nGenerates sawtooth wave. \nx: time or value',
  sawt: 'Math.sawt(amp=3, freq=1)\nGenerates sawtooth wave with time. \nx: time or value',
  random: 'Math.random()\nGenerates random number between 0 and 1',
  'Math.PI': 'Math.PI\nConstant π (3.14159...)',
  screenRatio: 'screenRatio\nAspect ratio of the screen (height/width)',
};

const colorEffects = {
  // Sepia filter
  sepia: 'sepia(amount)\nApplies sepia tone effect. \namount: sepia intensity (default: 1.0)',
  
  // Color level reduction
  levels: 'levels(levels, amount)\nReduces color levels while preserving light-dark dynamics. \nlevels: number of color levels (default: 3.0) \namount: effect intensity (default: 1.0)',
  monotone: 'monotone(levels, hue, amount)\nCreates monotone effect with specified hue. \nlevels: number of levels (default: 3.0) \nhue: color hue 0-1 (default: 0.6) \namount: effect intensity (default: 1.0)',
  
  // HSV manipulation
  hsvshift: 'hsvshift(hue, saturation, value)\nShifts HSV color values. \nhue: hue shift 0-1 (default: 0.0) \nsaturation: saturation multiplier (default: 1.0) \nvalue: brightness multiplier (default: 1.0)',
  
  // Color gradients
  grarose: 'grarose(amount)\nApplies rose gradient to grayscale conversion. \namount: gradient intensity (default: 1.0)',
  grawave: 'grawave(amount)\nApplies wave gradient creating color bands. \namount: gradient intensity (default: 1.0)',
  
  // Vector math color effects
  colcross: 'colcross(amount)\nApplies RGB cross product for strong color effects. \namount: effect intensity (default: 1.0)',
  coldot: 'coldot(amount)\nApplies RGB dot product of rotated channels. \namount: effect intensity (default: 1.0)',
  colboost: 'colboost(amount)\nBoosts colors using vector operations. \namount: boost intensity (default: 1.0)',
  colreflect: 'colreflect(amount)\nCreates color reflection effect. \namount: reflection intensity (default: 1.0)',
};

const screenSpaceShaders = {
  dither: 'dither()\nApplies black and white ordered dithering.',
  dither2: 'dither2()\nApplies ordered dithering with a 2x2 Bayer matrix for color reduction.',
  dither4: 'dither4()\nApplies ordered dithering with a 4x4 Bayer matrix to preserve more colors.',
  ditherrnd: 'ditherrnd()\nApplies black and white random dithering.',
  ditherrndcolor: 'ditherrndcolor()\nApplies random dithering preserving some colors.',
  erode: 'erode()\nMorphological erode operator.',
  dilate: 'dilate()\nMorphological dilate operator.',
  blur: 'blur()\nApplies a 3x3 Gaussian blur.',
  blurmore: 'blurmore()\nApplies a 5x5 Gaussian blur.',
  sharpen: 'sharpen()\nApplies a sharpening filter.',
  emboss: 'emboss()\nApplies an embossing filter.',
  edge: 'edge()\nApplies an edge detection filter.',
  sobelx: 'sobelx()\nApplies a Sobel filter in the X direction.',
  sobely: 'sobely()\nApplies a Sobel filter in the Y direction.',
  pxsort: 'pxsort(threshold, frame, dirX, dirY)\nSorts pixels horizontally by brightness.\nthreshold: (default 0.2)\nframe: (default 0)\ndirX: (default 0)\ndirY: (default 1)',
  pysort: 'pysort(threshold, frame, dirX, dirY)\nSorts pixels vertically by brightness.\nthreshold: (default 0.2)\nframe: (default 0)\ndirX: (default 0)\ndirY: (default 1)',
};

const fractalEffects = {
  // Mirroring functions
  mirrorX: 'mirrorX(pos, coverage)\nMirrors image horizontally from position. \npos: mirror position (default: 0) \ncoverage: effect coverage (default: 1) \nResult: [1234|4321]',
  mirrorY: 'mirrorY(pos, coverage)\nMirrors image vertically from position. \npos: mirror position (default: 0) \ncoverage: effect coverage (default: 1) \nSame as mirrorX but on Y axis',
  mirrorX2: 'mirrorX2(pos, coverage)\nMirrors image horizontally from other side. \npos: mirror position (default: 0) \ncoverage: effect coverage (default: 1) \nResult: [8765|5678]',
  mirrorY2: 'mirrorY2(pos, coverage)\nMirrors image vertically from other side. \npos: mirror position (default: 0) \ncoverage: effect coverage (default: 1) \nSame as mirrorX2 but on Y axis',
  mirrorWrap: 'mirrorWrap()\nMirrors any out of bounds coordinates. \nInput: [-8,-7,-6,-5,-4,-3,-2,-1] [1,2,3,4,5,6,7,8] [9,10,11,12,13,14,15,16] \nResult: [87654321] [12345678] [87654321]',
  
  // Other fractal functions
  inversion: 'inversion()\nApplies circular inversion transformation. \nUseful for creating fractal-like patterns.',
};

const antliaShapes = {
  // Basic shapes
  circle: 'circle(s, smooth)\nCreates a circular shape mask.\ns: size (default: 0.3)\nsmooth: edge smoothing (default: 0.007)',
  square: 'square(s, smooth)\nCreates a square shape mask.\ns: size (default: 0.25)\nsmooth: edge smoothing (default: 0)',
  rectangle: 'rectangle(s, ratio, smooth)\nCreates a rectangular shape mask.\ns: size (default: 0.3)\nratio: aspect ratio array [width, height] (default: [1,1])\nsmooth: edge smoothing (default: 0)',
  triangle: 'triangle(s, smooth)\nCreates a triangular shape mask.\ns: size (default: 0.3)\nsmooth: edge smoothing (default: 0.007)',
  
  // Strips
  horiz: 'horiz(s, smooth)\nCreates a horizontal strip.\ns: size (default: 0.3)\nsmooth: edge smoothing (default: 0.0007)',
  vert: 'vert(s, smooth)\nCreates a vertical strip.\ns: size (default: 0.3)\nsmooth: edge smoothing (default: 0.0007)',
  leftdiag: 'leftdiag(s, smooth)\nCreates a left diagonal strip.\ns: size (default: 0.3)\nsmooth: edge smoothing (default: 0.0007)',
  rightdiag: 'rightdiag(s, smooth)\nCreates a right diagonal strip.\ns: size (default: 0.3)\nsmooth: edge smoothing (default: 0.0007)',
  
  // Quadrants
  firstquad: 'firstquad(r, g, b, a)\nCreates a solid color in the first quadrant (top-right).\nr,g,b,a: color components (default: 1,1,1,1)',
  secondquad: 'secondquad(r, g, b, a)\nCreates a solid color in the second quadrant (top-left).\nr,g,b,a: color components (default: 1,1,1,1)',
  thirdquad: 'thirdquad(r, g, b, a)\nCreates a solid color in the third quadrant (bottom-left).\nr,g,b,a: color components (default: 1,1,1,1)',
  fourthquad: 'fourthquad(r, g, b, a)\nCreates a solid color in the fourth quadrant (bottom-right).\nr,g,b,a: color components (default: 1,1,1,1)',
  quad: 'quad(i, r, g, b, a)\nCreates a solid color in the specified quadrant.\ni: quadrant index (0-3)\nr,g,b,a: color components (default: 1,1,1,1)',
  
  // Extra shapes
  star: 'star(s, v, smooth)\nCreates a star shape.\ns: size (default: 0.3)\nv: number of points (default: 5)\nsmooth: edge smoothing (default: 0.007)',
  grid: 'grid(x, y, b, smooth)\nCreates a grid pattern.\nx: horizontal divisions (default: 8)\ny: vertical divisions (default: 4)\nb: border thickness (default: 0.05)\nsmooth: edge smoothing (default: 0.001)',
};

const definitions = { 
  ...sources, 
  ...initSources, 
  ...transformations, 
  ...effects, 
  ...colorEffects,
  ...screenSpaceShaders,
  ...fractalEffects,
  ...antliaShapes,  
  ...utilities, 
  ...arrayMethods, 
  ...mathFunctions 
};

function showHydraDefinition(cm) {
  const cursor = cm.getCursor();
  const line = cm.getLine(cursor.line);
  const token = cm.getTokenAt(cursor);
  const word = token.string;
  const cursorPos = cursor.ch;

  const existingTooltips = document.querySelectorAll('.CodeMirror-tooltip');
  existingTooltips.forEach(tooltip => removeTooltip(tooltip));

  function findFunctionFromParentheses(line, pos) {
    const functionPattern = /([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g;
    const functions = [];
    let match;
    
    while ((match = functionPattern.exec(line)) !== null) {
      const funcName = match[1];
      const startPos = match.index;
      const openParenPos = match.index + match[0].length - 1;
      
      let depth = 1;
      let closeParenPos = openParenPos;
      
      for (let i = openParenPos + 1; i < line.length && depth > 0; i++) {
        if (line[i] === '(') depth++;
        else if (line[i] === ')') depth--;
        closeParenPos = i;
      }
      
      functions.push({
        name: funcName,
        start: startPos,
        openParen: openParenPos,
        closeParen: closeParenPos
      });
    }
    
    let targetFunction = null;
    let maxSpecificity = -1;
    
    for (const func of functions) {
      if (pos >= func.openParen && pos <= func.closeParen) {
        const specificity = func.openParen;
        if (specificity > maxSpecificity) {
          maxSpecificity = specificity;
          targetFunction = func.name;
        }
      }
    }
    
    return targetFunction;
  }


  let lookupWord = word;
  
  if (word.includes('.')) {
    const parts = word.split('.');
    lookupWord = parts[parts.length - 1];
  }

  if (!definitions[lookupWord] || !lookupWord.match(/^[a-zA-Z_]/)) {
    const nearestFunction = findFunctionFromParentheses(line, cursorPos);
    if (nearestFunction) {
      lookupWord = nearestFunction;
    }
  }
  
  if (definitions[lookupWord]) {
    const definition = definitions[lookupWord];
    const tooltip = makeTooltip(cm, cursor, definition);
    setTimeout(() => removeTooltip(tooltip), 7000); 
  }
}

function makeTooltip(cm, pos, content) {
  const tooltip = document.createElement('div');
  tooltip.className = 'CodeMirror-tooltip hydra-tooltip';
  tooltip.textContent = content;
  document.body.appendChild(tooltip);

  const left = cm.cursorCoords(pos, 'page').left;
  const rightEdge = left + tooltip.offsetWidth;
  const pageWidth = document.documentElement.clientWidth;

  if (rightEdge > pageWidth) {
    tooltip.style.left = `${pageWidth - tooltip.offsetWidth - 16}px`;
  } else {
    tooltip.style.left = `${left}px`;
  }

  tooltip.style.top = `${cm.cursorCoords(pos, 'page').bottom}px`;
  return tooltip;
}

function removeTooltip(tooltip) {
  if (tooltip && tooltip.parentNode) {
    tooltip.parentNode.removeChild(tooltip);
  }
}

function removeAllTooltips() {
  const tooltips = document.querySelectorAll('.CodeMirror-tooltip');
  tooltips.forEach(tooltip => removeTooltip(tooltip));
}

export { showHydraDefinition, removeAllTooltips };