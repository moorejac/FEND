// Enemies our player must avoid
class Enemy {
    constructor() {
        this.x = 0;
        this.y = 62 + ((Math.floor(Math.random() * 3)) * 83);
        this.movement = Math.floor(Math.random() * 3) + 1;
        this.sprite = 'images/enemy-bug.png';
    }

    update(dt) {
        this.x = this.x + this.movement;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        this.update();
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        this.xIncrement = 101;
        this.yIncrement = 83;

        this.startX = 2 * this.xIncrement;
        this.startY = 3.875 * this.yIncrement;
        
        this.minTop = 1 * this.xIncrement;
        this.maxBottom = 4 * this.xIncrement;
        this.minLeft = 1;
        this.maxRight = 4 * this.xIncrement;

        this.x = this.startX;
        this.y = this.startY;
        this.sprite = 'images/char-boy.png';

        this.keyPressTable = {
            "": (onGameLoad => {}),
            "up": (upKey => { if (this.y > this.minTop) { this.y -= 83; }
                              else { this.x = this.startX; this.y = this.startY; }
                            }),
            "down": (downKey => { this.y < this.maxBottom ? this.y += 83 : this.y; }),
            "left": (leftKey => { this.x > this.minLeft ? this.x -= this.xIncrement : this.x; }),
            "right": (rightKey => { this.x < this.maxRight ? this.x += this.xIncrement : this.x; })
        };
    }

    update(dt) {

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(keyInput = "") {
        this.keyPressTable[keyInput]();
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

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
*/

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
enemy1 = new Enemy;
enemy2 = new Enemy;
enemy3 = new Enemy;
const allEnemies = [enemy1, enemy2, enemy3]
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
