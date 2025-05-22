// Catch the Ball Game
const canvas = document.getElementById("game1");
const ctx = canvas.getContext("2d");

let paddle = { 
  x: canvas.width / 2 - 50, 
  width: 100, 
  height: 10 
};

let ball = { 
  x: Math.random() * (canvas.width - 20), 
  y: 20, 
  radius: 10, 
  speed: 2,
  dx: 0,
  dy: 2
};

let score = 0;
let gameRunning = false;
let gameLoop;
let highScore = localStorage.getItem("catchBallHighScore") || 0;
document.getElementById("highScore1").textContent = highScore;

// Paddle movement
document.addEventListener("keydown", function(e) {
  if (e.key === "ArrowLeft" && paddle.x > 0) {
    paddle.x -= 20;
  }
  if (e.key === "ArrowRight" && paddle.x + paddle.width < canvas.width) {
    paddle.x += 20;
  }
});

function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, canvas.height - paddle.height - 10, paddle.width, paddle.height);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fillStyle = "#FF0000";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  if (!gameRunning) return;
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPaddle();
  drawBall();
  
  // Ball movement
  ball.x += ball.dx;
  ball.y += ball.dy;
  
  // Wall collision (left/right)
  if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
    ball.dx = -ball.dx;
  }
  
  // Paddle collision
  if (
    ball.y + ball.dy > canvas.height - paddle.height - ball.radius - 10 &&
    ball.x > paddle.x && 
    ball.x < paddle.x + paddle.width
  ) {
    ball.dy = -ball.dy;
    score++;
    document.getElementById("currentScore1").textContent = score;
    
    // Increase speed slightly
    ball.dy *= 1.05;
    ball.dx *= 1.05;
    
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("catchBallHighScore", highScore);
      document.getElementById("highScore1").textContent = highScore;
    }
  }
  
  // Bottom collision (game over)
  if (ball.y + ball.dy > canvas.height - ball.radius) {
    alert("Game Over! Your score: " + score);
    resetGame1();
    return;
  }
  
  // Top collision
  if (ball.y + ball.dy < ball.radius) {
    ball.dy = -ball.dy;
  }
  
  gameLoop = requestAnimationFrame(draw);
}

function resetBall() {
  ball.x = Math.random() * (canvas.width - 20);
  ball.y = 20;
  ball.dx = (Math.random() * 4 - 2) || 1; // Random horizontal direction
  ball.dy = 2;
}

window.startGame1 = function() {
  if (!gameRunning) {
    gameRunning = true;
    resetBall();
    draw();
  }
};

window.pauseGame1 = function() {
  gameRunning = false;
  cancelAnimationFrame(gameLoop);
};

window.resetGame1 = function() {
  pauseGame1();
  score = 0;
  document.getElementById("currentScore1").textContent = score;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
};