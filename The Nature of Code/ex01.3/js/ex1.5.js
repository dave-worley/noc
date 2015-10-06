(function () {
    var s = Snap("#ex1-5"),
        stageSize = {
            x: s.node.clientWidth || s.node.parentNode.clientWidth,
            y: s.node.clientHeight || s.node.parentNode.clientHeight
        },
        center = new Victor(
            Math.floor(stageSize.x / 2),
            Math.floor(stageSize.y / 2)
        ),
        originPoint = new Victor(
            stageSize.x,
            stageSize.y
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
