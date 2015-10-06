(function () {

    var s = Snap("#snapnature"),
        stageSize = {
            x: s.node.clientWidth || s.node.parentNode.clientWidth,
            y: s.node.clientHeight || s.node.parentNode.clientHeight
        };

    var entities = [];

    var createCircle = function (radius, border, color, borderColor) {
        var sz = radius + (border/2);
        var circle = s.circle(Math.floor(stageSize.x/2), Math.floor(stageSize.y/2), radius).attr({
            stroke: borderColor,
            "stroke-width": border,
            fill: color
        });
        circle.velocity = new Vector(_.random(-3, 5), _.random(-3, 5));
        circle.update = function () {
            var p = new Vector(
                parseInt(this.attr("cx")),
                parseInt(this.attr("cy"))
            );
            
            if (p.x - sz <= 0 || p.x + sz >= stageSize.x) {
                this.velocity.x *= -1;
            }
            if (p.y - sz <= 0 || p.y + sz >= stageSize.y) {
                this.velocity.y *= -1;
            }
            
            this.attr({
                cx: p.x + this.velocity.x,
                cy: p.y + this.velocity.y
            });
        };
        return circle;
    };

    var newrgb = function () {
        return "rgba(" 
            + _.random(0, 255) + ", " 
            + _.random(0, 255)  +  ", " 
            + _.random(0, 255) + ", "
            + _.random(0.01, 1)  +")";
    };
    var randomCircle = function () {
        return createCircle(_.random(15, 100), _.random(0, 15), newrgb(), newrgb());
    };

    _.each(_.range(12), function () {
        entities.push(randomCircle());
    });
    
    var render = function () {
        requestAnimationFrame(render);
        _.each(entities, function (entity) {
            entity.update();
        });
    };
    render();

    s.click(function () {
        entities.push(randomCircle());
    });

})();
