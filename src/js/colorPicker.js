class HydraColorPicker {
    constructor() {
        this.hiddenInput = null;
        this.createHiddenInput();
    }

    // Crée un input color caché pour déclencher le sélecteur natif
    createHiddenInput() {
        this.hiddenInput = document.createElement('input');
        this.hiddenInput.type = 'color';
        this.hiddenInput.style.position = 'absolute';
        this.hiddenInput.style.left = '-9999px';
        this.hiddenInput.style.opacity = '0';
        this.hiddenInput.style.pointerEvents = 'none';
        this.hiddenInput.tabIndex = -1;
        document.body.appendChild(this.hiddenInput);
    }

    // Détecte si le curseur est dans une fonction .color()
    detectColorFunction(editor) {
        const cursor = editor.getCursor();
        const line = editor.getLine(cursor.line);
        
        const colorPattern = /\.color\s*\(/g;
        let match;
        
        while ((match = colorPattern.exec(line)) !== null) {
            const functionStart = match.index;
            const openParenPos = match.index + match[0].length - 1;
            
            let depth = 1;
            let closeParenPos = openParenPos;
            let foundClose = false;
            
            for (let i = openParenPos + 1; i < line.length && depth > 0; i++) {
                if (line[i] === '(') {
                    depth++;
                } else if (line[i] === ')') {
                    depth--;
                    if (depth === 0) {
                        closeParenPos = i;
                        foundClose = true;
                        break;
                    }
                }
            }
            
            if (cursor.ch > openParenPos && cursor.ch <= (foundClose ? closeParenPos : line.length)) {
                const content = line.substring(openParenPos + 1, foundClose ? closeParenPos : line.length);
                const values = this.parseColorValues(content);
                
                return {
                    found: true,
                    start: { line: cursor.line, ch: functionStart },
                    end: { line: cursor.line, ch: foundClose ? closeParenPos + 1 : line.length },
                    openParenPos: openParenPos + 1,
                    closeParenPos: foundClose ? closeParenPos : line.length,
                    currentValues: values,
                    isEmpty: content.trim() === ''
                };
            }
        }
        
        return { found: false };
    }

    parseColorValues(content) {
        const cleanContent = content.trim();
        
        if (cleanContent === '') {
            return { r: 1, g: 0, b: 0 };
        }
        
        const numbers = cleanContent.split(',').map(s => {
            const num = parseFloat(s.trim());
            return isNaN(num) ? 0 : Math.max(0, Math.min(1, num));
        });
        
        return {
            r: numbers[0] !== undefined ? numbers[0] : 1,
            g: numbers[1] !== undefined ? numbers[1] : 0,
            b: numbers[2] !== undefined ? numbers[2] : 0
        };
    }

    // Version avec showPicker()
    openNativeColorPicker(editor, detection, onApply) {
        if (!detection || !detection.found) {
            console.log('Place your cursor in a .color() function to use the color picker');
            return;
        }

        // Définir la couleur actuelle dans le sélecteur
        const currentHex = this.rgbToHex(
            detection.currentValues.r, 
            detection.currentValues.g, 
            detection.currentValues.b
        );
        this.hiddenInput.value = currentHex;

        // Nettoyer les anciens event listeners
        if (this.handleColorChange) {
            this.hiddenInput.removeEventListener('change', this.handleColorChange);
            this.hiddenInput.removeEventListener('input', this.handleColorChange);
        }

        // Créer le handler avec les bonnes variables dans le scope
        this.handleColorChange = (e) => {
            const selectedColor = e.target.value;
            const rgb = this.hexToRgb(selectedColor);
            
            // Appliquer la couleur
            if (onApply) {
                onApply(rgb.r, rgb.g, rgb.b, detection);
            }
            
            // Nettoyer les event listeners
            this.hiddenInput.removeEventListener('change', this.handleColorChange);
            this.hiddenInput.removeEventListener('input', this.handleColorChange);
        };

        // Attacher les event listeners
        this.hiddenInput.addEventListener('change', this.handleColorChange);
        this.hiddenInput.addEventListener('input', this.handleColorChange);

        // Utiliser showPicker() si disponible, sinon fallback
        try {
            if (this.hiddenInput.showPicker) {
                this.hiddenInput.showPicker();
            } else {
                // Fallback pour les navigateurs qui ne supportent pas showPicker()
                console.log('showPicker() not supported, using fallback...');
                this.openColorPickerFallback(editor, detection, onApply);
            }
        } catch (error) {
            console.log('Could not open color picker:', error);
            this.openColorPickerFallback(editor, detection, onApply);
        }
    }

    // Fallback avec mini-popup pour les navigateurs incompatibles
    openColorPickerFallback(editor, detection, onApply) {
        // Créer un petit popup centré
        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #0f1419, #1a1b26);
            border: 2px solid #4A90C2;
            border-radius: 8px;
            padding: 15px;
            z-index: 9999;
            font-family: 'Fira Code', monospace;
            color: #E8F4FD;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
        `;
        
        const title = document.createElement('div');
        title.textContent = '🎨 Color Picker';
        title.style.cssText = 'margin-bottom: 10px; text-align: center; font-weight: bold;';
        
        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.value = this.rgbToHex(detection.currentValues.r, detection.currentValues.g, detection.currentValues.b);
        colorInput.style.cssText = `
            width: 80px; 
            height: 40px; 
            border: 2px solid #6BBFDF; 
            border-radius: 6px;
            cursor: pointer;
            display: block;
            margin: 0 auto 10px auto;
        `;
        
        const instructions = document.createElement('div');
        instructions.textContent = 'Press Escape to cancel';
        instructions.style.cssText = 'font-size: 11px; text-align: center; opacity: 0.7;';
        
        popup.appendChild(title);
        popup.appendChild(colorInput);
        popup.appendChild(instructions);
        document.body.appendChild(popup);
        
        colorInput.addEventListener('change', (e) => {
            const rgb = this.hexToRgb(e.target.value);
            onApply(rgb.r, rgb.g, rgb.b, detection);
            document.body.removeChild(popup);
        });
        
        // Auto-focus et ouverture
        colorInput.focus();
        
        // Fermer avec Escape ou clic extérieur
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                if (document.body.contains(popup)) {
                    document.body.removeChild(popup);
                }
                document.removeEventListener('keydown', handleEscape);
                document.removeEventListener('click', handleClickOutside);
            }
        };
        
        const handleClickOutside = (e) => {
            if (!popup.contains(e.target)) {
                if (document.body.contains(popup)) {
                    document.body.removeChild(popup);
                }
                document.removeEventListener('keydown', handleEscape);
                document.removeEventListener('click', handleClickOutside);
            }
        };
        
        document.addEventListener('keydown', handleEscape);
        setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
        }, 100);
    }

    // Utilitaires de conversion
    rgbToHex(r, g, b) {
        const toHex = (n) => {
            const hex = Math.round(Math.max(0, Math.min(255, n * 255))).toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        };
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16) / 255,
            g: parseInt(result[2], 16) / 255,
            b: parseInt(result[3], 16) / 255
        } : { r: 0, g, b: 0 };
    }
}

export const hydraColorPicker = new HydraColorPicker();