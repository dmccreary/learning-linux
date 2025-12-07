// UNIX Philosophy Pipe Diagram MicroSim
// Demonstrates how small UNIX tools connect via pipes

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 310;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

// Animation state
let isRunning = false;
let animationPhase = 0;
let dataPackets = [];
let animationSpeed = 1;

// Command boxes with detailed info for hover tooltips
let commands = [
  {
    name: 'find',
    desc: 'Search files',
    color: '#4A90D9',
    info: 'find . -name "*.md"\n\nRecursively searches directories\nfor files matching a pattern.\nOutputs file paths as text.'
  },
  {
    name: 'xargs ls',
    desc: 'List details',
    color: '#5CB85C',
    info: 'xargs ls -l\n\nReads file paths from input and\nruns ls -l on each one.\nShows size, permissions, dates.'
  },
  {
    name: 'sort',
    desc: 'Order results',
    color: '#F0AD4E',
    info: 'sort -k5 -n\n\nSorts lines of text by the\nspecified column (e.g., file size).\nOutputs ordered results.'
  }
];

// Hover state tracking
let hoveredCommand = null;
let commandBoxes = []; // Store box positions for hit detection
let hoveredCheckbox = null; // Track which checkbox is being hovered

// UI elements
let speedSlider;
let playButton;
let checkbox1, checkbox2, checkbox3;

// Checkbox tooltip info
let checkboxInfo = [
  'Large complex programs are much more difficult to customize and it is hard for the creator to anticipate how future users will use a given tool.',
  "You don't have to save the output of one tool into a file and then have the next tool read the file. That would be slow and inefficient. Streams in RAM are much faster.",
  'Just by putting the "|" character between commands you can chain many commands together!'
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create play/pause button
  playButton = createButton('Run Animation');
  playButton.position(10, drawHeight + 12);
  playButton.mousePressed(toggleAnimation);
  playButton.style('font-size', '14px');
  playButton.style('padding', '5px 15px');

  // Create speed slider
  speedSlider = createSlider(0.2, 3, 1, 0.1);
  speedSlider.position(sliderLeftMargin + 60, drawHeight + 15);
  speedSlider.size(canvasWidth - sliderLeftMargin - 80);

  // Create checkboxes for UNIX philosophy principles (all checked by default)
  checkbox1 = createCheckbox(' Each tool does ONE job well', true);
  checkbox1.position(10, 45);
  checkbox1.style('font-size', '14px');
  checkbox1.style('accent-color', 'green');
  checkbox1.attribute('title', 'Large complex programs are much more difficult to customize and it is hard for the creator to anticipate how future users will use a given tool.');

  checkbox2 = createCheckbox(' Tools read from input and write to output streams', true);
  checkbox2.position(10, 70);
  checkbox2.style('font-size', '14px');
  checkbox2.style('accent-color', 'green');
  checkbox2.attribute('title', "You don't have to save the output of one tool into a file and then have the next tool read the file. That would be slow and inefficient. Streams in RAM are much faster.");

  checkbox3 = createCheckbox(' The pipe symbol connects tools together', true);
  checkbox3.position(10, 95);
  checkbox3.style('font-size', '14px');
  checkbox3.style('accent-color', 'green');
  checkbox3.attribute('title', 'Just by putting the "|" character between commands you can chain many commands together!');

  // Initialize data packets
  initDataPackets();

  describe('Interactive diagram showing UNIX pipe philosophy with data flowing between find, xargs ls, and sort commands', LABEL);
}

function draw() {
  updateCanvasSize();

  animationSpeed = speedSlider.value();

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Draw title
  fill('#333');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  textStyle(BOLD);
  text('UNIX Philosophy in Action', canvasWidth / 2, 12);
  textStyle(NORMAL);

  // Draw rounded rectangles behind checkboxes to hint at hover text
  fill(245, 245, 220, 200); // Light beige with transparency
  stroke('#ccc');
  strokeWeight(1);
  rect(5, 43, canvasWidth * 0.5, 22, 5);   // Behind checkbox 1
  rect(5, 68, canvasWidth * 0.5, 22, 5);   // Behind checkbox 2
  rect(5, 93, canvasWidth * 0.5, 22, 5);   // Behind checkbox 3

  // Calculate responsive positions
  let boxWidth = min(100, (canvasWidth - 180) / 3);
  let boxHeight = 70;
  let startX = 60;
  let spacing = (canvasWidth - 120 - boxWidth * 3) / 2;
  let boxY = drawHeight / 2 - 20;

  // Store box positions for hover detection
  commandBoxes = [];

  // Draw input (File System)
  drawInputOutput(25, boxY + boxHeight / 2, 'File\nSystem', true);

  // Draw command boxes and pipes
  for (let i = 0; i < commands.length; i++) {
    let x = startX + i * (boxWidth + spacing);

    // Store box position for hover detection
    commandBoxes.push({
      x: x,
      y: boxY,
      w: boxWidth,
      h: boxHeight,
      cmd: commands[i]
    });

    // Draw pipe before box (only between boxes, not before first)
    if (i > 0) {
      let pipeX = x - spacing / 2 - 10;
      drawPipe(pipeX - 20, boxY + boxHeight / 2, 40);
    }

    // Draw command box
    drawCommandBox(x, boxY, boxWidth, boxHeight, commands[i]);
  }

  // Check for hover
  checkHover();

  // Calculate lastBoxX for positioning (no pipe after last box)
  let lastBoxX = startX + 2 * (boxWidth + spacing) + boxWidth;

  // Draw output (Sorted Results)
  drawInputOutput(canvasWidth - 25, boxY + boxHeight / 2, 'Sorted\nResults', false);

  // Draw data packets
  drawDataPackets(startX, boxY, boxWidth, boxHeight, spacing);

  // Draw subtitle below the boxes
  fill('#555');
  noStroke();
  textSize(14);
  textStyle(ITALIC);
  textAlign(CENTER, TOP);
  text('What markdown files are the largest?', canvasWidth / 2, boxY + boxHeight + 35);
  textStyle(NORMAL);

  // Draw the full command below the subtitle
  fill('#333');
  textSize(14);
  textStyle(BOLD);
  textFont('monospace');
  text('find . -name "*.md" | xargs ls -l | sort -k5 -n', canvasWidth / 2, boxY + boxHeight + 55);
  textFont('sans-serif');
  textStyle(NORMAL);

  // Draw hover hint below the shell script
  fill('#888');
  textSize(11);
  textStyle(ITALIC);
  textAlign(CENTER, TOP);
  text('Hover over regions to see details', canvasWidth / 2, boxY + boxHeight + 75);
  textStyle(NORMAL);

  // Draw "text stream" labels on pipes (only between boxes)
  fill('#666');
  textSize(11);
  textAlign(CENTER, CENTER);
  noStroke();
  for (let i = 1; i < 3; i++) {
    let pipeX = startX + i * (boxWidth + spacing) - spacing / 2;
    text('text stream', pipeX, boxY + boxHeight / 2 + 25);
  }

  // Update animation
  if (isRunning) {
    updateDataPackets(startX, boxWidth, spacing);
    animationPhase += 0.02 * animationSpeed;
  }

  // Draw control labels
  fill('#333');
  textSize(14);
  textAlign(LEFT, CENTER);
  noStroke();
  text('Speed: ' + animationSpeed.toFixed(1), sliderLeftMargin - 20, drawHeight + 25);

  // Draw hover tooltip for command boxes (drawn last so it appears on top)
  if (hoveredCommand) {
    drawInfoTooltip(hoveredCommand);
  }

  // Draw hover tooltip for checkboxes
  if (hoveredCheckbox !== null) {
    drawCheckboxTooltip(hoveredCheckbox);
  }
}

function drawCommandBox(x, y, w, h, cmd) {
  // Box shadow
  fill(0, 0, 0, 30);
  noStroke();
  rect(x + 3, y + 3, w, h, 10);

  // Main box
  fill(cmd.color);
  stroke('#fff');
  strokeWeight(2);
  rect(x, y, w, h, 10);

  // Command name
  fill('white');
  noStroke();
  textSize(16);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(cmd.name, x + w / 2, y + h / 2 - 10);

  // Description
  textSize(11);
  textStyle(NORMAL);
  text(cmd.desc, x + w / 2, y + h / 2 + 12);
}

function drawPipe(x, y, length) {
  // Pipe body
  stroke('#888');
  strokeWeight(3);
  line(x, y, x + length, y);

  // Arrow
  fill('#888');
  noStroke();
  triangle(x + length + 8, y, x + length, y - 5, x + length, y + 5);

  // Pipe symbol |
  fill('#555');
  textSize(20);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text('|', x + length / 2, y - 18);
  textStyle(NORMAL);
}

function drawInputOutput(x, y, label, isInput) {
  // Icon background
  fill(isInput ? '#E8F4FD' : '#E8FDE8');
  stroke(isInput ? '#4A90D9' : '#5CB85C');
  strokeWeight(2);
  ellipse(x, y, 50, 50);

  // Icon (folder for input, list for output)
  fill(isInput ? '#4A90D9' : '#5CB85C');
  noStroke();
  if (isInput) {
    // Folder icon
    rect(x - 12, y - 5, 24, 16, 2);
    rect(x - 12, y - 10, 12, 6, 2, 2, 0, 0);
  } else {
    // List icon
    for (let i = 0; i < 3; i++) {
      rect(x - 10, y - 8 + i * 8, 20, 4, 1);
    }
  }

  // Label
  fill('#333');
  textSize(11);
  textAlign(CENTER, CENTER);
  noStroke();
  text(label, x, y + 40);
}

function initDataPackets() {
  dataPackets = [];
  for (let i = 0; i < 5; i++) {
    dataPackets.push({
      progress: -i * 0.3,
      active: true
    });
  }
}

function drawDataPackets(startX, boxY, boxWidth, boxHeight, spacing) {
  let totalWidth = canvasWidth - 100;
  let y = boxY + boxHeight / 2;

  for (let packet of dataPackets) {
    if (packet.progress >= 0 && packet.progress <= 1) {
      let x = 50 + packet.progress * totalWidth;

      // Document icon
      fill('#FFE082');
      stroke('#FFA000');
      strokeWeight(1);

      // Animated bounce
      let bounce = sin(animationPhase * 5 + packet.progress * 10) * 3;

      // Document shape
      beginShape();
      vertex(x - 6, y - 10 + bounce);
      vertex(x + 4, y - 10 + bounce);
      vertex(x + 6, y - 8 + bounce);
      vertex(x + 6, y + 10 + bounce);
      vertex(x - 6, y + 10 + bounce);
      endShape(CLOSE);

      // Folded corner
      fill('#FFA000');
      noStroke();
      triangle(x + 4, y - 10 + bounce, x + 6, y - 8 + bounce, x + 4, y - 8 + bounce);

      // Lines on document
      stroke('#FFA000');
      strokeWeight(1);
      line(x - 3, y - 4 + bounce, x + 3, y - 4 + bounce);
      line(x - 3, y + bounce, x + 3, y + bounce);
      line(x - 3, y + 4 + bounce, x + 2, y + 4 + bounce);
    }
  }
}

function updateDataPackets(startX, boxWidth, spacing) {
  for (let packet of dataPackets) {
    packet.progress += 0.003 * animationSpeed;
    if (packet.progress > 1.3) {
      packet.progress = -0.3;
    }
  }
}

function checkHover() {
  hoveredCommand = null;
  hoveredCheckbox = null;

  // Check command boxes
  for (let box of commandBoxes) {
    if (mouseX >= box.x && mouseX <= box.x + box.w &&
        mouseY >= box.y && mouseY <= box.y + box.h) {
      hoveredCommand = box;
      cursor(HAND);
      return;
    }
  }

  // Check checkbox rectangles (same dimensions as drawn rectangles)
  let checkboxRects = [
    { x: 5, y: 43, w: canvasWidth * 0.5, h: 22 },
    { x: 5, y: 68, w: canvasWidth * 0.5, h: 22 },
    { x: 5, y: 93, w: canvasWidth * 0.5, h: 22 }
  ];

  for (let i = 0; i < checkboxRects.length; i++) {
    let r = checkboxRects[i];
    if (mouseX >= r.x && mouseX <= r.x + r.w &&
        mouseY >= r.y && mouseY <= r.y + r.h) {
      hoveredCheckbox = i;
      cursor(HAND);
      return;
    }
  }

  cursor(ARROW);
}

function drawInfoTooltip(box) {
  let tooltipWidth = 180;
  let tooltipHeight = 100;
  let padding = 12;

  // Position tooltip below the box (to avoid overlapping checkboxes above)
  let tooltipX = box.x + box.w / 2 - tooltipWidth / 2;
  let tooltipY = box.y + box.h + 15;

  // Keep tooltip within canvas bounds horizontally
  if (tooltipX < 10) tooltipX = 10;
  if (tooltipX + tooltipWidth > canvasWidth - 10) {
    tooltipX = canvasWidth - tooltipWidth - 10;
  }

  // Draw shadow
  fill(0, 0, 0, 40);
  noStroke();
  rect(tooltipX + 4, tooltipY + 4, tooltipWidth, tooltipHeight, 8);

  // Draw tooltip background
  fill(255, 255, 255, 250);
  stroke(box.cmd.color);
  strokeWeight(2);
  rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 8);

  // Draw pointer triangle (pointing up since tooltip is below box)
  let pointerX = box.x + box.w / 2;
  fill(255, 255, 255, 250);
  stroke(box.cmd.color);
  strokeWeight(2);

  triangle(
    pointerX - 8, tooltipY,
    pointerX + 8, tooltipY,
    pointerX, tooltipY - 10
  );
  // Cover the stroke inside the tooltip
  fill(255, 255, 255, 250);
  noStroke();
  rect(pointerX - 10, tooltipY - 1, 20, 5);

  // Draw command name header with color background
  fill(box.cmd.color);
  noStroke();
  rect(tooltipX, tooltipY, tooltipWidth, 24, 8, 8, 0, 0);

  // Header text
  fill('white');
  textSize(13);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text(box.cmd.name, tooltipX + tooltipWidth / 2, tooltipY + 12);
  textStyle(NORMAL);

  // Info text
  fill('#333');
  textSize(11);
  textAlign(LEFT, TOP);
  textLeading(14);

  // Draw info text lines
  let lines = box.cmd.info.split('\n');
  let lineY = tooltipY + 30;
  for (let line of lines) {
    if (line.trim() === '') {
      lineY += 6;
    } else {
      text(line, tooltipX + padding, lineY);
      lineY += 14;
    }
  }
}

function drawCheckboxTooltip(index) {
  let tooltipText = checkboxInfo[index];
  let padding = 10;

  // Calculate tooltip dimensions based on text
  textSize(12);
  let tooltipWidth = min(280, canvasWidth - 20);
  let words = tooltipText.split(' ');
  let lines = [];
  let currentLine = '';

  // Word wrap
  for (let word of words) {
    let testLine = currentLine + (currentLine ? ' ' : '') + word;
    if (textWidth(testLine) > tooltipWidth - padding * 2) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) lines.push(currentLine);

  let lineHeight = 16;
  let tooltipHeight = lines.length * lineHeight + padding * 2;

  // Position tooltip to the right of the checkbox rectangle
  let checkboxY = [43, 68, 93][index];
  let tooltipX = canvasWidth * 0.5 + 15;
  let tooltipY = checkboxY;

  // If tooltip would go off right edge, position it below instead
  if (tooltipX + tooltipWidth > canvasWidth - 10) {
    tooltipX = 10;
    tooltipY = checkboxY + 25;
  }

  // Make sure tooltip stays within canvas
  if (tooltipY + tooltipHeight > drawHeight - 10) {
    tooltipY = drawHeight - tooltipHeight - 10;
  }

  // Draw shadow
  fill(0, 0, 0, 40);
  noStroke();
  rect(tooltipX + 3, tooltipY + 3, tooltipWidth, tooltipHeight, 8);

  // Draw tooltip background
  fill(255, 255, 240);
  stroke('#999');
  strokeWeight(1);
  rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 8);

  // Draw text
  fill('#333');
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);
  for (let i = 0; i < lines.length; i++) {
    text(lines[i], tooltipX + padding, tooltipY + padding + i * lineHeight);
  }
}

function toggleAnimation() {
  isRunning = !isRunning;
  playButton.html(isRunning ? 'Pause' : 'Run Animation');
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
    if (typeof speedSlider !== 'undefined') {
      speedSlider.size(canvasWidth - sliderLeftMargin - 80);
    }
  }
}
