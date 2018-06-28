var log = console.log.bind(console)

const config = {
    bullet_speed: 5,
    enemy_speed: 2,
    enemy_count: 50,
    player_speed: 5,
    sparticle_num: 50,
}

var adjustSpeed = function(selector, callback) {
    var inputs = document.querySelectorAll(selector)
    log(inputs)
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("input", callback)
    }
}

var onDebugMode = function(flag) {
    if (flag) {
        adjustSpeed(".speed-adjust", function(event) {
            var target = event.target
            var variable = target.dataset.variable
            var value = target.value
            eval(variable + "=" + value)

        })
    }
}
