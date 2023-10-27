class Level {
    constructor(w, h, levelData, allAssetData, allDecorationData, allNpcData, player, spawnRight) {
        this.sW = w;
        this.sH = h;
    
        this.levelData = levelData;
        this.player = player
        this.allAssets = allAssetData;
        console.log(allNpcData);

        this.decorations = [];
        this.levelData.value.decorations.forEach(decoration => {
            this.decorations.push(new Decoration(decoration.position[0], decoration.position[1], allDecorationData[decoration.name]));
        })
        this.npcs = [];
        this.levelData.value.npcs.forEach(npc => {
            if (npc.interactionOffset == undefined) {
                npc.interactionOffset = [0, 0];
            }
            this.npcs.push(new Npc(npc.position[0], npc.position[1], allNpcData[npc.name], npc.interactionOffset));
        })
        
        if (spawnRight) {
            this.player.x = levelData.value.spawnPosR[0];
            this.player.y = levelData.value.spawnPosR[1];
        } else {
            this.player.x = levelData.value.spawnPosL[0];
            this.player.y = levelData.value.spawnPosL[1];
        }
        
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
        this.decorations.forEach(decoration => {
            decoration.update(delta);
        });
        this.npcs.forEach(npc => {
            npc.update(delta, this.player, this.envX);
        });
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
        
        // Background layers
        this.backgroundLayers.forEach(layer => {
            image(this.allAssets[layer.name].file, this.envX * layer.scrollfactor + layer.startPos[0], layer.startPos[1], (this.sH * this.allAssets[layer.name].file.width) / this.allAssets[layer.name].file.height, this.sH);
        });

        // Decorations
        this.decorations.forEach(decoration => {
            decoration.draw(this.envX);
        });

        // Npcs
        this.npcs.forEach(npc => {
            npc.draw(this.envX);
        });

        // Layer 0 Player
        this.player.draw(this);

        // Foreground layers
        this.foregroundLayers.forEach(layer => {
            image(this.allAssets[layer.name].file, this.envX * layer.scrollfactor + layer.startPos[0], layer.startPos[1], (this.sH * this.allAssets[layer.name].file.width) / this.allAssets[layer.name].file.height, this.sH);
        });
    }
}