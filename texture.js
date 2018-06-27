class AbstractTexture {
    constructor(game, image) {
        this.x = 0
        this.y = 0
        this.game = game
        this.image = image
    }

    draw() {
        this.image.x = this.x
        this.image.y = this.y
        this.game.drawImage(image)
    }

    update() {

    }
}

class enemy extends AbstractTexture {
    constructor(game, image) {
        super(game, image)
        this.speedX = 1
        this.speedY = 1
        this.direction = 1
    }

    update() {
        this.direction = (Math.random() * 2 - 1) > 0 ? 1 : -1
        this.y += this.speedY;
        this.x += this.speedX * this.direction
    }
}

class player extends AbstractTexture {
    constructor(game, image) {
        super(game, image)
        this.speedX = 1
        this.speedY = 1
        this.direction = 1
    }

    update() {
        this.direction = (Math.random() * 2 - 1) > 0 ? 1 : -1
        this.y += this.speedY;
        this.x += this.speedX * this.direction
    }

}
