// Moodle User Interface Bypass Extension
// Bypasses Moodle's user input restrictions to allow normal browser functionality
// Based on the comprehensive GUI-re-enabling code from the Moodle Chrome Extension

console.log('🔓 Moodle UI Bypass extension loaded on:', window.location.href);

// Global error handler to catch undefined property access
window.addEventListener('error', function(e) {
  // COMPLETELY DISABLE ERROR HANDLING - let all errors pass through
  return false;
});

// Also catch unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
  // COMPLETELY DISABLE ERROR HANDLING - let all errors pass through
  return false;
});

// Hide ALL Moodle dialogue elements on course pages (no need to be selective)
function hideMoodleDialogues() {
  // Use wildcard matching to catch ALL possible variations
  const selectors = [
    'div[id*="moodle-dialogue"]',           // Any div with moodle-dialogue in ID
    'div[class*="moodle-dialogue"]',        // Any div with moodle-dialogue in class
    'div[class*="yui3-widget"]',           // Any div with yui3-widget in class
    'div[class*="yui3-panel"]',            // Any div with yui3-panel in class
    '.moodle-dialogue',                    // Any element with moodle-dialogue class
    '.moodle-exception',                   // Any element with moodle-exception class
    '.yui3-widget',                        // Any element with yui3-widget class
    '.yui3-panel',                         // Any element with yui3-panel class
    '.yui3-widget-modal',                  // Modal backdrop elements
    '.yui3-widget-stacked',                // Stacked widget elements
    '.yui3-widget-positioned',            // Positioned widget elements
    'div[class*="modal"]',                 // Any div with modal in class
    'div[class*="backdrop"]',              // Any div with backdrop in class
    'div[class*="overlay"]'                // Any div with overlay in class
  ];
  
  selectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      // Check if it contains "undefined" text or is clearly a problematic dialogue
      const elementText = element.textContent || element.innerText || '';
      
      if (elementText.includes('undefined') || 
          element.id.includes('moodle-dialogue') || 
          element.classList.contains('moodle-dialogue') ||
          element.classList.contains('moodle-exception')) {
        element.remove(); // Actually remove it from the DOM
        console.log('🔧 REMOVED element with selector:', selector, 'ID:', element.id);
      }
    });
  });
  
  // Also remove any elements that contain "undefined" text
  const allElements = document.querySelectorAll('*');
  allElements.forEach(element => {
    const elementText = element.textContent || element.innerText || '';
    if (elementText.trim() === 'undefined' && element.tagName !== 'SCRIPT' && element.tagName !== 'STYLE') {
      element.remove(); // Actually remove it from the DOM
      console.log('🔧 REMOVED element with undefined text:', element.tagName, element.className);
    }
  });
  
  // Remove modal backdrops/overlays that might be left behind
  const modalBackdrops = document.querySelectorAll('div[style*="position: fixed"], div[style*="z-index"], div[class*="modal"], div[class*="backdrop"], div[class*="overlay"]');
  modalBackdrops.forEach(element => {
    // Check if it's a backdrop by looking for typical backdrop styles
    const computedStyle = window.getComputedStyle(element);
    if (computedStyle.position === 'fixed' && 
        (computedStyle.backgroundColor.includes('rgba') || 
         computedStyle.backgroundColor.includes('transparent') ||
         element.classList.contains('yui3-widget-modal'))) {
      element.remove();
      console.log('🔧 REMOVED modal backdrop/overlay element');
    }
  });
}

// Run immediately and also on DOM changes
hideMoodleDialogues();

// Run continuously every 2 seconds to catch any that slip through
setInterval(hideMoodleDialogues, 2000);

// Watch for new elements being added and hide ALL moodle dialogues
const observer = new MutationObserver((mutations) => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node;
        
        // Remove ALL moodle dialogue elements that appear
        if ((element.id && element.id.includes('moodle-dialogue') || 
            element.classList.contains('moodle-dialogue') || 
            element.classList.contains('moodle-exception'))) {
          element.remove(); // Actually remove it from the DOM
          console.log('🔧 REMOVED new Moodle dialogue element:', element.className || element.id);
        }
      }
    });
  });
});

// Only observe if document.body exists
if (document.body) {
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
} else {
  // Wait for body to be available
  document.addEventListener('DOMContentLoaded', () => {
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  });
}

// Disable secure window prevention features (for Moodle quiz pages only)
function disableSecureWindowFeatures() {
  console.log('🔓 Disabling Moodle input restrictions...');
  
  // Only run this on Moodle pages to prevent conflicts
  if (!window.location.hostname.includes('moodle')) {
    console.log('🔓 Skipping - not a Moodle page');
    return;
  }
  
  // 1. Re-enable right-click context menu
  document.addEventListener('contextmenu', function(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    return true;
  }, true);
  
  // 2. Re-enable keyboard shortcuts (F12, Ctrl+Shift+I, etc.)
  document.addEventListener('keydown', function(e) {
    // Allow F12 (Developer Tools)
    if (e.key === 'F12') {
      e.stopPropagation();
      e.stopImmediatePropagation();
      return true;
    }
    
    // Allow Ctrl+Shift+I (Developer Tools)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
      e.stopPropagation();
      e.stopImmediatePropagation();
      return true;
    }
    
    // Allow Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
      e.stopPropagation();
      e.stopImmediatePropagation();
      return true;
    }
    
    // Allow Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
      e.stopPropagation();
      e.stopImmediatePropagation();
      return true;
    }
  }, true);
  
  // 3. Remove or disable mouse event restrictions
  document.addEventListener('mousedown', function(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    return true;
  }, true);
  
  document.addEventListener('mouseup', function(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    return true;
  }, true);
  
  // 4. Disable text selection restrictions
  document.addEventListener('selectstart', function(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    return true;
  }, true);
  
  // 5. Remove copy/paste restrictions
  document.addEventListener('copy', function(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    return true;
  }, true);
  
  document.addEventListener('paste', function(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    return true;
  }, true);
  
  // 6. Disable drag restrictions
  document.addEventListener('dragstart', function(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    return true;
  }, true);
  
  // 7. Remove focus/blur restrictions that might disable functionality
  document.addEventListener('blur', function(e) {
    e.stopPropagation();
    e.stopImmediatePropagation();
    return true;
  }, true);
  
  // 8. Override any existing event listeners that disable functionality
  const originalAddEventListener = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function(type, listener, options) {
    // Block certain event types that might disable functionality
    const blockedEvents = ['beforeunload', 'unload'];
    if (blockedEvents.includes(type)) {
      console.log(`🔓 Blocked ${type} event listener that might disable functionality`);
      return;
    }
    return originalAddEventListener.call(this, type, listener, options);
  };
  
  // 9. Remove any existing restrictions on the document
  document.oncontextmenu = null;
  document.onselectstart = null;
  document.ondragstart = null;
  document.onkeydown = null;
  document.onmousedown = null;
  
  // 10. Override any existing JavaScript that might disable functionality
  const originalConsoleLog = console.log;
  console.log = function(...args) {
    // Allow console.log to work normally
    return originalConsoleLog.apply(console, args);
  };
  
  console.log('🔓 Moodle input restrictions disabled successfully');
}

// Comprehensive security script disabling (for Moodle pages only)
function disableSecurityScripts() {
  console.log('🔓 Disabling Moodle security scripts...');
  
  // Only run this on Moodle pages to prevent conflicts
  if (!window.location.hostname.includes('moodle')) {
    console.log('🔓 Skipping security script disabling - not a Moodle page');
    return;
  }
  
  // Override common security functions
  window.alert = function(message) {
    console.log('Alert blocked:', message);
    return;
  };
  
  window.confirm = function(message) {
    console.log('Confirm blocked:', message);
    return true;
  };
  
  // Disable common security event handlers
  const securityHandlers = [
    'oncontextmenu', 'onselectstart', 'ondragstart', 'onkeydown', 
    'onmousedown', 'onmouseup', 'oncopy', 'onpaste', 'oncut',
    'onbeforeunload', 'onunload', 'onblur', 'onfocus'
  ];
  
  securityHandlers.forEach(handler => {
    document[handler] = null;
    window[handler] = null;
  });
  
  // Override common security properties
  Object.defineProperty(document, 'oncontextmenu', {
    get: () => null,
    set: () => {}
  });
  
  Object.defineProperty(document, 'onselectstart', {
    get: () => null,
    set: () => {}
  });
  
  // Disable common security CSS
  const style = document.createElement('style');
  style.textContent = `
    * {
      -webkit-user-select: text !important;
      -moz-user-select: text !important;
      -ms-user-select: text !important;
      user-select: text !important;
      -webkit-touch-callout: default !important;
      -webkit-tap-highlight-color: transparent !important;
    }
    body {
      -webkit-user-select: text !important;
      -moz-user-select: text !important;
      -ms-user-select: text !important;
      user-select: text !important;
    }
  `;
  document.head.appendChild(style);
  
  // Override common security methods
  if (window.addEventListener) {
    const originalAddEventListener = window.addEventListener;
    window.addEventListener = function(type, listener, options) {
      if (type === 'beforeunload' || type === 'unload') {
        console.log(`🔓 Blocked ${type} event listener`);
        return;
      }
      return originalAddEventListener.call(this, type, listener, options);
    };
  }
  
  // Disable common security variables
  window.MoodleSecurity = false;
  window.QuizSecurity = false;
  window.TestSecurity = false;
  
  console.log('🔓 Security scripts disabled successfully');
}

// Create a status indicator
function createStatusIndicator() {
  const indicator = document.createElement('div');
  indicator.id = 'security-bypass-indicator';
  indicator.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    background: #4CAF50;
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 12px;
    font-family: Arial, sans-serif;
    z-index: 10000;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  `;
  indicator.textContent = '🔓 Security Bypass Active';
  document.body.appendChild(indicator);
  
  // Auto-hide after 3 seconds
  setTimeout(() => {
    if (indicator.parentNode) {
      indicator.parentNode.removeChild(indicator);
    }
  }, 3000);
}

// Remove any existing warning popups about disabled functionality
function removeWarningPopups() {
  // Look for common warning popup selectors
  const warningSelectors = [
    '.alert-warning',
    '.modal-warning',
    '.popup-warning',
    '[class*="warning"]',
    '[class*="disabled"]',
    '[class*="restricted"]'
  ];
  
  warningSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      const text = element.textContent.toLowerCase();
      if (text.includes('disabled') || text.includes('restricted') || 
          text.includes('not allowed') || text.includes('functionality')) {
        console.log('🔓 Removing warning popup:', element);
        element.remove();
      }
    });
  });
}

// Override any JavaScript that might show "functionality disabled" messages
function overrideWarningMessages() {
  // Override common alert/confirm functions that might show warnings
  const originalAlert = window.alert;
  const originalConfirm = window.confirm;
  
  window.alert = function(message) {
    const msg = message.toLowerCase();
    if (msg.includes('disabled') || msg.includes('restricted') || 
        msg.includes('not allowed') || msg.includes('functionality')) {
      console.log('🔓 Blocked warning alert:', message);
      return;
    }
    return originalAlert.call(window, message);
  };
  
  window.confirm = function(message) {
    const msg = message.toLowerCase();
    if (msg.includes('disabled') || msg.includes('restricted') || 
        msg.includes('not allowed') || msg.includes('functionality')) {
      console.log('🔓 Blocked warning confirm:', message);
      return true; // Always return true to bypass restrictions
    }
    return originalConfirm.call(window, message);
  };
}

// Preserve test timer functionality
function preserveTestTimer() {
  // Look for timer elements and ensure they're not disabled
  const timerSelectors = [
    '[class*="timer"]',
    '[class*="countdown"]',
    '[id*="timer"]',
    '[id*="countdown"]',
    '.quiz-timer',
    '.test-timer'
  ];
  
  timerSelectors.forEach(selector => {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
      // Remove any disabled attributes
      element.removeAttribute('disabled');
      element.removeAttribute('readonly');
      
      // Ensure timer can run
      if (element.style) {
        element.style.pointerEvents = 'auto';
        element.style.userSelect = 'auto';
      }
    });
  });
  
  // Look for timer-related JavaScript and ensure it's not blocked
  const scripts = document.querySelectorAll('script');
  scripts.forEach(script => {
    if (script.textContent.includes('timer') || script.textContent.includes('countdown')) {
      // Re-enable timer scripts if they were disabled
      console.log('🔓 Preserving timer functionality');
    }
  });
}

// Initialize security bypass
function initializeSecurityBypass() {
  console.log('🔓 Initializing Moodle Quiz Security Bypass...');
  
  // Disable secure window features
  disableSecureWindowFeatures();
  
  // Remove warning popups
  removeWarningPopups();
  
  // Override warning messages
  overrideWarningMessages();
  
  // Preserve test timer
  preserveTestTimer();
  
  // Show status indicator
  createStatusIndicator();
  
  console.log('🔓 Security bypass initialized successfully');
}

// Check if this is a Moodle quiz/test page (by content, not just URL)
function isMoodleQuizOrTestPage() {
  try {
    // Check for specific Moodle quiz/test page indicators (more restrictive)
    const quizIndicators = [
      'flag question', 'question text', 'answer question', 'submit quiz',
      'quiz attempt', 'test attempt', 'quiz navigation', 'question navigation'
    ];
    
    // Safely check if document.body exists before accessing innerText
    const pageText = document.body ? document.body.innerText.toLowerCase() : '';
    const hasQuizContent = quizIndicators.some(indicator => pageText.includes(indicator));
    
    // Check for specific Moodle quiz elements (much more restrictive - only actual quiz elements)
    const hasQuizElements = document.querySelectorAll(
      '.que, .question, .qnbutton, .qn_buttons, .quiznav, .attempt, [id*="attempt"], [id*="question-"], .quiz-attempt, .quiz-summary'
    ).length > 0;
    
    // Check for quiz navigation or attempt elements (much more restrictive)
    const hasQuizNavigation = document.querySelectorAll(
      '.qnbutton, .qn_buttons, .quiznav, .attempt, [id*="attempt"], .quiz-attempt, .quiz-summary'
    ).length > 0;
    
    // Check if we're on a quiz/test URL
    const isQuizUrl = window.location.pathname.includes('/mod/quiz/') || 
                     window.location.pathname.includes('/mod/test/') ||
                     window.location.pathname.includes('/quiz/') ||
                     window.location.pathname.includes('/test/');
    
    const isQuizPage = hasQuizContent || hasQuizElements || hasQuizNavigation || isQuizUrl;
    
    console.log('🔍 QUIZ/TEST PAGE DETECTION:');
    console.log('🔍 Has quiz content:', hasQuizContent);
    console.log('🔍 Has quiz elements:', hasQuizElements);
    console.log('🔍 Has quiz navigation:', hasQuizNavigation);
    console.log('🔍 Is quiz URL:', isQuizUrl);
    console.log('🔍 Final result - Is quiz page:', isQuizPage);
    
    return isQuizPage;
  } catch (error) {
    console.error('Error in isMoodleQuizOrTestPage:', error);
    return false;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

function initialize() {
  console.log('🔍 INITIALIZE FUNCTION CALLED');
  console.log('🔍 URL:', window.location.href);
  console.log('🔍 Protocol:', window.location.protocol);
  
  // Skip security bypass for local files (no active security to bypass)
  if (window.location.protocol === 'file:') {
    console.log('🔓 Local file - security bypass not needed');
    return;
  }
  
  // Check if this is a Moodle quiz/test page (by content, not just URL)
  if (isMoodleQuizOrTestPage()) {
    console.log('🔓 Moodle quiz/test page detected - initializing security bypass');
    initializeSecurityBypass();
    
    // Re-run bypass periodically to catch any new restrictions
    setInterval(() => {
      removeWarningPopups();
      preserveTestTimer();
      disableSecurityScripts();
    }, 2000);
  }
  
  console.log('🔓 Moodle UI bypass initialization completed');
}

// Run immediately when the script loads
disableSecureWindowFeatures();

// Also run when the DOM is ready (in case it loads after)
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', disableSecureWindowFeatures);
} else {
  disableSecureWindowFeatures();
}

// Run again after a short delay to catch any late-loading restrictions
setTimeout(disableSecureWindowFeatures, 1000);
setTimeout(disableSecureWindowFeatures, 3000);

