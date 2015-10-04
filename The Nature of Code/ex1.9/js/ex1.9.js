(function () {
    var s = Snap('#ex1-9');
    var stage = [];
    stage.push(new Mover19(
        new Victor(s.node.clientWidth/2, s.node.clientHeight/2), // location
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