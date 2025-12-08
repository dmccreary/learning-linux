# Command Syntax Visual Guide MicroSim Development Log

## Date: 2025-12-07

## Overview
Created an interactive MicroSim to help students understand the structure of Linux commands, including commands, options, and arguments.

## Files Created
- `docs/sims/command-syntax/command-syntax.js` - Main p5.js visualization
- `docs/sims/command-syntax/main.html` - HTML wrapper
- `docs/sims/command-syntax/index.md` - Documentation with lesson plan
- `docs/sims/command-syntax/metadata.json` - Dublin Core metadata
- Updated `mkdocs.yml` to add navigation entry

## Features
- Color-coded command components:
  - Blue = Command (the program to run)
  - Green = Options (how to run it, start with `-`)
  - Orange = Argument 1 (source/target/path)
  - Purple = Argument 2 (destination/pattern)
  - Pink = Argument 3 (additional filters)
  - Cyan = Argument 4 (reserved for future use)
- **Dropdown selector** with 9 example commands
- Interactive hover tooltips with detailed explanations
- Click to lock selection
- Legend explaining the command structure pattern
- Width-responsive design
- **Dynamic font sizing** - automatically shrinks font for long commands

## Example Commands Included
1. `cp -rv ~/Documents/project /backup/` - Copy with options
2. `ls` - Simple list
3. `ls -la` - List with options
4. `cat file.txt` - View file contents
5. `grep -i 'hello' file.txt` - Search in file
6. `mv -v oldname.txt newname.txt` - Move/rename
7. `rm -rf old_folder/` - Remove directory
8. `find /home -name "*.txt"` - Find files (simple)
9. `find /photos -name "*.png" -o -name "*.jpg" -size +1M -mtime -7` - Find files (complex)

## Key Issues Encountered and Solutions

### 1. Overlapping Labels
**Issue:** When command parts were close together (like `ls -la`), the annotation labels overlapped.
**Solution:** Implemented staggered labels - even-indexed parts at base position, odd-indexed parts offset 18px lower.

```javascript
let labelY = baseLabelY + (partIndex % 2) * 18;
```

### 2. Long Commands Overflow
**Issue:** The complex find command was too long and went off the edges of the iframe.
**Solution:** Implemented dynamic font sizing that starts at 22px and shrinks down to 12px minimum if the command is too wide.

```javascript
let maxWidth = canvasWidth - 60;
while (totalWidth > maxWidth && fontSize > 12) {
  fontSize -= 2;
  textSize(fontSize);
  // recalculate totalWidth...
}
```

### 3. Background Box Width
**Issue:** The white background box behind the command had a fixed max width.
**Solution:** Changed to use full canvas width with 20px margins on each side.

```javascript
let boxWidth = canvasWidth - 40;
let boxX = 20;
```

### 4. Dropdown Not Working (inherited from shell-prompt-anatomy)
**Issue:** The p5.js `mousePressed()` function returning `false` blocked dropdown events.
**Solution:** Check if click is in control area and return `true` to allow event propagation:

```javascript
function mousePressed() {
  if (mouseY > drawHeight) {
    return true; // Let the event propagate normally
  }
  // ... rest of function
  return false;
}
```

## Lessons Learned

1. **Always call `updateCanvasSize()` first in `setup()`** to get the container width before creating the canvas.

2. **Stagger labels for dense annotations** - When multiple labels might overlap, alternate their vertical positions.

3. **Dynamic font sizing** - For variable-length content, calculate the total width and shrink font size iteratively until it fits.

4. **Pass computed values to helper functions** - The `fontSize` variable needed to be passed to `drawAnnotations()` so both the main command and annotations use the same size.

## Code Pattern: Dynamic Font Sizing

```javascript
// Start with default size
let fontSize = 22;
textSize(fontSize);
let totalWidth = calculateTotalWidth();

// Shrink until it fits
let maxWidth = canvasWidth - 60;
while (totalWidth > maxWidth && fontSize > 12) {
  fontSize -= 2;
  textSize(fontSize);
  totalWidth = calculateTotalWidth();
}
```

## Testing
- Local URL: `http://127.0.0.1:8000/learning-linux/sims/command-syntax/`
- Can also paste JavaScript into p5.js editor at https://editor.p5js.org/ for testing

## Reminder
Create a screenshot named `command-syntax.png` for social media previews.

## Related MicroSims
- Shell Prompt Anatomy - Similar annotation-style diagram for shell prompts
