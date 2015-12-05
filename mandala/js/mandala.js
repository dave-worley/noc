(function (util, _) {
    var paper = Snap("#mandala");

    var psize = {
        x: paper.node.clientWidth || paper.node.parentNode.clientWidth,
        y: paper.node.clientHeight || paper.node.parentNode.clientHeight
    };

    var pointPair = function (x, y) {
        return x + " " + y;
    };
    var pointPairWithComma = function (x, y) {
        return pointPair(x, y) + ","
    };

    var points = {
        start: new util.vector(psize.x/2, psize.y/2),
        control01: new util.vector(_.random(1,100), _.random(100,200)),
        point: new util.vector(_.random(100,150), _.random(1, 100)),
        control02: new util.vector(_.random(200, 250), _.random(1, 100))
    };

    // let's see the control points
    paper.circle(points.control01.x, points.control01.y, 2).attr("fill", "blue");


    // get the length from point to control01
    var dist = points.control01.distance(points.point);

    console.log(dist);

    paper.circle(points.control02.x, points.control02.y, 2).attr("fill", "red");

    var pathst = "M"
        + pointPair(points.start.x, points.start.y)
        + "Q"
        + pointPairWithComma(points.control01.x, points.control01.y)
        + pointPairWithComma(points.point.x, points.point.y)
        + pointPairWithComma(points.control02.x, points.control02.y)
        + pointPair(points.start.x, points.start.y);

    // build our curvy path
    var p = paper.path(pathst);
    p.attr("stroke", "black");
    p.attr("fill", "transparent");

    var circleCopy = function (pth) {
        var count = _.random(3, 16);
        var angle = 360/count;
        for (var i = 0; i < count; i++) {
            var q = pth.clone();
            var rotation = i == 0 ? angle : (i + 1) * angle;
            q.transform("r" + rotation + "," + psize.x/2 + " " + psize.y/2);
        }
    };
    //circleCopy(p);



})(utilities, _);
