// Tab Completion Practice MicroSim
// Teaches students how to use tab completion in a simulated terminal

// Canvas dimensions
let canvasWidth = 700;
let drawHeight = 350;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;

// Terminal styling
let terminalBg = '#1e1e1e';
let terminalText = '#33ff33';
let terminalPrompt = '#00aaff';
let cursorColor = '#33ff33';

// State variables
let currentLevel = 1;
let currentInput = '';
let cursorVisible = true;
let cursorBlinkTimer = 0;
let completionOptions = [];
let showOptions = false;
let message = '';
let messageColor = '#ffffff';
let celebrationParticles = [];
let isCelebrating = false;
let tabKeyHighlight = false;
let tabHighlightTimer = 0;
let showHints = true;
let inputField;
let resetButton;
let nextButton;
let hintCheckbox;

// File system simulation
const fileSystem = {
  '~': ['Documents', 'Downloads', 'Pictures'],
  '~/Documents': ['report.txt', 'readme.md', 'research_notes.txt'],
  '~/Downloads': ['image.png', 'installer.deb'],
  '~/Pictures': []
};

// Level definitions
const levels = [
  {
    number: 1,
    title: 'Basic Tab Completion',
    instruction: 'Type "cd Doc" then press Tab to complete',
    startText: '',
    targetInput: 'cd Doc',
    completedText: 'cd Documents/',
    hint: 'Tab completion fills in the rest of unique matches!'
  },
  {
    number: 2,
    title: 'Multiple Matches',
    instruction: 'Type "cat re" then press Tab twice to see options',
    startText: 'cd Documents\n',
    targetInput: 'cat re',
    completedText: 'cat readme.md',
    options: ['readme.md', 'research_notes.txt'],
    hint: 'When multiple files match, Tab shows all options!'
  },
  {
    number: 3,
    title: 'Path Completion',
    instruction: 'Type "ls ~/Do" then press Tab to see matches',
    startText: '',
    targetInput: 'ls ~/Do',
    completedText: 'ls ~/Downloads/',
    options: ['Documents/', 'Downloads/'],
    hint: 'Tab works with paths too - try narrowing down!'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  textFont('monospace');

  // Create input field (hidden, captures keyboard)
  inputField = createInput('');
  inputField.position(-1000, -1000);
  inputField.size(1, 1);
  inputField.input(handleInput);

  // Create buttons
  resetButton = createButton('Reset');
  resetButton.mousePressed(resetLevel);

  nextButton = createButton('Next Challenge');
  nextButton.mousePressed(nextLevel);

  hintCheckbox = createCheckbox(' Show Hints', true);
  hintCheckbox.changed(() => showHints = hintCheckbox.checked());

  positionControls();

  describe('Tab completion practice simulator with a terminal interface where students type commands and use Tab to complete them', LABEL);
}

function positionControls() {
  let buttonY = drawHeight + 70;
  resetButton.position(margin, buttonY);
  nextButton.position(margin + 80, buttonY);
  hintCheckbox.position(margin + 210, buttonY + 3);
}

function draw() {
  updateCanvasSize();

  // Drawing area - terminal style
  fill(terminalBg);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  stroke('silver');
  line(0, drawHeight, canvasWidth, drawHeight);

  // Draw terminal content
  drawTerminal();

  // Draw file listing panel
  drawFilePanel();

  // Draw Tab key indicator
  drawTabKey();

  // Draw control area content
  drawControls();

  // Update animations
  updateAnimations();

  // Draw celebration if active
  if (isCelebrating) {
    drawCelebration();
  }

  // Keep input focused
  if (focused) {
    inputField.elt.focus();
  }
}

function drawTerminal() {
  let level = levels[currentLevel - 1];
  let x = margin;
  let y = 30;
  let lineHeight = 24;

  // Title
  fill('#888888');
  textSize(14);
  textAlign(LEFT, TOP);
  text('Terminal', x, 8);

  // Terminal border
  stroke('#444444');
  noFill();
  rect(margin - 5, 25, canvasWidth * 0.55, drawHeight - 35, 5);

  // Previous lines (history)
  fill('#888888');
  textSize(16);
  if (level.startText) {
    let lines = level.startText.split('\n');
    for (let line of lines) {
      if (line) {
        text('$ ' + line, x, y);
        y += lineHeight;
      }
    }
  }

  // Current prompt line
  fill(terminalPrompt);
  text('$ ', x, y);

  // User input
  fill(terminalText);
  let inputX = x + textWidth('$ ');
  text(currentInput, inputX, y);

  // Blinking cursor
  cursorBlinkTimer++;
  if (cursorBlinkTimer > 30) {
    cursorVisible = !cursorVisible;
    cursorBlinkTimer = 0;
  }

  if (cursorVisible) {
    fill(cursorColor);
    let cursorX = inputX + textWidth(currentInput);
    rect(cursorX, y + 2, 10, 18);
  }

  // Show completion options if available
  if (showOptions && completionOptions.length > 0) {
    y += lineHeight + 5;
    fill('#ffff00');
    textSize(14);
    text('Matches: ' + completionOptions.join('  '), x, y);
  }

  // Show message
  if (message) {
    y += lineHeight + 10;
    fill(messageColor);
    textSize(16);
    text(message, x, y);
  }
}

function drawFilePanel() {
  let panelX = canvasWidth * 0.6;
  let panelY = 25;
  let panelW = canvasWidth * 0.38;
  let panelH = drawHeight - 35;

  // Panel background
  fill(255, 255, 255, 240);
  stroke('#cccccc');
  rect(panelX, panelY, panelW, panelH, 5);

  // Panel title
  fill('#333333');
  textSize(14);
  textAlign(LEFT, TOP);
  noStroke();
  text('File System:', panelX + 10, panelY + 10);

  // Draw file tree
  let y = panelY + 35;
  let indent = 15;
  textSize(13);

  // Home directory
  fill('#0066cc');
  text('~/', panelX + 10, y);
  y += 20;

  // Documents
  fill('#cc6600');
  text('Documents/', panelX + 10 + indent, y);
  y += 18;
  fill('#333333');
  for (let file of fileSystem['~/Documents']) {
    text(file, panelX + 10 + indent * 2, y);
    y += 16;
  }

  y += 5;
  // Downloads
  fill('#cc6600');
  text('Downloads/', panelX + 10 + indent, y);
  y += 18;
  fill('#333333');
  for (let file of fileSystem['~/Downloads']) {
    text(file, panelX + 10 + indent * 2, y);
    y += 16;
  }

  y += 5;
  // Pictures
  fill('#cc6600');
  text('Pictures/', panelX + 10 + indent, y);
  y += 18;
  fill('#888888');
  textSize(11);
  text('(empty)', panelX + 10 + indent * 2, y);
}

function drawTabKey() {
  let keyX = canvasWidth * 0.6 + 20;
  let keyY = drawHeight - 60;
  let keyW = 80;
  let keyH = 40;

  // Tab key visual
  if (tabKeyHighlight) {
    fill('#00ff00');
    stroke('#00aa00');
  } else {
    fill('#dddddd');
    stroke('#999999');
  }
  strokeWeight(2);
  rect(keyX, keyY, keyW, keyH, 5);

  // Key label
  fill(tabKeyHighlight ? '#004400' : '#333333');
  textSize(16);
  textAlign(CENTER, CENTER);
  noStroke();
  text('Tab', keyX + keyW/2, keyY + keyH/2);

  // Arrow indicators
  textSize(12);
  fill('#666666');
  text('Press Tab to complete!', keyX + keyW/2, keyY + keyH + 15);

  strokeWeight(1);
}

function drawControls() {
  let level = levels[currentLevel - 1];
  let y = drawHeight + 15;

  // Level indicator
  fill('#333333');
  textSize(18);
  textAlign(LEFT, TOP);
  noStroke();
  text('Level ' + currentLevel + '/3: ' + level.title, margin, y);

  // Instructions
  y += 28;
  fill('#0066cc');
  textSize(16);
  text(level.instruction, margin, y);

  // Hint (if enabled)
  if (showHints) {
    y += 60;
    fill('#666666');
    textSize(14);
    text('Hint: ' + level.hint, margin, y);
  }

  // Click to focus message
  fill('#999999');
  textSize(12);
  textAlign(RIGHT, TOP);
  text('Click terminal to type', canvasWidth - margin, drawHeight + 15);
}

function handleInput() {
  let newValue = inputField.value();

  // Check for tab character (won't work directly, handled in keyPressed)
  currentInput = newValue;
}

function keyPressed() {
  // Focus input when clicking on canvas
  inputField.elt.focus();

  if (keyCode === TAB) {
    // Prevent default tab behavior
    event.preventDefault();
    handleTabCompletion();
    return false;
  }

  if (keyCode === ENTER) {
    handleEnter();
    return false;
  }

  if (keyCode === BACKSPACE && currentInput.length > 0) {
    currentInput = currentInput.slice(0, -1);
    inputField.value(currentInput);
    showOptions = false;
    message = '';
  }

  return true;
}

function keyTyped() {
  // Add typed character to input
  if (key.length === 1 && keyCode !== ENTER && keyCode !== TAB) {
    currentInput += key;
    inputField.value(currentInput);
    showOptions = false;
    message = '';
  }
  return false;
}

function handleTabCompletion() {
  let level = levels[currentLevel - 1];

  // Visual feedback for Tab press
  tabKeyHighlight = true;
  tabHighlightTimer = 15;

  // Check if input matches target for tab completion
  if (currentInput === level.targetInput) {
    if (level.options && level.options.length > 1 && !showOptions) {
      // Show multiple options on first tab
      completionOptions = level.options;
      showOptions = true;
      message = 'Multiple matches! Type more to narrow down, or press Tab again.';
      messageColor = '#ffff00';
    } else {
      // Complete the command
      currentInput = level.completedText;
      inputField.value(currentInput);
      showOptions = false;
      completionOptions = [];
      message = 'Completed! Press Enter to confirm.';
      messageColor = '#00ff00';
    }
  } else if (showOptions) {
    // If options are showing and user typed more, try to complete
    let matchingOption = findMatchingOption();
    if (matchingOption) {
      let baseCmd = level.targetInput.split(' ')[0];
      currentInput = baseCmd + ' ' + matchingOption;
      inputField.value(currentInput);
      showOptions = false;
      completionOptions = [];
      message = 'Completed! Press Enter to confirm.';
      messageColor = '#00ff00';
    }
  } else {
    message = 'No completion available. Check your typing!';
    messageColor = '#ff6666';
  }
}

function findMatchingOption() {
  let level = levels[currentLevel - 1];
  let typed = currentInput.split(' ').pop(); // Get the last word

  for (let opt of level.options || []) {
    if (opt.startsWith(typed) && opt !== typed) {
      return opt;
    }
  }
  return null;
}

function handleEnter() {
  let level = levels[currentLevel - 1];

  if (currentInput === level.completedText) {
    // Success!
    startCelebration();
    message = 'Excellent! You completed the challenge!';
    messageColor = '#00ff00';
  } else {
    message = 'Not quite right. Try using Tab to complete!';
    messageColor = '#ff6666';
  }
}

function resetLevel() {
  currentInput = '';
  inputField.value('');
  showOptions = false;
  completionOptions = [];
  message = '';
  isCelebrating = false;
  celebrationParticles = [];
}

function nextLevel() {
  if (currentLevel < 3) {
    currentLevel++;
    resetLevel();
  } else {
    message = 'Congratulations! You completed all levels!';
    messageColor = '#00ff00';
    startCelebration();
  }
}

function startCelebration() {
  isCelebrating = true;
  celebrationParticles = [];

  for (let i = 0; i < 50; i++) {
    celebrationParticles.push({
      x: random(canvasWidth),
      y: random(-50, 0),
      vx: random(-2, 2),
      vy: random(2, 5),
      size: random(5, 15),
      color: color(random(100, 255), random(100, 255), random(100, 255)),
      rotation: random(TWO_PI)
    });
  }

  setTimeout(() => {
    isCelebrating = false;
    celebrationParticles = [];
  }, 2000);
}

function drawCelebration() {
  for (let p of celebrationParticles) {
    push();
    translate(p.x, p.y);
    rotate(p.rotation);
    fill(p.color);
    noStroke();
    star(0, 0, p.size/2, p.size, 5);
    pop();

    // Update particle
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += 0.1;
    p.vy += 0.1; // gravity
  }
}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -PI/2; a < TWO_PI - PI/2; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function updateAnimations() {
  if (tabHighlightTimer > 0) {
    tabHighlightTimer--;
    if (tabHighlightTimer === 0) {
      tabKeyHighlight = false;
    }
  }
}

function mousePressed() {
  // Focus input when clicking anywhere on canvas
  if (mouseY < drawHeight) {
    inputField.elt.focus();
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = min(container.offsetWidth, 700);
  }
}
