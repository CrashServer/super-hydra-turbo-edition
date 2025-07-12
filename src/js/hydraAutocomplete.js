export const hydraAutocomplete = {
    // Sources (générateurs de base)
    sources: [
      { text: 'noise(10,0.1)', displayText: 'noise' },
      { text: 'voronoi(5,0.3,0.3)', displayText: 'voronoi' },
      { text: 'osc(60,0.1,0)', displayText: 'osc' },
      { text: 'shape(3,0.3,0.01)', displayText: 'shape' },
      { text: 'gradient(0)', displayText: 'gradient' },
      { text: 'solid(1,1,1,1)', displayText: 'solid' },
      { text: 'src(o0)', displayText: 'src' },
    ],
    
    // Fonctions FCS - Courbes implicites
    implicitCurves: [
      { text: 'iCardioid(1.0,1.0)', displayText: 'iCardioid' },
      { text: 'iBicorn(1.0,1.0,1.0)', displayText: 'iBicorn' },
      { text: 'iAstroid(1.0,1.0,1.0)', displayText: 'iAstroid' },
      { text: 'iCircle(1.0)', displayText: 'iCircle' },
      { text: 'iCassOval(1.0,1.0,1.0,1.0)', displayText: 'iCassOval' },
      { text: 'iSextic(1.0,1.0,1.0)', displayText: 'iSextic' },
      { text: 'iCochleoid(1.0,1.0,1.0)', displayText: 'iCochleoid' },
      { text: 'iCissoid(1.0,1.0,10.0)', displayText: 'iCissoid' },
      { text: 'iSluzeConchoid(1.0,3.0,1.0)', displayText: 'iSluzeConchoid' },
      { text: 'iDevil(1.0,4.0,1.0,3.0)', displayText: 'iDevil' },
      { text: 'iDFolium(1.0,3.0)', displayText: 'iDFolium' },
      { text: 'iSpiral(1.0,3.0,1.0)', displayText: 'iSpiral' },
      { text: 'iFermatSpiral(1.0,1.0,1.0)', displayText: 'iFermatSpiral' },
      { text: 'iFreethNephroid(1.0,1.0,2.0)', displayText: 'iFreethNephroid' },
      { text: 'iInvoluteCircle(1.0,10.0)', displayText: 'iInvoluteCircle' },
    ],

    // Fonctions FCS - Courbes paramétriques
    parametricCurves: [
      { text: 'pAstroid(1.0)', displayText: 'pAstroid' },
      { text: 'pSpiral()', displayText: 'pSpiral' },
      { text: 'pCardioid(1.0,2.0)', displayText: 'pCardioid' },
      { text: 'pConchoid(1.0)', displayText: 'pConchoid' },
      { text: 'pEpicycloid(1.0,1.0)', displayText: 'pEpicycloid' },
      { text: 'pDescartesFolium(1.0,1.0)', displayText: 'pDescartesFolium' },
      { text: 'pHypocycloid(1.0,2.0)', displayText: 'pHypocycloid' },
      { text: 'pHypotrochoid(1.0,2.0,1.0)', displayText: 'pHypotrochoid' },
      { text: 'pInvoluteCircle(1.0)', displayText: 'pInvoluteCircle' },
      { text: 'pCircle(1.0)', displayText: 'pCircle' },
      { text: 'pLissajous(5.0,1.0,1.0,0.0)', displayText: 'pLissajous' },
      { text: 'pNephroid(1.0)', displayText: 'pNephroid' },
      { text: 'pPlateau(2.0,1.0)', displayText: 'pPlateau' },
      { text: 'pTalbot(1.0)', displayText: 'pTalbot' },
    ],

    // Fonctions FCS - Surfaces paramétriques
    parametricSurfaces: [
      { text: 'pSphere(1.0,1.0)', displayText: 'pSphere' },
      { text: 'pMobiusStrip(1.0,1.0)', displayText: 'pMobiusStrip' },
      { text: 'pCylinder(1.0,1.0)', displayText: 'pCylinder' },
      { text: 'pKleinBottle(1.0,1.0)', displayText: 'pKleinBottle' },
      { text: 'pCrossCap(1.0,1.0)', displayText: 'pCrossCap' },
      { text: 'pSteiner(1.0,1.0)', displayText: 'pSteiner' },
      { text: 'pTorus(1.0,1.0,0.5)', displayText: 'pTorus' },
    ],

    // Fonctions FCS - Surfaces implicites 
    implicitSurfaces: [
      { text: 'iSphere()', displayText: 'iSphere' },
      { text: 'iCube()', displayText: 'iCube' },
      { text: 'iTorus(0.5,1.0)', displayText: 'iTorus' },
      { text: 'iPlane(1.0,1.0,1.0)', displayText: 'iPlane' },
      { text: 'iSteiner(1.0)', displayText: 'iSteiner' },
      { text: 'iWineGlass(3.2)', displayText: 'iWineGlass' },
      { text: 'iGenus2()', displayText: 'iGenus2' },
    ],

    // Fonctions FCS - Surfaces paramétriques inverses
    inverseParametricSurfaces: [
      { text: 'ipSphere(1.0)', displayText: 'ipSphere' },
      { text: 'ipTorus(1.0)', displayText: 'ipTorus' },
      { text: 'ipMobiusStrip()', displayText: 'ipMobiusStrip' },
      { text: 'ipCylinder()', displayText: 'ipCylinder' },
      { text: 'ipKleinBottle()', displayText: 'ipKleinBottle' },
      { text: 'ipCrossCap(1.0)', displayText: 'ipCrossCap' },
    ],

    // Fonctions FCS - Hypersurfaces paramétriques
    parametricHypersurfaces: [
      { text: 'hpSphere(1.0)', displayText: 'hpSphere' },
      { text: 'hpTorus(1.0,0.5)', displayText: 'hpTorus' },
      { text: 'hpCone(1.0)', displayText: 'hpCone' },
      { text: 'hpConeOblique(1.0,1.0,1.0,1.0)', displayText: 'hpConeOblique' },
    ],

    // Fonctions FCS - Courbes explicites
    explicitCurves: [
      { text: 'eCircle(1.0,1.0)', displayText: 'eCircle' },
      { text: 'eBicorn(1.0)', displayText: 'eBicorn' },
      { text: 'eCatenary(1.0)', displayText: 'eCatenary' },
      { text: 'eCissoid(1.0,2.0)', displayText: 'eCissoid' },
      { text: 'eLame(2.0,2.5,3.0,2.0)', displayText: 'eLame' },
      { text: 'eNewton(2.0,0.4,1.0,0.8)', displayText: 'eNewton' },
      { text: 'ePearl(2.0,1.0,1.0,1.0,1.0,1.0)', displayText: 'ePearl' },
      { text: 'ePear(2.0,2.0,9.0)', displayText: 'ePear' },
      { text: 'eStrophoid(2.0,5.0)', displayText: 'eStrophoid' },
      { text: 'eTrisectrix(2.0,1.0)', displayText: 'eTrisectrix' },
    ],

    noise: [
      // lib-noise sources
      { text: 'whitenoise(10.0,0.0)', displayText: 'whitenoise' },
      { text: 'colornoise(10.0,0.0)', displayText: 'colornoise' },
      { text: 'unoise(10.0,0.1)', displayText: 'unoise' },
      { text: 'turb(10.0,0.1,3.0)', displayText: 'turb' },
      { text: 'uturb(10.0,0.1,3.0)', displayText: 'uturb' },
      { text: 'warp(10.0,0.1,2.0,3.0,1.0)', displayText: 'warp' },
      { text: 'cwarp(10.0,0.1,2.0,3.0,1.0,0.5)', displayText: 'cwarp' },
      { text: 'ncontour(0.5,0.1,3,5.0,0.5,2.0)', displayText: 'ncontour' },
    ],
    art: [
      // op-art patterns sources (lib-pattern)
      { text: 'brick(0.25,0.08,0.01)', displayText: 'brick' },
      { text: 'checker(10.0)', displayText: 'checker' },
      { text: 'concentric(100.0,0.5,0.5)', displayText: 'concentric' },
      { text: 'hextile(10.0)', displayText: 'hextile' },
      { text: 'lissa(0.0,10.0,3.0,0.025)', displayText: 'lissa' },
      { text: 'pulse(0.5,0.05,0.001)', displayText: 'pulse' },
      { text: 'pulsetrain(3.0,0.5,0.05,0.001)', displayText: 'pulsetrain' },
      { text: 'spiral(1.0,5.0,0.1)', displayText: 'spiral' },
      { text: 'wave(0.0,10.0,3.0,0.025)', displayText: 'wave' },
    ],
    pattern: [
      // Soft patterns sources (lib-softpattern)
      { text: 'blinking(5.0,5.0,0.5,0.03)', displayText: 'blinking' },
      { text: 'blobs(0.1,0.2,0.05)', displayText: 'blobs' },
      { text: 'concentric2(5.0,2.0,0.5,1.0)', displayText: 'concentric2' },
      { text: 'phasenoise(0,0.1,5.0,0.5,0.03)', displayText: 'phasenoise' },
      { text: 'sdfmove(0.73,1.0,-0.5)', displayText: 'sdfmove' },
      { text: 'smoothsun(0.3,0.2,1.0,0.5)', displayText: 'smoothsun' }
    ],
    antliaShapes: [
      // Basic shapes
      { text: 'circle(0.3,0.007)', displayText: 'circle' },
      { text: 'square(0.25,0)', displayText: 'square' },
      { text: 'rectangle(0.3,[1,1],0)', displayText: 'rectangle' },
      { text: 'triangle(0.3,0.007)', displayText: 'triangle' },
      
      // Strips
      { text: 'horiz(0.3,0.0007)', displayText: 'horiz' },
      { text: 'vert(0.3,0.0007)', displayText: 'vert' },
      { text: 'leftdiag(0.3,0.0007)', displayText: 'leftdiag' },
      { text: 'rightdiag(0.3,0.0007)', displayText: 'rightdiag' },
      
      // Quadrants
      { text: 'firstquad(1,1,1,1)', displayText: 'firstquad' },
      { text: 'secondquad(1,1,1,1)', displayText: 'secondquad' },
      { text: 'thirdquad(1,1,1,1)', displayText: 'thirdquad' },
      { text: 'fourthquad(1,1,1,1)', displayText: 'fourthquad' },
      { text: 'quad(0,1,1,1,1)', displayText: 'quad' },
      
      // Extra shapes
      { text: 'star(0.3,5,0.007)', displayText: 'star' },
      { text: 'grid(8,4,0.05,0.001)', displayText: 'grid' },
    ],
    
    initSources: [
      { text: 's0.initCam()', displayText: 'SrcWebCam' },
      { text: 's0.initImage("")', displayText: 'SrcImage' },
      { text: 's0.initVideo("")', displayText: 'SrcVideo' },
      { text: 's0.initScreen()', displayText: 'SrcScreen' },
    ],

    // Transformations (modificateurs)
    transformations: [
      { text: 'add()', displayText: 'add' },
      { text: 'sub()', displayText: 'sub' },
      { text: 'mult()', displayText: 'mult' },
      { text: 'blend()', displayText: 'blend' },
      { text: 'diff()', displayText: 'diff' },
      { text: 'layer()', displayText: 'layer' },
      { text: 'mask()', displayText: 'mask' },
      { text: 'modulate()', displayText: 'modulate' },
      { text: 'modulateRepeat(src(o0),3,3,0.5,0.5)', displayText: 'modulateRepeat' },
      { text: 'modulateRepeatX(src(o0),3,0.5)', displayText: 'modulateRepeatX' },
      { text: 'modulateRepeatY(src(o0),3,0.5)', displayText: 'modulateRepeatY' },
      { text: 'modulateRotate(src(o0),1,0)', displayText: 'modulateRotate' },
      { text: 'modulateScale(src(o0),1,1)', displayText: 'modulateScale' },
      { text: 'modulatePixelate(src(o0),10,3)', displayText: 'modulatePixelate' },
      { text: 'modulateHue(src(o0),1)', displayText: 'modulateHue' },
      { text: 'modulateKaleid(src(o0),4)', displayText: 'modulateKaleid' },
      { text: 'modulateScrollX(src(o0),0.5,0)', displayText: 'modulateScrollX' },
      { text: 'modulateScrollY(src(o0),0.5,0)', displayText: 'modulateScrollY' },
      { text: 'out(o0)', displayText: 'out' },
    ],
    
    // Effects
    effects: [
      { text: 'brightness(0.4)', displayText: 'brightness' },
      { text: 'contrast(1.6)', displayText: 'contrast' },
      { text: 'color(1,1,1)', displayText: 'color' },
      { text: 'colorama(0.005)', displayText: 'colorama' },
      { text: 'sum(1)', displayText: 'sum' },
      { text: 'r(1,0)', displayText: 'r' },
      { text: 'g(1,0)', displayText: 'g' },
      { text: 'b(1,0)', displayText: 'b' },
      { text: 'a(1,0)', displayText: 'a' },
      { text: 'invert(1)', displayText: 'invert' },
      { text: 'luma(0.5,0.1)', displayText: 'luma' },
      { text: 'posterize(3,0.6)', displayText: 'posterize' },
      { text: 'saturate(2)', displayText: 'saturate' },
      { text: 'hue(0.4)', displayText: 'hue' },
      { text: 'shift(0.1,0.1,0.1,0.1)', displayText: 'shift' },
      { text: 'thresh(0.5,0.04)', displayText: 'thresh' },
      { text: 'kaleid(4)', displayText: 'kaleid' },
      { text: 'pixelate(20,20)', displayText: 'pixelate' },
      { text: 'repeat(3,3,0,0)', displayText: 'repeat' },
      { text: 'repeatX(3,0)', displayText: 'repeatX' },
      { text: 'repeatY(3,0)', displayText: 'repeatY' },
      { text: 'rotate(10,0)', displayText: 'rotate' },
      { text: 'scale(1, screenRatio)', displayText: 'scale' },
      { text: 'scroll(0.5,0.5,0,0)', displayText: 'scroll' },
      { text: 'scrollX(0.5,0)', displayText: 'scrollX' },
      { text: 'scrollY(0.5,0)', displayText: 'scrollY' },
    ],
    
    // Color Effects
    colorEffects: [
      // Sepia filter
      { text: 'sepia(1.0)', displayText: 'sepia' },
      
      // Color level reduction
      { text: 'levels(3.0,1.0)', displayText: 'levels' },
      { text: 'monotone(3.0,0.6,1.0)', displayText: 'monotone' },
      
      // HSV manipulation
      { text: 'hsvshift(0.0,1.0,1.0)', displayText: 'hsvshift' },
      
      // Color gradients
      { text: 'grarose(1.0)', displayText: 'grarose' },
      { text: 'grawave(1.0)', displayText: 'grawave' },
      
      // Vector math color effects
      { text: 'colcross(1.0)', displayText: 'colcross' },
      { text: 'coldot(1.0)', displayText: 'coldot' },
      { text: 'colboost(1.0)', displayText: 'colboost' },
      { text: 'colreflect(1.0)', displayText: 'colreflect' },
    ],

     // Screen Space Shaders
    screenSpaceShaders: [
      { text: 'dither()', displayText: 'dither' },
      { text: 'dither2()', displayText: 'dither2' },
      { text: 'dither4()', displayText: 'dither4' },
      { text: 'ditherrnd()', displayText: 'ditherrnd' },
      { text: 'ditherrndcolor()', displayText: 'ditherrndcolor' },
      { text: 'erode()', displayText: 'erode' },
      { text: 'dilate()', displayText: 'dilate' },
      { text: 'blur()', displayText: 'blur' },
      { text: 'blurmore()', displayText: 'blurmore' },
      { text: 'sharpen()', displayText: 'sharpen' },
      { text: 'emboss()', displayText: 'emboss' },
      { text: 'edge()', displayText: 'edge' },
      { text: 'sobelx()', displayText: 'sobelx' },
      { text: 'sobely()', displayText: 'sobely' },
      { text: 'pxsort(0.2, 0, 0, 1)', displayText: 'pxsort' },
      { text: 'pysort(0.2, 0, 0, 1)', displayText: 'pysort' },
    ],

    // Fractal Effects
    fractalEffects: [
      // Mirroring functions
      { text: 'mirrorX(0,1)', displayText: 'mirrorX' },
      { text: 'mirrorY(0,1)', displayText: 'mirrorY' },
      { text: 'mirrorX2(0,1)', displayText: 'mirrorX2' },
      { text: 'mirrorY2(0,1)', displayText: 'mirrorY2' },
      { text: 'mirrorWrap()', displayText: 'mirrorWrap' },
      { text: 'polar(1.0, 1.0, 0.5, 0.5)', displayText: 'polar' },
      
      // Other fractal functions
      { text: 'inversion()', displayText: 'inversion' },
    ],

    // Utilities functions
    utilities: [
      { text: 'render(o0)', displayText: 'render' },
      { text: 'update = () => {}', displayText: 'update' },
      { text: 'setResolution(1920,1080)', displayText: 'setResolution' },
      { text: 'setFunction({})', displayText: 'setFunction' },
      { text: 'setBins(4)', displayText: 'setBins' },
      { text: 'setCutoff(4)', displayText: 'setCutoff' },
      { text: 'setSmooth(0.8)', displayText: 'setSmooth' },
      { text: 'setScale(2)', displayText: 'setScale' },
      { text: 'hide()', displayText: 'hide' },
      { text: 'show()', displayText: 'show' },
    ],
    
    // Math functions and constants
    mathFunctions: [
      { text: '()=>Math.sin(time)', displayText: 'time' },
      { text: '()=>sinrange(time, 0,1,1,1)', displayText: 'sinrange' },
      { text: '()=>cosrange(time, 0,1,1)', displayText: 'cosrange' },
      { text: '()=>sinrange(time, 0,1,1)', displayText: 'tanrange' },
      { text: '()=>sawrange(time, 0,1,1)', displayText: 'sawrange' },
      { text: '()=>mouse.x', displayText: 'mouse.x' },
      { text: '()=>mouse.y', displayText: 'mouse.y' },
      { text: '()=>a.fft[0]', displayText: 'a0' },
      { text: '()=>a.fft[1]', displayText: 'a1' },
      { text: '()=>a.fft[2]', displayText: 'a2' },
      { text: '()=>a.fft[3]', displayText: 'a3' },
      { text: 'Math.sin()', displayText: 'sin' },
      { text: 'Math.cos()', displayText: 'cos' },
      { text: 'Math.tan()', displayText: 'tan' },
      { text: 'saw()', displayText: 'saw' },
      { text: '()=>sawt()', displayText: 'sawt' },
      { text: '()=>bouncet(time, 3, 1, 8)', displayText: 'bouncet' },
      { text: 'Math.random()', displayText: 'random' },
      { text: 'rand(0,1)', displayText: 'rand' },
      { text: 'Math.PI', displayText: 'Math.PI' },
      { text: 'Math.abs()', displayText: 'abs' },
      { text: 'Math.floor()', displayText: 'floor' },
      { text: 'Math.ceil()', displayText: 'ceil' },
      { text: 'Math.round()', displayText: 'round' },
      { text: 'Math.min()', displayText: 'min' },
      { text: 'Math.max()', displayText: 'max' },
      { text: 'screenRatio', displayText: 'sr' },
    ],

    space : [
      { text: 'invtile(0.5)', displayText: 'invtile' },
      { text: 'invsqrt(0.5)', displayText: 'invsqrt' },
      { text: 'abslog(1.0)', displayText: 'abslog' },
      { text: 'swave(1.0)', displayText: 'swave' },
      { text: 'centermag(0.4,0.2,0,0)', displayText: 'centermag' },

    ],

    arrayMethods: [
      { text: 'smooth()', displayText: 'smooth' },
      { text: 'fast(1)', displayText: 'fast' },
      { text: 'ease("linear")', displayText: 'ease' },
      { text: 'offset(0)', displayText: 'offset' },
      { text: 'fit(0,1)', displayText: 'fit' },
    ],

    // Separators for better organization
    createSeparator: function(text) {
        return {
            text: "", 
            displayText: text,
            className: "autocomplete-separator",
            render: function(element, self, data) {
                element.className += " autocomplete-separator";
                element.innerHTML = `<span class="separator-text">${data.displayText}</span>`;
                element.style.pointerEvents = 'none';
                element.style.cursor = 'default';
                element.setAttribute('data-separator', 'true');
                element.setAttribute('aria-disabled', 'true');
            },
            hint: function() {
                return false;
            },
            disabled: true,
            separator: true
        };
    },

    hint: function(cm, CodeMirror) {
        const cursor = cm.getCursor();
        const line = cm.getLine(cursor.line);
        const beforeCursor = line.slice(0, cursor.ch);
        const token = cm.getTokenAt(cursor);
        const cursorPosition = cursor.ch;
        
        const allSuggestions = [
            this.createSeparator("🔥 Sources"),
            ...this.sources,
            this.createSeparator("🌊 Noise Functions"),
            ...this.noise,
            this.createSeparator("🎨 Art Patterns"),
            ...this.art,
            this.createSeparator("✨ Soft Patterns"),
            ...this.pattern,
            this.createSeparator("🔷 Antlia Shapes"),
            ...this.antliaShapes,
            this.createSeparator("� Implicit Curves FCS"),
            ...this.implicitCurves,
            this.createSeparator("🌐 Parametric Surfaces FCS"),
            ...this.parametricSurfaces,
            this.createSeparator("�📺 Init Sources"),
            ...this.initSources,
            this.createSeparator("🔄 Transformations"),
            ...this.transformations,
            this.createSeparator("⚡ Effects"),
            ...this.effects,
            this.createSeparator("🌌 Space Effects"),
            ...this.space,
            this.createSeparator("🌈 Color Effects"),
            ...this.colorEffects,
            this.createSeparator("🌁 Screen Space Shaders"),
            ...this.screenSpaceShaders,
            this.createSeparator("🪞 Fractal Effects"),
            ...this.fractalEffects,
            this.createSeparator("🛠️ Utilities"),
            ...this.utilities,
            this.createSeparator("🧮 Math & Audio"),
            ...this.mathFunctions
        ];

        const blankSuggestions = [
            this.createSeparator("🔥 Sources"),
            ...this.sources,
            this.createSeparator("🌊 Noise Functions"),
            ...this.noise,
            this.createSeparator("🎨 Art Patterns"),
            ...this.art,
            this.createSeparator("✨ Soft Patterns"),
            ...this.pattern,
            this.createSeparator("🔷 Antlia Shapes"),
            ...this.antliaShapes,
            this.createSeparator("� Implicit Curves FCS"),
            ...this.implicitCurves,
            this.createSeparator("🌐 Parametric Surfaces FCS"),
            ...this.parametricSurfaces,
            this.createSeparator("�📺 Init Sources"),
            ...this.initSources,
            this.createSeparator("🛠️ Utilities"),
            ...this.utilities,
        ];
      
        if (beforeCursor.trim() === '') {
            const suggestions = blankSuggestions.filter(item => {
                if (item.className === "autocomplete-separator") return true;
                return item.displayText.includes(token.string);
            });
            
            return {
                list: suggestions,
                from: CodeMirror.Pos(cursor.line, beforeCursor.lastIndexOf('(') + 1),
                to: CodeMirror.Pos(cursor.line, cursor.ch)
            };
        }
      
        // Array methods
        if (/\]\s*\.\s*\w*$/.test(beforeCursor)) {
            const prefix = token.string.slice(0, cursorPosition - token.start).replace(/[^a-zA-Z]/g, "");
            const dotIndex = beforeCursor.lastIndexOf('.');
            const suggestions = [
                this.createSeparator("🔗 Array Methods"),
                ...this.arrayMethods.filter(item => item.displayText.includes(prefix))
            ];
            return {
                list: suggestions,
                from: CodeMirror.Pos(cursor.line, dotIndex + 1),
                to: CodeMirror.Pos(cursor.line, cursor.ch)
            };
        }
      
        // Transformations and effects after a dot
        if (/\.\s*\w*$/.test(beforeCursor)) {
            const prefix = token.string.slice(0, cursorPosition - token.start).replace(/[^a-zA-Z]/g, "");
            const dotIndex = beforeCursor.lastIndexOf('.');
            
            const transformSuggestions = this.transformations.filter(item => item.displayText.includes(prefix));
            const effectSuggestions = this.effects.filter(item => item.displayText.includes(prefix));
            const colorEffectSuggestions = this.colorEffects.filter(item => item.displayText.includes(prefix));
            const fractalEffectSuggestions = this.fractalEffects.filter(item => item.displayText.includes(prefix));
            const screenSpaceSuggestions = this.screenSpaceShaders.filter(item => item.displayText.includes(prefix));
            const spaceSuggestion = this.space.filter(item => item.displayText.includes(prefix));
            const parametricCurvesSuggestions = this.parametricCurves.filter(item => item.displayText.includes(prefix));
            const implicitSurfacesSuggestions = this.implicitSurfaces.filter(item => item.displayText.includes(prefix));
            const inverseParametricSurfacesSuggestions = this.inverseParametricSurfaces.filter(item => item.displayText.includes(prefix));
            const parametricHypersurfacesSuggestions = this.parametricHypersurfaces.filter(item => item.displayText.includes(prefix));
            const explicitCurvesSuggestions = this.explicitCurves.filter(item => item.displayText.includes(prefix));

            const suggestions = [];
            if (transformSuggestions.length > 0) {
                suggestions.push(this.createSeparator("🔄 Transformations"));
                suggestions.push(...transformSuggestions);
            }
            if (effectSuggestions.length > 0) {
                suggestions.push(this.createSeparator("⚡ Effects"));
                suggestions.push(...effectSuggestions);
            }
            if (colorEffectSuggestions.length > 0) {
                suggestions.push(this.createSeparator("🌈 Color Effects"));
                suggestions.push(...colorEffectSuggestions);
            }
            if (implicitSurfacesSuggestions.length > 0) {
                suggestions.push(this.createSeparator("↕️ Implicit Surfaces FCS"));
                suggestions.push(...implicitSurfacesSuggestions);
            }
            if (fractalEffectSuggestions.length > 0) {
                suggestions.push(this.createSeparator("🪞 Fractal Effects"));
                suggestions.push(...fractalEffectSuggestions);
            }
            if (screenSpaceSuggestions.length > 0) {
                suggestions.push(this.createSeparator("🌁 Screen Space Shaders"));
                suggestions.push(...screenSpaceSuggestions);
            }
            if (spaceSuggestion.length > 0) {
                suggestions.push(this.createSeparator("🌌 Space Effects"));
                suggestions.push(...spaceSuggestion);
            }
            if (parametricCurvesSuggestions.length > 0) {
                suggestions.push(this.createSeparator("📊 Parametric Curves FCS"));
                suggestions.push(...parametricCurvesSuggestions);
            }
            if (inverseParametricSurfacesSuggestions.length > 0) {
                suggestions.push(this.createSeparator("🔄 Inverse Parametric Surfaces FCS"));
                suggestions.push(...inverseParametricSurfacesSuggestions);
            }
            if (parametricHypersurfacesSuggestions.length > 0) {
                suggestions.push(this.createSeparator("🌀 Parametric Hypersurfaces FCS"));
                suggestions.push(...parametricHypersurfacesSuggestions);
            }
            if (explicitCurvesSuggestions.length > 0) {
                suggestions.push(this.createSeparator("📈 Explicit Curves FCS"));
                suggestions.push(...explicitCurvesSuggestions);
            }
            
            return {
                list: suggestions,
                from: CodeMirror.Pos(cursor.line, dotIndex + 1),
                to: CodeMirror.Pos(cursor.line, cursor.ch)
            };
        }
      
        const prefix = token.string.slice(0, cursorPosition - token.start).replace(/[^a-zA-Z]/g, "");
        const suggestions = (prefix !== '') ? allSuggestions.filter(item => {
            // if (item.className === "autocomplete-separator") return true;
            return item.displayText.includes(prefix);
        }) : allSuggestions;
        
        return {
          list: suggestions,
          from: CodeMirror.Pos(cursor.line, cursor.ch - prefix.length),
          to: CodeMirror.Pos(cursor.line, cursor.ch)
        };
    }
};