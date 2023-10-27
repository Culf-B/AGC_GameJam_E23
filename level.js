class Level {
    constructor(w, h, levelData, allAssetData, player) {
        this.sW = w;
        this.sH = h;
        
        this.levelData = levelData;
        this.player = player
        this.allAssets = allAssetData;
        
        this.player.x = levelData.value.spawnPos[0];
        this.player.y = levelData.value.spawnPos[0];

        // Get levelwidth from the asset that defines levelwidth and scale it to fit screenheight while keeping ratio
        this.levelWidth = (this.sH * this.allAssets[levelData.value.levelLength].file.width) / this.allAssets[levelData.value.levelLength].file.height;

        // Set left and right default boundary
        if (this.levelData.value.leftBoundary == undefined) {
            this.levelData.value.leftBoundary = -this.sW / 2 + this.player.size / 2;
        }
        if (this.levelData.value.rightBoundary == undefined) {
            this.levelData.value.rightBoundary = this.levelWidth -this.sW / 2 + this.player.size * 1.5;
        }

        this.foregroundLayers = this.levelData.value.foregroundLayers;
        this.backgroundLayers = this.levelData.value.backgroundLayers;
    }

    update(delta) {
        this.player.update(delta, this);
    }

    draw() {
        if (this.player.x >= 0 && this.player.x <= this.levelWidth - this.sW) {
            this.envX = -this.player.x
            this.player.freeMove = false;

        } else if (this.player.x < 0) {
            this.envX = 0
            this.player.freeMove = true;

        } else if (this.player.x > this.levelWidth - this.sW) {
            this.envX = -(this.levelWidth - this.sW)
            this.player.freeMove = true;
        }
        /*
        kat hitbox
        if(this.player.x >= 600 && this.player.x <=750) && stage 1{
           
        }
        fugle skræmsel
        if(this.player.x >= 700 && this.player.x <= 1000 && stage 2){

        }
        */

        // Background layers
        this.backgroundLayers.forEach(layer => {
            image(this.allAssets[layer.name].file, this.envX * layer.scrollfactor + layer.startPos[0], layer.startPos[1], (this.sH * this.allAssets[layer.name].file.width) / this.allAssets[layer.name].file.height, this.sH);
        });

        // Layer 0 Player
        this.player.draw(this);

        // Foreground layers
        this.foregroundLayers.forEach(layer => {
            image(this.allAssets[layer.name].file, this.envX * layer.scrollfactor + layer.startPos[0], layer.startPos[1], (this.sH * this.allAssets[layer.name].file.width) / this.allAssets[layer.name].file.height, this.sH)
        });
    }
}