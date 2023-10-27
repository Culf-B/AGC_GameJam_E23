class GameAnimation {
    constructor(assetNames, timePerFrame, allAssets) {
        this.assets = [];
        assetNames.forEach(name => {
            this.assets.push(allAssets[name].file);
        });
        this.timePerFrame = timePerFrame;
        this.currentFrameIndex = 0;
        this.timePassed = 0;
    }
    update(delta) {
        this.timePassed += delta;
        if (this.timePassed >= this.timePerFrame) {
            this.timePassed -= this.timePerFrame;
            this.currentFrameIndex += 1;
            if (this.currentFrameIndex > this.assets.length - 1) {
                this.currentFrameIndex = 0;
            }
        }
    }
    get() {
        return this.assets[this.currentFrameIndex];
    }
}