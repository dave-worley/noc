(function () {
    
    var s = Snap("#noc1-3"),
    entities = [],
    newrgb = function () {
        return "rgba(" 
            + _.random(0, 255) + ", " 
            + _.random(0, 255)  +  ", " 
            + _.random(0, 255) + ", 1)";
    },

    // makes a list of randomized descending points
    makeRandomPointList = function (amount) {

        // since we're demonstrating subtraction
        // we start in the bottom right corner
        var points = [
            new Victor(
                s.node.clientWidth || s.node.parentNode.clientWidth,
                s.node.clientHeight || s.node.parentNode.clientHeight
            )
        ];
        
        _.each(_.range(amount), function (n) {
            if (n > 0) {
                var randv = new Victor(
                    (n * _.random(1, 12) + n), 
                    (n * _.random(1, 12) + n)
                ),
                newp = points[n - 1].clone();

                // the whole example here! 
                // subtract the the random vector from the previous one's clone
                // since we started at the bottom right corner
                // this will climb back up towards the upper left hand corner
                return points.push(newp.subtract(randv));
            }
        });

        return points;
    },
    render = function () {
        requestAnimationFrame(render);
        
        // we use flatten over a list of lists of [x,y] points
        // makes working with polyline a little easier
        var flatpoints = _.flatten(
            _.map(makeRandomPointList(10), function (point, i, pts) {
                // we want the last one to be 0, 0
                return i === pts.length - 1 ? [0, 0] : [point.x, point.y];
            })
        );

        // we maintain an entity list so we can limit how many we have
        entities.push(
            s.polyline(flatpoints).attr({
                fill: 'none',
                stroke: newrgb(),
                strokeWidth: _.random(1, 5)
            })
        );

        // don't want too many!
        if (entities.length > 50) {
            entities[0].remove();
            entities.shift();
        }

    };
    render();

})();
