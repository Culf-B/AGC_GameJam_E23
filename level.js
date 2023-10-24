class Level {
    constructor(w, h, levelData, allAssetData, player) {
        this.sW = w;
        this.sH = h;
        
        this.levelData = levelData;
        this.player = player
        this.allAssets = allAssetData;

        this.worldX = 0;
        this.worldY = 0;

        this.levelWidth = (this.sH * this.allAssets[levelData.value.levelLength].file.width) / this.allAssets[levelData.value.levelLength].file.height;

        this.foregroundLayers = this.levelData.value.foregroundLayers;
        this.backgroundLayers = this.levelData.value.backgroundLayers;
    }

    update(delta) {
        this.player.update(delta);
    }

    draw() {
        // Background layers
        this.backgroundLayers.forEach(layer => {
            image(this.allAssets[layer].file, 0, 0, (this.sH * this.allAssets[layer].file.width) / this.allAssets[layer].file.height, this.sH);
        });

        // Layer 0 Player
        this.player.draw();

        // Foreground layers
        this.foregroundLayers.forEach(layer => {
            image(this.allAssets[layer].file, 0, 0, (this.sH * this.allAssets[layer].file.width) / this.allAssets[layer].file.height, this.sH)
        });
    }
}