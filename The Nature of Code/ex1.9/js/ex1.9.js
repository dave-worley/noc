(function () {
    var s = Snap('#ex1-9');
    var stage = [];
    var stageSize = {
        x: s.node.clientWidth || s.node.parentNode.clientWidth,
        y: s.node.clientHeight || s.node.parentNode.clientHeight
    };
    stage.push(new Mover19(
        new Victor(stageSize.x/2, stageSize.y/2), // location
        new Victor(_.random(-1, 1), _.random(-1, 1)), // velocity
        s)); // stage
    var render = function () {
        requestAnimationFrame(render);
        _.each(stage, function (entity) {
            entity.update();
        });
    };
    render();
})();