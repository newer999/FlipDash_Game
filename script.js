
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let player = { x: 50, y: 300, width: 30, height: 30, dy: 0 };
let gravity = 0.5;
let jump = -10;

document.addEventListener('keydown', () => {
    player.dy = jump;
});

function update() {
    player.dy += gravity;
    player.y += player.dy;

    if (player.y + player.height > canvas.height) {
        player.y = canvas.height - player.height;
        player.dy = 0;
    }

    draw();
    requestAnimationFrame(update);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'lime';
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

update();
