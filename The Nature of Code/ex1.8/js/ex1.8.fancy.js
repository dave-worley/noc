(function () {
    var s = Snap('#ex1-8-fancy');
    var stage = _.map(_.range(300), function () {
        return new Mover(
            new Victor(_.random(0, s.node.clientWidth), _.random(0, s.node.clientHeight)),
            new Victor(-1, 2),
            s);
    });
    var render = function () {
        requestAnimationFrame(render);
        _.each(stage, function (entity) {
            entity.update();
        });
    };
    render();
})();