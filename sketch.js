var gameRunning = false;
let player;

const assets = {};
const levels = [undefined, undefined];
var decorations;
var npcs;
var items;
var bookPickedUp = false;
var finalInteractionStarted = false;
var creditsScreen = false;
var creditsY = 0;

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
        "spawnPosL": jsonData.spawnPosL,
        "spawnPosR": jsonData.spawnPosR,
        "assetList": jsonData.assetList,
        "backgroundLayers": jsonData.backgroundLayers,
        "foregroundLayers": jsonData.foregroundLayers,
        "npcs": jsonData.npcs,
        "decorations": jsonData.decorations,
        "items": jsonData.items
      }
    }
}

function loadDecorations(jsonData) {
  decorations = jsonData;
}
function loadNpcs(jsonData) {
  npcs = jsonData;
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
  loadJSON("levels/lvl3.json", loadLevels);
  // Preload gameObjects
  loadJSON("gameObjectData/decorations.json", loadDecorations); 
  loadJSON("gameObjectData/npcs.json", loadNpcs); 
}

function setup() {
  createCanvas(sW, sH, document.getElementById("gameScreen"));
  player = new Player(65, 68, 32, 69);
  changeLevel(0);
}

function draw() {
  if (gameRunning) {
    background(220);
    level.update(deltaTime / 1000);
    level.draw();
  }
  if (creditsScreen) {
    image(assets["credits"].file, 0, creditsY, sW + 20, sH*2);
    creditsY -= 1;
    if (abs(creditsY) > sH){
      console.log("Changing level");
      changeLevel(-1);
    }
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
  if (gameRunning || creditsScreen) {
    document.getElementById("titleScreen").style.display = "block";
    document.getElementById("gameScreen").style.display = "none";
    gameRunning = false;
    creditsScreen = false;
  }
}
function showCredits() {
  creditsScreen = true;
};

function changeLevel(levelIndex, spawnRight) {
  if (levelIndex == -1) {
    endGame();
  } else if (levelIndex == -2) {
    showCredits();
    gameRunning = false;
  } else {
    level = new Level(sW, sH, levels[levelIndex], assets, decorations, npcs, player, spawnRight);
  }
}