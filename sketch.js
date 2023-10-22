let player;
const sW = 800;
const sH = 800;

function setup() {
  createCanvas(sW, sH);
  player = new Player(65, 68, 32);
}

function draw() {
  background(220);
  player.update(deltaTime / 1000);
  player.draw();
}