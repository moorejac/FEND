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
            (this.x + 62) >= player.x &&
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
            "up": (upKey => { if (this.y > this.minTop) { this.y -= this.yIncrement; }
                              else { this.x = this.startX; this.y = this.startY; }
                            }),
            "down": (downKey => { this.y < this.maxBottom ? this.y += this.yIncrement : this.y; }),
            "left": (leftKey => { this.x > this.minLeft ? this.x -= this.xIncrement : this.x; }),
            "right": (rightKey => { this.x < this.maxRight ? this.x += this.xIncrement : this.x; })
        };
    }

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
}

// Now instantiate objects.
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
