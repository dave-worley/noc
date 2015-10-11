(function (util) {
    var paper = Snap("#ex1-10");
    var mousep = util.vector(0, 0);
    var psize = {
        x: paper.node.clientWidth || paper.node.parentNode.clientWidth,
        y: paper.node.clientHeight || paper.node.parentNode.clientHeight
    };

    function Mover(paper) {
        this.location = util.vector(_.random(0, psize.x), _.random(0, psize.y));
        this.velocity = util.vector(1, -1);
        this.maxSpeed = _.random(6, 10);
        this.shape = paper.circle(
            this.location.x,
            this.location.y,
            _.random(1, 5)
        ).attr({
                fill: this.weightedRGB(),
                fillOpacity: _.random(0.1, 0.6)
            });
        return this;
    }

    Mover.prototype = {
        weightedRGB: function () {
            return "rgba("
                + _.random(200, 255) + ", "
                + _.random(100, 200) + ", "
                + _.random(0) + ", "
                + 1 + ")";
        },
        update: function () {
            var direction = mousep.clone()
                .subtract(this.location)
                .normalize()
                .multiply(util.vector(0.5, 0.5));
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
    function CrazyMover() {
        this.accelerationBoundary = [
            util.vector(-1, -1),
            util.vector(1, 1)
        ];
        this.acceleration = util.vector(0.001, 0.001);
        this.maxSpeed = 5;
        this.followMe = true;
        return this;
    };
    CrazyMover.prototype = new Mover(paper);
    CrazyMover.prototype.update = function () {
        this.acceleration.randomize(this.accelerationBoundary[0], this.accelerationBoundary[1]);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed, 0.9);
        this.location.add(this.velocity);
        this.checkEdges();
        this.display();
    };

    var stage = _.map(_.range(80), function () {
        return new Mover(paper);
    });
    var crazy = new CrazyMover(Mover);
    crazy.shape.remove();
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
