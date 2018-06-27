class Game {
    constructor(imgPaths) {
        this.canvas = document.querySelector('#id-canvas')
        this.context = this.canvas.getContext('2d')
        this.imgPaths = imgPaths
        this.imgs = {}
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

    __start() {
        this.drawImage(this.imageByName("bg"))
        this.drawImage(this.imageByName("player"))
        this.drawImage(this.imageByName("enemy"))
    }
}

var __main = function() {
    imgPaths = {
        player: "img/player.png",
        enemy: "img/enemy.png",
        bg: "img/bg.jpg",
    }
    var game = new Game(imgPaths)
    game.init()
}

__main()
