let player;

const assets = [];
const levels = [];

const sW = 800;
const sH = 800;

// Functions for dataloading
function loadAssets(jsonData) {
  /*
  This function loads assetdata and pushes to "assets"
  */
  jsonData.assets.forEach(asset => {
    assets.push({"name": asset.name, "file": loadImage("assets/" + asset.file)});
  });
}
function loadLevels(jsonData) {
    // Load and push leveldata
    levels.push({
      key: jsonData.name,
      value: jsonData.layers
    });
}

function preload() {
  /*
  Preload level and assetdata
  */
  // Preload asset files
  loadJSON("assets/assets.json", loadAssets);
  // Preload level files
}

function setup() {
  createCanvas(sW, sH);
  player = new Player(65, 68, 32);
}

function draw() {
  background(220);
  player.update(deltaTime / 1000);
  player.draw();
}