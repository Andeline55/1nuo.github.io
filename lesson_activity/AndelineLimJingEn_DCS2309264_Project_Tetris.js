let grid = 32;
let columns = 10;
let rows = 20;
let board = [];
let tetromino;
let tetrominoSequence = [];
let colors = {
  'I': 'cyan',
  'O': 'yellow',
  'T': 'purple',
  'S': 'green',
  'Z': 'red',
  'J': 'blue',
  'L': 'orange'
};
let tetrominos = {
  'I': [
    [1, 1, 1, 1]
  ],
  'J': [
    [1, 0, 0],
    [1, 1, 1]
  ],
  'L': [
    [0, 0, 1],
    [1, 1, 1]
  ],
  'O': [
    [1, 1],
    [1, 1]
  ],
  'S': [
    [0, 1, 1],
    [1, 1, 0]
  ],
  'T': [
    [0, 1, 0],
    [1, 1, 1]
  ],
  'Z': [
    [1, 1, 0],
    [0, 1, 1]
  ]
};
let count = 0;
let gameOver = false;
let moveLeft = false;
let moveRight = false;
let moveDown = false;
let score = 0;

function setup() {
  let canvas = createCanvas(1280, 720); 
  canvas.style('border', '1px solid white');
  canvas.style('display', 'block');
  canvas.style('margin', 'auto');
  canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2);
  frameRate(6);
  resetBoard();
  tetromino = getNextTetromino();
  score = 0;
}

function draw() {
  background(255); 

  fill(0);
  rect((width - columns * grid) / 2, (height - rows * grid) / 2, columns * grid, rows * grid);

  translate((width - columns * grid) / 2, (height - rows * grid) / 2); // Center game area
  drawBoard();
  drawTetromino();
  updateTetromino();

  noStroke();
  fill(255);
  rect(columns * grid + 40, 0, width - columns * grid - 40, height);

  let boxX = columns * grid + 60;
  let scoreBoxY = 30; 
  let boxWidth = grid * 4;
  let boxHeight = 50;

  fill(255);
  noStroke();
  rect(boxX, scoreBoxY - 30, boxWidth, boxHeight + 30);

  fill(0);
  stroke(255);
  rect(boxX, scoreBoxY, boxWidth, boxHeight);


  fill(255);
  textSize(16);
  textAlign(CENTER, CENTER);
  text('Score: ' + score, boxX + boxWidth / 2, scoreBoxY + boxHeight / 2);

  drawNextTetromino(boxX, scoreBoxY + boxHeight + 20); 

  if (moveLeft && isValidMove(tetromino.matrix, tetromino.row, tetromino.col - 1)) {
    tetromino.col--;
  }
  if (moveRight && isValidMove(tetromino.matrix, tetromino.row, tetromino.col + 1)) {
    tetromino.col++;
  }
  if (moveDown && isValidMove(tetromino.matrix, tetromino.row + 1, tetromino.col)) {
    tetromino.row++;
  }

  if (gameOver) {
    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    text('GAME OVER', (columns * grid) / 2, (rows * grid) / 2);
  }
}

function resetBoard() {
  for (let row = 0; row < rows; row++) {
    board[row] = [];
    for (let col = 0; col < columns; col++) {
      board[row][col] = '';
    }
  }
}

function drawBoard() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      if (board[row][col]) {
        fill(colors[board[row][col]]);
        stroke(0);
        rect(col * grid, row * grid, grid, grid);
      }
    }
  }
}

function getNextTetromino() {
  if (tetrominoSequence.length === 0) {
    generateSequence();
  }
  const name = tetrominoSequence.pop();
  console.log('Next Tetromino:', name); 
  const matrix = tetrominos[name];
  const col = floor(columns / 2) - floor(matrix[0].length / 2);
  return { name, matrix, row: 0, col };
}

function generateSequence() {
  const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  while (sequence.length) {
    const rand = getRandomInt(0, sequence.length - 1);
    const name = sequence.splice(rand, 1)[0];
    tetrominoSequence.push(name);
  }
  console.log('Tetromino Sequence:', tetrominoSequence);
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function drawTetromino() {
  fill(colors[tetromino.name]);
  stroke(0);
  for (let row = 0; row < tetromino.matrix.length; row++) {
    for (let col = 0; col < tetromino.matrix[row].length; col++) {
      if (tetromino.matrix[row][col]) {
        rect((tetromino.col + col) * grid, (tetromino.row + row) * grid, grid, grid);
      }
    }
  }
}

function drawNextTetromino(x, y) {
  if (tetrominoSequence.length === 0) {
    generateSequence(); 
  }

  const nextTetromino = tetrominoSequence[tetrominoSequence.length - 1];
  const matrix = tetrominos[nextTetromino];
  let boxWidth = grid * 4;
  let boxHeight = grid * 4;

  fill(255); 
  stroke(255);
  rect(x, y, boxWidth, boxHeight + 100); 

  fill(0); 
  stroke(255);
  rect(x, y, boxWidth, boxHeight);

  fill(colors[nextTetromino]);
  stroke(0);
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col]) {
        rect(x + col * grid + (boxWidth - matrix[0].length * grid) / 2, y + row * grid + (boxHeight - matrix.length * grid) / 2, grid, grid);
      }
    }
  }
}

function updateTetromino() {
  count++;
  if (count % 10 === 0) {
    tetromino.row++;
    if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
      tetromino.row--;
      placeTetromino();
      tetromino = getNextTetromino();
      if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
        gameOver = true;
        noLoop();
      }
    }
    count = 0;
  }
}

function isValidMove(matrix, row, col) {
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      if (matrix[r][c] &&
         (col + c < 0 || col + c >= columns || row + r >= rows || board[row + r][col + c])) {
        return false;
      }
    }
  }
  return true;
}

function placeTetromino() {
  for (let row = 0; row < tetromino.matrix.length; row++) {
    for (let col = 0; col < tetromino.matrix[row].length; col++) {
      if (tetromino.matrix[row][col]) {
        board[tetromino.row + row][tetromino.col + col] = tetromino.name;
      }
    }
  }
  checkForLineClears();
}

function checkForLineClears() {
  let linesCleared = 0;
  for (let row = rows - 1; row >= 0; row--) {
    if (board[row].every(cell => cell)) {
      for (let r = row; r > 0; r--) {
        for (let c = 0; c < columns; c++) {
          board[r][c] = board[r - 1][c];
        }
      }
      for (let c = 0; c < columns; c++) {
        board[0][c] = '';
      }
      row++;
      linesCleared++;
    }
  }

  if (linesCleared > 0) {
    score += linesCleared * 100;
  }
}

function keyPressed() {
  if (gameOver) return;
  if (keyCode === LEFT_ARROW) {
    moveLeft = true;
  } else if (keyCode === RIGHT_ARROW) {
    moveRight = true;
  } else if (keyCode === DOWN_ARROW) {
    moveDown = true;
  } else if (keyCode === UP_ARROW) {
    let rotated = rotateMatrix(tetromino.matrix);
    let offset = 0;

    while (!isValidMove(rotated, tetromino.row, tetromino.col + offset)) {
      offset++;
      if (offset > 4) {
        rotated = tetromino.matrix;
        break;
      }
    }

    if (isValidMove(rotated, tetromino.row, tetromino.col + offset)) {
      tetromino.matrix = rotated;
      tetromino.col += offset;
    }
  } else if (keyCode === 32) {
    dropTetromino();
  }
}

function keyReleased() {
  if (keyCode === LEFT_ARROW) {
    moveLeft = false;
  } else if (keyCode === RIGHT_ARROW) {
    moveRight = false;
  } else if (keyCode === DOWN_ARROW) {
    moveDown = false;
  }
}

function dropTetromino() {
  while (isValidMove(tetromino.matrix, tetromino.row + 1, tetromino.col)) {
    tetromino.row++;
  }
  placeTetromino();
  tetromino = getNextTetromino();
  if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
    gameOver = true;
    noLoop();
    textSize(32);
    fill(255);
    textAlign(CENTER, CENTER);
    text('GAME OVER', (columns * grid) / 2, (rows * grid) / 2);
  }
}

function rotateMatrix(matrix) {
  const result = [];
  const rows = matrix.length;
  const cols = matrix[0].length;

  for (let row = 0; row < cols; row++) {
    result[row] = [];
    for (let col = 0; col < rows; col++) {
      result[row][col] = matrix[rows - 1 - col][row];
    }
  }
  return result;
}
