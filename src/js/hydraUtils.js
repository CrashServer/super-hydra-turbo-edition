import Hydra from 'hydra-synth';

export const hydraUtils = {
    hydra: null,
    isInitialized: false,

    init: function() {
        if (this.isInitialized) return;
        
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
        const script = document.createElement('script');
        script.src = 'src/js/hydra_extra_shader.js'; 
            script.onload = () => {
            console.log('Shader definitions loaded');
            };
        script.onerror = () => {
            console.error('Erreur lors du chargement du shader externe');
            };
        document.head.appendChild(script);
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
}