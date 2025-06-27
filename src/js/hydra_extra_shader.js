// licensed with GNU AFFERO GENERAL PUBLIC LICENSE Version 3
// author: Thomas Jourdan
// see: https://medium.com/@rupertontheloose/functional-shaders-a-colorful-intro-part5-tinting-with-sepia-tone-cd6c2b49806
setFunction({
  name: 'sepia',
  type: 'color',
  inputs: [
    {name: 'amount',    type: 'float', default: 1.0},
  ],
  glsl: `
  const mat3 sepiaMat = mat3(
    0.393, 0.769, 0.189,
    0.349, 0.686, 0.168,
    0.272, 0.534, 0.131);
  vec3 se = _c0.rgb * sepiaMat;
  return vec4(amount * se + (1.0 - amount) * _c0.rgb, _c0.a);
`})
setFunction({
  name: 'levels',
  type: 'color',
  inputs: [
    {name: 'levels',    type: 'float', default: 3.0},
    {name: 'amount',    type: 'float', default: 1.0},
  ],
  glsl: `
  vec3 le = floor(_c0.rgb * levels) / levels;
  return vec4(amount * le + (1.0 - amount) * _c0.rgb, _c0.a);
`})
// see: https://rosenzweig.io/blog/monotone-portraits-with-glsl.html
// The original source code by Alyssa Rosenzweig is available under the MIT license.
// https://gitlab.freedesktop.org/alyssa/monotone-portraits/blob/master/posterize.html
// The box blur filter is not ported from original source code to Hydra.
setFunction({
  name: 'monotone',
  type: 'color',
  inputs: [
    {name: 'levels', type: 'float', default: 3.0},
    {name: 'hue',    type: 'float', default: 0.6},
    {name: 'amount', type: 'float', default: 1.0},
  ],
  glsl: `
	float grey = dot(_c0.rgb, vec3(0.2126, 0.7152, 0.0722));
	grey = clamp(grey * 1.1, 0.0, 1.0);
	float poster = floor(grey * levels + 0.5) / levels;
	float contrast = clamp(1.4 * (poster - 0.5) + 0.5, 0.0, 1.0);
	vec3 rgb = _hsvToRgb(vec3(hue, 0.4, contrast));
  return vec4(amount * rgb + (1.0 - amount) * _c0.rgb, _c0.a);
`})
// see: https://github.com/kbinani/colormap-shaders/blob/master/shaders/glsl/transform_rose.frag
// by kbinani MIT License
setFunction({
  name: 'grarose',
  type: 'color',
  inputs: [
    {name: 'amount',    type: 'float', default: 1.0},
  ],
  glsl: `
  const float d3 = 1.0 / 3.0;
  float gray = d3 * (_c0.r + _c0.g + _c0.b);
  vec3 co = vec3(1.0);
  if (gray < 0.0) {
      co.r = 54.0 / 255.0;
  } else if (gray < 20049.0 / 82979.0) {
      co.r = (829.79 * gray + 54.51) / 255.0;
  }
  if (gray < 20049.0 / 82979.0) {
      co.g = 0.0;
  } else if (gray < 327013.0 / 810990.0) {
      co.g = (8546482679670.0 / 10875673217.0 * gray - 2064961390770.0 / 10875673217.0) / 255.0;
  } else if (gray <= 1.0) {
      co.g = (103806720.0 / 483977.0 * gray + 19607415.0 / 483977.0) / 255.0;
  }
  if (gray < 0.0) {
      co.b = 54.0 / 255.0;
  } else if (gray < 7249.0 / 82979.0) {
      co.b = (829.79 * gray + 54.51) / 255.0;
  } else if (gray < 20049.0 / 82979.0) {
      co.b = 127.0 / 255.0;
  } else if (gray < 327013.0 / 810990.0) {
      co.b = (792.02249341361393720147485376583 * gray - 64.364790735602331034989206222672) / 255.0;
  }
  return vec4(amount * clamp(co, 0.0, 1.0) + (1.0 - amount) * _c0.rgb, _c0.a);
`})
// see: https://github.com/kbinani/colormap-shaders/blob/master/shaders/glsl/transform_rose.frag
// by kbinani MIT License
setFunction({
  name: 'grawave',
  type: 'color',
  inputs: [
    {name: 'amount',    type: 'float', default: 1.0},
  ],
  glsl: `
  const float d3 = 1.0 / 3.0;
  float gray = d3 * (_c0.r + _c0.g + _c0.b);
  vec3 co;
  if (gray < 0.0) {
      co.r = 124.0 / 255.0;
  } else if (gray <= 1.0) {
      co.r = (128.0 * sin(6.25 * (gray + 0.5)) + 128.0) / 255.0;
  } else {
      co.r = 134.0 / 255.0;
  }
  if (gray < 0.0) {
      co.g = 121.0 / 255.0;
  } else if (gray <= 1.0) {
      co.g = (63.0 * sin(gray * 99.72) + 97.0) / 255.0;
  } else {
      co.g = 52.0 / 255.0;
  }
  if (gray < 0.0) {
      co.b = 131.0 / 255.0;
  } else if (gray <= 1.0) {
      co.b = (128.0 * sin(6.23 * gray) + 128.0) / 255.0;
  } else {
      co.b = 121.0 / 255.0;
  }
  return vec4(amount * clamp(co, 0.0, 1.0) + (1.0 - amount) * _c0.rgb, _c0.a);
`})
// see: https://github.com/kbinani/colormap-shaders/blob/master/shaders/glsl/IDL_CB-YIGnBu.frag
// by kbinani MIT License
setFunction({
  name: 'graua',
  type: 'color',
  inputs: [
    {name: 'amount',    type: 'float', default: 1.0},
  ],
  glsl: `
  vec3 co = vec3(0.0);
  const float d3 = 1.0 / 3.0;
  float gray = d3 * (_c0.r + _c0.g + _c0.b);
  if (gray < 0.2523055374622345) {
      co.r = (-5.80630393656902E+02 * gray - 8.20261301968494E+01) * gray + 2.53829637096771E+02;
  } else if (gray < 0.6267540156841278) {
      co.r = (((-4.07958939010649E+03 * gray + 8.13296992114899E+03) * gray - 5.30725139102868E+03) * gray + 8.58474724851723E+02) * gray + 2.03329669375107E+02;
  } else if (gray < 0.8763731146612115) {
      co.r = 3.28717357910916E+01 * gray + 8.82117255504255E+00;
  } else {
      co.r = -2.29186583577707E+02 * gray + 2.38482038123159E+02;
  }
  if (gray < 0.4578040540218353) {
      co.g = ((4.49001704856054E+02 * gray - 5.56217473429394E+02) * gray + 2.09812296466262E+01) * gray + 2.52987561849833E+02;
  } else {
      co.g = ((1.28031059709139E+03 * gray - 2.71007279113343E+03) * gray + 1.52699334501816E+03) * gray - 6.48190622715140E+01;
  }
  if (gray < 0.1239372193813324) {
      co.b = (1.10092779856059E+02 * gray - 3.41564374557536E+02) * gray + 2.17553885630496E+02;
  } else if (gray < 0.7535201013088226) {
      co.b = ((((3.86204601547122E+03 * gray - 8.79126469446648E+03) * gray + 6.80922226393264E+03) * gray - 2.24007302003438E+03) * gray + 3.51344388740066E+02) * gray + 1.56774650431396E+02;
  } else {
      co.b = (((((-7.46693234167480E+06 * gray + 3.93327773566702E+07) * gray - 8.61050867447971E+07) * gray + 1.00269040461745E+08) * gray - 6.55080846112976E+07) * gray + 2.27664953009389E+07) * gray - 3.28811994253461E+06;
  }
  return vec4(amount * clamp(co, 0.0, 1.0) + (1.0 - amount) * _c0.rgb, _c0.a);
`})
setFunction({
  name: 'colcross',
  type: 'combine',
  inputs: [
    {name: 'amount',    type: 'float', default: 1.0},
  ],
  glsl: `
vec3 cc = cross(_c0.rgb, _c1.rgb);
return vec4(amount * cc + (1.0 - amount) * _c0.rgb, _c0.a);
`})
setFunction({
  name: 'coldot',
  type: 'combine',
  inputs: [
    {name: 'amount',    type: 'float', default: 1.0},
  ],
  glsl: `
vec3 cc = vec3(dot(_c0.rgb, _c1.rgb),
               dot(_c0.rgb, _c1.brg),
               dot(_c0.rgb, _c1.gbr));
return vec4(amount * cc + (1.0 - amount) * _c0.rgb, _c0.a);
`})
setFunction({
  name: 'colboost',
  type: 'combine',
  inputs: [
    {name: 'amount',    type: 'float', default: 1.0},
  ],
  glsl: `
vec3 cc = cross(_c0.rgb, _c1.rgb);
cc = normalize(_c0.rgb);
return vec4(amount * cc + (1.0 - amount) * _c0.rgb, _c0.a);
`})
setFunction({
  name: 'colreflect',
  type: 'combine',
  inputs: [
    {
      type: 'float',
      name: 'amount',
      default: 1,
    }
  ],
  glsl: `
vec3 cc = cross(_c0.rgb, normalize(_c1.rgb));
return vec4(amount * cc + (1.0 - amount) * _c0.rgb, _c0.a);
`})
setFunction({
  name: 'hsvshift',
  type: 'color',
  inputs: [
    {name: 'hue',        type: 'float', default: 0.0},
    {name: 'saturation', type: 'float', default: 1.0},
    {name: 'value',      type: 'float', default: 1.0},
  ],
  glsl: `
  vec3 hsv = _rgbToHsv(_c0.rgb);
  hsv.x += hue;
  hsv.y *= saturation;
  hsv.z *= value;
  return vec4(_hsvToRgb(hsv), _c0.a);
`})
// licensed with GNU AFFERO GENERAL PUBLIC LICENSE Version 3
// author: Thomas Jourdan
setFunction({
    name: 'ifpos',
    type: 'combine',
    inputs: [
      {name: 'value',    type: 'float', default: 1.0},
    ],
    glsl: `
    return value < 0.0 ? _c0 : _c1;
  `})
setFunction({
    name: 'ifeven',
    type: 'combine',
    inputs: [
      {name: 'value',  type: 'float', default: 0.0},
      {name: 'eps',    type: 'float', default: 0.01},
    ],
    glsl: `
    return abs(mod(floor(value), 2.0)) < eps ? _c0 : _c1;
  `})
  setFunction({
      name: 'ifzero',
      type: 'combine',
      inputs: [
        {name: 'value',  type: 'float', default: 0.0},
        {name: 'eps',    type: 'float', default: 0.1},
      ],
      glsl: `
      return abs(value) < eps ? _c0 : _c1;
    `})
setFunction({
    name: 'splitview',
    type: 'combine',
    inputs: [
      {name: 'where',  type: 'float', default: 0.5},
    ],
    glsl: `
    return gl_FragCoord.x/resolution.x > where ? _c0 : _c1;
  `})
setFunction({
    name: 'splitviewh',
    type: 'combine',
    inputs: [
      {name: 'where',  type: 'float', default: 0.5},
    ],
    glsl: `
    return gl_FragCoord.y/resolution.y > where ? _c0 : _c1;
  `})
// licensed with GNU AFFERO GENERAL PUBLIC LICENSE Version 3
// author: Thomas Jourdan
setFunction({
  name: 'whitenoise',
  type: 'src',
  inputs: [
    {name: 'size',    type: 'float', default: 10.0},
    {name: 'dynamic', type: 'float', default:  0.0},
  ],
  glsl: `
  // see: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
  const highp float a = 12.9898;
  const highp float b = 78.233;
  const highp float c = 43758.5453;
  highp float dt = dot(floor((_st * resolution) / size), vec2(dynamic*time) + vec2(a ,b));
  highp float sn = mod(dt, 3.141592653589793);
  highp float d = fract(sin(sn) * c);
  return vec4(d, d, d, 1);
`})
setFunction({
  name: 'colornoise',
  type: 'src',
  inputs: [
    {name: 'size',    type: 'float', default: 10.0},
    {name: 'dynamic', type: 'float', default:  0.0},
  ],
  glsl: `
  highp float rr;
  highp float gg;
  highp float bb;
  // see: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
  {
  const highp float a = 12.9898;
  const highp float b = 78.233;
  const highp float c = 43758.5453;
  highp float dt = dot(floor((_st * resolution) / size), vec2(dynamic*time) + vec2(a ,b));
  highp float sn= mod(dt, 3.141592653589793);
  rr = fract(sin(sn) * c);
  }
  {
  const highp float a = 12.9898;
  const highp float b = 78.233;
  const highp float c = 43758.5453;
  highp float dt = dot(floor((_st * resolution) / size) + vec2(0.123, 0.567), vec2(dynamic*time) + vec2(a ,b));
  highp float sn = mod(dt, 3.141592653589793);
  gg = fract(sin(sn) * c);
  }
  {
  const highp float a = 12.9898;
  const highp float b = 78.233;
  const highp float c = 43758.5453;
  highp float dt = dot(floor((_st * resolution) / size) + vec2(0.543, 0.905), vec2(dynamic*time) + vec2(a ,b));
  highp float sn = mod(dt, 3.141592653589793);
  bb = fract(sin(sn) * c);
  }
  return vec4(rr, gg, bb, 1);
`})
setFunction({
  name: 'unoise',
  type: 'src',
  inputs: [
    {name: 'scale',   type: 'float', default: 10.0},
    {name: 'offset',  type: 'float', default:  0.1},
  ],
  glsl: `
  float noi = _noise(vec3(_st*scale, offset*time));
  noi = 0.5 + 0.5 * noi;
  return vec4(noi, noi, noi, 1.0);
`})
setFunction({
  name: 'turb',
  type: 'src',
  inputs: [
    {name: 'scale',   type: 'float', default: 10.0},
    {name: 'offset',  type: 'float', default:  0.1},
    {name: 'octaves', type: 'float', default:  3.0},
  ],
  glsl: `
  int on = int(abs(octaves));
  float fr = fract(octaves);
  vec2 pos = scale * _st;
  float sc = 1.0;
  float fbm = 0.0;
  for (int io = 0; io<8; io++) {
    fbm += sc * _noise(vec3(pos, offset * time));
    pos *= 2.0;
    sc /= 2.0;
    if(io >= on) break;
  }
  fbm += fr * sc * _noise(vec3(pos, offset * time));
  return vec4(fbm, fbm, fbm, 1.0);
`})
setFunction({
  name: 'uturb',
  type: 'src',
  inputs: [
    {name: 'scale',   type: 'float', default: 10.0},
    {name: 'offset',  type: 'float', default:  0.1},
    {name: 'octaves', type: 'float', default:  3.0},
  ],
  glsl: `
  int on = int(abs(octaves));
  float fr = fract(octaves);
  vec2 pos = scale * _st;
  float sc = 1.0;
  float fbm = 0.0;
  for (int io = 0; io<8; io++) {
    fbm += sc*_noise(vec3(pos, offset*time));
    pos *= 2.0;
    sc /= 2.0;
    if(io >= on) break;
  }
  fbm += fr * sc * _noise(vec3(pos, offset * time));
  fbm = 0.5 + 0.5 * fbm;
  return vec4(fbm, fbm, fbm, 1.0);
`})
// inspired by Inigo Quilez: domain warping - 2002
// see: https://www.iquilezles.org/www/articles/warp/warp.htm
setFunction({
  name: 'warp',
  type: 'src',
  inputs: [
    {name: 'scalei',       type: 'float', default: 10.0},
    {name: 'offset',       type: 'float', default:  0.1},
    {name: 'octaves',      type: 'float', default:  2.0},
    {name: 'octavesinner', type: 'float', default:  3.0},
    {name: 'scale',        type: 'float', default:  1.0},
  ],
  glsl: `
  int oin = int(abs(octavesinner));
  float fri = fract(octavesinner);
  float fbmx = 0.0;
  {
  vec2 pos = scalei * _st;
  float sc = 1.0;
  for (int io = 0; io<8; io++) {
    fbmx += sc * _noise(vec3(pos, offset * time));
    pos *= 2.0;
    sc /= 2.0;
    if(io >= oin) break;
  }
  fbmx += fri * sc * _noise(vec3(pos, offset * time));
  }
  float fbmy = 0.0;
  {
  vec2 pos = scalei * (_st + vec2(5.123, 3.987));
  float sc = 1.0;
  for (int io = 0; io<8; io++) {
    fbmy += sc * _noise(vec3(pos, offset * time));
    pos *= 2.0;
    sc /= 2.0;
    if(io >= oin) break;
  }
  fbmy += fri * sc * _noise(vec3(pos, offset * time));
  }
  int on = int(abs(octaves));
  float fr = fract(octaves);
  float fbm = 0.0;
  vec2 pos = scale * vec2(fbmx, fbmy);
  float sc = 1.0;
  for (int io = 0; io<8; io++) {
    fbm += sc * _noise(vec3(pos, offset * time));
    pos *= 2.0;
    sc /= 2.0;
    if(io >= on) break;
  }
  fbm += fr * sc * _noise(vec3(pos, offset * time));
  return vec4(fbm, fbm, fbm, 1.0);
`})
setFunction({
  name: 'cwarp',
  type: 'src',
  inputs: [
    {name: 'scalei',       type: 'float', default: 10.0},
    {name: 'offset',       type: 'float', default:  0.1},
    {name: 'octaves',      type: 'float', default:  2.0},
    {name: 'octavesinner', type: 'float', default:  3.0},
    {name: 'scale',        type: 'float', default:  1.0},
    {name: 'focus',        type: 'float', default:  0.5},
  ],
  glsl: `
  #define FOCUS pow(r, abs(focus))
  float r = length(vec2(_st.y-0.5, _st.x-0.5));
  int oin = int(abs(octavesinner));
  float fri = fract(octavesinner);
  float fbmx = 0.0;
  {
  vec2 pos = scalei * _st;
  float sc = 1.0;
  for (int io = 0; io<8; io++) {
    fbmx += sc * _noise(vec3(pos, offset * time));
    pos *= 2.0;
    sc /= 2.0;
    if(io >= oin) break;
  }
  fbmx += fri * sc * _noise(vec3(pos, offset * time));
  fbmx = (0.5 + 0.5 * fbmx) - FOCUS;
  }
  float fbmy = 0.0;
  {
  vec2 pos = scalei * (_st + vec2(5.123, 3.987));
  float sc = 1.0;
  for (int io = 0; io<8; io++) {
    fbmy += sc * _noise(vec3(pos, offset * time));
    pos *= 2.0;
    sc /= 2.0;
    if(io >= oin) break;
  }
  fbmy += fri * sc * _noise(vec3(pos, offset * time));
  fbmy = (0.5 + 0.5 * fbmy) - FOCUS;
  }
  int on = int(abs(octaves));
  float fr = fract(octaves);
  float fbm = 0.0;
  vec2 pos = scale * vec2(fbmx, fbmy);
  float sc = 1.0;
  for (int io = 0; io<8; io++) {
    fbm += sc*_noise(vec3(pos, offset*time));
    pos *= 2.0;
    sc /= 2.0;
    if(io >= on) break;
  }
  fbm += fr * sc * _noise(vec3(pos, offset * time));
  fbm = (0.5 + 0.5 * fbm) - FOCUS;
  return vec4(fbm, fbm, fbm, 1.0);
`})
setFunction({
  name: 'ncontour',
  type: 'src',
  inputs: [
    {name: 'thresh',  type: 'float', default: 0.5},
    {name: 'smooth',  type: 'float', default: 0.1},
    {name: 'octaves', type: 'int',   default: 3},
    {name: 'scale',   type: 'float', default: 5.0},
    {name: 'speed',   type: 'float', default: 0.5},
    {name: 'step',    type: 'float', default: 2.0},
  ],
  glsl: `
  vec2 st = _st - 0.5;
  float d0 = _noise(vec3(st*scale, speed*time));
  for(int ni=1; ni < 5; ++ni) {
    if(ni >= octaves)
      break;
    speed /= step;
    scale *= step;
    d0 += _noise(vec3(st*scale, speed*time));
  }
  float d = distance(d0, thresh);
  float g = smoothstep(0.0, smooth, d);
  return vec4(vec3(g, g, g), 1.0);
`})
// licensed with GNU AFFERO GENERAL PUBLIC LICENSE Version 3
// author: Thomas Jourdan
//
// see: Ebert, Musgrave, Peachey, Perlin Worley
// "Texturing and Modeling – A Procedural Approach"
setFunction({
  name: 'pulse',
  type: 'src',
  inputs: [
    {name: 'edge',    type: 'float', default: 0.5},
    {name: 'width',   type: 'float', default: 0.05},
    {name: 'epsilon', type: 'float', default: 0.001},
  ],
  glsl: `
    float ea = abs(epsilon);
    float wa = abs(width);
    float d0 = smoothstep(edge-ea, edge+ea, _st.x);
    float d1 = smoothstep(edge+wa-ea, edge+wa+ea, _st.x);
    float d = d0-d1;
    return vec4(d, d, d, 1);
`})
setFunction({
  name: 'pulsetrain',
  type: 'src',
  inputs: [
    {name: 'train',   type: 'float', default: 3.0},
    {name: 'edge',    type: 'float', default: 0.5},
    {name: 'width',   type: 'float', default: 0.05},
    {name: 'epsilon', type: 'float', default: 0.001},
  ],
  glsl: `
    float ea = abs(epsilon);
    float wa = abs(width);
    float xp = _st.x;
    float d = 0.0;
    int itr = int(train);
    for(int ii = 0; ii < 10; ii++) {
      float d0 = smoothstep(edge-ea, edge+ea, xp);
      float d1 = smoothstep(edge+wa-ea, edge+wa+ea, xp);
      if(ii >= itr) break;
      d += d0-d1;
      xp += 1.0 / float(itr);
    }
    return vec4(d, d, d, 1);
`})
// see: https://andrewhungblog.wordpress.com/2018/07/28/shader-art-tutorial-hexagonal-grids/
setFunction({
  name: 'hextile',
  type: 'src',
  inputs: [
    {name: 'tiles',   type: 'float', default: 10.0},
  ],
  glsl: `
  const vec2 s = vec2(1.0, sqrt(3.0));
  vec2 p = (_st - 0.5) * tiles;
  vec4 hC = floor(vec4(p, p - vec2(0.5, 1)) / s.xyxy) + 0.5;
  vec4 h = vec4(p - hC.xy*s, p - (hC.zw + 0.5) * s);
  float d = length(h.xy) < length(h.zw) ?
            fract(p.x*0.5) < 0.5 ? 0.75 : 0.0 :
            fract(p.x*0.5-s.y-0.01) < 0.5 ? 0.25 : 1.0;
  return vec4(d, d, d, 1);
`})
setFunction({
  name: 'checker',
  type: 'src',
  inputs: [
    {name: 'repeats',   type: 'float', default: 10},
  ],
  glsl: `
  vec2 c = floor(repeats * (_st - 0.5));
  float d = sign(mod(c.x + c.y, 2.0));
  return vec4(d, d, d, 1);
`})
setFunction({
  name: 'concentric',
  type: 'src',
  inputs: [
    {name: 'scale',   type: 'float', default: 100},
    {name: 'centerX', type: 'float', default: 0.5},
    {name: 'centerY', type: 'float', default: 0.5},
  ],
  glsl: `
   float d = sin(scale*distance(_st, vec2(centerX, centerY)));
   return vec4(d, d, d, 1);
`})
setFunction({
  name: 'spiral',
  type: 'src',
  inputs: [
    {name: 'a',         type: 'float', default: 1.0},
    {name: 'b',         type: 'float', default: 5.0},
    {name: 'thickness', type: 'float', default: 0.1},
  ],
  glsl: `
    vec2 center = _st - vec2(0.5);
    float thick = clamp(thickness, 0.0, 1.0);
    float phi = atan(center.y, center.x) / 6.283185307179586 + 0.5;
    float r = length(center);
    float where = mod(a* phi - b *r, 1.0);
    const float epsilon = 0.00001;
    float d = smoothstep(epsilon, epsilon, where)
            - smoothstep(thick-epsilon, thick+epsilon, where);
    return vec4(d, d, d, 1);
`})
// see: Darwyn Peachey, Building Procedural Textures, page 37
setFunction({
  name: 'brick',
  type: 'src',
  inputs: [
    {name: 'width',  type: 'float', default: 0.25},
    {name: 'height', type: 'float', default: 0.08},
    {name: 'gap',    type: 'float', default: 0.01},
  ],
  glsl: `
  vec2 p = _st-0.5;
  const float eps = 0.001;
  float BMWIDTH = width+gap;
  float BMHEIGHT = height+gap;
  float MWF = gap * 0.5 / BMWIDTH;
  float MHF = gap * 0.5 / BMHEIGHT;
  float bms = p.x / BMWIDTH;
  float bmt = p.y / BMHEIGHT;
  if(mod(bmt*0.5, 1.0) > 0.5)
    bms += 0.5;
  float sbrick = floor(bms);
  float tbrick = floor(bmt);
  bms -= sbrick;
  bmt -= tbrick;
  float w = smoothstep(MWF, MWF+eps, bms) - smoothstep(1.0-MWF-eps, 1.0-MWF, bms);
  float h = smoothstep(MHF, MHF+eps, bmt) - smoothstep(1.0-MHF-eps, 1.0-MHF, bmt);
  float d = w*h;
  return vec4(d, d, d, 1);
`})
setFunction({
  name: 'wave',
  type: 'src',
  inputs: [
    {name: 'time',    type: 'float', default: 0.0},
    {name: 'frequ',   type: 'float', default: 10.0},
    {name: 'loops',   type: 'float', default: 3.0},
    {name: 'thick',   type: 'float', default: 0.025},
  ],
  glsl: `
  const float eps = 0.001;
  float x = _st.x - time;
  float y = _st.y - 0.5;
  float scale = 0.25;
  float l = 0.0;
  for(int i=0; i<6; ++i) {
    y += scale * sin(frequ * x);
    if(l >= loops) break;
    scale *= 0.5;
    frequ *= 2.0;
    l += 1.0;
  }
  float d = smoothstep(0.0, eps, y) - smoothstep(thick, thick+eps, y);
  return vec4(d, d, d, 1);
`})
// see: https://en.wikipedia.org/wiki/Harmonograph
setFunction({
  name: 'lissa',
  type: 'src',
  inputs: [
    {name: 'time',   type: 'float', default: 0.0},
    {name: 'frequ',   type: 'float', default: 10.0},
    {name: 'loops',   type: 'float', default: 3.0},
    {name: 'thick',   type: 'float', default: 0.025},
  ],
  glsl: `
  const float eps = 0.001;
  _st -= 0.5;
  vec2 pol = vec2(
    atan(_st.y, _st.x),
    2.0*length(_st)
  );
  float x = pol.x - time;
  float y = pol.y - 0.5;
  float scale = 0.25;
  float l = 0.0;
  for(int i=0; i<6; ++i) {
    y += scale * sin(frequ * x);
    if(l >= loops) break;
    scale *= 0.5;
    frequ *= 2.0;
    l += 1.0;
  }
  float d = smoothstep(0.0, eps, y) - smoothstep(thick, thick+eps, y);
  return vec4(d, d, d, 1);
`})
// licensed with GNU AFFERO GENERAL PUBLIC LICENSE Version 3
// author: Thomas Jourdan
// see: 4x4 Bayer Dithering by kbjwes77
// see: https://www.shadertoy.com/view/WstXR8
setFunction({
  name: 'dither',
  type: 'color',
  inputs: [
  ],
  glsl: `
  float lum = 0.299 * _c0.r + 0.587 * _c0.g + 0.114 * _c0.b;
  int x = int(mod(gl_FragCoord.x, 4.0));
  int y = int(mod(gl_FragCoord.y, 4.0));
  float bayer = 0.0;
  if(x == 0) {
    if(y == 0) {
    }
    else if(y == 1) {
      bayer = 8.0/16.0;
    }
    else if(y == 2) {
      bayer = 2.0/16.0;
    }
    else if(y == 3) {
      bayer = 10.0/16.0;
    }
  }
  else if(x == 1) {
    if(y == 0) {
      bayer = 12.0/16.0;
    }
    else if(y == 1) {
      bayer = 4.0/16.0;
    }
    else if(y == 2) {
      bayer = 14.0/16.0;
    }
    else if(y == 3) {
      bayer = 6.0/16.0;
    }
  }
  else if(x == 2) {
    if(y == 0) {
      bayer = 3.0;
    }
    else if(y == 1) {
      bayer = 11.0/16.0;
    }
    else if(y == 2) {
      bayer = 1.0/16.0;
    }
    else if(y == 3) {
      bayer = 9.0/16.0;
    }
  }
  else if(x == 3) {
    if(y == 0) {
      bayer = 15.0/16.0;
    }
    else if(y == 1) {
      bayer = 7.0/16.0;
    }
    else if(y == 2) {
      bayer = 13.0/16.0;
    }
    else if(y == 3) {
      bayer = 5.0/16.0;
    }
  }
  return (lum+1.0/32.0) > bayer ? vec4(1, 1, 1, _c0.a) : vec4(0, 0, 0, _c0.a);
`})
setFunction({
  name: 'dither2',
  type: 'color',
  inputs: [
  ],
  glsl: `
  float lum = 0.299 * _c0.r + 0.587 * _c0.g + 0.114 * _c0.b;
  int x = int(mod(gl_FragCoord.x, 2.0));
  int y = int(mod(gl_FragCoord.y, 2.0));
  float bayer = 0.0;
  if(x == 0) {
    if(y == 0) {
    }
    else if(y == 1) {
      bayer = 3.0/4.0;
    }
  }
  else if(x == 1) {
    if(y == 0) {
      bayer = 2.0/4.0;
    }
    else if(y == 1) {
      bayer = 1.0/14.0;
    }
  }
  bayer += 1.0/8.0;
  return vec4(
    step(bayer, _c0.r),
    step(bayer, _c0.g),
    step(bayer, _c0.b),
    _c0.a);
`})
setFunction({
  name: 'dither4',
  type: 'color',
  inputs: [
  ],
  glsl: `
  int x = int(mod(gl_FragCoord.x, 4.0));
  int y = int(mod(gl_FragCoord.y, 4.0));
  float bayer = 1.0/32.0;
  if(x == 0) {
    if(y == 0) {
    }
    else if(y == 1) {
      bayer = 8.0/16.0+1.0/32.0;
    }
    else if(y == 2) {
      bayer = 2.0/16.0+1.0/32.0;
    }
    else if(y == 3) {
      bayer = 10.0/16.0+1.0/32.0;
    }
  }
  else if(x == 1) {
    if(y == 0) {
      bayer = 12.0+1.0/32.0;
    }
    else if(y == 1) {
      bayer = 4.0/16.0+1.0/32.0;
    }
    else if(y == 2) {
      bayer = 14.0/16.0+1.0/32.0;
    }
    else if(y == 3) {
      bayer = 6.0/16.0+1.0/32.0;
    }
  }
  else if(x == 2) {
    if(y == 0) {
      bayer = 3.0;
    }
    else if(y == 1) {
      bayer = 11.0/16.0+1.0/32.0;
    }
    else if(y == 2) {
      bayer = 1.0/16.0+1.0/32.0;
    }
    else if(y == 3) {
      bayer = 9.0/16.0+1.0/32.0;
    }
  }
  else if(x == 3) {
    if(y == 0) {
      bayer = 15.0/16.0+1.0/32.0;
    }
    else if(y == 1) {
      bayer = 7.0/16.0+1.0/32.0;
    }
    else if(y == 2) {
      bayer = 13.0/16.0+1.0/32.0;
    }
    else if(y == 3) {
      bayer = 5.0/16.0+1.0/32.0;
    }
  }
  return vec4(
    step(bayer, _c0.r),
    step(bayer, _c0.g),
    step(bayer, _c0.b),
    _c0.a);
`})
setFunction({
  name: 'ditherrnd',
  type: 'color',
  inputs: [
  ],
  glsl: `
  float lum = 0.299 * _c0.r + 0.587 * _c0.g + 0.114 * _c0.b;
  // see: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
  const highp float a = 12.9898;
  const highp float b = 78.233;
  const highp float c = 43758.5453;
  highp float dt= dot(gl_FragCoord.xy ,vec2(a ,b));
  highp float sn= mod(dt, 3.141592653589793);
  highp float tresh = fract(sin(sn) * c);
  return lum > tresh ? vec4(1, 1, 1, _c0.a) : vec4(0, 0, 0, _c0.a);
`})
setFunction({
  name: 'ditherrndcolor',
  type: 'color',
  inputs: [
  ],
  glsl: `
  float lum = 0.299 * _c0.r + 0.587 * _c0.g + 0.114 * _c0.b;
  // see: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
  const highp float a = 12.9898;
  const highp float b = 78.233;
  const highp float c = 43758.5453;
  highp float dt= dot(gl_FragCoord.xy ,vec2(a ,b));
  highp float sn= mod(dt, 3.141592653589793);
  highp float tresh = fract(sin(sn) * c);
  return vec4(
    step(tresh, _c0.r),
    step(tresh, _c0.g),
    step(tresh, _c0.b),
    _c0.a);
`})
setFunction({
  name: 'erode',
  type: 'color',
  inputs: [
  ],
  glsl: `
  vec3 outputColor = vec3(1.0);
	outputColor = min(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  1))/resolution.xy).rgb);
	outputColor = min(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2( 0,  1))/resolution.xy).rgb);
	outputColor = min(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  1))/resolution.xy).rgb);
	outputColor = min(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  0))/resolution.xy).rgb);
	outputColor = min(outputColor, texture2D(tex0, (gl_FragCoord.xy)/resolution.xy).rgb);
	outputColor = min(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  0))/resolution.xy).rgb);
	outputColor = min(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2(-1, -1))/resolution.xy).rgb);
	outputColor = min(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2( 0, -1))/resolution.xy).rgb);
	outputColor = min(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2( 1, -1))/resolution.xy).rgb);
  return vec4(outputColor, _c0.a);
`})
setFunction({
  name: 'dilate',
  type: 'color',
  inputs: [
  ],
  glsl: `
  vec3 outputColor = vec3(0.0);
	outputColor = max(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  1))/resolution.xy).rgb);
	outputColor = max(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2( 0,  1))/resolution.xy).rgb);
	outputColor = max(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  1))/resolution.xy).rgb);
	outputColor = max(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  0))/resolution.xy).rgb);
	outputColor = max(outputColor, texture2D(tex0, (gl_FragCoord.xy)/resolution.xy).rgb);
	outputColor = max(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  0))/resolution.xy).rgb);
	outputColor = max(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2(-1, -1))/resolution.xy).rgb);
	outputColor = max(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2( 0, -1))/resolution.xy).rgb);
	outputColor = max(outputColor, texture2D(tex0, (gl_FragCoord.xy + vec2( 1, -1))/resolution.xy).rgb);
  return vec4(outputColor, _c0.a);
`})
setFunction({
  name: 'blur',
  type: 'color',
  inputs: [
  ],
  glsl: `
  vec3 outputColor;
	outputColor  = 0.077847 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  1))/resolution.xy).rgb;
	outputColor += 0.123317 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0,  1))/resolution.xy).rgb;
	outputColor += 0.077847 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  1))/resolution.xy).rgb;
	outputColor += 0.123317 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  0))/resolution.xy).rgb;
	outputColor += 0.195346 * texture2D(tex0, (gl_FragCoord.xy)/resolution.xy).rgb;
	outputColor += 0.123317 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  0))/resolution.xy).rgb;
	outputColor += 0.077847 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1, -1))/resolution.xy).rgb;
	outputColor += 0.123317 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0, -1))/resolution.xy).rgb;
	outputColor += 0.077847 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1, -1))/resolution.xy).rgb;
  return vec4(outputColor, _c0.a);
`})
setFunction({
  name: 'blurmore',
  type: 'color',
  inputs: [
  ],
  glsl: `
  vec3 outputColor;
  outputColor  = 0.003765 * texture2D(tex0, (gl_FragCoord.xy + vec2(-2, -2))/resolution.xy).rgb;
  outputColor += 0.015019 * texture2D(tex0, (gl_FragCoord.xy + vec2(-2, -1))/resolution.xy).rgb;
  outputColor += 0.023792 * texture2D(tex0, (gl_FragCoord.xy + vec2(-2,  0))/resolution.xy).rgb;
  outputColor += 0.015019 * texture2D(tex0, (gl_FragCoord.xy + vec2(-2,  1))/resolution.xy).rgb;
  outputColor += 0.003765 * texture2D(tex0, (gl_FragCoord.xy + vec2(-2,  2))/resolution.xy).rgb;
  outputColor += 0.015019 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1, -2))/resolution.xy).rgb;
  outputColor += 0.059912 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1, -1))/resolution.xy).rgb;
  outputColor += 0.094907 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  0))/resolution.xy).rgb;
  outputColor += 0.059912 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  1))/resolution.xy).rgb;
  outputColor += 0.015019 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  2))/resolution.xy).rgb;
  outputColor += 0.023792 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0, -2))/resolution.xy).rgb;
  outputColor += 0.094907 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0, -1))/resolution.xy).rgb;
  outputColor += 0.150342 * texture2D(tex0, gl_FragCoord.xy/resolution.xy).rgb;
  outputColor += 0.094907 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0,  1))/resolution.xy).rgb;
  outputColor += 0.023792 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0,  2))/resolution.xy).rgb;
  outputColor += 0.015019 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1, -2))/resolution.xy).rgb;
  outputColor += 0.059912 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1, -1))/resolution.xy).rgb;
  outputColor += 0.094907 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  0))/resolution.xy).rgb;
  outputColor += 0.059912 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  1))/resolution.xy).rgb;
  outputColor += 0.015019 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  2))/resolution.xy).rgb;
  outputColor += 0.003765 * texture2D(tex0, (gl_FragCoord.xy + vec2( 2, -2))/resolution.xy).rgb;
  outputColor += 0.015019 * texture2D(tex0, (gl_FragCoord.xy + vec2( 2, -1))/resolution.xy).rgb;
  outputColor += 0.023792 * texture2D(tex0, (gl_FragCoord.xy + vec2( 2,  0))/resolution.xy).rgb;
  outputColor += 0.015019 * texture2D(tex0, (gl_FragCoord.xy + vec2( 2,  1))/resolution.xy).rgb;
  outputColor += 0.003765 * texture2D(tex0, (gl_FragCoord.xy + vec2( 2,  2))/resolution.xy).rgb;
  return vec4(outputColor, _c0.a);
`})
setFunction({
  name: 'edge',
  type: 'color',
  inputs: [
  ],
  glsl: `
  vec3 outputColor;
	outputColor  = -1.0/8.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  1))/resolution.xy).rgb;
	outputColor += -1.0/8.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0,  1))/resolution.xy).rgb;
	outputColor += -1.0/8.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  1))/resolution.xy).rgb;
	outputColor += -1.0/8.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  0))/resolution.xy).rgb;
	outputColor += 1.0 *      texture2D(tex0, (gl_FragCoord.xy)/resolution.xy).rgb;
	outputColor += -1.0/8.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  0))/resolution.xy).rgb;
	outputColor += -1.0/8.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1, -1))/resolution.xy).rgb;
	outputColor += -1.0/8.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0, -1))/resolution.xy).rgb;
	outputColor += -1.0/8.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1, -1))/resolution.xy).rgb;
  return vec4(outputColor, _c0.a);
`})
setFunction({
  name: 'sobelx',
  type: 'color',
  inputs: [
  ],
  glsl: `
  vec3 outputColor;
	outputColor  = -1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  1))/resolution.xy).rgb;
	outputColor += -2.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0,  1))/resolution.xy).rgb;
	outputColor += -1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  1))/resolution.xy).rgb;
	outputColor +=  1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1, -1))/resolution.xy).rgb;
	outputColor +=  2.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0, -1))/resolution.xy).rgb;
	outputColor +=  1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1, -1))/resolution.xy).rgb;
  return vec4(outputColor, _c0.a);
`})
setFunction({
  name: 'sobely',
  type: 'color',
  inputs: [
  ],
  glsl: `
  vec3 outputColor;
  outputColor  = -1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  1))/resolution.xy).rgb;
	outputColor +=  0.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0,  1))/resolution.xy).rgb;
	outputColor +=  1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  1))/resolution.xy).rgb;
	outputColor += -2.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  0))/resolution.xy).rgb;
	outputColor += 0.0 *      texture2D(tex0, (gl_FragCoord.xy)/resolution.xy).rgb;
	outputColor +=  2.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  0))/resolution.xy).rgb;
	outputColor += -1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1, -1))/resolution.xy).rgb;
	outputColor +=  0.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0, -1))/resolution.xy).rgb;
	outputColor +=  1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1, -1))/resolution.xy).rgb;
  return vec4(outputColor, _c0.a);
`})
setFunction({
  name: 'sharpen',
  type: 'color',
  inputs: [
  ],
  glsl: `
  vec3 outputColor;
	outputColor  = -1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0,  1))/resolution.xy).rgb;
	outputColor += -1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  0))/resolution.xy).rgb;
	outputColor += 5.0 *      texture2D(tex0, (gl_FragCoord.xy)/resolution.xy).rgb;
	outputColor += -1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  0))/resolution.xy).rgb;
	outputColor += -1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0, -1))/resolution.xy).rgb;
  return vec4(outputColor, _c0.a);
`})
setFunction({
  name: 'emboss',
  type: 'color',
  inputs: [
  ],
  glsl: `
  vec3 outputColor;
	outputColor  = -2.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  1))/resolution.xy).rgb;
	outputColor += -1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0,  1))/resolution.xy).rgb;
	outputColor += -1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2(-1,  0))/resolution.xy).rgb;
	outputColor +=  1.0 * texture2D(tex0, (gl_FragCoord.xy)/resolution.xy).rgb;
	outputColor +=  1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1,  0))/resolution.xy).rgb;
	outputColor +=  1.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 0, -1))/resolution.xy).rgb;
	outputColor +=  2.0 * texture2D(tex0, (gl_FragCoord.xy + vec2( 1, -1))/resolution.xy).rgb;
  return vec4(outputColor, _c0.a);
`})
setFunction({
  name: 'altline',
  type: 'color',
  inputs: [
    {name: 'width', type: 'float', default: 1.0},
  ],
  glsl: `
  if(int(mod(gl_FragCoord.y/max(width,1.0), 2.0)) == 0)
    return texture2D(tex0, gl_FragCoord.xy/resolution.xy);
  vec2 p = vec2(resolution.x - gl_FragCoord.x, gl_FragCoord.y);
  return texture2D(tex0, p/resolution.xy);
`})
// From https://ciphrd.com/2020/04/08/pixel-sorting-on-shader-using-well-crafted-sorting-filters-glsl/
// original author: ciphrd
setFunction({
  name: 'pxsort',
  type: 'color',
  inputs: [
    {name: 'threshold', type: 'float', default: 0.2},
    {name: 'frame', type: 'int', default: 0},
    {name: 'dirX', type: 'float', default: 1},
    {name: 'dirY', type: 'float', default: 0},
  ],
  glsl: `
  vec2 uv2 = gl_FragCoord.xy/resolution.xy;
  float fParity = mod(float(frame), 2.) * 2. - 1.;
  float vp = mod(floor(uv2.x * resolution.x), 2.0) * 2. - 1.;
  vec2 dir = vec2(dirX, dirY);
  dir *= fParity * vp;
  dir /= resolution.xy;
  vec4 curr = texture2D(tex0, uv2);
  vec4 comp = texture2D(tex0, uv2 + dir);
  float gCurr = (curr.r+curr.g+curr.b)/3.; // gscale(curr.rgb);
  float gComp = (comp.r+comp.g+comp.b)/3.; // gscale(comp.rgb);
  if (uv2.x + dir.x < 0.0 || uv2.x + dir.x > 1.0) {
    return curr;
  }
  if (dir.x < 0.0) {
    if (gCurr > threshold && gComp > gCurr) {
      return comp;
    } else {
      return curr;
    }
  }
  else {
    if (gComp > threshold && gCurr >= gComp) {
      return comp;
    } else {
      return curr;
    }
  }
`})
// From https://ciphrd.com/2020/04/08/pixel-sorting-on-shader-using-well-crafted-sorting-filters-glsl/
// original author: ciphrd
setFunction({
  name: 'pysort',
  type: 'color',
  inputs: [
    {name: 'threshold', type: 'float', default: 0.2},
    {name: 'frame', type: 'int', default: 0},
    {name: 'dirX', type: 'float', default: 0},
    {name: 'dirY', type: 'float', default: 1},
  ],
  glsl: `
  vec2 uv2 = gl_FragCoord.xy/resolution.xy;
  float fParity = mod(float(frame), 2.) * 2. - 1.;
  float vp = mod(floor(uv2.y * resolution.y), 2.0) * 2. - 1.;
  vec2 dir = vec2(dirX, dirY);
  dir *= fParity * vp;
  dir /= resolution.xy;
  vec4 curr = texture2D(tex0, uv2);
  vec4 comp = texture2D(tex0, uv2 + dir);
  float gCurr = (curr.r+curr.g+curr.b)/3.; // gscale(curr.rgb);
  float gComp = (comp.r+comp.g+comp.b)/3.; // gscale(comp.rgb);
  if (uv2.y + dir.y < 0.0 || uv2.y + dir.y > 1.0) {
    return curr;
  }
  if (dir.y < 0.0) {
    if (gCurr > threshold && gComp > gCurr) {
      return comp;
    } else {
      return curr;
    }
  }
  else {
    if (gComp > threshold && gCurr >= gComp) {
      return comp;
    } else {
      return curr;
    }
  }
`})
// licensed with GNU AFFERO GENERAL PUBLIC LICENSE Version 3
// author: Thomas Jourdan
setFunction({
  name: 'blinking',
  type: 'src',
  inputs: [
    {name: 'tiles', type: 'float', default: 5.0},
    {name: 'scale', type: 'float', default: 5.0},
    {name: 'speed', type: 'float', default: 0.5},
    {name: 'phase', type: 'float', default: 0.03},
  ],
  glsl: `
  vec2 st = floor(_st*tiles)/tiles;
  float h = _noise(vec3((st+vec2(0.0, phase))*scale, speed*time));
  float s = 0.5 * _noise(vec3((st+vec2(phase, 0.0))*scale, speed*time)) + 0.5;
  float v = 0.5 * _noise(vec3((st+vec2(0.0, phase))*scale, speed*time)) + 0.5;
  v *= (1.0-tiles*distance(_st, st+0.5/tiles));
  return vec4(_hsvToRgb(vec3(h, s, v)), 1.0);
`})
setFunction({
  name: 'blobs',
  type: 'src',
  inputs: [
    {name: 'speed', type: 'float', default: 0.1},
    {name: 'tresh', type: 'float', default: 0.2},
    {name: 'soft',  type: 'float', default: 0.05},
  ],
  glsl: `
    float edge   = 0.2;
    float border = 0.05;
    float vv = 0.5;
    vec2 st = _st-0.5;
    int dir = 1;
    float speed0= speed * time;
    vv *= distance(st * 2.0,
                   vec2(cos(speed0), sin(speed0)));
    float speed1 = -2.0 * speed * time;
    vv *= distance(st * 2.0,
                   vec2(cos(speed1), sin(speed1)));
    float speed2 = 3.0 * speed * time;
    vv *= distance(st * 2.0,
                   vec2(cos(speed2), sin(speed2)));
    float gray = smoothstep(tresh-soft,
                            tresh+soft,
                            vv);
    return vec4(gray, gray, gray, 1.0);
`})
setFunction({
  name: 'concentric2',
  type: 'src',
  inputs: [
    {name: 'base',     type: 'float', default: 5.0},
    {name: 'octaves',  type: 'float', default: 2.0},
    {name: 'ampscale', type: 'float', default: 0.5},
    {name: 'speed',    type: 'float', default: 1.0},
  ],
  glsl: `
  float r = base*length(_st - vec2(0.5));
  float d = 0.5*sin(r+speed*time) + 0.5;
  d += ampscale*(0.5*sin(r*octaves+speed*time) + 0.5);
  octaves *= octaves;
  ampscale *= ampscale;
  d += ampscale*(0.5*sin(r*octaves) + 0.5);
  octaves *= octaves;
  ampscale *= ampscale;
  d += ampscale*(0.5*sin(r*octaves+speed*time) + 0.5);
  return vec4(d, d, d, 1);
`})
setFunction({
  name: 'phasenoise',
  type: 'src',
  inputs: [
    {name: 'base',  type: 'float', default: 0.0},
    {name: 'range', type: 'float', default: 0.1},
    {name: 'scale', type: 'float', default: 5.0},
    {name: 'speed', type: 'float', default: 0.5},
    {name: 'phase', type: 'float', default: 0.03},
  ],
  glsl: `
  float h = range * _noise(vec3(_st*scale, speed*time)) + base;
  float s = 0.5 * _noise(vec3((_st+vec2(phase, 0.0))*scale, speed*time)) + 0.5;
  float v = 0.5 * _noise(vec3((_st+vec2(0.0, phase))*scale, speed*time)) + 0.5;
  return vec4(_hsvToRgb(vec3(h, s, v)), 1.0);
`})
setFunction({
  name: 'sdfmove',
  type: 'src',
  inputs: [
    {name: 'speed1',     type: 'float', default: 0.73},
    {name: 'speed2',     type: 'float', default: 1.0},
    {name: 'speed3',     type: 'float', default: -0.53},
  ],
  glsl: `
  vec2 st = _st;
  float d =  distance(vec2(fract(st.x+speed3*time), st.y), vec2(0.0, 0.1));
  d = min(d, distance(vec2(fract(st.x+speed2*time), st.y), vec2(0.0, 0.3)));
  d = min(d, distance(vec2(fract(st.x+speed1*time), st.y), vec2(0.0, 0.5)));
  d = min(d, distance(vec2(fract(st.x+speed2*time), st.y), vec2(0.0, 0.7)));
  d = min(d, distance(vec2(fract(st.x+speed3*time), st.y), vec2(0.0, 0.9)));
  d = pow(d, 0.4);
  return vec4(d, d, d, 1);
`})
setFunction({
  name: 'smoothsun',
  type: 'src',
  inputs: [
    {name: 'threshold', type: 'float', default: 0.3},
    {name: 'border',    type: 'float', default: 0.2},
    {name: 'speed',     type: 'float', default: 1.0},
    {name: 'ampscale',  type: 'float', default: 0.5},
  ],
  glsl: `
  float r = length(_st - vec2(0.5));
  float bscale = border;
  float nscale = 0.1;
  r += nscale * _noise(vec3(_st/nscale, speed*time));
  float d = smoothstep(threshold-bscale, threshold+bscale, r);
  
  bscale *= ampscale;
  nscale *= ampscale;
  r -= nscale * _noise(vec3(_st/nscale, speed*time));
  d -= 10.0 * nscale * smoothstep(threshold-bscale, threshold+bscale, r);
  
  bscale *= ampscale;
  nscale *= ampscale;
  r += nscale * _noise(vec3(_st/nscale, speed*time));
  d += 10.0 * nscale * smoothstep(threshold-bscale, threshold+bscale, r);

  d = pow(1.0 - clamp(d, 0.0, 1.0), 2.0);
  return vec4(d, d, d, 1);
`})
// licensed with GNU AFFERO GENERAL PUBLIC LICENSE Version 3
// author: Thomas Jourdan
setFunction({
  name: 'invtile',
  type: 'coord',
  inputs: [
    {name: 'amount',    type: 'float', default: 1.0},
  ],
  glsl: `
  vec2 xy = _st - vec2(0.5);
  return mix(abs(xy), exp(abs(xy)), amount) + vec2(0.5);
`})
setFunction({
  name: 'invsqrt',
  type: 'coord',
  inputs: [
    {name: 'amount',    type: 'float', default: 0.5},
  ],
  glsl: `
  vec2 xy = _st - vec2(0.5);
  xy = inversesqrt(abs(xy)+vec2(amount));
  return xy + vec2(0.5);
`})
setFunction({
  name: 'abslog',
  type: 'coord',
  inputs: [
    {name: 'amount',    type: 'float', default: 1.0},
  ],
  glsl: `
  vec2 xy = _st - vec2(0.5);
  xy.x = log(abs(xy.x)+amount);
  xy.y = log(abs(xy.y)+amount);
  xy += 0.5;
  return xy;
`})
setFunction({
  name: 'swave',
  type: 'coord',
  inputs: [
    {name: 'amount',    type: 'float', default: 1.0},
  ],
  glsl: `
  vec2 xy = _st - vec2(0.5);
  xy = mix(xy.xx, xy.yy, amount*dot(xy, xy.yx));
  return xy + vec2(0.5);
`})
setFunction({
  name: 'centermag',
  type: 'coord',
  inputs: [
    {name: 'r',  type: 'float', default: 0.4},
    {name: 'h',  type: 'float', default: 0.2},
    {name: 'cx', type: 'float', default: 0.0},
    {name: 'cy', type: 'float', default: 0.0},
  ],
  glsl: `
  vec2 xy = _st - vec2(cx+0.5, cy+0.5);
  h = r + h;
  float hr = r * sqrt(1.0 - ((r - h) / r) * ((r - h) / r));
  float rr = length(xy);
  return (rr < hr ? xy * (r - h) / sqrt(r * r - rr * rr) : xy) + vec2(cx+0.5, cy+0.5);
`})
// licensed with GNU AFFERO GENERAL PUBLIC LICENSE Version 3
// author: Thomas Jourdan
setFunction({
  name: 'squ',
  type: 'src',
  inputs: [
    {
      type: 'float',
      name: 'frequency',
      default: 10,
    },
    {
      type: 'float',
      name: 'speed',
      default: 0.1,
    },
  ],
  glsl: `
  float d = floor(0.5+fract((_st.x + time * speed) * frequency));
  return vec4(d, d, d, 1.0);
`})
setFunction({
  name: 'usin',
  type: 'src',
  inputs: [
    {
      type: 'float',
      name: 'frequency',
      default: 10,
    },
    {
      type: 'float',
      name: 'speed',
      default: 0.1,
    },
  ],
  glsl: `
  float d = 0.5+0.5*sin((_st.x + time * speed) * frequency * 6.283185307179586);
  return vec4(d, d, d, 1.0);
`})
setFunction({
  name: 'saw',
  type: 'src',
  inputs: [
    {
      type: 'float',
      name: 'frequency',
      default: 10,
    },
    {
      type: 'float',
      name: 'speed',
      default: 0.1,
    },
  ],
  glsl: `
  float d = fract((_st.x + time * speed) * frequency);
  return vec4(d, d, d, 1.0);
`})
setFunction({
  name: 'harmonic',
  type: 'src',
  inputs: [
    {
      type: 'float',
      name: 'frequency',
      default: 10,
    },
    {
      type: 'float',
      name: 'speed',
      default: 0.1,
    },
    {
      type: 'float',
      name: 'phase1',
      default: 0.0,
    },
    {
      type: 'float',
      name: 'phase2',
      default: 0.0,
    },
  ],
  glsl: `
  float d0 = sin((_st.x + time * speed) * frequency);
  float d1 = sin((_st.x + phase1 + time * speed) * 2.0 * frequency);
  float d2 = sin((_st.x + phase2 + time * speed) * 4.0 * frequency);
  float d = 0.5 * (0.5714285714285714 * d0 + 0.2857142857142857 * d1 + 0.2857142857142857 * d2) + 0.5;
  return vec4(d, d, d, 1.0);
`})
setFunction({
  name: 'tri',
  type: 'src',
  inputs: [
    {
      type: 'float',
      name: 'frequency',
      default: 10,
    },
    {
      type: 'float',
      name: 'speed',
      default: 0.1,
    },
  ],
  glsl: `
  float c = abs(mod(1.0+(_st.x + time * speed) * 2.0 * frequency, 2.0) - 1.0);
 return vec4(c, c, c, 1.0);
`})
// licensed with GNU AFFERO GENERAL PUBLIC LICENSE Version 3
// author: Thomas Jourdan
setFunction({
  name: 'rsqu',
  type: 'src',
  inputs: [
    {
      type: 'float',
      name: 'frequency',
      default: 10,
    },
    {
      type: 'float',
      name: 'speed',
      default: 0.1,
    },
  ],
  glsl: `
  float d = floor(0.5+fract((distance(_st, vec2(0.5,0.5)) + time * speed) * frequency));
  return vec4(d, d, d, 1.0);
`})
setFunction({
  name: 'rusin',
  type: 'src',
  inputs: [
    {
      type: 'float',
      name: 'frequency',
      default: 10,
    },
    {
      type: 'float',
      name: 'speed',
      default: 0.1,
    },
  ],
  glsl: `
  float d = 0.5+0.5*sin((distance(_st, vec2(0.5,0.5)) + time * speed) * frequency * 6.283185307179586);
  return vec4(d, d, d, 1.0);
`})
setFunction({
  name: 'rsaw',
  type: 'src',
  inputs: [
    {
      type: 'float',
      name: 'frequency',
      default: 10,
    },
    {
      type: 'float',
      name: 'speed',
      default: 0.1,
    },
  ],
  glsl: `
  float d = fract((distance(_st, vec2(0.5,0.5)) + time * speed) * frequency);
  return vec4(d, d, d, 1.0);
`})
setFunction({
  name: 'rharmonic',
  type: 'src',
  inputs: [
    {
      type: 'float',
      name: 'frequency',
      default: 10,
    },
    {
      type: 'float',
      name: 'speed',
      default: 0.1,
    },
    {
      type: 'float',
      name: 'phase1',
      default: 0.0,
    },
    {
      type: 'float',
      name: 'phase2',
      default: 0.0,
    },
  ],
  glsl: `
  float di = distance(_st, vec2(0.5,0.5));
  float d0 = sin((di + time * speed) * frequency);
  float d1 = sin((di + phase1 + time * speed) * 2.0 * frequency);
  float d2 = sin((di + phase2 + time * speed) * 4.0 * frequency);
  float d = 0.5 * (0.5714285714285714 * d0 + 0.2857142857142857 * d1 + 0.2857142857142857 * d2) + 0.5;
  return vec4(d, d, d, 1.0);
`})
setFunction({
  name: 'rtri',
  type: 'src',
  inputs: [
    {
      type: 'float',
      name: 'frequency',
      default: 10,
    },
    {
      type: 'float',
      name: 'speed',
      default: 0.1,
    },
  ],
  glsl: `
  float c = abs(mod(1.0+(distance(_st, vec2(0.5,0.5)) + time * speed) * 2.0 * frequency, 2.0) - 1.0);
  return vec4(c, c, c, 1.0);
`})
setFunction({
  name: 'stripes',
  type: 'src',
  inputs: [
    {
      type: 'float',
      name: 'frequency',
      default: 10,
    },
    {
      type: 'float',
      name: 'speed',
      default: 1,
    },
  ],
  glsl: `
  // float d = floor((_st.x + time * speed) * frequency) / frequency;
  float d = fract(floor(_st.x * frequency) / frequency + time * speed);
  return vec4(d, d, d, 1.0);
`})
setFunction({
  name: 'rstripes',
  type: 'src',
  inputs: [
    {
      type: 'float',
      name: 'frequency',
      default: 10,
    },
    {
      type: 'float',
      name: 'speed',
      default: 1,
    },
  ],
  glsl: `
  // float d = floor((_st.x + time * speed) * frequency) / frequency;
  float d = fract(floor(distance(_st, vec2(0.5, 0.5)) * frequency) / frequency + time * speed);
  return vec4(d, d, d, 1.0);
`})
setFunction({
  name: 'polar',
  type: 'coord',
  inputs: [
    {name: 'radius', type: 'float', default: 1.0},
    {name: 'angle',  type: 'float', default: 1.0},
    {name: 'centerX', type: 'float', default: 0.5},
    {name: 'centerY', type: 'float', default: 0.5},
  ],
  glsl: `
  vec2 center = vec2(centerX, centerY);
  vec2 xy = _st - center;
  
  float r = length(xy) * radius;
  float theta = atan(xy.y, xy.x) * angle / (2.0 * 3.141592653589793);
  
  return vec2(theta + 0.5, r);
`})