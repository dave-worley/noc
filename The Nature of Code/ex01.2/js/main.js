(function () {

    var s = Snap("#svg");

    var entities = [];

    var createCircle = function (radius, border, color, borderColor) {
        var sz = radius + border;
        var circle = s.circle(radius * 2, radius * 2, radius).attr({
            stroke: borderColor,
            "stroke-width": border,
            fill: color
        });
        circle.velocity = new Vector(_.random(1, 5), _.random(1, 5), 0);
        circle.update = function () {
            var p = new Vector(
                parseInt(this.attr("cx")),
                parseInt(this.attr("cy")),
                0
            );
            
            if (p.x - sz <= 0 || p.x + sz >= 1024/2) {
                this.velocity.multiply(-1, 1, 1);
            }
            if (p.y - sz <= 0 || p.y + sz >= 768/2) { 
                this.velocity.multiply(1, -1, 1);
            }
            
            this.attr({
                cx: p.x + this.velocity.x,
                cy: p.y + this.velocity.y
            });
        };
        return circle;
    };

    entities.push(createCircle(50, 2, "rgba(255, 255, 0, 1)", "rgba(255, 0, 0, 1)"));
    
    var update = function () {

        _.each(entities, function (circle) {
            circle.update();
        });
        
    };
    
    s.click(function () {
        var newrgb = function () {
            var compiled = _.template("rgba(<%= r %>, <%= g %>, <%= b %>, 1)");
            return compiled(
                _.zipObject(
                    ['r', 'g', 'b'],
                    _.map(_.range(3), function() {
                        return _.random(0, 255);
                    })
                )
            );
        };
        entities.push(createCircle(_.random(15, 100), _.random(0, 15), newrgb(), newrgb()));
    });

    var render = function () {
        requestAnimationFrame(render);
        update();
    };
    render();

})();
