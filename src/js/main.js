import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/mode/javascript/javascript.js';

// Importing styles
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/dialog/dialog.css'
import '/src/css/style.css';
import '/src/css/configPanel.css';
import '/src/css/customCodeMirror.css';

// codeMirror library
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/keymap/sublime'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/comment/comment'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/addon/selection/mark-selection'; 


// Importing utility functions
import { configPanel } from './configPanel.js';
import { hydraUtils } from './hydraUtils.js';
import { hydraAutocomplete } from './hydraAutocomplete.js';
import { hydraColorPicker } from './colorPicker.js';
import { showHydraDefinition, removeAllTooltips } from './hydraDefinition.js';

// Initialiser CodeMirror
document.addEventListener('DOMContentLoaded', () => {

  const savedContent = localStorage.getItem('hydra-editor-content');
  const defaultContent = 'osc(20, 0.1, 0).out()';

  const editor = CodeMirror(document.getElementById('editor'), {
    value: savedContent || defaultContent,
    mode: 'javascript',
    theme: 'cobalt',
    keyMap: 'sublime',
    lineNumbers: false,
    autofocus: true,
    autoCloseBrackets: true,
    styleActiveLine: true,
    styleSelectedText: true,
    indentUnit: 2,
    tabSize: 2,
    matchBrackets: true,
    autoCloseBrackets: true,
    lineWrapping: true
  });

  // save the content to localStorage
  function saveContent() {
    const content = editor.getValue();
    localStorage.setItem('hydra-editor-content', content);
  }

  configPanel.init(editor);

  const nonOutputFunctions = ["initCam", "initImage", "initVideo", "initScreen", "render", "setResolution", "setBin", "setCutoff", "setSmooth", "setScale", "hide", "show", "p5", "P5", "hush"];

  // Evaluate the code block, flash it, and save the content
  function evaluateCodeHydra(cm){
    var {startLine,endLine} = hydraUtils.getBlock(cm, cm.getCursor().line);
    let blockCode = cm.getRange({line: startLine, ch: 0}, {line: endLine, ch: cm.getLine(endLine).length});

    // Check if block end with .out(...) and if it's not a non-output function
    const isNonOutputFunction = nonOutputFunctions.some(func => blockCode.includes(func));

    const outRegex = /\.out\s*\(.*\)\s*;?$/m;
    if (!outRegex.test(blockCode) && !isNonOutputFunction) {
      // Add .out() at the end of the block
      blockCode = blockCode.trim();
      blockCode += '.out()'

      // Remplacer le code dans l'éditeur
      cm.replaceRange(
        blockCode,
        { line: startLine, ch: 0 },
        { line: endLine, ch: cm.getLine(endLine).length }
      );
    }

    hydraUtils.evaluateCode(blockCode);
    flashCode(startLine, endLine);
    saveContent();
  }
  
  function evaluateCodeHydraWithoutAddOut(cm) {
    var {startLine,endLine} = hydraUtils.getBlock(cm, cm.getCursor().line);
    let blockCode = cm.getRange({line: startLine, ch: 0}, {line: endLine, ch: cm.getLine(endLine).length});

    hydraUtils.evaluateCode(blockCode);
    flashCode(startLine, endLine);
    saveContent();
  }

  // Flash the code block
  function flashCode(lineStart, lineEnd) {
    for (let i = lineStart; i <= lineEnd; i++) {
      const mark = editor.markText(
              {line: i, ch: 0},
              {line: i, ch: editor.getLine(i).length},
              {className: 'flash-highlight'}
          );
          setTimeout(() => mark.clear(), 200);
      }
  }

  // Toggle the visibility of the editor
  function toggleEditorVisibility() {
    console.log("Toggling editor visibility");
    const editorElement = document.getElementById('editor');
    editorElement.classList.toggle('hideEditor');
  }

  // Open the color picker and replace the color code
  function selectColor(cm) {
    const detection = hydraColorPicker.detectColorFunction(cm);
        
        if (detection.found) {
            hydraColorPicker.openNativeColorPicker(cm, detection, (r, g, b, detectionInfo) => {
                const newColorCode = `${r.toFixed(2)}, ${g.toFixed(2)}, ${b.toFixed(2)}`;
                const startPos = { line: detectionInfo.start.line, ch: detectionInfo.openParenPos };
                const endPos = { line: detectionInfo.start.line, ch: detectionInfo.closeParenPos };
                
                cm.replaceRange(newColorCode, startPos, endPos);
                evaluateCodeHydra(cm);
            });
        } else {
            console.log('Place your cursor in a .color() function to use the color picker');
        }
  } 

  // key mapping
  editor.addKeyMap({
    'Ctrl-Enter': function(cm) {evaluateCodeHydra(cm);},
    'Ctrl-Alt-Enter': function(cm) {evaluateCodeHydraWithoutAddOut(cm);},
    'Cmd-Enter': function(cm) {evaluateCodeHydra(cm);},
    'Cmd-Alt-Enter': function(cm) {evaluateCodeHydraWithoutAddOut(cm);},
    'Ctrl-Space': 'autocomplete',
    'Cmd-Space': 'autocomplete', 
    'Ctrl-;': ()=> { hydraUtils.stopHydra(); },
    'Cmd-;': ()=> { hydraUtils.stopHydra(); }, 
    'Alt-X': (cm) => {cm.toggleComment();},
    'Alt-Up': (cm) => {
                    hydraUtils.incrementValue(cm, 1)
                    evaluateCodeHydra(cm);
                  },
    'Alt-Down': (cm) => {
                    hydraUtils.incrementValue(cm, -1)
                    evaluateCodeHydra(cm);
                  },
    'Alt-I': (cm) => { showHydraDefinition(cm, ); },
    'Esc': () => { removeAllTooltips(); },
    'Alt-H': (cm) => {toggleEditorVisibility();},
    'Ctrl-S': (cm)=> {hydraUtils.saveEditorContent(cm)},
    'Cmd-S': (cm)=> {hydraUtils.saveEditorContent(cm)}, 
    'Ctrl-K': (cm) => { selectColor(cm); },
    'Cmd-K': (cm) => { selectColor(cm); }, 
    'Alt-1': () => { hydraUtils.switchOutput(0)},
    'Alt-2': () => { hydraUtils.switchOutput(1)},
    'Alt-3': () => { hydraUtils.switchOutput(2)},
    'Alt-4': () => { hydraUtils.switchOutput(3)},
    'Alt-5': () => { hydraUtils.switchOutput()},
    'Alt-P': () => { configPanel.togglePanel(); },
  });

  editor.setOption('hintOptions', {
    hint: (cm) => {
      return hydraAutocomplete.hint(cm, CodeMirror);
    },
    completeSingle: false,
    extraKeys: {
      'Right': function(cm, handle) {
        // Si on est sur une catégorie, montrer ses éléments
        const activeElement = document.querySelector('.CodeMirror-hint-active');
        if (activeElement) {
          const categoryAttr = activeElement.getAttribute('data-category');
          
          if (categoryAttr) {
            const categoryItems = hydraAutocomplete.showCategoryItems(cm, categoryAttr);
            if (categoryItems) {
              handle.close();
              setTimeout(() => {
                cm.showHint({
                  hint: () => categoryItems,
                  completeSingle: false,
                  extraKeys: {
                    'Left': function(cm, handle) {
                      // Retour aux catégories
                      handle.close();
                      setTimeout(() => {
                        cm.showHint();
                      }, 50);
                    }
                  }
                });
              }, 50);
            }
          }
        }
      },
      'Left': function(cm, handle) {
        // Si on est dans les éléments et que le premier élément (bouton retour) est sélectionné
        const selectedItem = handle.data[handle.selectedHint];
        if (selectedItem && selectedItem.displayText && selectedItem.displayText.includes('Retour aux catégories')) {
          handle.close();
          setTimeout(() => {
            cm.showHint();
          }, 50);
        }
      }
    }
  });


  window.addEventListener('beforeunload', () => {
    saveContent();
  });


  try {
    hydraUtils.init();
    console.log("Hydra initialized successfully.");
  } catch (error) {
    console.error("Error initializing Hydra:", error);
  }

});