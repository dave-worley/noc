(function () {

    var s = Snap("#snapnature");

    var entities = [];

    var createCircle = function (radius, border, color, borderColor) {
        var sz = radius + border;
        var circle = s.circle(radius * 2, radius * 2, radius).attr({
            stroke: borderColor,
            "stroke-width": border,
            fill: color
        });
        circle.velocity = new Victor(_.random(-3, 5), _.random(-3, 5));
        circle.update = function () {
            var p = new Victor(
                parseInt(this.attr("cx")),
                parseInt(this.attr("cy"))
            );
            
            if (p.x - sz <= 0 || p.x + sz >= s.node.clientWidth) {
                this.velocity.x *= -1;
            }
            if (p.y - sz <= 0 || p.y + sz >= s.node.clientHeight) { 
                this.velocity.y *= -1;
            }
            
            this.attr({
                cx: p.x + this.velocity.x,
                cy: p.y + this.velocity.y
            });
        };
        return circle;
    };

    entities.push(createCircle(50, 2, "rgba(255, 255, 0, 1)", "rgba(255, 0, 0, 1)"));
    
    var render = function () {
        requestAnimationFrame(render);
        _.each(entities, function (entity) {
            entity.update();
        });
    };
    render();

    s.click(function () {
        var newrgb = function () {
            return "rgba(" 
                + _.random(0, 255) + ", " 
                + _.random(0, 255)  +  ", " 
                + _.random(0, 255) + ", "
                + _.random(0.01, 1)  +")";
        };
        entities.push(createCircle(_.random(15, 100), _.random(0, 15), newrgb(), newrgb()));
    });

})();
