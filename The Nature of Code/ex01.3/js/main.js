(function () {

    var s = Snap("#snapnature");

    var entities = [];

    
    var render = function () {
        requestAnimationFrame(render);
        _.each(entities, function (entity) {
            entity.update();
        });
    };
    render();


})();
