class GameObject {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Npc extends GameObject {
    // With interactions
    constructor(x, y, npcData) {
        super(x, y);
        this.npcData = npcData;
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