class Level {
    constructor(w, h, levelData, allAssetData, player) {
        this.sW = w;
        this.sH = h;
        this.Flymove=1;
        
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
        //fly animation we can spam for the level to feel more alive
        this.Flyanimation=[];
        for (let i=0;i<25;i++){
            this.Flyanimation.push(assets[`FlyAnimation` + (i+1)].file)   
        }
        this.Flyanimation.push(assets[`FlyAnimation1`].file)
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
        this.Flymove+=1;
        if (this.Flymove>=24){
            this.Flymove=1;
        }
        console.log(this.player.x);
        // Background layers
        this.backgroundLayers.forEach(layer => {
            image(this.allAssets[layer.name].file, this.envX * layer.scrollfactor + layer.startPos[0], layer.startPos[1], (this.sH * this.allAssets[layer.name].file.width) / this.allAssets[layer.name].file.height, this.sH);
        });

        // Layer 0 Player
        this.player.draw(this);

        // Foreground layers
        this.foregroundLayers.forEach(layer => {
            image(this.allAssets[layer.name].file, this.envX * layer.scrollfactor + layer.startPos[0], layer.startPos[1], (this.sH * this.allAssets[layer.name].file.width) / this.allAssets[layer.name].file.height, this.sH);
            //fly animation dimmeren får spillet til at crash når man kommer på stage 2
            image(this.Flyanimation[round(this.Flymove)],this.envX * layer.scrollfactor+880,380,150,150)
        });
    }
}