class Game {
    constructor(imgPaths) {
        window.fps = 50
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        this.imgPaths = imgPaths
        this.imgs = {}
        this.keydowns = {}
        this.actions = {}
        this.scene = null

        var g = this
        window.addEventListener("keydown", function(event) {
            g.keydowns[event.key] = true
        })
        window.addEventListener("keyup", function(event) {
            g.keydowns[event.key] = false
        })
    }

    registerAction(key, callback) {
        this.actions[key] = callback
    }

    drawImage(image) {
        this.context.drawImage(image.img, image.x, image.y)
    }

    imageByName(name) {
        var img = this.imgs[name]
        return {
            x: 0,
            y: 0,
            width: img.width,
            height: img.height,
            img: img,
        }
    }

    init() {
        var g = this
        var imgNames = Object.keys(g.imgPaths)
        var numOfLoadedImgs = []
        for (var i = 0; i < imgNames.length; i++) {
            let name = imgNames[i]
            let img = new Image()
            img.src = g.imgPaths[name]
            img.onload = function() {
                g.imgs[name] = img
                numOfLoadedImgs.push(1)
                if (numOfLoadedImgs.length == imgNames.length) {
                    g.__start()
                }
            }
        }
    }

    performActions() {
        var keys = Object.keys(this.actions)
        for (var i = 0; i < keys.length; i++) {
            var k = keys[i]
            if (this.keydowns[k]) {
                this.actions[k]()
            }
        }
    }

    runLoop() {
        this.performActions()
        this.update()
        this.clearCanvas()
        this.draw()

        var g = this
        setTimeout(function () {
            g.runLoop()
        }, 1000/window.fps)
    }

    update() {
        this.scene.update()
    }

    draw() {
        this.scene.draw()
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    __start() {
        var scene = new Scene(this)
        this.scene = scene

        var g = this
        setTimeout(function () {
            g.runLoop()
        }, 1000/window.fps);
    }
}

var __main = function() {
    imgPaths = {
        player: "img/player.png",
        enemy: "img/enemy.png",
        bullet: "img/bullet.png",
        bg: "img/bg.jpg",
    }
    var game = new Game(imgPaths)
    game.init()
}

__main()
