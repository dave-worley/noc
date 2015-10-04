(function () {
    var s = Snap('#ex1-9-fancy');
    var stage = _.map(_.range(50), function () {
        var loc = new Victor(_.random(50, s.node.clientWidth - 50), _.random(50, s.node.clientHeight - 50));
        return new Mover(loc, new Victor(1, 1), s);
    });
    var render = function () {
        requestAnimationFrame(render);
        _.each(stage, function (entity) {
            entity.update();
        });
    };
    render();
})();