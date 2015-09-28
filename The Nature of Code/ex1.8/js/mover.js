function Mover (location, velocity, paper) {
    this.location = location;
    this.velocity = velocity;
    this.acceleration = new Victor(_.random(-0.01, -0.001), 0.001);
    this.topSpeed = _.random(0.99, 9.99);
    this.shape = paper.circle(
        location.x,
        location.y,
        _.random(1, 4)
    ).attr({
            fill: this.randomRGB()
        });
    this.boundary = new Victor(
        paper.node.clientWidth,
        paper.node.clientHeight
    );
    this.display();
};
Mover.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed, 0.75);
    this.location.add(this.velocity);
    this.display();
    this.checkEdges();
};
Mover.prototype.display = function () {
    this.shape.attr({
        cx: this.location.x,
        cy: this.location.y
    });
};
Mover.prototype.checkEdges = function () {
    var that = this;
    _.each(['x', 'y'], function (axis) {
        if (that.location[axis] > that.boundary[axis]) {
            that.location[axis] = 0;
        } else if (that.location[axis] < 0) {
            that.location[axis] = that.boundary[axis];
        }
    });
};
Mover.prototype.randomRGB = function () {
    return "rgba("
        + _.random(0, 12) + ", "
        + _.random(0, 155)  +  ", "
        + _.random(100, 255) + ", "
        + _.random(0.125, 1.0) + ")";
};