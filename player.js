class Player {
    /*
    Basic player class
    */
    constructor(mLeft, mRight, jump, interact) {
        this.keyCodes = {
            "mLeft": mLeft,
            "mRight": mRight,
            "jump": jump,
            "interact": interact
        };
        
        // Physics
        this.speed = 500;
        this.jumpForce = 20 * 100;
        this.g = 9.82 * 5; // px / s
        this.vel = [0, 0];
        
        // Position and size
        this.x = 0;
        this.y = 0;
        this.size = 100;

        this.freeMove = false;
        this.playerMotion = assets[`playerwalk2`].file;
        this.playermove=1;
        this.direction=1;

        this.inInteraction = false;
        this.wantsInteraction = false;
        this.currentInteraction = [];
        this.interactionIndex = 0;
        this.interactionKeyLastState = false;
        this.interactionSkipTimer = 0;
    }
  
    update(delta, level) {
        // Player animation assets
        this.playerMotion=[];
        for (let i=0;i<14;i++){
           this.playerMotion.push(assets[`playerwalk` + (i+1)].file)
           
        }
        this.playerMotion.push(assets[`playerwalk1`].file)
        /*
        Events and movement
        Argument "delta" has to be time in seconds since the last frame (deltaTime / 1000)
        */

        let movementToDo = [0, 0];
        // Events
        if (!this.inInteraction) {
            if (keyIsDown(this.keyCodes.mLeft)) {
                movementToDo[0] -= 1 * this.speed;
                this.playermove-=0.12;
                this.direction=-1;
            }
            if (keyIsDown(this.keyCodes.mRight)) {
                movementToDo[0] += 1 * this.speed;
                this.playermove+=0.12;
                this.direction=1;
            }
            if (keyIsDown(this.keyCodes.jump) && this.y == sH * level.levelData.value.floorPosition - this.size) {
                this.vel[1] -= this.jumpForce;
            }
        }
        // Interaction events / update
        if (keyIsDown(this.keyCodes.interact)) {
            if (!this.inInteraction && this.interactionSkipTimer > 1) {
                this.wantsInteraction = true;
            } else {
                this.wantsInteraction = false;
                if (this.interactionSkipTimer > 1) {
                    this.interactionSkipTimer = 0;
                    this.interactionIndex += 1
                    if (this.interactionIndex > this.currentInteraction.length - 1) {
                        this.inInteraction = false;
                        if (finalInteractionStarted) {
                            changeLevel(-2);
                        }
                    }
                }
            }
        } else {
            this.wantsInteraction = false;
        }
        this.interactionSkipTimer += delta;

        // Change animation
        if (movementToDo[0]==0){
           this.playermove=8;
        }
        
        // Velocity changes on y axis (gravity and jump)
        if (this.y < sH * level.levelData.value.floorPosition - this.size) {
          this.vel[1] += this.g * delta * 100;
        } else if (this.vel[1] > 0) {
          this.vel[1] = 0; 
        }
  
        // Movement
        this.x += movementToDo[0] * delta;
        this.y += this.vel[1] * delta;

        // Left and right side boundary
        if (this.x < level.levelData.value.leftBoundary) {
            this.x = level.levelData.value.leftBoundary;
            changeLevel(level.levelData.value.leftAction, true);
        }
        if (this.x > level.levelData.value.rightBoundary - this.size) {
            this.x = level.levelData.value.rightBoundary - this.size;
            if (level.levelData.value.rightAction != 0) {
                changeLevel(level.levelData.value.rightAction, false);
            }
        }

        // Bottom of screen boundary
        if (this.y > sH * level.levelData.value.floorPosition - this.size) {
          this.y = sH * level.levelData.value.floorPosition  - this.size;
        }
    }
    draw(level) {
        /*
        Draw the player on the screen
        */
        // Determine player x position
        if (this.freeMove && this.x > 0) {
            this.drawX = this.x + sW / 2 - this.size / 2 - (level.levelWidth - level.sW);
        } else if (this.freeMove && this.x < 0) {
            this.drawX = this.x + sW / 2 - this.size / 2;
        } else {
            this.drawX = sW / 2 - this.size / 2;
        }
        push()
        translate(this.drawX-120*this.direction,this.y)
        scale(this.direction,1);
        image(this.playerMotion[round(this.playermove)],0,-200, 200, 300);
        pop()   
        if(this.playermove>=7){
            this.playermove=1;
        }
        if(this.playermove<=0){
            this.playermove=7;
        }
        // Display interaction
        if (this.inInteraction) {
            stroke(255);
            fill(0);
            textSize(20);
            rect(15, 15, textWidth(this.currentInteraction[this.interactionIndex]) + 50, 50);
            fill(255);
            text(this.currentInteraction[this.interactionIndex], 25, 45);
            if (this.interactionSkipTimer > 1) {
                image(assets["rightArrow"].file, textWidth(this.currentInteraction[this.interactionIndex] + 20), 15, 50, 50);
            }
        }
    }
  }