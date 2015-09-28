(function () {
    var s = Snap('#ex1-8');
    var stage = [];
    var m = new SimpleMover(new Victor(100, 100), new Victor(-1, 1), s);
    stage.push(m);
    var render = function () {
        requestAnimationFrame(render);
        _.each(stage, function (entity) {
            entity.update();
        });
    };
    render();
})();