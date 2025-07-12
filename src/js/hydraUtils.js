import Hydra from 'hydra-synth';
import P5 from './p5-wrapper.js';

export const hydraUtils = {
    hydra: null,
    isInitialized: false,
    extensionsLoaded: false,

    init: function() {
        if (this.isInitialized) return;
        
        window.p5 = P5; 

        if (typeof Hydra !== 'undefined') {
            this.setupHydra();
            this.isInitialized = true;
            return;
        } else {
            console.error("Hydra is not defined. Please ensure Hydra is loaded before using hydraUtils.");
        }
    },

    // Initialize Hydra and set up the canvas
    setupHydra: function() {
        const canvas = document.getElementById('canvas');
        this.hydra = new Hydra({
            canvas: canvas,
            detectAudio: true,
            enableStreamCapture: true,
            width: canvas.clientWidth,
            height: canvas.clientHeight
        });
        eval('setResolution(canvas.clientWidth, canvas.clientHeight)');
        eval('a.show()');
        eval('p5 = new P5()');
        
        // load Hydra extensions after setup
        this.loadHydraExtensions();
    },

    // load Hydra extensions dynamically
    async loadHydraExtensions() {
        if (this.extensionsLoaded) return;
        
        try {
            console.log('🔄 Loading Hydra extensions...');
            
            await import('./hydra_extra_shader.js');
            console.log('✅ Hydra Extra Shaders loaded');
            
            await import('./hydraFractal.js');
            console.log('✅ Hydra Fractals loaded');
            
            await import('./antlia-math.js');
            console.log('✅ Hydra Antlia Math loaded');

            await import('./antlia-shape.js');
            console.log('✅ Hydra Antlia Shapes loaded');

            await import('./hydraFCS.js');
            console.log('✅ Hydra FCS loaded');

            this.extensionsLoaded = true;
            console.log('🎉 All Hydra extensions loaded successfully!');
                        
        } catch (error) {
            console.error('❌ Error loading Hydra extensions:', error);
        }
    },

    getBlock: function(cm, lineNumber) {
        const totalLines = cm.lineCount();
        let startLine = lineNumber;
        let endLine = lineNumber;

        while (startLine > 0 && cm.getLine(startLine - 1).trim() !== '') {
            startLine--;
        }

        while (endLine < totalLines - 1 && cm.getLine(endLine + 1).trim() !== '') {
            endLine++;
        }

        return { startLine, endLine };
    },

    evaluateCode: function(code) {
        try {
            eval(code);
        } catch (error) {
            this.showErrorFlash(error.message);
            console.error("Error evaluating code:", error);
        }
    },

    showErrorFlash: function(errorMessage) {
        const existingFlash = document.querySelector('.error-flash');
        if (existingFlash) {
            existingFlash.remove();
        }

        const flashDiv = document.createElement('div');
        flashDiv.className = 'error-flash';
        flashDiv.textContent = `Erreur: ${errorMessage}`;
        
        document.body.appendChild(flashDiv);
        
        setTimeout(() => {
            if (flashDiv.parentNode) {
                flashDiv.remove();
            }
        }, 3000);
    },

    stopHydra: function() {
        eval('hush()');
    },

    incrementValue(cm, value) {
        const cursor = cm.getCursor();
        const line = cm.getLine(cursor.line);
        
        let start = cursor.ch;
        let end = cursor.ch;
        
        while (start > 0 && /[\d\.\-]/.test(line.charAt(start - 1))) {
            start--;
        }
        
        while (end < line.length && /[\d\.]/.test(line.charAt(end))) {
            end++;
        }
        
        let numberStr = line.substring(start, end);

        const startsWithDot = /^\.\d+$/.test(numberStr);
    
        if (startsWithDot) {
            numberStr = "0" + numberStr;
        }
        
        if (/^-?\d+(\.\d+)?$/.test(numberStr)) {
            let result;
            
            if (numberStr.includes('.')) {
                // Nombre décimal
                const num = parseFloat(numberStr);
                
                const decimalPart = numberStr.split('.')[1] || '';
                const precision = decimalPart.length > 0 ? decimalPart.length : 1;
                const multiplier = (precision > 1) ? 0.01 : 0.1;
                result = (num + (value * multiplier)).toFixed(precision);
                
            } else {
                const num = parseInt(numberStr, 10);
                
                if (Math.abs(num) > 300) {
                    result = (num + (value * 100)).toString();
                } else {
                    result = (num + value).toString();
                }
            }
            
            cm.replaceRange(result, {line: cursor.line, ch: start}, {line: cursor.line, ch: end});
            cm.setCursor({line: cursor.line, ch: start + result.length});
        }
    },

    saveEditorContent(cm) {
        let content = cm.getValue();
        let filename = '';

        if (!filename) {
            const timestamp = new Date().toISOString().replace(/[:.-]/g, '');
            filename = `hydraCode_${timestamp}.js`;
        }

        const blob = new Blob([content], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
    },

    switchOutput(outputNbr=null) {
        if (outputNbr === null) {
            this.evaluateCode('render()');
            document.getElementById('output-src').textContent = `all`;
        }
        else {
            document.getElementById('output-src').textContent = `o${outputNbr}`;
            const output = `render(o${outputNbr})`;
            this.evaluateCode(output);
        }
    } 
}