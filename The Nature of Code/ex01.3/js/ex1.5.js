(function () {
    var s = Snap("#ex1-5"),
    center = new Victor(
        Math.floor(s.node.clientWidth/2), 
        Math.floor(s.node.clientHeight/2)
    ),
    originPoint = new Victor(
        s.node.clientWidth,
        s.node.clientHeight
    ),
    line = s.line(
        originPoint.x,
        originPoint.y,
        center.x,
        center.y
    ).attr({
        stroke: "red",
        strokeWidth: 5,
        strokeLinecap: "round"
    }),
    rect = s.rect(0, 0, 0, 20);
    s.mousemove(function (event) {
        var eventPoint = new Victor(event.offsetX, event.offsetY),
        lengthVector = eventPoint.clone().subtract(originPoint);
        line.attr({
            x2: eventPoint.x,
            y2: eventPoint.y
        });
        rect.attr({
            width: lengthVector.magnitude()
        });
    });
})();
