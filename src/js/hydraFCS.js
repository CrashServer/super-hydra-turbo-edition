//Implicit Curves


setFunction({
    name: 'iCardioid',
    type: 'src',
    inputs: [
        {
        type: 'float',
        name: 'freq',
        default: 1.0,
        },
        
        {
        type: 'float',
        name: 'a',
        default: 1.0,
        },
        
    ],
    glsl:
    `   
        _st = _st*2.0 - 1.0;
        float x = _st.x;
        float y = _st.y;
        float u = pow(x*x + y*y - 2.0*a*x, 2.0) - 4.0*sin(freq*time)*a*a*(x*x - y*y);
        return vec4(u, u, u, 1.0);`
})

//
setFunction({
    name: 'iBicorn',
    type: 'src',
    inputs: [
          {
          type: 'float',
          name: 'freq',
          default: 1.0,
        },
        {
        type: 'float',
        name: 'a_exp',
        default: 1.0,
        },
        {
        type: 'float',
        name: 'a',
        default: 1.0,
        },
        
    ],
    glsl:
    `   
        _st = _st*4.0 - 2.0;
        float x = _st.x;
        float y = _st.y;
        float u = y*y*(a*a - x*x) - pow(x*x + sin(freq*time-y)*a*y - a, 3.0*a_exp);
        return vec4(u, u, u, 1.0);`
})

setFunction({
    name: 'iAstroid',
    type: 'src',
    inputs: [
          {
          type: 'float',
          name: 'freq',
          default: 1.0,
        },
        {
        type: 'float',
        name: 'wrap',
        default: 1.0,
        },
        {
        type: 'float',
        name: 'amp',
        default: '1.0',
        },
    ],
    glsl:
    `   
        _st = _st*2.0 - 1.0;
        float x = _st.x;
        float y = _st.y;
        float u = pow(pow(x, 2.0), .33) + pow(pow(y, 2.0), .33*sin(freq*time-x))- pow(pow(amp*sin(freq*time), 2.0), .33);
        u = mod(u, wrap*5.0);
        return vec4(u, u, u, 1.0);`
    })

setFunction({
    name: 'iCircle',
    type: 'src',
    inputs: [
            {
        type: 'float',
        name: 'freq',
        default: '1',
        },
        
    ],
    glsl:
    `   
        _st = _st*2.0 - 1.0;
        float x = _st.x;
        float y = _st.y;
        float u = x*x + y*y - 1.0;
        u = fract(freq*time-u);
        return vec4(u, u, u, 1.0);`
    })

setFunction({
    name: 'iCassOval',
    type: 'src',
    inputs: [
            {
        type: 'float',
        name: 'freq',
        default: 1.0,
        },
        {
        type: 'float',
        name: 'mult',
        default: 1.0,
        },
        {
        type: 'float',
        name: 'a',
        default: 1.0,
        },
        {
        type: 'float',
        name: 'c',
        default: '1.0',
        }
    ],
    glsl:
    `   
        _st = _st*2.0 - 1.0;
        float x = _st.x;
        float y = _st.y;
        float u = pow(x*x + y*y, 2.0) - sin(freq*time- mult*y*x)*2.0*a*a*(x*x - y*y) - pow(a, 4.0) + pow(c, 4.0);
        
        return vec4(u, u, u, 1.0);`
    })

setFunction({
    name: 'iSextic',
    type: 'src',
    inputs: [
        {
        type: 'float',
        name: 'freq1',
        default: 1.0,
        },
            {
            type: 'float',
            name: 'freq2',
            default: 1.0,
        },
        {
        type: 'float',
        name: 'a',
        default: 1.0,
        },
    ],
    glsl:
    `   
        _st = _st*3.0 - 1.5;
        float x = _st.x;
        float y = _st.y;
        float r = length(_st);
        float theta = atan(y/x);
        float u = r*sin(1.1*freq2*time) - 4.0*a*pow(cos(theta/3.0), 3.0);
        u = fract(u+1.2*freq1*time);
        return vec4(u, u, u, 1.0);`
    })
    //
setFunction({
    name: 'iCochleoid',
    type: 'src',
    inputs: [
        {
        type: 'float',
        name: 'freq1',
        default: 1.0,
        },
            {
        type: 'float',
        name: 'freq2',
        default: 1.0,
        },
            
        {
        type: 'float',
        name: 'a',
        default: 1.0,
        },
    ],
    glsl:
    `   
        _st = _st*3.0 - 1.5;
        float x = _st.x;
        float y = _st.y;
        float r = length(_st);
        float theta = atan(y/x);
        float u = r - a*(sin(theta-freq1*time)/(theta));
        u = mod(u, 10.0*cos(time*freq2-y) + 10.0*sin(time*freq2-x));
        return vec4(u, u, u, 1.0);`
    })

setFunction({
    name: 'iCissoid',
    type: 'src',
    inputs: [
        {
        type: 'float',
        name: 'freq',
        default: 1.0,
        },
        {
        type: 'float',
        name: 'a',
        default: 1.0,
        },
        {
        type: 'float',
        name: 'wrap',
        default: 10.0,
        },
    ],
    glsl:
    `   
        _st = _st*10.0 - 5.0;
        float x = _st.x;
        float y = _st.y;
        float r = length(_st);
        float theta = atan(y/x);
        float u = r - 2.0*a*tan(theta)*sin(theta);
        u = mod(u, wrap*sin(freq*time-x)+wrap+1.0);
        return vec4(u, u, u, 1.0);`
    })

setFunction({
    name: 'iSluzeConchoid',
    type: 'src',
    inputs: [
        {
        type: 'float',
        name: 'freq',
        default: 1.0,
        },
        {
        type: 'float',
        name: 'a',
        default: 3.0,
        },
        {
        type: 'float',
        name: 'k',
        default: 1.0,
        },
        
    ],
    glsl:
    `   
        _st = _st*2.0 - 1.0;
        float x = _st.x;
        float y = _st.y;
        float r = length(_st);
        float theta = atan(y/x);
        float u = a*(r*cos(theta)-a) - k*pow(cos(theta), 2.0);
        u = fract(u-freq*time);
        return vec4(u, u, u, 1.0);`
    })

setFunction({
    name: 'iDevil',
    type: 'src',
    inputs: [
            
        {type: 'float', name: 'freq', default: 1.0},
        {type: 'float', name: 'wrap', default: 4.0},
        {
        type: 'float',
        name: 'k',
        default: 1.0,
        },
        {
        type: 'float',
        name: 'a',
        default: 3.0,
        },
        
    ],
    glsl:
    `   
        _st = _st*2.0 - 1.0;
        float x = _st.x;
        float y = _st.y;
        float u = pow(y, 4.0)- pow(x, 4.0) + a*y*y + k*x*x;
        u = mod(u, wrap*sin(freq*time-y*x)+wrap);
        return vec4(u, u, u, 1.0);`
    })

setFunction({
    name: 'iDFolium',
    type: 'src',
    inputs: [
        {
        type: 'float',
        name: 'freq',
        default: 1.0,
        },
        {
        type: 'float',
        name: 'a',
        default: 3.0,
        },
    
    ],
    glsl:
    `   
        _st = _st*2.0 - 1.0;
        float x = _st.x;
        float y = _st.y;
        float r = length(_st);
        float theta = atan(y/x);
        float u = r - 4.0*a*cos(theta)*pow(sin(theta+freq*time), 2.0);
            return vec4(u, u, u, 1.0);`
    })


setFunction({
    name: 'iSpiral',
    type: 'src',
    inputs: [
            {type: 'float', name: 'freq', default: 1.0,},
        {
        type: 'float', name: 'a', default: 3.0,
        },
        { type: 'float', name: 'b', default: 1.0,},
        
    
    ],
    glsl:
    `   
        _st = _st*2.0 - 1.0;
        float x = _st.x;
        float y = _st.y;
        float r = length(_st);
        float theta = atan(y/x);
        float u = r -a*exp(theta*(1.0/tan(b)));
        u = fract(u-freq*time);
        return vec4(u, u, u, 1.0);`
    })

setFunction({
    name: 'iFermatSpiral',
    type: 'src',
    inputs: [
        {
        type: 'float', name: 'freq', default: 1.0,
        },
        {
        type: 'float', name: 'a', default: 1.0,
        },
        { type: 'float', name: 'b', default: 1.0,},
        
    
    ],
    glsl:
    `   
        _st = _st*3.0 - 1.5;
        float x = _st.x;
        float y = _st.y;
        float r = length(_st);
        float theta = atan(y/x);
        float u = r*r*cos(freq*time-theta) - a*a*theta;
        return vec4(u, u, u, 1.0);`
    })

setFunction({
    name: 'iFreethNephroid',
    type: 'src',
    inputs: [
        {
        type: 'float',
        name: 'freq1',
        default: 1.0,
        },
        {
        type: 'float',
        name: 'freq2',
        default: 1.0,
        },
        {
        type: 'float',
        name: 'a',
        default: 2.0,
        },
    ],
    glsl: `
        _st = _st * 2.0 - 1.0;
        float x = _st.x;
        float y = _st.y;
        float r = length(_st);
        float theta = atan(y / x);
        float u = r - a * (1.0 + 2.0*sin(.5*theta-.5*freq2*time)); 
        u = fract(u-freq1*time);
        return vec4(u, u, u, 1.0);
    `,
    })

setFunction({
    name: 'iInvoluteCircle',
    type: 'src',
    inputs: [
        {
        type: 'float',
        name: 'freq',
        default: 1.0, 
        },
        {
        type: 'float',
        name: 'wrap',
        default: 10.0,
        },
        
    ],
    glsl: `
        _st = _st * 4.0 - 2.0;
        float x = _st.x;
        float y = _st.y;
        float r = length(_st);
        float theta = atan(y/x);
        float u = r*r - cos(theta+freq*time)*theta - 1.0;
        u = 1.0-mod(u, wrap);
        //u = fract(u-time);
        return vec4(u, u, u, 1.0);
    `,
    })

//parametric curves

setFunction({
    name: 'pAstroid',
    type: 'combineCoord',
    inputs: [
    {
        type: 'float',
        name: 'a',
        default: '1.0',
    },
    ],
    glsl: `
        float u = length(_c0);
        float x = a*pow(cos(u), 3.0);
        float y = a*pow(sin(u), 3.0);
        return vec2(_st.x*x, _st.y*y);
    `
})

setFunction({
    name: 'pSpiral',
    type: 'combineCoord',
    inputs: [],
    glsl: `
        float u = length(_c0);
        float x = u*cos(u);
        float y = u*sin(u);
        return vec2(_st.x*x, _st.y*y);
    `
})

setFunction({
    name: 'pCardioid',
    type: 'combineCoord',
    inputs: [
        {
        type: 'float',
        name: 'a',
        default: 1,
        },
        {
        type: 'float',
        name: 'p',
        default: 2.0,
        }
    ],
    glsl: `
        float u = length(_c0);
        float x = a*(p*cos(u) - cos(p*u));
        float y = a*(p*sin(u) - sin(p*u));
        return vec2(_st.x*x, _st.y*y);
    `
})

setFunction({
    name: 'pConchoid',
    type: 'combineCoord',
    inputs: [
        {
        type: 'float',
        name: 'a',
        default: 1.0,
        },
        
    ],
    glsl: `
        float u = length(_c0);
        float x = .1*a + cos(u);
        float y = .1*a*tan(u) + sin(u);
        return vec2(_st.x*x, _st.y*y);
    `
})

setFunction({
    name: 'pEpicycloid',
    type: 'combineCoord',
    inputs: [
    {type: 'float', name: 'a', default: 1.0},
    {type: 'float', name: 'b', default: 1.0},
    ],
    glsl: `
        float u = length(_c0);
        float x = _st.x;
        float y = _st.y;
        float v = (a + b)*cos(u) - b*cos((a/b + 1.0)*u);
        float w = (a + b)*sin(u) - b*sin((a/b + 1.0)*u);
        return vec2(v*x,w*y);
    `
})

setFunction({
    name: 'pDescartesFolium',
    type: 'combineCoord',
    inputs: [
    {type: 'float', name: 'a', default: 1.0},
    {type: 'float', name: 'b', default: 1.0},
    ],
    glsl: `
        float u = length(_c0);
        float x = _st.x;
        float y = _st.y;
        float v = 3.0*a*u/(1.0 + pow(u, 3.0));
        float w = 3.0*a*u*u/(1.0 + pow(u, 3.0));;
        return vec2(v*x,w*y);
    `
})

setFunction({
    name: 'pHypocycloid',
    type: 'combineCoord',
    inputs: [
      {
        type: 'float',
        name: 'a',
        default: 1.0,
      },
      {
        type: 'float',
        name: 'b',
        default: 2.0,
      },
    ],
    glsl: `
      float k = length(_c0);
      float u = a * cos(b * k) + (a - b) * cos((a + b) * k);
      float v = a * sin(b * k) + (a - b) * sin((a + b) * k);
      return vec2(u*_st.x, v*_st.y);
    `,
  })

  setFunction({
    name: 'pHypotrochoid',
    type: 'combineCoord',
    inputs: [
      {
        type: 'float',
        name: 'a',
        default: 1.0,
      },
      {
        type: 'float',
        name: 'b',
        default: 2.0,
      },
      {
        type: 'float',
        name: 'd',
        default: 1.0,
      },
    ],
    glsl: `
      float k = length(_c0);
      float u = (a - d) * cos(k) + d * cos((a / b + 1.0) * k);
      float v = (a - d) * sin(k) + d * sin((a / b + 1.0) * k);
      return vec2(u*_st.x, v*_st.y);
    `,
  })

  setFunction({
    name: 'pInvoluteCircle',
    type: 'combineCoord',
    inputs: [
      {type: 'float', name: 'a', default: 1.0},
    ], 
    glsl: `
      float r = 1.0; // Radius of the circle (can be adjusted)
      
      float u = length(_c0); // Use color length as control parameter
      
      float x = a*(cos(u) + u*sin(u)); 
      float y = a*(sin(u) - u*cos(u));
      
      return vec2(x*_st.x, y*_st.y);
    `,
  })

  setFunction({
    name: 'pCircle',
    type: 'combineCoord',
    inputs: [
      {
        type: 'float',
        name: 'a',
        default: 1.0,
      }, // radius of the circle
    ],
    glsl: `
      float radius = a;
      float angle = length(_c0); // Use color length as the angle
      float x = radius * cos(angle);
      float y = radius * sin(angle);
      return vec2(_st.x*x, _st.y*y);
    `,
  })

  setFunction({
    name: 'pLissajous',
    type: 'combineCoord',
    inputs: [
      {
        type: 'float',
        name: 'a',
        default: 5.0,
      }, // parameter for amplitude of first sine wave
      {
        type: 'float',
        name: 'n',
        default: 1.0,
      }, // parameter for frequency of first sine wave
      {
        type: 'float',
        name: 'b',
        default: 1.0,
      }, // parameter for amplitude of second sine wave
      {
        type: 'float',
        name: 'phase',
        default: 0.0,
      }, // optional phase shift
    ],
    glsl: `
      float colorLength = length(_c0); // Use color length as control parameter
      float angle = colorLength; // Treat color length as the angle
      
      float x = a * sin(n * angle + phase);  // Use 'n' for frequency and 'a' for amplitude
      float y = b * sin(angle);                // Use 'b' for amplitude
      return vec2(x*_st.x, y*_st.y);
    `,
  })

  setFunction({
    name: 'pNephroid',
    type: 'combineCoord',
    inputs: [
      {
        type: 'float',
        name: 'a',
        default: 1.0,
      }, // parameter for the radius of the nephroid
    ],
    glsl: `
      float radius = a; // Use the input parameter 'a' for radius
      float angle = length(_c0);  // Use color length as the angle
      
      // Nephroid equation using sine and cosine with angle from color length
      float x = radius * (3.0 * cos(angle) - cos(3.0 * angle));
      float y = radius * (3.0 * sin(angle) - sin(3.0 * angle));
      
      return vec2(x*_st.x, y*_st.y);
    `,
  })

  setFunction({
    name: 'pPlateau',
    type: 'combineCoord',
    inputs: [
      {
        type: 'float',
        name: 'm',
        default: 2.0,
      }, // parameter for m (must not equal n)
      {
        type: 'float',
        name: 'n',
        default: 1.0,
      }, // parameter for n (must not equal m)
    ],
    glsl: `
      float colorLength = length(_c0);  // Use color length as control parameter
      float angle = colorLength;  // Normalize and scale color length to angle
  
      // Ensure m and n are not equal (Plateau curve requirement)
      if (abs(m - n) < 1e-6) {
        m += 0.1; // Slightly alter m to avoid singularity
      }
    
      float x = (sin((m + n) * angle)) / (sin((m - n) * angle));
      float y = (2.0 * sin(m * angle) * sin(n * angle)) / (sin((m - n) * angle));
      
      return vec2(x*_st.x, y*_st.y);
    `,
  })

  setFunction({
    name: 'pTalbot',
    type: 'combineCoord',
    inputs: [
      {
        type: 'float',
        name: 'a',
        default: 1.0,
      }, // parameter for scale
    ],
    glsl: `
      float colorLength = length(_c0);  // Use color length as control parameter
      float angle = colorLength;        // No scaling needed, use color length directly
  
      // Talbot's curve equation with angle and scale
      float x = a * pow(2.0 * cos(angle), 2.0) - 2.0 * a * cos(2.0 * angle) + 1.0;
      float y = a * 2.0 * sin(angle) * cos(angle);
      
      return vec2(x*_st.x, y*_st.y);
    `,
  })

//parametric surfaces

setFunction({
    name: 'pSphere',
    type: 'src',
    inputs: [
      
      {type: 'float', name: 'freq', default: 1.0},
      {
        type: 'float',
        name: 'a',
        default: 1.0,
      },
      
  
    ],
    glsl: `
        _st = _st * 2.0 - 1.0;
        float x = (_st.x*2.0*3.14);
        float y = (_st.y*2.0*3.14);
        float r = a*cos(x)*sin(y);
        r = fract(r-freq*time);
        float g = a*sin(x)*sin(y);
        g = fract(g+freq*time);
        float b = a*cos(y);
        b = fract(b+freq*time);
        return vec4(r, g, b, 1.0);
      `,
  })

  setFunction({
    name: 'pMobiusStrip',
    type: 'src',
    inputs: [
      {type: 'float', name: 'freq', default: 1.0},
      {
        type: 'float',
        name: 'a',
        default: 1.0,
      },
      
      
  
    ],
    glsl: `
        _st = _st * 2.0 - 1.0;
        float x = (_st.x*2.0*3.14);
        float y = (_st.y*2.0*3.14);
        float r = (1.0+a*cos(x)/2.0)*cos(y);
        r = fract(r-freq*time);
        float g = (1.0+a*cos(x)/2.0)*sin(y);
        g = fract(g+freq*time);
        float b = a*sin(x);
        b = fract(b+freq*time);
        return vec4(r, g, b, 1.0);
      `,
  })

  setFunction({
    name: 'pCylinder',
    type: 'src',
    inputs: [
      {type: 'float', name: 'freq', default: 1.0},
      {
        type: 'float',
        name: 'a',
        default: 1.0,
      },
      
      
  
    ],
    glsl: `
        _st = _st * 2.0 - 1.0;
        float x = (_st.x*2.0*3.14);
        float y = (_st.y*2.0*3.14);
        float r = x;
        r = fract(r-freq*time);
        float g = a*cos(y);
        g = fract(g+freq*time);
        float b = a*sin(y);
        b = fract(b+freq*time);
        return vec4(r, g, b, 1.0);
      `,
  })

  setFunction({
    name: 'pKleinBottle',
    type: 'src',
    inputs: [
      {type: 'float', name: 'freq', default: 1.0},
      {
        type: 'float',
        name: 'aa',
        default: 1.0,
      },
      
      
  
    ],
    glsl: `
        _st = _st * 2.0 - 1.0;
        float u = (_st.x*2.0*3.14);
        float v = (_st.y*2.0*3.14);
        float r = (aa + cos(v / 2.0) * sin(u) - sin(v / 2.0) * sin(2.0 * u)) * cos(v);
        r = fract(r-freq*time);
        float g = (aa + cos(v / 2.0) * sin(u) - sin(v / 2.0) * sin(2.0 * u)) * sin(v);
        g = fract(g+freq*time);
        float b = sin(v / 2.0) * sin(u) + cos(v / 2.0) * sin(2.0 * u);
        b = fract(b + freq*time);
        return vec4(r, g, b, 1.0);
      `,
  })

  setFunction({
    name: 'pCrossCap',
    type: 'src',
    inputs: [
      {type: 'float', name: 'freq', default: 1.0},
      {
        type: 'float',
        name: 'aa',
        default: 1.0,
      },
      
      
  
    ],
    glsl: `
        _st = _st * 2.0 - 1.0;
        float u = (_st.x*2.0*3.14);
        float v = (_st.y*2.0*3.14);
        float r = (aa * aa) * (sin(u) * sin(2.0 * v) / 2.0);
        r = fract(r-freq*time);
        float g = (aa * aa) * (sin(2.0 * u) * cos(v) * cos(v));
        g = fract(g-freq*time);
        float b = (aa * aa) * (cos(2.0 * u) * cos(v) * cos(v));
        b = fract(b + freq*time);
        return vec4(r, g, b, 1.0);
      `,
  })

  setFunction({
    name: 'pSteiner',
    type: 'src',
    inputs: [
      {type: 'float', name: 'freq', default: 1.0},
      {
        type: 'float',
        name: 'aa',
        default: 1.0,
      },
      
      
  
    ],
    glsl: `
        _st = _st * 2.0 - 1.0;
        float u = (_st.x*2.0*3.14);
        float v = (_st.y*2.0*3.14);
        float r = (aa * aa / 2.0) * (sin(2.0 * u) * cos(v) * cos(v));
        r = fract(r-freq*sin(time-u));
        float g = (aa * aa / 2.0) * (sin(u) * sin(2.0 * v));
        g = fract(g-freq*sin(time-r));
        float b = (aa * aa / 2.0) * (cos(u) * sin(2.0 * v));
        b = fract(b + freq*sin(time+g));
        return vec4(r, g, b, 1.0);
      `,
  })

  setFunction({
    name: 'pTorus',
    type: 'src',
    inputs: [
      {type: 'float', name: 'freq', default: 1.0},
      {
        type: 'float',
        name: 'a',
        default: 1.0,
      },
      {
        type: 'float', name: 'c', default: .5,
      },
    ],
    glsl: `
        _st = _st * 2.0 - 1.0;
        float u = (_st.x*2.0*3.14);
        float v = (_st.y*2.0*3.14);
        float r = (c + a*cos(v))*cos(u);
        r = fract(r-freq*time);
        float g = (c + a*cos(v))*sin(u);
        g = fract(g-freq*time);
        float b = sin(v);
        b = fract(b + freq*time);
        return vec4(r, g, b, 1.0);
      `,
  })

//implicit surfaces
setFunction({
    name: 'iSphere',
    type: 'color',
    inputs: [],
    glsl: `
    	
        float r = _c0.r;
        float g = _c0.g;
        float b = _c0.b;
        float u = r*r + g*g + b*b;
        u = fract(u);
        return vec4(u,u,u,1.0);
    `
})

setFunction({
    name: 'iCube',
    type: 'color',
    inputs: [],
    glsl: `
    	
        float r = abs(_c0.r);
        float g = abs(_c0.g);
        float b = abs(_c0.b);
        float u = max(max(r, g), b) - 1.0;
        u = fract(u);
        return vec4(u,u,u,1.0);
    `
})

setFunction({
    name: 'iTorus',
    type: 'color',
    inputs: [
      {type: 'float', name: 'c', default: 0.5},
      {type: 'float', name: 'a', default: 1.0},
    ],
    glsl: `
    	
        float r = _c0.r;
        float g = _c0.g;
        float b = _c0.b;
        float u = pow(a - sqrt(r*r - g*g), 2.0) + b*b - c*c;
        u = fract(u);
        return vec4(u,u,u,1.0);
    `
})

setFunction({
    name: 'iPlane',
    type: 'color',
    inputs: [
      {type: 'float', name: 'nx', default: 1.0}, //charge value
      {type: 'float', name: 'ny', default: 1.0},
      {type: 'float', name: 'nz', default: 1.0},
    ],
    glsl: `
    	
        float r = _c0.r;
        float g = _c0.g;
        float b = _c0.b;
        float u = nx*r + ny*g + nz*b;
        u = fract(u);
        return vec4(u,u,u,1.0);
    `
})

setFunction({
    name: 'iSteiner',
    type: 'color',
    inputs: [
      {type: 'float', name: 'a', default: 1.0},
    ],
    glsl: `
    	
        float r = _c0.r;
        float g = _c0.g;
        float b = _c0.b;
        float u = pow(r*g,2.0) + pow(g*b, 2.0) + pow(b*r, 2.0) - a*a*r*g*b;
        u = fract(u);
        return vec4(u,u,u,1.0);
    `
})

setFunction({
    name: 'iWineGlass',
    type: 'color',
    inputs: [
      {type: 'float', name: 'k', default: 3.2},
    ],
    glsl: `
    	
        float r = _c0.r;
        float g = _c0.g;
        float b = _c0.b;
        float u = r*r + g*g - pow(log(b + k), 2.0) - .02;
        u = fract(u);
        return vec4(u,u,u,1.0);
    `
})

setFunction({
    name: 'iGenus2',
    type: 'color',
    inputs: [
      
    ],
    glsl: `
    	
        float r = _c0.r;
        float g = _c0.g;
        float b = _c0.b;
        float u = 2.0*g*(g*g - 3.0*r*r)*(1.0-b*b) + pow(r*r + g*g, 2.0) - (9.0*b*b - 1.0)*(1.0 - b*b);
        u = fract(u);
        return vec4(u,u,u,1.0);
    `
})

//Inverse Parametric Surfaces

setFunction({
    name: 'ipSphere',
    type: 'combineCoord',
    inputs: [
      {type: 'float', name: 'a', default: 1.0},
    ], 
    glsl: `
      float r = _c0.r;
      float g = _c0.g;
      float b = _c0.b;
      
      float x = atan(g/r); 
      float y = acos(b/a);
      
      return vec2(x*_st.x, y*_st.y);
    `,
  })

setFunction({
    name: 'ipTorus',
    type: 'combineCoord',
    inputs: [
      {type: 'float', name: 'a', default: 1.0},
    ], 
    glsl: `
      float r = _c0.r;
      float g = _c0.g;
      float b = _c0.b;
      
      float x = atan(g/r); 
      float y = asin(b/a);
      
      return vec2(x*_st.x, y*_st.y);
    `,
  })

setFunction({
    name: 'ipMobiusStrip',
    type: 'combineCoord',
    inputs: [
    ], 
    glsl: `
      float r = _c0.r;
      float g = _c0.g;
      float b = _c0.b;
      
      float x = atan(g/r); 
      float y = b/sin(x/2.0);
      
      return vec2(x*_st.x, y*_st.y);
    `,
  })

setFunction({
    name: 'ipCylinder',
    type: 'combineCoord',
    inputs: [
    ], 
    glsl: `
      float r = _c0.r;
      float g = _c0.g;
      float b = _c0.b;
      
      float x = r; 
      float y = atan(b/g);
      
      return vec2(x*_st.x, y*_st.y);
    `,
  })

setFunction({
    name: 'ipKleinBottle',
    type: 'combineCoord',
    inputs: [
    ], 
    glsl: `
      float r = _c0.r;
      float g = _c0.g;
      float b = _c0.b;
      
      float y = atan(g/r); 
      float x = 2.0 * atan ( ((b / sin(y/2.0)) - cos(y/2.0) * tan(y))/ (sin(y/2.0) * (1.0 + tan(y)*tan(y))) );
      
      return vec2(x*_st.x, y*_st.y);
    `,
  })

setFunction({
    name: 'ipCrossCap',
    type: 'combineCoord',
    inputs: [
      {type: 'float', name: 'a', default: 1.0},
    ], 
    glsl: `
      float r = _c0.r;
      float g = _c0.g;
      float b = _c0.b;
      
      float x = 0.5*atan(g/b);
      float y = 0.5*asin((2.0/(a*a))*r*(1.0/sin(x)));
      
      return vec2(x*_st.x, y*_st.y);
    `,
  })

//parametric hypersurfaces 

setFunction({
    name: 'hpSphere',
    type: 'combineCoord',
    inputs: [
      {type: 'float', name: 'a', default: 1.0},
    ], 
    glsl: `
      float r = _c0.r;
      float g = _c0.g;
      float b = _c0.b;
      
      float x11 = a*cos(r);
      float x12 = a*sin(r)*cos(g);
      float x21 = a*sin(g)*cos(b);
      float x22 = a*sin(r)*sin(g)*sin(b);
      vec2 s = _st*mat2(x11, x12, x21, x22);
  
      
      return s;
    `,
  })

setFunction({
  	//source: https://people.math.harvard.edu/~knill/teaching/math22a2018/exhibits/threetorus/index.html
    name: 'hpTorus',
    type: 'combineCoord',
    inputs: [
      {type: 'float', name: 'c', default: 1.0},
      {type: 'float', name: 'a', default: .5},
    ], 
    glsl: `
      float r = _c0.r;
      float g = _c0.g;
      float b = _c0.b;
      
      float x11 = (c + a*cos(r))*cos(g);
      float x12 = (c + a*cos(r))*sin(g);
      float x21 = (c + a*sin(r))*cos(b);
      float x22 = (c + a*sin(r))*sin(b);
      vec2 s = _st*mat2(x11, x12, x21, x22);
  
      
      return s;
    `,
  })

setFunction({
  	//source: https://en.wikipedia.org/wiki/Hypercone
    name: 'hpCone',
    type: 'combineCoord',
    inputs: [
      {type: 'float', name: 'c', default: 1.0},
    ], 
    glsl: `
      float r = _c0.r;
      float g = _c0.g;
      float b = _c0.b;
      
      float x11 = b*c*cos(r)*cos(g);
      float x12 = b*c*cos(r)*sin(g);
      float x21 = b*c*sin(r);
      float x22 = b;
      vec2 s = _st*mat2(x11, x12, x21, x22);
  
      
      return s;
    `,
  })

setFunction({
  	//source: https://en.wikipedia.org/wiki/Hypercone
    name: 'hpConeOblique',
    type: 'combineCoord',
    inputs: [
      {type: 'float', name: 'c', default: 1.0},
      {type: 'float', name: 'vx', default: 1.0},
      {type: 'float', name: 'vy', default: 1.0},
      {type: 'float', name: 'vz', default: 1.0},
      
    ], 
    glsl: `
      float r = _c0.r;
      float g = _c0.g;
      float b = _c0.b;
      
      float x11 = vx*b + b*c*cos(r)*cos(g);
      float x12 = vy*b + b*c*cos(r)*sin(g);
      float x21 = b*vz + b*c*sin(r);
      float x22 = b;
      vec2 s = _st*mat2(x11, x12, x21, x22);  
      return s;
    `,
  })

//explicit curves
setFunction({
    name: 'eCircle',
    type: 'color',
    inputs: [  
      {
        type: 'float',
        name: 'freq',
        default: 1.0,
      },
        {
        type: 'float',
        name: 'a',
        default: 1.0,
        },
        
    ],
    glsl:
    `   
        float u = sqrt(abs(a - length(_c0)*length(_c0)));
        u = fract(u-freq*time);
        return vec4(u, u, u, 1.0);`
})

setFunction({
    name: 'eBicorn',
    type: 'color',
    inputs: [  
      {
        type: 'float',
        name: 'freq',
        default: 1.0,
      },
       
        
    ],
    glsl:
    `   
    	float u = length(_c0);
    	float c = (2.0 - 2.0*u*u + abs(sqrt(1.0- 3.0*pow(u,2.0) + 3.0*pow(u, 4.0) - pow(u, 6.0))));
        c = c/(3.0 + u*u);
		c = fract(c-freq*time);
        return vec4(c, c, c, 1.0);`
})

setFunction({
    name: 'eCatenary',
    type: 'color',
    inputs: [  
      {
        type: 'float',
        name: 'freq',
        default: 1.0,
      },
       
        
    ],
    glsl:
    `   
    	float u = length(_c0);
    	float c = (pow(2.718, u) + pow(2.718, -u))/2.0;
		c = fract(c-freq*time);
        return vec4(c, c, c, 1.0);`
})

setFunction({
    name: 'eCissoid',
    type: 'color',
    inputs: [  
      {
        type: 'float',
        name: 'freq',
        default: 1.0,
      },
      {
        type: 'float',
        name: 'a',
        default: 2.0,
      },
       
        
    ],
    glsl:
    `   
    	float u = length(_c0);
    	float c = abs(sqrt(pow(u, 3.0)/(2.0*a - u)));
		c = fract(c-freq*time);
        return vec4(c, c, c, 1.0);`
})


setFunction({
    name: 'eLame', //Lamé curve
    type: 'color',
    inputs: [  
      {
        type: 'float',
        name: 'freq',
        default: 2.0,
      },
      {
        type: 'float',
        name: 'n',
        default: 2.5,
      },
      {
        type: 'float',
        name: 'a',
        default: 3.0,
      },
       {
        type: 'float',
        name: 'b',
        default: 2.0,
      },
        
    ],
    glsl:
    `   
    	float u = length(_c0);
    	float c = b*abs(time-pow(1.0-abs(pow(u/a, n)), 1.0/n));
		c = fract(c- freq*time);
        return vec4(c, c, c, 1.0);`
})

setFunction({
    name: 'eNewton', //Newton's Diverging Parabola
    type: 'color',
    inputs: [  
      {
        type: 'float',
        name: 'freq',
        default: 2.0,
      },
      {
        type: 'float',
        name: 'g',
        default: 0.4,
      },
      {
        type: 'float',
        name: 'a',
        default: 1.0,
      },
       {
        type: 'float',
        name: 'b',
        default: 0.8,
      },
        
    ],
    glsl:
    `   
    	float u = length(_c0);
    	float c = (1.0/a)*sqrt(abs(u*(u*u - 2.0*b*u + g)));
		c = fract(c- freq*time);
        return vec4(c, c, c, 1.0);`
})

setFunction({
    name: 'ePearl', //Pearls of Sluze
    type: 'color',
    inputs: [  
      {
        type: 'float',
        name: 'freq',
        default: 2.0,
      },
      {
        type: 'float',
        name: 'k',
        default: 1,
      },
      {
        type: 'float',
        name: 'a',
        default: 1.0,
      },
       {
        type: 'float',
        name: 'n',
        default: 1,
      },
      {
        type: 'float',
        name: 'm',
        default: 1,
      },
      {
        type: 'float',
        name: 'p',
        default: 1,
      },
        
    ],
    glsl:
    `   
    	float u = length(_c0);
    	float c = pow( k*pow(a - u, p)*pow(u, m), 1.0/n);
		c = fract(c- freq*time);
        return vec4(c, c, c, 1.0);`
})

setFunction({
    name: 'ePear', //Pear shaped quartic
    type: 'color',
    inputs: [  
      {
        type: 'float',
        name: 'freq',
        default: 2.0,
      },
       {
        type: 'float',
        name: 'b',
        default: 2.0,
      },
      {
        type: 'float',
        name: 'a',
        default: 9.0,
      },
      
   
        
    ],
    glsl:
    `   
    	float u = length(_c0);
    	float c = (1.0/b)*sqrt(pow(u, 3.0)*(a-u));
		c = fract(c- freq*time);
        return vec4(c, c, c, 1.0);`
})


setFunction({
    name: 'eStrophoid',
    type: 'color',
    inputs: [  
      {
        type: 'float',
        name: 'freq',
        default: 2.0,
      },
      {
        type: 'float',
        name: 'a',
        default: 5.0,
      },
      
   
        
    ],
    glsl:
    `   
    	float u = length(_c0);
        float k = a*step(2.0, a);
        k += 2.0*step(a, 2.0);
    	float c = sqrt(u*u*(k - u)/(k + u));
		c = fract(c- freq*time);
        return vec4(c, c, c, 1.0);`
})

setFunction({
    name: 'eTrisectrix', //trisectrix of Maclaurin
    type: 'color',
    inputs: [  
      {
        type: 'float',
        name: 'freq',
        default: 2.0,
      },
      {
        type: 'float',
        name: 'a',
        default: 1.0,
      },
      
   
        
    ],
    glsl:
    `   
    	float u = mod(length(_c0), sin(.1*freq*time));//messed with this a bit since it was looking similar to other ones
        float c = sqrt(u*u*(3.0*a - u)/(a+u));
		c = fract(c- freq*time);
        return vec4(c, c, c, 1.0);`
})
