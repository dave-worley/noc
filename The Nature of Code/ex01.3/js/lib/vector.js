function Vector (x, y) {
    this.x = x;
    this.y = y;
}
Vector.prototype.add = function (nv) {
    this.x += nv.x;
    this.y += nv.y;
};
Vector.prototype.subtract = function (nv) {
    this.x -= nv.x;
    this.y -= nv.y;
};
