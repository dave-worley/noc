function Mover (location, velocity, paper) {
    this.location = location;
    this.velocity = velocity;
    this.shape = paper.circle(
        location.x, 
        location.y, 
        _.random(10, 36)
    ).attr({
        stroke: this.randomRGB(),
        fill: 'none',
        strokeWidth: _.random(3, 10)
    });
    this.boundary = new Victor(
        paper.node.clientWidth, 
        paper.node.clientHeight
    );
    this.display();
};
Mover.prototype.update = function () {
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
        + _.random(0, 255) + ", " 
        + _.random(0, 255)  +  ", " 
        + _.random(0, 255) + ", 1)";
};
