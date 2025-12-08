# Shell Prompt Anatomy MicroSim Development Log

## Date: 2025-12-07

## Overview
Created an interactive MicroSim to help students understand the components of a Linux shell prompt.

## Files Created
- `docs/sims/shell-prompt-anatomy/shell-prompt-anatomy.js` - Main p5.js visualization
- `docs/sims/shell-prompt-anatomy/main.html` - HTML wrapper
- `docs/sims/shell-prompt-anatomy/index.md` - Documentation with lesson plan
- `docs/sims/shell-prompt-anatomy/metadata.json` - Dublin Core metadata
- Updated `mkdocs.yml` to add navigation entry

## Features
- Color-coded prompt components (blue=username, green=hostname, orange=path, gray/red=user indicator)
- Interactive hover tooltips with detailed explanations
- Click to lock selection on a component
- Three example prompts: Ubuntu, Raspberry Pi, and root user (with red danger highlighting)
- Annotation arrows pointing from labels up to prompt components
- **Dropdown selector** with three prompt styles:
  - Long: `dan@raspberry:~/Documents/projects$` (username, hostname, full path)
  - Medium: `Documents/projects$` (parent + current directory)
  - Short: `projects$` (current directory only)
- Width-responsive design

## Key Issues Encountered and Solutions

### 1. Arrow Direction
**Issue:** Arrows initially pointed down from the prompt to labels.
**Solution:** Reversed arrow direction so labels point up to prompt components. Changed arrowhead triangle to point upward.

### 2. Vertical Spacing
**Issue:** Too much space below title and above example prompts.
**Solution:** Reduced `startY` from 80 to 50 in `drawMainPrompt()` and from 240 to 210 in `drawExamplePrompts()`.

### 3. Dropdown Not Working - Multiple Attempts
**Issue:** The style selector dropdown was visible but didn't respond to changes.

**Attempted fixes that didn't work:**
- Changing `changed()` to `input()` event handler
- Using `styleSelector.value()` instead of `styleSelector.selected()`
- Adding `parent()` to attach selector to main element
- Using CSS `style()` for positioning instead of `position()`
- Using native DOM `addEventListener('change', ...)` instead of p5's `changed()`
- Adding `z-index: 10` to ensure dropdown was on top

**Root Cause Found:** The `mousePressed()` function was returning `false`, which prevents default browser behavior for ALL mouse events on the page, including the dropdown selection.

**Solution:** Modified `mousePressed()` to check if the click is in the control area:
```javascript
function mousePressed() {
  // Don't interfere with UI elements in control area
  if (mouseY > drawHeight) {
    return true; // Let the event propagate normally
  }
  // ... rest of function
  return false;
}
```

### 4. Prompt Box Width
**Issue:** White rounded rectangle under the prompt was too narrow for long prompts.
**Solution:** Increased max `boxWidth` from 500 to 540.

## Lessons Learned

1. **p5.js event handlers can block DOM elements:** When using `mousePressed()`, `mouseMoved()`, etc., returning `false` prevents default browser behavior. This can interfere with HTML elements like `<select>` dropdowns positioned over or near the canvas.

2. **Debug systematically:** Adding `console.log` statements at each step (setup, selector creation, click events, change events) helped isolate where the problem occurred.

3. **Keep it simple:** The p5.js `createSelect()` with `position()` and `changed()` works fine - no need for complex parent/CSS positioning. The issue was elsewhere in the code.

4. **Check for event interference:** When UI elements don't respond, check if any p5.js mouse/keyboard handlers might be intercepting events.

## HTML Structure Note
Added `position: relative` to the `<main>` element in `main.html` to ensure proper positioning of the dropdown within the container.

## Testing
- Local URL: `http://127.0.0.1:8000/learning-linux/sims/shell-prompt-anatomy/`
- Can also paste JavaScript into p5.js editor at https://editor.p5js.org/ for testing

## Reminder
Create a screenshot named `shell-prompt-anatomy.png` for social media previews.
