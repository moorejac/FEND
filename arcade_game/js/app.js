// Enemies the player must avoid
class Enemy {
    constructor() {
        // set x & y movement values
        this.xIncrement = 101;
        this.yIncrement = 83;

        // set enemy boundaries
        this.minTop = 0;
        this.maxBottom = 62.25;
        this.minLeft = -1 * this.xIncrement; // instantiate off screen
        this.maxRight = 5 * this.xIncrement; // reset after moving off screen

        // Set enemy speed to random value between 1 and 3
        this.movement = this.setSpeed();

        // Calculate enemy starting x & y coordinates
        this.startX = -1 * this.xIncrement;
        this.startY = this.maxBottom + this.setYPos();

        // Set enemy starting position
        this.x = this.startX;
        this.y = this.startY;

        this.sprite = 'images/enemy-bug.png';
    }

    setSpeed() { return Math.floor(Math.random() * 6) + 2; }

    setYPos() { return (Math.floor(Math.random() * 3)) * this.yIncrement}

    // Update the enemy position and check for player collision
    // If a collision is detected, respawn the player
    update(dt) {
        // boundary detection
        if (this.x < this.maxRight) {
            this.x = this.x + this.movement;
        } else {
            this.respawn();
        }
        // collission detection
        if (this.x + 62 >= player.x &&
            this.x + this.xIncrement <= player.x + player.xIncrement &&
            player.y === this.y) {
            player.respawn();
        }
    }


    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // respawn enemy with new speed and Y position
    respawn() {
        this.movement = this.setSpeed();
        this.x = this.startX;
        this.y = this.maxBottom + this.setYPos();
    }
}


class Player {
    constructor() {
        // set x & y movement values
        this.xIncrement = 101;
        this.yIncrement = 83;
      
        // set player boundaries
        this.minTop = 1 * this.xIncrement;
        this.maxBottom = 4 * this.xIncrement;
        this.minLeft = 1;
        this.maxRight = 4 * this.xIncrement;

        // Calculate player starting x & y coordinates
        this.startX = 2 * this.xIncrement;
        this.startY = 3.75 * this.yIncrement;

        // Set player starting position
        this.x = this.startX;
        this.y = this.startY;

        this.sprite = 'images/char-boy.png';

        // Define keyPress functions
        this.keyPress = {
            "": (_onGameLoad => {}),
            "up": (_upArrow => { if (this.y > this.minTop) { this.y -= this.yIncrement; }
                              else { this.x = this.startX; this.y = this.startY; }
                            }),
            "down": (_downArrow => { this.y < this.maxBottom ? this.y += this.yIncrement : this.y; }),
            "left": (_leftArrow => { this.x > this.minLeft ? this.x -= this.xIncrement : this.x; }),
            "right": (_rightArrow => { this.x < this.maxRight ? this.x += this.xIncrement : this.x; })
        };
    }


    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // respawn player with starting coordinates
    respawn() {
        this.x = this.startX;
        this.y = this.startY;
    }

    
    handleInput(keyInput = "") {
        this.keyPress[keyInput]();
    }
}

// Instantiate objects.
// Place all enemy objects in an array called allEnemies
enemy1 = new Enemy;
enemy2 = new Enemy;
enemy3 = new Enemy;
enemy4 = new Enemy;

const allEnemies = [enemy1, enemy2, enemy3, enemy4];

// Place the player object in a variable called player
const player = new Player;

// This listens for key presses and sends the keys to your
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
