(function () {
    var s = Snap('#ex1-8-fancy');
    var stage = _.map(_.range(300), function () {
        var stageSize = {
            x: s.node.clientWidth || s.node.parentNode.clientWidth,
            y: s.node.clientHeight || s.node.parentNode.clientHeight
        };
        return new Mover(
            new Victor(_.random(0, stageSize.x), _.random(0, stageSize.y)),
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
