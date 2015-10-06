function SimpleMover (location, velocity, paper) {
    this.location = location;
    this.velocity = velocity;
    this.acceleration = new Victor(-0.001, 0.01);
    this.topSpeed = 10;
    this.shape = paper.circle(
        location.x,
        location.y,
        16
    );
    this.boundary = new Victor(
        paper.node.clientWidth || paper.node.parentNode.clientWidth,
        paper.node.clientHeight || paper.node.parentNode.clientHeight
    );
    this.display();
}
SimpleMover.prototype.update = function () {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topSpeed, 0.75);
    this.location.add(this.velocity);
    this.display();
    this.checkEdges();
};
SimpleMover.prototype.display = function () {
    this.shape.attr({
        cx: this.location.x,
        cy: this.location.y
    });
};
SimpleMover.prototype.checkEdges = function () {
    var that = this;
    _.each(['x', 'y'], function (axis) {
        if (that.location[axis] > that.boundary[axis]) {
            that.location[axis] = 0;
        } else if (that.location[axis] < 0) {
            that.location[axis] = that.boundary[axis];
        }
    });
};
