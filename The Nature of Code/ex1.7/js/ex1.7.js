(function () {
    var s = Snap("#ex1-7"),
    // for compactness
    v = function (x, y) {
        return new Victor(x, y);
    },
    r = function (min, max) {
        return _.random(min, max);
    },
    mover = new Mover(
        // initial location
        v(32, 32),
        // random velocity
        v(r(-10, 10), r(-10, 10)), 
        // we need a reference to the paper
        // to detect edges
        s
    ),
    render = function () {
        requestAnimationFrame(render);
        mover.update();
    };
    render();
})();
