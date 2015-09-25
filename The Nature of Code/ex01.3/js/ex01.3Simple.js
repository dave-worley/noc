(function () {
    var s = Snap("#ex1-3-simple"),
    center = new Victor(
        Math.floor(s.node.clientWidth/2), 
        Math.floor(s.node.clientHeight/2)
    ),
    line = s.line(
        center.x,
        center.y,
        0,
        0
    ).attr({
        stroke: "red",
        strokeWidth: 5,
        strokeLinecap: "round"
    });
    s.mousemove(function (event) {
        line.attr({
            x2: event.offsetX,
            y2: event.offsetY
        });
    });
})();
