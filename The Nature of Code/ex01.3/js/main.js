(function () {
    var s = Snap("#snapnature"),
    center = new Victor(
        Math.floor(s.node.clientWidth/2), 
        Math.floor(s.node.clientHeight/2)
    ),
    newrgb = function () {
        return "rgba(" 
            + _.random(0, 255) + ", " 
            + _.random(0, 255)  +  ", " 
            + _.random(0, 255) + ", 1)";
    },
    mousep = new Victor(0, 0);

    s.mousemove(function (event) {
        mousep.x = event.x;
        mousep.y = event.y

        line.attr({
            x2: event.x,
            y2: event.y
        });

    });



    var updateCircle = function () {
        s.circle(mousep.x, mousep.y, 10).attr({fill: fillColor});
        fillColor = newrgb();
        circle.attr({fill: fillColor});
        circle.remove();
        s.add(circle);
    };

    s.mousedown(function (event) {
        updateCircle();
    });

})();
