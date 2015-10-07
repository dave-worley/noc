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

    // the randomize function in Victor needs
    // an upper left and lower right boundary
    this.accelerationBoundary = [
        new Victor(-1, -1),
        new Victor(1, 1)
    ];
    this.display();
}
Mover19.prototype.update = function () {
    // Victor requires you to randomize an existing vector
    this.acceleration.randomize(this.accelerationBoundary[0], this.accelerationBoundary[1]);

    // our new bounce edge detection
    // we check edges first so the location,
    // acceleration, and velocity can be modified before moving
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
    _.each(['x', 'y'], function (axis) {
        var r = parseInt(this.shape.attr('r'));
        if (this.location[axis] > this.boundary[axis] ||
            this.location[axis] < r) {
            this.bounce(axis);
        }
        if (this.location[axis] > this.boundary[axis]) {
            this.location[axis] = this.boundary[axis] - r;
        }
        if (this.location[axis] < r) {
            this.location[axis] = r;
        }
    }, this);
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
