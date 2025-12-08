// Command Syntax Visual Guide MicroSim
// Helps students understand the structure of Linux commands

// Canvas dimensions
let canvasWidth = 600;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// Command examples with parsed components
const commandExamples = [
  {
    name: 'Copy with options',
    parts: [
      { text: 'cp', type: 'command', label: 'Command', description: 'The program to run (copy files)' },
      { text: ' ', type: 'space' },
      { text: '-rv', type: 'options', label: 'Options', description: '-r = recursive, -v = verbose' },
      { text: ' ', type: 'space' },
      { text: '~/Documents/project', type: 'arg1', label: 'Source', description: 'Where to copy from' },
      { text: ' ', type: 'space' },
      { text: '/backup/', type: 'arg2', label: 'Destination', description: 'Where to copy to' }
    ]
  },
  {
    name: 'List files (simple)',
    parts: [
      { text: 'ls', type: 'command', label: 'Command', description: 'List directory contents' }
    ]
  },
  {
    name: 'List files with options',
    parts: [
      { text: 'ls', type: 'command', label: 'Command', description: 'List directory contents' },
      { text: ' ', type: 'space' },
      { text: '-la', type: 'options', label: 'Options', description: '-l = long format, -a = show hidden' }
    ]
  },
  {
    name: 'View file contents',
    parts: [
      { text: 'cat', type: 'command', label: 'Command', description: 'Concatenate and display files' },
      { text: ' ', type: 'space' },
      { text: 'file.txt', type: 'arg1', label: 'File', description: 'The file to display' }
    ]
  },
  {
    name: 'Search in file',
    parts: [
      { text: 'grep', type: 'command', label: 'Command', description: 'Search for patterns in text' },
      { text: ' ', type: 'space' },
      { text: '-i', type: 'options', label: 'Options', description: '-i = case insensitive' },
      { text: ' ', type: 'space' },
      { text: "'hello'", type: 'arg1', label: 'Pattern', description: 'Text to search for' },
      { text: ' ', type: 'space' },
      { text: 'file.txt', type: 'arg2', label: 'File', description: 'File to search in' }
    ]
  },
  {
    name: 'Move/rename file',
    parts: [
      { text: 'mv', type: 'command', label: 'Command', description: 'Move or rename files' },
      { text: ' ', type: 'space' },
      { text: '-v', type: 'options', label: 'Options', description: '-v = verbose output' },
      { text: ' ', type: 'space' },
      { text: 'oldname.txt', type: 'arg1', label: 'Source', description: 'Original file name' },
      { text: ' ', type: 'space' },
      { text: 'newname.txt', type: 'arg2', label: 'Destination', description: 'New file name' }
    ]
  },
  {
    name: 'Remove directory',
    parts: [
      { text: 'rm', type: 'command', label: 'Command', description: 'Remove files or directories' },
      { text: ' ', type: 'space' },
      { text: '-rf', type: 'options', label: 'Options', description: '-r = recursive, -f = force (dangerous!)' },
      { text: ' ', type: 'space' },
      { text: 'old_folder/', type: 'arg1', label: 'Target', description: 'Directory to remove' }
    ]
  },
  {
    name: 'Find files (simple)',
    parts: [
      { text: 'find', type: 'command', label: 'Command', description: 'Search for files' },
      { text: ' ', type: 'space' },
      { text: '/home', type: 'arg1', label: 'Path', description: 'Where to search' },
      { text: ' ', type: 'space' },
      { text: '-name', type: 'options', label: 'Option', description: 'Search by name' },
      { text: ' ', type: 'space' },
      { text: '"*.txt"', type: 'arg2', label: 'Pattern', description: 'Files ending in .txt' }
    ]
  },
  {
    name: 'Find files (complex)',
    parts: [
      { text: 'find', type: 'command', label: 'Command', description: 'Search for files' },
      { text: ' ', type: 'space' },
      { text: '/photos', type: 'arg1', label: 'Path', description: 'Where to search' },
      { text: ' ', type: 'space' },
      { text: '-name "*.png" -o -name "*.jpg"', type: 'options', label: 'Name filter', description: '-o = OR, find .png or .jpg files' },
      { text: ' ', type: 'space' },
      { text: '-size +1M', type: 'arg2', label: 'Size filter', description: 'Files larger than 1 megabyte' },
      { text: ' ', type: 'space' },
      { text: '-mtime -7', type: 'arg3', label: 'Time filter', description: 'Modified in last 7 days' }
    ]
  }
];

// Colors for each component type
const typeColors = {
  command: '#2196F3',   // Blue
  options: '#4CAF50',   // Green
  arg1: '#FF9800',      // Orange
  arg2: '#9C27B0',      // Purple
  arg3: '#E91E63',      // Pink
  arg4: '#00BCD4',      // Cyan
  space: 'transparent'
};

// State
let hoveredPart = -1;
let selectedPart = -1;
let currentExample = 0;
var commandSelector;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create command selector
  let mainEl = document.querySelector('main');
  commandSelector = createSelect();
  commandSelector.parent(mainEl);
  commandSelector.position(120, drawHeight + 12);
  commandSelector.style('z-index', '10');

  for (let i = 0; i < commandExamples.length; i++) {
    commandSelector.option(commandExamples[i].name);
  }
  commandSelector.selected(commandExamples[0].name);
  commandSelector.changed(function() {
    let sel = commandSelector.selected();
    for (let i = 0; i < commandExamples.length; i++) {
      if (commandExamples[i].name === sel) {
        currentExample = i;
        break;
      }
    }
    hoveredPart = -1;
    selectedPart = -1;
  });

  describe('Interactive diagram showing the structure of Linux commands with color-coded components', LABEL);
}

function draw() {
  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('#333');
  noStroke();
  textSize(24);
  textAlign(CENTER, TOP);
  text('Command Syntax Visual Guide', canvasWidth / 2, 15);

  // Reset text settings
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);

  // Draw main command
  drawMainCommand();

  // Draw legend
  drawLegend();

  // Draw hover tooltip
  let parts = commandExamples[currentExample].parts;
  if (hoveredPart >= 0 && hoveredPart < parts.length && parts[hoveredPart].type !== 'space') {
    drawTooltip(hoveredPart);
  }

  // Control area label
  fill('#333');
  textSize(14);
  textAlign(LEFT, CENTER);
  text('Example:', 10, drawHeight + 25);

  // Instructions
  fill('#666');
  textSize(11);
  textAlign(RIGHT, CENTER);
  text('Hover over each part for details', canvasWidth - 10, drawHeight + 25);
}

function drawMainCommand() {
  let parts = commandExamples[currentExample].parts;
  let startY = 60;
  let promptY = startY + 35;

  // Background box for command
  fill(255);
  stroke('#ddd');
  strokeWeight(1);
  let boxWidth = canvasWidth - 40;
  let boxX = 20;
  rect(boxX, promptY - 25, boxWidth, 55, 8);

  // Calculate total command width and determine font size
  textFont('Courier New');
  let fontSize = 22;
  textSize(fontSize);
  let totalWidth = 0;
  for (let part of parts) {
    totalWidth += textWidth(part.text);
  }

  // Shrink font if command is too wide
  let maxWidth = canvasWidth - 60;
  while (totalWidth > maxWidth && fontSize > 12) {
    fontSize -= 2;
    textSize(fontSize);
    totalWidth = 0;
    for (let part of parts) {
      totalWidth += textWidth(part.text);
    }
  }

  // Center the command
  let startX = (canvasWidth - totalWidth) / 2;
  let currentX = startX;

  // Draw each part
  for (let i = 0; i < parts.length; i++) {
    let part = parts[i];
    let partWidth = textWidth(part.text);

    // Check hover (skip spaces)
    if (part.type !== 'space') {
      if (mouseY > promptY - 20 && mouseY < promptY + 20 &&
          mouseX > currentX && mouseX < currentX + partWidth) {
        if (selectedPart < 0) {
          hoveredPart = i;
        }
      }
    }

    // Highlight if hovered or selected
    if ((i === hoveredPart || i === selectedPart) && part.type !== 'space') {
      noStroke();
      fill(typeColors[part.type] + '33');
      rect(currentX - 3, promptY - 18, partWidth + 6, 36, 4);
    }

    // Draw text
    if (part.type !== 'space') {
      fill(typeColors[part.type]);
    } else {
      fill('#333');
    }
    noStroke();
    textAlign(LEFT, CENTER);
    text(part.text, currentX, promptY);

    currentX += partWidth;
  }

  // Draw cursor blink
  if (frameCount % 60 < 30) {
    fill('#333');
    rect(currentX + 5, promptY - 12, 10, 24);
  }

  // Reset font
  textFont('Arial');
  textSize(defaultTextSize);

  // Draw annotations
  drawAnnotations(startX, promptY + 45, parts, fontSize);
}

function drawAnnotations(startX, annotationY, parts, fontSize) {
  textSize(fontSize);
  textFont('Courier New');

  let currentX = startX;
  let baseLabelY = annotationY + 20;
  let partIndex = 0; // Track non-space parts for staggering

  for (let i = 0; i < parts.length; i++) {
    let part = parts[i];
    let partWidth = textWidth(part.text);
    let centerX = currentX + partWidth / 2;

    // Only draw annotations for non-space parts
    if (part.type !== 'space') {
      // Stagger labels: even indices at base, odd indices 15px lower
      let labelY = baseLabelY + (partIndex % 2) * 18;
      partIndex++;

      // Label
      fill('#333');
      textFont('Arial');
      textSize(12);
      textAlign(CENTER, TOP);
      text(part.label, centerX, labelY);

      // Arrow pointing up
      let arrowTopY = annotationY - 20;
      let arrowBottomY = labelY - 5;

      stroke(typeColors[part.type]);
      strokeWeight(2);
      line(centerX, arrowBottomY, centerX, arrowTopY);

      // Arrow head
      noStroke();
      fill(typeColors[part.type]);
      triangle(centerX - 5, arrowTopY + 8, centerX + 5, arrowTopY + 8, centerX, arrowTopY);

      textFont('Courier New');
      textSize(fontSize);
    }

    currentX += partWidth;
  }

  textFont('Arial');
  textSize(defaultTextSize);
}

function drawLegend() {
  let legendY = 200;
  let legendX = 30;
  let boxSize = 18;
  let spacing = 130;
  
  push();
  translate(0, 20);
  fill('#333');
  noStroke();
  textSize(16);
  textAlign(LEFT, CENTER);
  text('Command Structure:', legendX, legendY);

  legendY += 30;
  textSize(14);

  // Command
  fill(typeColors.command);
  rect(legendX, legendY - boxSize/2, boxSize, boxSize, 3);
  fill('#333');
  text('Command - The program to run', legendX + boxSize + 10, legendY);

  // Options
  legendY += 28;
  fill(typeColors.options);
  rect(legendX, legendY - boxSize/2, boxSize, boxSize, 3);
  fill('#333');
  text('Options - How to run it (start with -)', legendX + boxSize + 10, legendY);

  // Argument 1
  legendY += 28;
  fill(typeColors.arg1);
  rect(legendX, legendY - boxSize/2, boxSize, boxSize, 3);
  fill('#333');
  text('Argument 1 - First input (source/target)', legendX + boxSize + 10, legendY);

  // Argument 2
  legendY += 28;
  fill(typeColors.arg2);
  rect(legendX, legendY - boxSize/2, boxSize, boxSize, 3);
  fill('#333');
  text('Argument 2 - Second input (destination)', legendX + boxSize + 10, legendY);

  // Pattern explanation
  legendY += 40;
  fill('#666');
  textSize(13);
  text('General pattern:  command [options] [arguments...]', legendX, legendY);
  pop();
}

function drawTooltip(index) {
  let parts = commandExamples[currentExample].parts;
  let part = parts[index];

  let tooltipWidth = 240;
  let tooltipHeight = 75;
  let tooltipX = constrain(mouseX - tooltipWidth / 2, 10, canvasWidth - tooltipWidth - 10);
  let tooltipY = mouseY - tooltipHeight - 15;

  if (tooltipY < 50) {
    tooltipY = mouseY + 25;
  }

  // Shadow
  fill(0, 0, 0, 30);
  noStroke();
  rect(tooltipX + 4, tooltipY + 4, tooltipWidth, tooltipHeight, 8);

  // Background
  fill(255);
  stroke(typeColors[part.type]);
  strokeWeight(2);
  rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 8);

  // Header
  fill(typeColors[part.type]);
  noStroke();
  textSize(16);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text(part.label, tooltipX + 12, tooltipY + 12);

  // Value
  fill('#333');
  textFont('Courier New');
  textSize(14);
  textStyle(NORMAL);
  text(part.text, tooltipX + 12, tooltipY + 32);

  // Description
  textFont('Arial');
  fill('#666');
  textSize(12);
  text(part.description, tooltipX + 12, tooltipY + 52);

  textFont('Arial');
  textSize(defaultTextSize);
  textStyle(NORMAL);
}

function mouseMoved() {
  if (selectedPart < 0) {
    hoveredPart = -1;
  }
  return false;
}

function mousePressed() {
  // Don't interfere with UI elements in control area
  if (mouseY > drawHeight) {
    return true;
  }

  // Toggle selection on click
  let parts = commandExamples[currentExample].parts;
  if (hoveredPart >= 0 && parts[hoveredPart].type !== 'space') {
    if (selectedPart === hoveredPart) {
      selectedPart = -1;
    } else {
      selectedPart = hoveredPart;
    }
  } else {
    selectedPart = -1;
  }
  return false;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
