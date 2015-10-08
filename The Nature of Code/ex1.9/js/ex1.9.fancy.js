(function () {
    var s = Snap('#ex1-9-fancy');
    var stageSize = {
        x: s.node.clientWidth || s.node.parentNode.clientWidth,
        y: s.node.clientHeight || s.node.parentNode.clientHeight
    };
    var stage = _.map(_.range(50), function () {
        var loc = new Victor(_.random(50, stageSize.x - 50), _.random(50, stageSize.y - 50));
        return new Mover19(loc, new Victor(1, 1), s);
    });
    var render = function () {
        requestAnimationFrame(render);
        _.each(stage, function (entity) {
            entity.update();
        });
    };
    render();
})();