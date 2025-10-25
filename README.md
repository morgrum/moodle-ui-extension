# Moodle UI Extension

A Chrome extension that bypasses Moodle's user input restrictions to allow normal browser functionality on quiz and test pages.

## 🚀 Features

- **Re-enables right-click context menu** on Moodle quiz/test pages
- **Restores keyboard shortcuts** (F12, Ctrl+Shift+I, Ctrl+U, etc.)
- **Enables text selection and copy/paste** functionality
- **Removes drag restrictions** for normal mouse interactions
- **Blocks security warnings** that prevent normal browser usage
- **Preserves quiz timer functionality** while removing restrictions
- **Works on both live Moodle sites and local HTML files**

## 📦 Installation

### Method 1: Load as Unpacked Extension (Recommended)

1. Download the latest release from this repository
2. Extract the ZIP file to a folder
3. Open Chrome and go to `chrome://extensions/`
4. Enable "Developer mode" in the top right corner
5. Click "Load unpacked" and select the extracted folder
6. The extension should now appear in your extensions list

## 🎯 Usage

### On Moodle Quiz/Test Pages

1. Navigate to any Moodle quiz or test page (e.g., moodle.abtech.edu)
2. The extension automatically detects quiz pages and activates
3. You should see a green "🔓 Security Bypass Active" indicator briefly
4. All normal browser functionality is now restored:
   - Right-click context menu works
   - Text selection and copy/paste work
   - Keyboard shortcuts work (F12, Ctrl+Shift+I, etc.)
   - Drag and drop functionality works

### On Local HTML Files

1. Open any local HTML file in Chrome (file:// protocol)
2. The extension will work on files that contain quiz-like content
3. Test with the included `test_extension.html` file

## 🔧 How It Works

The extension works by:

1. **Detecting Moodle quiz/test pages** using content analysis
2. **Disabling security restrictions** that block normal browser functionality
3. **Re-enabling event handlers** for mouse, keyboard, and context menu
4. **Removing warning popups** about disabled functionality
5. **Preserving quiz timers** while removing input restrictions

## 📁 Repository Structure

```
moodle-ui-extension/
├── README.md
├── Moodle-UI-Extension-Latest.zip
└── Moodle UI Extension/
    ├── manifest.json
    ├── content.js
    ├── icon16.png
    ├── icon48.png
    ├── icon128.png
    └── test_extension.html
```

## 🔄 Updates

The extension automatically checks this repository for updates. To update:

1. Download the latest `Moodle-UI-Extension-Latest.zip`
2. Extract and load as unpacked extension
3. Or wait for automatic update detection

## 🛠️ Development

### Building from Source

1. Clone this repository
2. No build process required - it's a simple content script
3. Load as unpacked extension in Chrome

### Modifying the Extension

- **content.js** - Main extension logic
- **manifest.json** - Extension configuration
- **test_extension.html** - Test page for verification

## 🔒 Security Note

This extension is designed to bypass Moodle's security restrictions for legitimate educational purposes. It should only be used on pages where you have permission to modify browser behavior.

## 📄 License

This extension is provided as-is for educational purposes. Use responsibly and in accordance with your institution's policies.

## 🆘 Support

For issues or questions:

1. Check the browser console for error messages
2. Test with the included test page
3. Verify the extension is properly installed and enabled
4. Check that the page is being detected as a quiz page

## 📈 Version History

- **v1.0.0** - Initial release with comprehensive GUI re-enabling functionality

## 🔗 Links

- **Repository**: https://github.com/morgrum/moodle-ui-extension
- **Latest Release**: https://github.com/morgrum/moodle-ui-extension/releases/latest
- **Raw Files**: https://raw.githubusercontent.com/morgrum/moodle-ui-extension/main/
