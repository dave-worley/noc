function Vector (x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
}
Vector.prototype.add = function (nv) {
    console.log(nv);
    this.x += nv.x;
    this.y += nv.y;
    this.z += nv.z;
};
Vector.prototype.subtract = function (nv) {
    this.x -= nv.x;
    this.y -= nv.y;
    this.z -= nv.z;
};
Vector.prototype.multiply = function (nx, ny, nz) {
    this.x *= nx;
    this.y *= ny;
    this.z *= nz;
};
