class Player {
    /*
    Basic player class
    */
    constructor(mLeft, mRight, jump) {
        this.keyCodes = {
            "mLeft": mLeft,
            "mRight": mRight,
            "jump": jump
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
    }
  
    update(delta, level) {
        /*
        Events and movement
        Argument "delta" has to be time in seconds since the last frame (deltaTime / 1000)
        */
        
        let movementToDo = [0, 0];
        // Events
        if (keyIsDown(this.keyCodes.mLeft)) {
            movementToDo[0] -= 1 * this.speed;
        }
        if (keyIsDown(this.keyCodes.mRight)) {
            movementToDo[0] += 1 * this.speed;
        }
        if (keyIsDown(this.keyCodes.jump) && this.y == sH - this.size) {
            this.vel[1] -= this.jumpForce;
        }
  
        // Velocity changes on y axis (gravity and jump)
        if (this.y < sH - this.size) {
          this.vel[1] += this.g * delta * 100;
        } else if (this.vel[1] > 0) {
          this.vel[1] = 0; 
        }
  
        // Movement
        this.x += movementToDo[0] * delta;
        this.y += this.vel[1] * delta;

        // Bottom of screen boundary
        if (this.y > sH - this.size) {
          this.y = sH - this.size;
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
        square(this.drawX, this.y, this.size);
    }
  }