var gameRunning = false;
let player;

const assets = {};
const levels = [];

const sW = 1280;
const sH = 720;

// Functions for dataloading
function loadAssets(jsonData) {
  /*
  This function loads assetdata and pushes to "assets"
  */
  jsonData.assets.forEach(asset => {
    assets[asset.name] = {"name": asset.name, "file": loadImage("assets/" + asset.file)};
  });
}
function loadLevels(jsonData) {
    // Load and push leveldata
    levels.push({
      key: jsonData.name,
      value: {
        "floorPosition": jsonData.floorPosition,
        "leftBoundary": jsonData.leftBoundary,
        "levelLength": jsonData.levelLength,
        "assetList": jsonData.assetList,
        "backgroundLayers": jsonData.backgroundLayers,
        "foregroundLayers": jsonData.foregroundLayers
      }
    });
}

function preload() {
  /*
  Preload level and assetdata
  */
  // Preload asset files
  loadJSON("assets/assets.json", loadAssets);
  // Preload level files
  loadJSON("levels/lvl2.json", loadLevels);
}

function setup() {
  player = new Player(65, 68, 32);
  level = new Level(sW, sH, levels[0], assets, player);
}

function draw() {
  if (gameRunning) {
    background(220);
    level.update(deltaTime / 1000); 
    level.draw(); 
  }
}

function startGame() {
  if (!gameRunning) {
    document.getElementById("titleScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    createCanvas(sW, sH, document.getElementById("gameScreen"));
    gameRunning = true;
  }
}