(function () {
    var s = Snap("#ex1-4"),
        stageSize = {
            x: s.node.clientWidth || s.node.parentNode.clientWidth,
            y: s.node.clientHeight || s.node.parentNode.clientHeight
        },
        center = new Victor(
            Math.floor(stageSize.x / 2),
            Math.floor(stageSize.y / 2)
        ),
        line = s.line(
            0,
            0,
            center.x,
            center.y
        ).attr({
                stroke: "red",
                strokeWidth: 5,
                strokeLinecap: "round"
            });
    s.mousemove(function (event) {
        var eventPoint = new Victor(event.offsetX, event.offsetY);
        var half = new Victor(0.5, 0.5);
        eventPoint.multiply(half);
        line.attr({
            x2: eventPoint.x,
            y2: eventPoint.y
        });
    });
})();
