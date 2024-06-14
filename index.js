var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;
var para = document.querySelector("p");
var body = document.querySelector("body");
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var snakeBody = [];
var speedX = 0;
var speedY = 0;
var score = 0;
var scoreCounter = document.querySelector("#scoreCounter");
var foodX;
var foodY;
var gameOver = false;

window.onload = function () {
  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d");
  document.addEventListener("keydown", function (e) {
    if (gameOver) {
      score = 0;
      scoreCounter.innerText = `Score:${score}`;
      snakeBody = [];
      snakeX = blockSize * 5;
      snakeY = blockSize * 5;
      gameOver = false;
      placeFood();
    }
    changeDirection(e);
  });
  placeFood();
  setInterval(update, 1000 / 10);
};

function update() {
  if (gameOver) {
    return;
  }
  context.fillStyle = "black";
  context.fillRect(0, 0, board.height, board.width);

  context.fillStyle = "red";
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    score++;
    scoreCounter.innerText = `Score:${score}`;
    snakeBody.push([foodX, foodY]);
    placeFood();
  }
  for (var i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }
  context.fillStyle = "lime";
  snakeX += speedX * blockSize;
  snakeY += speedY * blockSize;

  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (var i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }
  if (
    snakeX < 0 ||
    snakeX > cols * blockSize ||
    snakeY < 0 ||
    snakeY > rows * blockSize
  ) {
    gameOver = true;
    body.classList.add("game-over");
    setTimeout(function () {
      body.classList.remove("game-over");
    }, 200);
    para.classList.remove("d-none");
    para.innerText = "Game Over , Press Any Arrow Key to Start";
  }

  for (var i = 0; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      body.classList.add("game-over");
      setTimeout(function () {
        body.classList.remove("game-over");
      }, 200);
      para.classList.remove("d-none");
      para.innerText = "Game Over , Press Any Arrow Key to Start";
    }
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
}

function changeDirection(e) {
  if (e.code == "ArrowUp" && speedY != 1) {
    para.classList.add("d-none");
    speedX = 0;
    speedY = -1;
  } else if (e.code == "ArrowDown" && speedY != -1) {
    para.classList.add("d-none");
    speedX = 0;
    speedY = 1;
  } else if (e.code == "ArrowLeft" && speedX != 1) {
    para.classList.add("d-none");
    speedX = -1;
    speedY = 0;
  } else if (e.code == "ArrowRight" && speedX != -1) {
    para.classList.add("d-none");
    speedX = 1;
    speedY = 0;
  }
}
