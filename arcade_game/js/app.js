// Enemies our player must avoid
class Enemy {
    constructor() {
        this.xIncrement = 101;
        this.yIncrement = 83;

        this.minTop = 0;
        this.maxBottom = 72.625;
        this.minLeft = -1 * this.xIncrement;
        this.maxRight = 5 * this.xIncrement;

        this.movement = Math.floor(Math.random() * 3) + 1;

        this.startX = -1 * this.xIncrement;
        this.startY = this.maxBottom + ((Math.floor(Math.random() * 3)) * this.yIncrement);

        this.x = this.startX;
        this.y = this.startY;

        this.sprite = 'images/enemy-bug.png';
    }

    update(dt) {
        this.x = this.x + this.movement;
        if (
            (this.x + 83) >= player.x &&
            (this.x + this.xIncrement) <= (player.x + player.xIncrement) &&
            player.y === this.y
        ) {
            player.respawn();
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        this.x < this.maxRight ? this.update() : this.respawn();
    }

    respawn() {
        this.movement = Math.floor(Math.random() * 3) + 1;
        this.startX = -1 * this.xIncrement;
        this.startY = this.maxBottom + ((Math.floor(Math.random() * 3)) * this.yIncrement);

        this.x = this.startX;
        this.y = this.startY;
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        this.xIncrement = 101;
        this.yIncrement = 83;
      
        this.minTop = 1 * this.xIncrement;
        this.maxBottom = 4 * this.xIncrement;
        this.minLeft = 1;
        this.maxRight = 4 * this.xIncrement;

        this.startX = 2 * this.xIncrement;
        this.startY = 3.875 * this.yIncrement;

        this.x = this.startX;
        this.y = this.startY;
        this.sprite = 'images/char-boy.png';

        this.keyPress = {
            "": (onGameLoad => {}),
            "up": (upKey => { if (this.y > this.minTop) { this.y -= 83; }
                              else { this.x = this.startX; this.y = this.startY; }
                            }),
            "down": (downKey => { this.y < this.maxBottom ? this.y += 83 : this.y; }),
            "left": (leftKey => { this.x > this.minLeft ? this.x -= this.xIncrement : this.x; }),
            "right": (rightKey => { this.x < this.maxRight ? this.x += this.xIncrement : this.x; })
        };
    }

    update() {}

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    respawn() {
        this.x = this.startX;
        this.y = this.startY;
    }

    handleInput(keyInput = "") {
        this.keyPress[keyInput]();
    }
}/*
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

*/

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
enemy1 = new Enemy;
const allEnemies = [enemy1];
// Place the player object in a variable called player

const player = new Player;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
