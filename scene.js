class Scene {
    constructor(game) {
        this.game = game
        this.elements = []
        this.bulletCoolTime = 300
        this.init()
    }

    init() {
        var enemyCount = 10
        for (var i = 0; i < enemyCount; i++) {
            var e = new Enemy(this.game, this.game.imageByName("enemy"))
            this.addElement(e)
        }
        this.player = new Player(this.game, this.game.imageByName("player"))
        this.addElement(this.player)
    }

    addElement(elem) {
        this.elements.push(elem)
    }

    update() {
        for (var i = 0; i < this.elements.length; i++) {
            var elem = this.elements[i]
            if (elem.timeout && elem.timeout > 0) {
                elem.timeout -= 1000/window.fps
            } else {
                elem.update()
            }
        }
        if (this.bulletCoolTime > 0) {
            this.bulletCoolTime -= 1000/window.fps
        } else {
            var bullet = new Bullet(this.game, this.game.imageByName("bullet"))
            bullet.x = this.player.x + this.player.width / 2
            bullet.y = this.player.y - bullet.height
            this.addElement(bullet)
            this.bulletCoolTime = 300
        }
    }

    draw() {
        var bg = this.game.imageByName("bg")
        this.game.drawImage(bg)
        for (var i = 0; i < this.elements.length; i++) {
            var elem = this.elements[i]
            if (elem.timeout && elem.timeout > 0) {
                elem.timeout -= 1000/window.fps
            } else {
                elem.draw()
            }
        }
    }
}
