(function () {
    var s = Snap("#ex1-7-fancy"),
    // for compactness
    v = function (x, y) {
        return new Victor(x, y);
    },
    r = function (min, max) {
        return _.random(min, max);
    },
    movers = _.map(_.range(30), function () {
        return new Mover(
            // initial location
            v(32, 32),
            // random velocity
            v(r(-5, 5), r(-5, 5)), 
            // we need a reference to the paper
            // to detect edges
            s
        );
    }),
    render = function () {
        requestAnimationFrame(render);
        _.invoke(movers, 'update');
    };
    render();
})();
