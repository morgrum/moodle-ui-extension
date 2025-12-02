# Moodle UI Extension

A Chrome extension that bypasses Moodle's user input restrictions to allow normal browser functionality on quiz and test pages.

## Features

- **Re-enables right-click context menu** on Moodle quiz/test pages
- **Restores keyboard shortcuts** (F12, Ctrl+Shift+I, Ctrl+U, etc.)
- **Enables text selection and copy/paste** functionality
- **Removes drag restrictions** for normal mouse interactions
- **Blocks security warnings** that prevent normal browser usage
- **Preserves quiz timer functionality** while removing restrictions
- **Works on both live Moodle sites and local HTML files**

## Installation

### Method 1: Load as Unpacked Extension (Recommended)

1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" in the top right corner
3. Click "Load unpacked" button
4. Select the `Moodle UI Extension` folder
5. The extension should now appear in your extensions list

### Method 2: Install from Chrome Web Store (if published)

1. Search for "Moodle UI Extension" in the Chrome Web Store
2. Click "Add to Chrome"
3. Confirm installation

## Usage

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

## Testing

Use the included `test_extension.html` file to verify the extension is working:

1. Open `test_extension.html` in Chrome
2. Check that the extension status shows as "Active"
3. Test all functionality listed on the page
4. Verify that right-click, text selection, and keyboard shortcuts work

## Supported Sites

- **moodle.abtech.edu** - Primary target site
- **Any Moodle installation** (*.moodle.* domains)
- **Local HTML files** (file:// protocol)
- **Quiz and test pages** with Moodle-style content

## How It Works

The extension works by:

1. **Detecting Moodle quiz/test pages** using content analysis
2. **Disabling security restrictions** that block normal browser functionality
3. **Re-enabling event handlers** for mouse, keyboard, and context menu
4. **Removing warning popups** about disabled functionality
5. **Preserving quiz timers** while removing input restrictions

## Technical Details

### Content Script Features

- **Error handling bypass** - Prevents JavaScript errors from blocking functionality
- **Moodle dialogue removal** - Removes problematic popup elements
- **Event listener override** - Re-enables blocked browser events
- **CSS injection** - Forces text selection to work
- **Security script disabling** - Neutralizes Moodle's security measures

### Manifest Configuration

```json
{
  "manifest_version": 3,
  "name": "Moodle User Interface Bypass",
  "content_scripts": [
    {
      "matches": [
        "*://*.moodle.*/*", 
        "*://moodle.*/*",
        "file://*/*.html"
      ],
      "js": ["content.js"],
      "run_at": "document_start"
    }
  ]
}
```

## Troubleshooting

### Extension Not Working

1. **Check if extension is enabled** in `chrome://extensions/`
2. **Reload the page** after installing the extension
3. **Check browser console** for extension messages (look for 🔓 emoji)
4. **Try the test page** (`test_extension.html`) to verify functionality

### Still Getting Restrictions

1. **Hard refresh** the page (Ctrl+F5)
2. **Disable other extensions** that might conflict
3. **Check if page is detected** as a quiz page (look for console messages)
4. **Try on a different Moodle page** to test detection

### Extension Not Detecting Quiz Pages

1. **Check console messages** for detection logs
2. **Verify page content** contains quiz elements
3. **Try manual activation** by refreshing the page
4. **Check URL patterns** match supported formats

## Development

### Building from Source

1. Clone or download the extension files
2. No build process required - it's a simple content script
3. Load as unpacked extension in Chrome

### Modifying the Extension

- **content.js** - Main extension logic
- **manifest.json** - Extension configuration
- **test_extension.html** - Test page for verification

### Adding New Features

1. Modify `content.js` to add new functionality
2. Update `manifest.json` if new permissions are needed
3. Test with `test_extension.html`
4. Reload the extension in Chrome

## Security Note

This extension is designed to bypass Moodle's security restrictions for legitimate educational purposes. It should only be used on pages where you have permission to modify browser behavior.

## License

This extension is provided as-is for educational purposes. Use responsibly and in accordance with your institution's policies.

## Support

For issues or questions:

1. Check the browser console for error messages
2. Test with the included test page
3. Verify the extension is properly installed and enabled
4. Check that the page is being detected as a quiz page

## Version History

- **v1.0.0** - Initial release with comprehensive GUI re-enabling functionality
