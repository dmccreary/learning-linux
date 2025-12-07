// Open Source vs Proprietary Software Infographic
// Educational MicroSim for Learning Linux course

// Canvas dimensions
let canvasWidth = 600;
let drawHeight = 450;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;

// Column positions
let leftColX, rightColX, colWidth;

// Example data with descriptions
const openSourceExamples = [
    { name: 'Linux', desc: 'Free operating system kernel powering servers worldwide' },
    { name: 'Firefox', desc: 'Privacy-focused web browser by Mozilla' },
    { name: 'VLC', desc: 'Media player that plays almost any format' },
    { name: 'Blender', desc: 'Professional 3D creation suite' }
];

const proprietaryExamples = [
    { name: 'Windows', desc: 'Microsoft\'s commercial operating system' },
    { name: 'Photoshop', desc: 'Adobe\'s image editing software' },
    { name: 'MS Office', desc: 'Microsoft\'s productivity suite' },
    { name: 'macOS', desc: 'Apple\'s operating system for Mac' }
];

// Hover state
let hoveredExample = null;
let hoveredSide = null;

// Toggle state for lawyer joke
let showLawyerJoke = false;
let toggleButton;

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));

    // Create toggle button
    toggleButton = createButton('What if you modify proprietary software?');
    toggleButton.position(canvasWidth/2 - 150, drawHeight + 1);
    toggleButton.size(300, 30);
    toggleButton.mousePressed(toggleLawyerJoke);

    textFont('Arial');

    describe('Infographic comparing open source and proprietary software with interactive examples', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing area background
    background('aliceblue');

    // Calculate column positions
    colWidth = (canvasWidth - margin * 3) / 2;
    leftColX = margin;
    rightColX = margin * 2 + colWidth;

    // Draw title
    fill(50);
    textSize(22);
    textAlign(CENTER, TOP);
    noStroke();
    text('Open Source vs Proprietary Software', canvasWidth/2, 10);

    // Draw columns
    drawOpenSourceColumn();
    drawProprietaryColumn();

    // Draw bottom section
    drawBottomSection();

    // Draw tooltip if hovering
    if (hoveredExample) {
        drawTooltip();
    }

    // Draw lawyer joke overlay if toggled
    if (showLawyerJoke) {
        drawLawyerJoke();
    }

    // Check for hover
    checkHover();
}

function drawOpenSourceColumn() {
    let x = leftColX;
    let y = 45;
    let w = colWidth;

    // Column background - green theme
    fill(232, 245, 233);
    stroke(76, 175, 80);
    strokeWeight(2);
    rect(x, y, w, 280, 10);

    // Header
    fill(46, 125, 50);
    noStroke();
    textSize(18);
    textAlign(CENTER, TOP);
    text('OPEN SOURCE', x + w/2, y + 10);

    // Draw unlocked padlock icon
    drawUnlockedPadlock(x + w/2, y + 50);

    // Bullet points
    fill(33, 33, 33);
    textSize(14);
    textAlign(LEFT, TOP);
    let bulletY = y + 100;

    fill(46, 125, 50);
    text('You CAN see the code', x + 20, bulletY);
    bulletY += 22;
    text('You CAN modify it', x + 20, bulletY);
    bulletY += 22;
    text('You CAN share it', x + 20, bulletY);
    bulletY += 22;
    text('You CAN test it and PATCH it', x + 20, bulletY);

    // Examples on single line
    bulletY += 30;
    fill(33, 33, 33);
    textSize(12);
    textAlign(LEFT, TOP);
    let examplesText = openSourceExamples.map(e => e.name).join(', ');
    text('Examples: ' + examplesText, x + 20, bulletY, w - 40, 40);

    // Community icon at bottom
    drawCommunityIcon(x + w/2, y + 260);
}

function drawProprietaryColumn() {
    let x = rightColX;
    let y = 45;
    let w = colWidth;

    // Column background - orange theme
    fill(255, 243, 224);
    stroke(255, 152, 0);
    strokeWeight(2);
    rect(x, y, w, 280, 10);

    // Header
    fill(230, 81, 0);
    noStroke();
    textSize(18);
    textAlign(CENTER, TOP);
    text('PROPRIETARY', x + w/2, y + 10);

    // Draw locked padlock icon
    drawLockedPadlock(x + w/2, y + 50);

    // Bullet points
    fill(33, 33, 33);
    textSize(14);
    textAlign(LEFT, TOP);
    let bulletY = y + 100;

    fill(230, 81, 0);
    text('Code is SECRET', x + 20, bulletY);
    bulletY += 22;
    text('Modification FORBIDDEN', x + 20, bulletY);
    bulletY += 22;
    text('Sharing may be ILLEGAL', x + 20, bulletY);
    bulletY += 22;
    text('PRAY the vendor tested and PATCHED', x + 20, bulletY);

    // Examples on single line
    bulletY += 30;
    fill(33, 33, 33);
    textSize(12);
    textAlign(LEFT, TOP);
    let examplesText = proprietaryExamples.map(e => e.name).join(', ');
    text('Examples: ' + examplesText, x + 20, bulletY, w - 40, 40);

    // Corporate building icon at bottom
    drawCorporateIcon(x + w/2, y + 260);
}

function drawBottomSection() {
    let y = 340;

    // Bottom panel
    fill(255, 255, 255, 230);
    stroke(200);
    strokeWeight(1);
    rect(margin, y, canvasWidth - margin * 2, 95, 10);

    // Title
    fill(50);
    noStroke();
    textSize(16);
    textAlign(CENTER, TOP);
    text('Both approaches have pros and cons!', canvasWidth/2, y + 10);

    // Two columns of pros
    textSize(12);
    textAlign(LEFT, TOP);

    // Open source pros
    fill(46, 125, 50);
    text('Open Source:', margin + 20, y + 35);
    fill(80);
    text('Transparency, community support,', margin + 20, y + 52);
    text('free to use, customizable', margin + 20, y + 67);

    // Proprietary pros
    fill(230, 81, 0);
    text('Proprietary:', canvasWidth/2 + 10, y + 35);
    fill(80);
    text('Dedicated support, polished UX,', canvasWidth/2 + 10, y + 52);
    text('integrated ecosystems', canvasWidth/2 + 10, y + 67);
}

function drawUnlockedPadlock(x, y) {
    // Shackle (open)
    stroke(46, 125, 50);
    strokeWeight(4);
    noFill();
    arc(x, y - 5, 24, 24, PI, PI + HALF_PI);
    line(x + 12, y - 5, x + 12, y - 15);

    // Body
    fill(76, 175, 80);
    noStroke();
    rect(x - 15, y + 5, 30, 25, 4);

    // Keyhole
    fill(255);
    ellipse(x, y + 14, 8, 8);
    rect(x - 2, y + 14, 4, 10);
}

function drawLockedPadlock(x, y) {
    // Shackle (closed)
    stroke(230, 81, 0);
    strokeWeight(4);
    noFill();
    arc(x, y - 5, 24, 24, PI, TWO_PI);

    // Body
    fill(255, 152, 0);
    noStroke();
    rect(x - 15, y + 5, 30, 25, 4);

    // Keyhole
    fill(255);
    ellipse(x, y + 14, 8, 8);
    rect(x - 2, y + 14, 4, 10);
}

function drawCommunityIcon(x, y) {
    // Simple community of people
    fill(76, 175, 80);
    noStroke();

    // Center person
    ellipse(x, y - 8, 10, 10);
    ellipse(x, y + 2, 14, 12);

    // Left person
    ellipse(x - 18, y - 5, 8, 8);
    ellipse(x - 18, y + 3, 12, 10);

    // Right person
    ellipse(x + 18, y - 5, 8, 8);
    ellipse(x + 18, y + 3, 12, 10);
}

function drawCorporateIcon(x, y) {
    // Simple building
    fill(255, 152, 0);
    noStroke();

    // Main building
    rect(x - 20, y - 15, 40, 30, 2);

    // Windows
    fill(255);
    for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 3; col++) {
            rect(x - 15 + col * 12, y - 10 + row * 12, 8, 8);
        }
    }
}

function checkHover() {
    // Hover functionality removed - examples now on single line
    cursor(ARROW);
}

function drawTooltip() {
    let examples = hoveredSide === 'open' ? openSourceExamples : proprietaryExamples;
    let example = examples.find(e => e.name === hoveredExample);

    if (!example) return;

    let tooltipW = 220;
    let tooltipH = 50;
    let tooltipX = mouseX + 15;
    let tooltipY = mouseY - 25;

    // Keep tooltip on screen
    if (tooltipX + tooltipW > canvasWidth - 10) {
        tooltipX = mouseX - tooltipW - 15;
    }
    if (tooltipY < 10) {
        tooltipY = 10;
    }

    // Tooltip background
    fill(50, 50, 50, 240);
    noStroke();
    rect(tooltipX, tooltipY, tooltipW, tooltipH, 5);

    // Tooltip text
    fill(255);
    textSize(13);
    textAlign(LEFT, TOP);
    text(example.name, tooltipX + 10, tooltipY + 8);

    textSize(11);
    fill(200);
    text(example.desc, tooltipX + 10, tooltipY + 26, tooltipW - 20, tooltipH - 30);
}

function drawLawyerJoke() {
    // Semi-transparent overlay
    fill(0, 0, 0, 180);
    noStroke();
    rect(0, 0, canvasWidth, drawHeight);

    // Joke box
    let boxW = 350;
    let boxH = 180;
    let boxX = (canvasWidth - boxW) / 2;
    let boxY = (drawHeight - boxH) / 2;

    fill(255);
    stroke(255, 152, 0);
    strokeWeight(3);
    rect(boxX, boxY, boxW, boxH, 10);

    // Warning icon
    fill(255, 152, 0);
    noStroke();
    textSize(50);
    textAlign(CENTER, CENTER);
    text('⚠️', canvasWidth/2, boxY + 45);

    // Text
    fill(50);
    textSize(16);
    text('What happens if you modify', canvasWidth/2, boxY + 90);
    text('proprietary software?', canvasWidth/2, boxY + 110);

    textSize(24);
    fill(230, 81, 0);
    text('LAWYERS! 👔⚖️', canvasWidth/2, boxY + 145);

    // Click to close instruction
    textSize(11);
    fill(150);
    text('(click anywhere to close)', canvasWidth/2, boxY + boxH - 15);
}

function toggleLawyerJoke() {
    showLawyerJoke = !showLawyerJoke;
}

function mousePressed() {
    if (showLawyerJoke && mouseY < drawHeight) {
        showLawyerJoke = false;
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);

    // Reposition button
    if (toggleButton) {
        toggleButton.position(canvasWidth/2 - 150, drawHeight + 12);
    }
}

function updateCanvasSize() {
    const container = document.querySelector('main');
    if (container) {
        canvasWidth = Math.max(500, container.offsetWidth);
    }
}
