(function () {
    var s = Snap("#ex1-3-simple"),
        stageSize = {
            x: s.node.clientWidth || s.node.parentNode.clientWidth,
            y: s.node.clientHeight || s.node.parentNode.clientHeight
        },
        center = new Victor(
            Math.floor(stageSize.x / 2),
            Math.floor(stageSize.y / 2)
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
