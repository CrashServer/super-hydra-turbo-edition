export const configPanel = {
    panel: null,
    editor: null,
    popupWindow: null,

    shortcuts: [
        { key: 'Ctrl+Enter', description: 'Execute code block' },
        { key: 'Ctrl+Space', description: 'Autocomplete' },
        { key: 'Ctrl+;', description: 'Stop Hydra (hush)' },
        { key: 'Alt+X', description: 'Toggle Comment' },
        { key: 'Alt+↑', description: 'Increment value' },
        { key: 'Alt+↓', description: 'Decrement value' },
        { key: 'Alt+I', description: 'Show definition' },
        { key: 'Alt+H', description: 'Hide/Show code' },
        { key: 'Ctrl+S', description: 'Save Code' },
        { key: 'Escape', description: 'Close tooltips/panel' },
        { key: 'Ctrl+K', description: 'Open color picker in .color()' }
    ],

    init: function(editor) {
        this.editor = editor;
        this.panel = document.getElementById('config-panel');
        this.setupEventListeners();
        this.loadSettings();
        this.updateShortcutsList();
    },

    setupEventListeners: function() {
        const configToggle = document.getElementById('config-toggle');
        const configClose = document.getElementById('config-close');
        const fontSelect = document.getElementById('font-select');
        const fontSizeRange = document.getElementById('font-size');
        const themeSelect = document.getElementById('theme-select');
        const openPopupBtn = document.getElementById('open-popup');
        const showAboutBtn = document.getElementById('show-about');
        const aboutModal = document.getElementById('about-modal');
        const closeAboutBtn = document.getElementById('close-about');

        // open/close config panel
        configToggle.addEventListener('click', () => this.togglePanel());
        configClose.addEventListener('click', () => this.togglePanel());

        // Font selection
        fontSelect.addEventListener('change', (e) => {
            this.setFont(e.target.value);
            this.saveSettings();
        });

        // Font size adjustment
        fontSizeRange.addEventListener('input', (e) => {
            const size = e.target.value;
            document.getElementById('font-size-value').textContent = size + 'px';
            this.setFontSize(size);
            this.saveSettings();
        });

        // Theme selection
        themeSelect.addEventListener('change', (e) => {
            this.editor.setOption('theme', e.target.value);
            this.saveSettings();
        });

        // Popup Canvas clone
        openPopupBtn.addEventListener('click', () => {
        this.openCanvasPopup();
        });

        // Modal About
        showAboutBtn.addEventListener('click', () => {
            aboutModal.classList.add('show');
        });

        closeAboutBtn.addEventListener('click', () => {
            aboutModal.classList.remove('show');
        });

        // Close modal clicking outside
        aboutModal.addEventListener('click', (e) => {
            if (e.target === aboutModal) {
                aboutModal.classList.remove('show');
            }
        });

        // Close panel or modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (aboutModal.classList.contains('show')) {
                    aboutModal.classList.remove('show');
                } else if (this.panel.classList.contains('open')) {
                    this.togglePanel();
                }
            }
        });
    },

    // Open a popup window with a canvas that mirrors the main canvas
    openCanvasPopup: function() {
        if (this.popupWindow && !this.popupWindow.closed) {
            this.popupWindow.close();
        }

        const mainCanvas = document.getElementById('canvas');
        const canvasWidth = mainCanvas.width || window.innerWidth;
        const canvasHeight = mainCanvas.height || window.innerHeight;

        this.popupWindow = window.open(
            '',
            'HydraCanvas',
            `width=${canvasWidth},height=${canvasHeight + 50},resizable=yes,scrollbars=no,status=no,menubar=no,toolbar=no`
        );

        const popupContent = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Hydra Canvas</title>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                        background-color: #000;
                        overflow: hidden;
                    }
                    #popup-canvas {
                        display: block;
                        width: 100vw;
                        height: 100vh;
                    }
                </style>
            </head>
            <body>
                <canvas id="popup-canvas"></canvas>
            </body>
            </html>
        `;

        this.popupWindow.document.write(popupContent);
        this.popupWindow.document.close();

        this.startCanvasSync();
    },

    // Synchronize the main canvas with the popup canvas
    startCanvasSync: function() {
        if (!this.popupWindow || this.popupWindow.closed) return;

        const mainCanvas = document.getElementById('canvas');
        const popupCanvas = this.popupWindow.document.getElementById('popup-canvas');

        const syncCanvas = () => {
            if (!this.popupWindow || this.popupWindow.closed) {
                this.popupWindow = null;
                return;
            }

            try {
                console.log('Syncing canvas...');
                popupCanvas.width = mainCanvas.width;
                popupCanvas.height = mainCanvas.height;
                
                const popupCtx = popupCanvas.getContext('2d');
                
                popupCtx.drawImage(mainCanvas, 0, 0);
                
            } catch (error) {
                console.log('Sync error:', error);
            }

            // schedule the next sync
            requestAnimationFrame(syncCanvas);
        };

        // Start the synchronization loop
        syncCanvas();

        this.popupWindow.addEventListener('beforeunload', () => {
            this.popupWindow = null;
        });
    },

    togglePanel: function() {
        this.panel.classList.toggle('open');
    },

    setFont: function(fontFamily) {
        const codeMirror = document.querySelector('.CodeMirror');
        codeMirror.style.fontFamily = `${fontFamily}, monospace`;
    },

    setFontSize: function(size) {
        this.editor.getWrapperElement().style.fontSize = size + 'px';
        this.editor.refresh(); 
    },

    updateShortcutsList: function() {
        const shortcutsList = document.getElementById('shortcuts-list');
        shortcutsList.innerHTML = '';
        
        this.shortcuts.forEach(shortcut => {
            const shortcutItem = document.createElement('div');
            shortcutItem.className = 'shortcut-item';
            shortcutItem.innerHTML = `
                <span class="shortcut-key">${shortcut.key}</span>
                <span class="shortcut-desc">${shortcut.description}</span>
            `;
            shortcutsList.appendChild(shortcutItem);
        });
    },

    loadSettings: function() {
        const settings = JSON.parse(localStorage.getItem('editor-settings') || '{}');
        
        // Font
        if (settings.font) {
            document.getElementById('font-select').value = settings.font;
            this.setFont(settings.font);
        }
        
        // Font Size
        if (settings.fontSize) {
            const fontSizeRange = document.getElementById('font-size');
            fontSizeRange.value = settings.fontSize;
            document.getElementById('font-size-value').textContent = settings.fontSize + 'px';
            this.setFontSize(settings.fontSize);
        }
        
        // Theme
        if (settings.theme) {
            document.getElementById('theme-select').value = settings.theme;
            this.editor.setOption('theme', settings.theme);
        }
    },

    saveSettings: function() {
        const settings = {
            font: document.getElementById('font-select').value,
            fontSize: document.getElementById('font-size').value,
            theme: document.getElementById('theme-select').value
        };
        localStorage.setItem('editor-settings', JSON.stringify(settings));
    },

};