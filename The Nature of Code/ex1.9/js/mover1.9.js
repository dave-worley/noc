function Mover19 (location, velocity, paper) {
    this.location = location;
    this.velocity = velocity;
    this.acceleration = new Victor(-0.001, 0.001);
    this.topSpeed = 4;
    this.shape = paper.circle(
        location.x,
        location.y,
        _.random(5, 10)
    ).attr({
            fill: this.randomRGB()
        });
    this.boundary = new Victor(
        paper.node.clientWidth - parseInt(this.shape.attr('r')),
        paper.node.clientHeight - parseInt(this.shape.attr('r'))
    );
    this.display();
};
Mover19.prototype.update = function () {
    var upperbound = new Victor(-1, -1);
    var lowerbound = new Victor(1, 1);
    this.acceleration = new Victor(0, 0).randomize(upperbound, lowerbound);

    this.checkEdges();
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed, 0.75);
    this.location.add(this.velocity);
    this.display();
};
Mover19.prototype.display = function () {
    this.shape.attr({
        cx: this.location.x,
        cy: this.location.y
    });
};
Mover19.prototype.checkEdges = function () {
    var that = this;
    _.each(['x', 'y'], function (axis) {
        var r = parseInt(that.shape.attr('r'));
        if (that.location[axis] > that.boundary[axis] ||
            that.location[axis] < r) {
            that.bounce(axis);
        }
        if (that.location[axis] > that.boundary[axis]) {
            that.location[axis] = that.boundary[axis] - r;
        }
        if (that.location[axis] < r) {
            that.location[axis] = r;
        }
    });
};
Mover19.prototype.randomRGB = function () {
    return "rgba("
        + _.random(0, 255) + ", "
        + _.random(0, 255)  +  ", "
        + _.random(0, 255) + ", "
        + 1 + ")";
};
Mover19.prototype.bounce = function (axis) {
    this.velocity[axis] *= -1;
    this.acceleration[axis] *= -1;
};
