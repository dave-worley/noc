(function (util) {
    var paper = Snap("#ex1-10-lines");
    var mousep = util.vector(0, 0);
    var Mover = function (paper) {
        var psize = {
            x: paper.node.clientWidth || paper.node.parentNode.clientWidth,
            y: paper.node.clientHeight || paper.node.parentNode.clientHeight
        };
        var weightedRGB = function () {
            return "rgba("
                + _.random(200, 255) + ", "
                + _.random(0, 0) + ", "
                + _.random(0) + ", "
                + 1 + ")";
        };
        var location = util.vector(_.random(0, psize.x), _.random(0, psize.y));
        return {
            location: location,
            velocity: util.vector(1, -1),
            maxSpeed: 10,
            line: paper.line(
                location.x,
                location.y,
                mousep.x,
                mousep.y
            ).attr({
                    stroke: weightedRGB()
                }),
            update: function () {
                var direction = mousep.clone().subtract(this.location).normalize().multiply(util.vector(0.5, 0.5));
                this.velocity.add(direction);
                this.velocity.limit(this.maxSpeed, 0.9);
                this.location.add(this.velocity);
                if (_.random(0, 100) < 3) {
                    this.line.attr({
                        strokeOpacity: 1
                    });
                } else {
                    this.line.attr({
                        strokeOpacity: _.random(0.01, 0.6)
                    });
                }
                this.checkEdges();
                this.display();
            },
            checkEdges: function () {
                _.each(['x', 'y'], function (axis) {
                    if (this.location[axis] > psize[axis] ||
                        this.location[axis] < 0) {
                        this.bounce(axis);
                    }
                    if (this.location[axis] > psize[axis]) {
                        this.location[axis] = psize[axis];
                    }
                    if (this.location[axis] < 0) {
                        this.location[axis] = 0;
                    }
                }, this);
            },
            display: function () {
                this.line.attr({
                    x1: this.location.x,
                    y1: this.location.y,
                    x2: mousep.x,
                    y2: mousep.y
                });
            },
            bounce: function (axis) {
                this.velocity[axis] *= -1;
                if (!_.isUndefined(this.acceleration)) {
                    this.acceleration[axis] *= -1;
                }
            }
        };
    };
    var CrazyMover = function (Mover) {
        var CrazyMover = Mover(paper),
            accelerationBoundary = [
                util.vector(-1, -1),
                util.vector(1, 1)
            ];
        CrazyMover.acceleration = util.vector(0.001, 0.001);
        CrazyMover.maxSpeed = 5;
        CrazyMover.followMe = true;
        CrazyMover.update = function () {
            this.acceleration.randomize(accelerationBoundary[0], accelerationBoundary[1]);
            this.velocity.add(this.acceleration);
            this.velocity.limit(this.maxSpeed, 0.9);
            this.location.add(this.velocity);
            this.checkEdges();
            this.display();
        };
        return CrazyMover;
    };

    var stage = _.map(_.range(40), function () {
        return Mover(paper);
    });
    var crazy = CrazyMover(Mover);
    stage.push(crazy);

    var render = function () {
        requestAnimationFrame(render);
        if (crazy.followMe) mousep = crazy.location;
        _.each(stage, function (m) {
            m.update();
        });
    };

    paper.mousemove(function (evt) {
        if (!crazy.followMe) {
            mousep.x = evt.offsetX;
            mousep.y = evt.offsetY;
        }
    });
    paper.mouseover(function (evt) {
        crazy.followMe = false;
    });
    paper.mouseout(function (evt) {
        crazy.followMe = true;
    });

    render();
})(utilities);
