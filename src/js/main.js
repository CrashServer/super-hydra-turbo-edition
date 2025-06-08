import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/cobalt.css';
import 'codemirror/mode/javascript/javascript.js';

// Importing styles
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/hint/show-hint.css'
import 'codemirror/addon/dialog/dialog.css'
import '/src/css/style.css';

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

  function evaluateCodeHydra(cm){
    var {startLine,endLine} = hydraUtils.getBlock(cm, cm.getCursor().line);
    const blockCode = cm.getRange({line: startLine, ch: 0}, {line: endLine, ch: cm.getLine(endLine).length});
    hydraUtils.evaluateCode(blockCode);
    flashCode(startLine, endLine);
    saveContent();
  }
  
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

  function toggleEditorVisibility() {
    console.log("Toggling editor visibility");
    const editorElement = document.getElementById('editor');
    editorElement.classList.toggle('hideEditor');
  }

  // key mapping
  editor.addKeyMap({
    'Ctrl-Enter': function(cm) {
      evaluateCodeHydra(cm);
    },
    'Ctrl-Space': 'autocomplete',
    'Ctrl-;': ()=> { hydraUtils.stopHydra(); },
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
  });

  editor.setOption('hintOptions', {
    hint: (cm) => {
      return hydraAutocomplete.hint(cm, CodeMirror);
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