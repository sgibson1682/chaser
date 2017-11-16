const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let ball = { radius: 25, x: 250, y: 150, color: "red" };
let enemy = { x: 250, y: 250, width: 30, color: "blue" };
let mouse = { x: 0, y: 0 };

function updateMouse(event) {
  const canvasRect = canvas.getBoundingClientRect();
  mouse.x = event.clientX - canvasRect.left;
  mouse.y = event.clientY - canvasRect.top;
}

document.body.addEventListener("mousemove", updateMouse);

function clearBackground() {
  ctx.fillStyle = "lightgreen";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawBall() {
  ctx.fillStyle = ball.color;
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
}

function drawEnemy() {
  ctx.fillStyle = enemy.color;
  ctx.fillRect(
    enemy.x - enemy.width / 2,
    enemy.y - enemy.width / 2,
    enemy.width,
    enemy.width
  );
  ctx.strokeRect(
    enemy.x - enemy.width / 2,
    enemy.y - enemy.width / 2,
    enemy.width,
    enemy.width
  );
}

function moveToward(leader, follower, speed) {
  follower.x += (leader.x - follower.x) * speed;
  follower.y += (leader.y - follower.y) * speed;
}

function updateScene() {
  moveToward(mouse, ball, .1);
  moveToward(ball, enemy, .05);
}

function drawScene() {
  clearBackground();
  drawBall();
  drawEnemy();
  updateScene();
  requestAnimationFrame(drawScene);
}

requestAnimationFrame(drawScene);
