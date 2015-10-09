(function (util) {
    var paper = Snap("#ex1-10");
    var mousep = util.vector(0, 0);
    var Mover = function (paper) {
        var psize = {
            x: paper.node.clientWidth || paper.node.parentNode.clientWidth,
            y: paper.node.clientHeight || paper.node.parentNode.clientHeight
        };
        var weightedRGB = function () {
            return "rgba("
                + _.random(200, 255) + ", "
                + _.random(100, 200)  +  ", "
                + _.random(0) + ", "
                + 1 + ")";
        };
        var location = util.vector(_.random(0, psize.x), _.random(0, psize.y));
        return {
            location: location,
            velocity: util.vector(1, -1),
            maxSpeed: 10,
            shape: paper.circle(location.x, location.y, _.random(1, 5)).attr({
                //strokeWidth: 1,
                //stroke: '#000',
                fill: weightedRGB(),
                fillOpacity: _.random(0.1, 0.6)
            }),
            update: function () {
                var direction = mousep.clone().subtract(this.location).normalize().multiply(util.vector(0.5, 0.5));
                this.velocity.add(direction);
                this.velocity.limit(this.maxSpeed, 0.9);
                this.location.add(this.velocity);
                if (_.random(0, 100) < 3) {
                    this.shape.attr({
                        fillOpacity: 1
                    });
                } else {
                    this.shape.attr({
                        fillOpacity: _.random(0.01, 0.6)
                    });
                }
                this.checkEdges();
                this.display();
            },
            checkEdges: function () {
                var r = parseInt(this.shape.attr('r'));
                _.each(['x', 'y'], function (axis) {
                    if (this.location[axis] > psize[axis] ||
                        this.location[axis] < r) {
                        this.bounce(axis);
                    }
                    if (this.location[axis] > psize[axis]) {
                        this.location[axis] = psize[axis] - r;
                    }
                    if (this.location[axis] < r) {
                        this.location[axis] = r;
                    }
                }, this);
            },
            display: function () {
                this.shape.attr({
                    cx: this.location.x,
                    cy: this.location.y
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
        CrazyMover.shape.remove();
        //CrazyMover.shape.attr({
        //    fill: '#f00',
        //    stroke: '#000',
        //    r: 10
        //});
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

    var stage = _.map(_.range(80), function () {
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
            mousep.x = evt.clientX;
            mousep.y = evt.clientY;
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
