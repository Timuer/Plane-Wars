class AbstractTexture {
    constructor(game, image) {
        this.x = 0
        this.y = 0
        this.width = image.width
        this.height = image.height
        this.game = game
        this.image = image
        this.exists = true
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
        this.x = Math.floor(Math.random() * game.canvas.width)
        this.speed = config.enemy_speed
        this.direction = (Math.random() * 2 - 1) > 0 ? 1 : -1
    }

    update() {
        this.speed = config.enemy_speed
        this.y += this.speed
        this.x += this.speed * this.direction
    }
}

class Player extends AbstractTexture {
    constructor(game, image) {
        super(game, image)
        this.x = game.canvas.width / 2 - image.width / 2
        this.y = game.canvas.height - image.height
        this.speed = config.player_speed
        this.setupActions()
    }

    setupActions() {
        var p = this
        p.game.registerAction("a", function(event) {
            p.moveLeft()
        })
        p.game.registerAction("d", function(event) {
            p.moveRight()
        })
        p.game.registerAction("w", function(event) {
            p.moveUp()
        })
        p.game.registerAction("s", function(event) {
            p.moveDown()
        })
    }

    update() {
        this.speed = config.player_speed
    }

    moveLeft() {
        this.x -= this.speed
    }

    moveRight() {
        this.x += this.speed
    }

    moveUp() {
        this.y -= this.speed
    }

    moveDown() {
        this.y += this.speed
    }
}

class Bullet extends AbstractTexture {
    constructor(game, image) {
        super(game, image)
        this.speed = config.bullet_speed
    }

    update() {
        this.speed = config.bullet_speed
        this.y -= this.speed
    }
}
