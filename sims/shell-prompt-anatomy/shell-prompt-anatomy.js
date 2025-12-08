// Shell Prompt Anatomy MicroSim
// Helps students understand each component of a typical shell prompt

// Canvas dimensions
let canvasWidth = 600;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// Prompt components with colors
const promptComponents = [
  { text: 'dan', color: '#2196F3', label: 'Username', description: 'Who you are logged in as' },
  { text: '@', color: '#666666', label: 'At separator', description: 'Separates username from hostname' },
  { text: 'raspberry', color: '#4CAF50', label: 'Hostname', description: 'Which computer you are on' },
  { text: ':', color: '#666666', label: 'Separator', description: 'Separates hostname from path' },
  { text: '~/Documents', color: '#FF9800', label: 'Current directory', description: 'Where you are in the filesystem' },
  { text: '$', color: '#888888', label: 'User indicator', description: '$ = normal user, # = root user' }
];

// Example prompts
const examplePrompts = [
  {
    parts: [
      { text: 'student', color: '#2196F3' },
      { text: '@', color: '#666666' },
      { text: 'ubuntu', color: '#4CAF50' },
      { text: ':', color: '#666666' },
      { text: '~', color: '#FF9800' },
      { text: '$', color: '#888888' }
    ],
    label: 'Ubuntu default'
  },
  {
    parts: [
      { text: 'pi', color: '#2196F3' },
      { text: '@', color: '#666666' },
      { text: 'raspberrypi', color: '#4CAF50' },
      { text: ':', color: '#666666' },
      { text: '~', color: '#FF9800' },
      { text: '$', color: '#888888' }
    ],
    label: 'Raspberry Pi default'
  },
  {
    parts: [
      { text: 'root', color: '#F44336' },
      { text: '@', color: '#666666' },
      { text: 'server', color: '#4CAF50' },
      { text: ':', color: '#666666' },
      { text: '/', color: '#FF9800' },
      { text: '#', color: '#F44336' }
    ],
    label: 'Root user (danger zone!)'
  }
];

// Prompt styles: long, medium, short
const promptStyles = {
  long: [
    { text: 'dan', color: '#2196F3', label: 'Username', description: 'Who you are logged in as' },
    { text: '@', color: '#666666', label: 'At separator', description: 'Separates username from hostname' },
    { text: 'raspberry', color: '#4CAF50', label: 'Hostname', description: 'Which computer you are on' },
    { text: ':', color: '#666666', label: 'Separator', description: 'Separates hostname from path' },
    { text: '~/Documents/projects', color: '#FF9800', label: 'Full path', description: 'Parent dir + current directory' },
    { text: '$', color: '#888888', label: 'User indicator', description: '$ = normal user, # = root user' }
  ],
  medium: [
    { text: 'Documents/projects', color: '#FF9800', label: 'Path', description: 'Parent dir + current directory' },
    { text: '$', color: '#888888', label: 'User indicator', description: '$ = normal user, # = root user' }
  ],
  short: [
    { text: 'projects', color: '#FF9800', label: 'Current dir', description: 'Just the current directory name' },
    { text: '$', color: '#888888', label: 'User indicator', description: '$ = normal user, # = root user' }
  ]
};

// State
let hoveredComponent = -1;
let selectedComponent = -1;
let currentStyle = 'long';
var styleSelector;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Create style selector
  let mainEl = document.querySelector('main');
  styleSelector = createSelect();
  styleSelector.parent(mainEl);
  styleSelector.position(100, drawHeight + 15);
  styleSelector.style('z-index', '10');
  styleSelector.option('Long (user@host:path)');
  styleSelector.option('Medium (parent/current)');
  styleSelector.option('Short (current dir only)');
  styleSelector.selected('Long (user@host:path)');
  styleSelector.changed(function() {
    let sel = styleSelector.selected();
    if (sel.startsWith('Long')) currentStyle = 'long';
    else if (sel.startsWith('Medium')) currentStyle = 'medium';
    else currentStyle = 'short';
    hoveredComponent = -1;
    selectedComponent = -1;
  });

  describe('Interactive diagram showing the anatomy of a shell prompt with color-coded components and hover explanations', LABEL);
}

function getCurrentPromptComponents() {
  return promptStyles[currentStyle];
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
  text('Understanding the Shell Prompt', canvasWidth / 2, 15);

  // Reset text settings
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);

  // Draw main prompt
  drawMainPrompt();

  // Draw example prompts
  drawExamplePrompts();

  // Draw hover tooltip
  let components = getCurrentPromptComponents();
  if (hoveredComponent >= 0 && hoveredComponent < components.length) {
    drawTooltip(hoveredComponent, components);
  }

  // Control area label
  fill('#333');
  textSize(14);
  textAlign(LEFT, CENTER);
  text('Prompt Style:', 10, drawHeight + 27);

  // Instructions
  fill('#666');
  textSize(12);
  textAlign(CENTER, CENTER);
  text('Hover over each part of the prompt to learn what it means. Click to lock selection.', canvasWidth / 2, drawHeight + 60);
}

function drawMainPrompt() {
  let components = getCurrentPromptComponents();
  let startY = 50;
  let promptY = startY + 30;

  // Background box for main prompt
  fill(255);
  stroke('#ddd');
  strokeWeight(1);
  let boxWidth = min(canvasWidth - 40, 540);
  let boxX = (canvasWidth - boxWidth) / 2;
  rect(boxX, promptY - 25, boxWidth, 50, 8);

  // Calculate total prompt width
  textSize(24);
  textFont('Courier New');
  let totalWidth = 0;
  for (let comp of components) {
    totalWidth += textWidth(comp.text);
  }
  totalWidth += textWidth(' '); // Space after prompt

  // Center the prompt
  let startX = (canvasWidth - totalWidth) / 2;
  let currentX = startX;

  // Draw each component
  for (let i = 0; i < components.length; i++) {
    let comp = components[i];
    let compWidth = textWidth(comp.text);

    // Check hover
    if (mouseY > promptY - 20 && mouseY < promptY + 20 &&
        mouseX > currentX && mouseX < currentX + compWidth) {
      if (selectedComponent < 0) {
        hoveredComponent = i;
      }
    }

    // Highlight if hovered or selected
    if (i === hoveredComponent || i === selectedComponent) {
      noStroke();
      fill(comp.color + '33'); // Semi-transparent background
      rect(currentX - 2, promptY - 18, compWidth + 4, 36, 4);
    }

    // Draw text
    fill(comp.color);
    noStroke();
    textAlign(LEFT, CENTER);
    text(comp.text, currentX, promptY);

    currentX += compWidth;
  }

  // Draw cursor blink
  if (frameCount % 60 < 30) {
    fill('#333');
    rect(currentX + 5, promptY - 12, 10, 24);
  }

  // Reset font
  textFont('Arial');
  textSize(defaultTextSize);

  // Draw annotation arrows and labels
  drawAnnotations(startX, promptY + 40, components);
}

function drawAnnotations(startX, annotationY, components) {
  textSize(24);
  textFont('Courier New');

  let currentX = startX;
  let labelStartY = annotationY + 15; // Where labels start

  for (let i = 0; i < components.length; i++) {
    let comp = components[i];
    let compWidth = textWidth(comp.text);
    let centerX = currentX + compWidth / 2;

    // Only draw annotations for non-separator components or if hovered
    if (comp.label !== 'At separator' && comp.label !== 'Separator' ||
        i === hoveredComponent || i === selectedComponent) {

      // Calculate label - wrap long labels
      let label = comp.label;
      if (label === 'Current directory' || label === 'Full path') label = 'Current\ndirectory';
      if (label === 'User indicator') label = 'User\nindicator';
      let lines = label.split('\n');

      // Label (only for main components) - draw first, below the arrow line
      if (comp.label !== 'At separator' && comp.label !== 'Separator') {
        fill('#333');
        textFont('Arial');
        textSize(12);
        textAlign(CENTER, TOP);

        for (let j = 0; j < lines.length; j++) {
          text(lines[j], centerX, labelStartY + j * 14);
        }

        textFont('Courier New');
        textSize(24);
      }

      // Arrow line - from bottom of label pointing up to prompt
      let arrowBottomY = labelStartY - 5; // Just above the label
      let arrowTopY = annotationY - 25;   // Near the prompt

      stroke(comp.color);
      strokeWeight(2);
      line(centerX, arrowBottomY, centerX, arrowTopY);

      // Arrow head pointing UP (toward the prompt)
      noStroke();
      fill(comp.color);
      triangle(centerX - 5, arrowTopY + 8, centerX + 5, arrowTopY + 8, centerX, arrowTopY);
    }

    currentX += compWidth;
  }

  textFont('Arial');
  textSize(defaultTextSize);
}

function drawExamplePrompts() {
  let startY = 210;

  // Section header
  fill('#333');
  noStroke();
  textSize(18);
  textAlign(CENTER, TOP);
  text('Example Prompts', canvasWidth / 2, startY);

  // Draw each example
  textSize(18);
  textFont('Courier New');

  for (let i = 0; i < examplePrompts.length; i++) {
    let example = examplePrompts[i];
    let y = startY + 40 + i * 45;

    // Background
    fill(255);
    stroke('#ddd');
    strokeWeight(1);
    let boxWidth = min(canvasWidth - 60, 450);
    let boxX = (canvasWidth - boxWidth) / 2;
    rect(boxX, y - 15, boxWidth, 35, 6);

    // Danger zone highlight for root
    if (i === 2) {
      fill('#FFEBEE');
      noStroke();
      rect(boxX + 1, y - 14, boxWidth - 2, 33, 5);
    }

    // Calculate width and center
    let totalWidth = 0;
    for (let part of example.parts) {
      totalWidth += textWidth(part.text);
    }

    let currentX = (canvasWidth - totalWidth) / 2 - 60;

    // Draw prompt parts
    for (let part of example.parts) {
      fill(part.color);
      noStroke();
      textAlign(LEFT, CENTER);
      text(part.text, currentX, y);
      currentX += textWidth(part.text);
    }

    // Label
    textFont('Arial');
    textSize(14);
    fill('#666');
    if (i === 2) fill('#F44336');
    textAlign(LEFT, CENTER);
    text('  - ' + example.label, currentX + 20, y);

    textFont('Courier New');
    textSize(18);
  }

  textFont('Arial');
  textSize(defaultTextSize);
}

function drawTooltip(index, components) {
  let comp = components[index];

  // Position tooltip near mouse but within bounds
  let tooltipWidth = 220;
  let tooltipHeight = 70;
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
  stroke(comp.color);
  strokeWeight(2);
  rect(tooltipX, tooltipY, tooltipWidth, tooltipHeight, 8);

  // Header
  fill(comp.color);
  noStroke();
  textSize(16);
  textAlign(LEFT, TOP);
  textStyle(BOLD);
  text(comp.label, tooltipX + 12, tooltipY + 12);

  // Description
  fill('#333');
  textSize(14);
  textStyle(NORMAL);
  text(comp.description, tooltipX + 12, tooltipY + 35);

  // Component value
  fill(comp.color);
  textFont('Courier New');
  textSize(14);
  text('"' + comp.text + '"', tooltipX + 12, tooltipY + 52);

  textFont('Arial');
  textSize(defaultTextSize);
}

function mouseMoved() {
  if (selectedComponent < 0) {
    // Reset hover state - will be updated in draw
    hoveredComponent = -1;
  }
  return false;
}

function mousePressed() {
  // Don't interfere with UI elements in control area
  if (mouseY > drawHeight) {
    return true; // Let the event propagate normally
  }

  // Toggle selection on click
  if (hoveredComponent >= 0) {
    if (selectedComponent === hoveredComponent) {
      selectedComponent = -1; // Deselect
    } else {
      selectedComponent = hoveredComponent; // Select
    }
  } else {
    selectedComponent = -1; // Click elsewhere to deselect
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
