class Scene {
    constructor(game) {
        this.game = game
        this.elements = []
        this.init()
    }

    init() {
        var enemyCount = config.enemy_count
        var yRange = enemyCount * 100
        for (var i = 0; i < enemyCount; i++) {
            var e = new Enemy(this.game, this.game.imageByName("enemy"))
            e.y = Math.random() * yRange * (-1)
            this.addElement(e)
        }
        this.player = new Player(this.game, this.game.imageByName("player"))
        this.addElement(this.player)
        this.bulletCoolDownTime = 10
        this.bulletCoolDown = this.bulletCoolDownTime
    }

    addElement(elem) {
        this.elements.push(elem)
    }

    borderCheck(elem) {
        if (elem instanceof Enemy) {
            if (elem.x <= 0 || elem.x + elem.width >= this.game.canvas.width) {
                elem.direction *= -1
            }
            if (elem.y >= this.game.canvas.height) {
                elem.exists = false
            }
        }
        if (elem instanceof Player) {
            if (elem.x < 0) {
                elem.x = 0
            }
            if (elem.y < 0) {
                elem.y = 0
            }
            if (elem.x + elem.width > this.game.canvas.width) {
                elem.x = this.game.canvas.width - elem.width
            }
            if (elem.y + elem.height >= this.game.canvas.height) {
                elem.y = this.game.canvas.height - elem.height
            }
        }
        if (elem instanceof Bullet) {
            if (elem.y + elem.height <= 0) {
                elem.exists = false
            }
        }
    }

    collision() {
        var len = this.elements.length
        for (var i = 0; i < len; i++) {
            var b = this.elements[i]
            if (b instanceof Bullet) {
                for (var j = 0; j < len; j++) {
                    var e = this.elements[j]
                    if (j != i
                        && e instanceof Enemy
                        && e.y > 0
                        && this.__isSquareCollide(b.x, b.y, b.width, b.height, e.x, e.y, e.width, e.height)) {
                        b.exists = false
                        e.exists = false
                        this.explode(e.x + e.width / 2, e.y + e.height / 2)
                    }
                }
            }
        }
    }

    explode(x, y) {
        var images = []
        for (var i = 0; i < 3; i++) {
            images.push(this.game.imageByName("sparticle" + i))
        }
        var sp = new SparticleSystem(this.game, images, x, y)
        this.addElement(sp)
    }

    updateBullets() {
        if (this.bulletCoolDown > 0) {
            this.bulletCoolDown -= 1
        } else {
            var bullet = new Bullet(this.game, this.game.imageByName("bullet"))
            bullet.x = this.player.x + this.player.width / 2
            bullet.y = this.player.y - bullet.height
            this.addElement(bullet)
            this.bulletCoolDown = this.bulletCoolDownTime
        }
    }

    update() {
        for (let e of this.elements) {
            e.update()
            this.borderCheck(e)
        }
        this.updateBullets()
        this.collision()
        this.__clear()
    }

    draw() {
        var bg = this.game.imageByName("bg")
        this.game.drawImage(bg)
        for (var i = 0; i < this.elements.length; i++) {
            var elem = this.elements[i]
            elem.draw()
        }
    }

    __clear() {
        for (var e of this.elements) {
            if (e instanceof SparticleSystem) {
                if (e.sparticles.length == 0) {
                    e.exists = false
                }
            }
        }
        this.elements = this.elements.filter(e => e.exists)
    }

    __isSquareCollide(x1, y1, w1, h1, x2, y2, w2, h2) {
        var condition1 =  x1 + w1 > x2 && x1 + w1 < x2 + w2
        var condition2 = x1 > x2 && x1 < x2 + w2
        var condition3 = y1 > y2 && y1 < y2 + h2
        var condition4 = y1 + h1 > y2 && y1 + h1 < y2
        return (condition1 || condition2) && (condition3 || condition4)
    }
}
