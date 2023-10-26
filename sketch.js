var gameRunning = false;
let player;

const assets = {};
const levels = [undefined, undefined];

const sW = 1280;
const sH = 720;

let level;

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
    levels[jsonData.index] = {
      key: jsonData.name,
      value: {
        "floorPosition": jsonData.floorPosition,
        "leftBoundary": jsonData.leftBoundary,
        "rightBoundary": jsonData.rightBoundary,
        "leftAction": jsonData.leftAction,
        "rightAction": jsonData.rightAction,
        "levelLength": jsonData.levelLength,
        "spawnPos": jsonData.spawnPos,
        "assetList": jsonData.assetList,
        "backgroundLayers": jsonData.backgroundLayers,
        "foregroundLayers": jsonData.foregroundLayers
      }
    }
}

function preload() {
  /*
  Preload level and assetdata
  */
  // Preload asset files
  loadJSON("assets/assets.json", loadAssets);
  // Preload level files
  loadJSON("levels/lvl1.json", loadLevels);
  loadJSON("levels/lvl2.json", loadLevels);
}

function setup() {
  createCanvas(sW, sH, document.getElementById("gameScreen"));
  player = new Player(65, 68, 32);
  changeLevel(0);
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
    gameRunning = true;
  }
}

function endGame() {
  if (gameRunning) {
    document.getElementById("titleScreen").style.display = "block";
    document.getElementById("gameScreen").style.display = "none";
    gameRunning = false;
  }
}

function changeLevel(levelIndex) {
  if (levelIndex == -1) {
    endGame();
  } else {
    level = new Level(sW, sH, levels[levelIndex], assets, player);
  }
}