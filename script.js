const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 480;
canvas.height = 640;

let alienImg = new Image();
alienImg.src = 'super-alien.png';

let pillarImg = new Image();
pillarImg.src = 'pillar.png';

let alien = {
  x: 50,
  y: 150,
  width: 40,
  height: 40,
  gravity: 0.6,
  lift: -10,
  velocity: 0
};

let pillars = [];
let score = 0;
let gameOver = false;

document.addEventListener('keydown', () => {
  if (!gameOver) {
    alien.velocity = alien.lift;
  } else {
    resetGame();
  }
});

function drawAlien() {
  ctx.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height);
}

function drawPillars() {
  for (let i = 0; i < pillars.length; i++) {
    let p = pillars[i];
    ctx.drawImage(pillarImg, p.x, 0, p.width, p.top);
    ctx.drawImage(pillarImg, p.x, canvas.height - p.bottom, p.width, p.bottom);
  }
}

function updatePillars() {
  for (let i = 0; i < pillars.length; i++) {
    let p = pillars[i];
    p.x -= 2;

    if (p.x + p.width < 0) {
      pillars.splice(i, 1);
      score++;
    }

    if (
      alien.x < p.x + p.width &&
      alien.x + alien.width > p.x &&
      (alien.y < p.top || alien.y + alien.height > canvas.height - p.bottom)
    ) {
      gameOver = true;
    }
  }
}

function addPillar() {
  let top = Math.random() * (canvas.height / 2);
  let bottom = canvas.height - top - 150;
  pillars.push({ x: canvas.width, width: 50, top: top, bottom: bottom });
}

function updateAlien() {
  alien.velocity += alien.gravity;
  alien.y += alien.velocity;

  if (alien.y > canvas.height - alien.height || alien.y < 0) {
    gameOver = true;
  }
}

function drawScore() {
  ctx.fillStyle = '#fff';
  ctx.font = '24px Arial';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

function drawGameOver() {
  ctx.fillStyle = '#fff';
  ctx.font = '36px Arial';
  ctx.fillText('Game Over', canvas.width / 2 - 100, canvas.height / 2);
  ctx.font = '20px Arial';
  ctx.fillText('Press any key to restart', canvas.width / 2 - 110, canvas.height / 2 + 30);
}

function resetGame() {
  alien.y = 150;
  alien.velocity = 0;
  pillars = [];
  score = 0;
  gameOver = false;
}

setInterval(() => {
  if (!gameOver) addPillar();
}, 2000);

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAlien();
  drawPillars();
  drawScore();
  if (gameOver) {
    drawGameOver();
  } else {
    updateAlien();
    updatePillars();
  }
  requestAnimationFrame(gameLoop);
}

gameLoop();
