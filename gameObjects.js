class GameObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Npc extends GameObject {
    // With interactions
    constructor(x, y, npcData, interactionOffset) {
        super(x, y);
        this.npcData = npcData;
        this.animation = new GameAnimation(this.npcData.animation, this.npcData.timePerFrame, assets);
        this.defaultSize = this.npcData.defaultSize;
        this.interactions = this.npcData.interactions;
        this.interactionIcon = assets[npcData.interactionIcon].file;
        this.displayInteractionIcon = false;
        this.interactionOffset = interactionOffset;
        this.drawSelf = true;
    }
    update(delta, player, levelEnvX) {
        this.animation.update(delta);
        if (abs(this.x + levelEnvX - player.drawX + this.interactionOffset[0]) < 150 && !player.inInteraction && player.interactionSkipTimer > 1) {
            this.displayInteractionIcon = true;
            if (player.wantsInteraction && this.drawSelf) {
                player.inInteraction = true;
                player.interactionIndex = 0;
                if (bookPickedUp && this.npcData.name == "grandma") {
                    player.currentInteraction = this.interactions[1];
                    finalInteractionStarted = true;
                } else {
                    player.currentInteraction = this.interactions[0];
                    if (this.npcData.name == "book") {
                        bookPickedUp = true;
                    }
                }
                
                player.interactionSkipTimer = 0;
            }
        } else {
            this.displayInteractionIcon = false;
        }
    }
    draw(levelEnvX) {
        this.drawSelf = true;
        if (this.npcData.name == "book" && bookPickedUp) {
            this.drawSelf = false;
        }
        if (this.drawSelf){
            if (this.animation.get() != undefined) {
                image(this.animation.get(), this.x + levelEnvX, this.y, this.defaultSize[0], this.defaultSize[1]);
            }
            if (this.displayInteractionIcon) {
                image(this.interactionIcon, this.x + levelEnvX + this.interactionOffset[0], this.y + this.interactionOffset[1], 75, 75);
            }
        }
    }
}

class Decoration extends GameObject {
    // Image/animation with position
    constructor(x, y, decorationData) {
        super(x, y);
        this.decorationData = decorationData;
        this.animation = new GameAnimation(this.decorationData.animation, this.decorationData.timePerFrame, assets);
        this.defaultSize = this.decorationData.defaultSize;
    }
    update(delta) {
        this.animation.update(delta);
    }
    draw(levelEnvX) {
        image(this.animation.get(), this.x + levelEnvX, this.y, this.defaultSize[0], this.defaultSize[1]);
    }
}

class Item extends GameObject {
    // Usable by player
    constructor(x, y, itemData) {
        super(x, y);
        this.itemData;
    }
}