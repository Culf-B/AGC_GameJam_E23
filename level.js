class Level {
    constructor(width, height, levelData, allAssetData, player) {
        this.width = width;
        this.height = height;
        this.levelData = levelData;
        this.player = player
        this.allAssets = allAssetData;

        this.foregroundLayers = this.levelData.value.foregroundLayers;
        this.backgroundLayers = this.levelData.value.backgroundLayers;
    }

    update(delta) {
        this.player.update(delta);
    }

    draw() {
        // Background layers
        this.backgroundLayers.forEach(layer => {
            image(this.allAssets[layer].file, 0, 0, (this.height * this.allAssets[layer].file.width) / this.allAssets[layer].file.height, this.height);
        });

        // Layer 0 Player
        this.player.draw();

        // Foreground layers
        this.foregroundLayers.forEach(layer => {
            image(this.allAssets[layer].file, 0, 0, (this.height * this.allAssets[layer].file.width) / this.allAssets[layer].file.height, this.height)
        });
    }
}