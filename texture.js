class AbstractTexture {
    constructor(game, image) {
        this.x = 0
        this.y = 0
        this.width = image.width
        this.height = image.height
        this.game = game
        this.image = image
    }

    draw() {
        this.image.x = this.x
        this.image.y = this.y
        this.game.drawImage(this.image)
    }

    update() {

    }
}

class Enemy extends AbstractTexture {
    constructor(game, image) {
        super(game, image)
        this.x = Math.floor(Math.random() * 300)
        this.timeout = Math.random() * 1000 * 10
        this.speedX = 2
        this.speedY = 2
        this.direction = 1
    }

    update() {
        this.direction = (Math.random() * 2 - 1) > 0 ? 1 : -1
        this.y += this.speedY;
        this.x += this.speedX * this.direction
    }
}

class Player extends AbstractTexture {
    constructor(game, image) {
        super(game, image)
        this.x = game.canvas.width / 2 - image.width / 2
        this.y = game.canvas.height - image.height
        this.speedX = 5
        this.speedY = 10

        var p = this
        game.registerAction("a", function(event) {
            p.moveLeft()
        })
        game.registerAction("d", function(event) {
            p.moveRight()
        })
        game.registerAction("w", function(event) {
            p.moveUp()
        })
        game.registerAction("s", function(event) {
            p.moveDown()
        })
    }

    moveLeft() {
        this.x -= this.speedX
    }

    moveRight() {
        this.x += this.speedX
    }

    moveUp() {
        this.y -= this.speedY
    }

    moveDown() {
        this.y += this.speedY
    }
}

class Bullet extends AbstractTexture {
    constructor(game, image) {
        super(game, image)
        this.speedX = 0
        this.speedY = 5
    }

    update() {
        this.x += this.speedX
        this.y -= this.speedY
    }
}
