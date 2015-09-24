(function () {
    /*

      Wraps a Snap shape with an update function, some utilities and useful state.

      entity: a Snap shape, group, text, etc.
      update: a function called when rendering the shape
      forces: a list of force vectors such as velocity, friction, wind, gravity, etc.

    */

    function AnimatedEntity (entity, forces) {
        this.e = entity;
        this.forces = forces;
        return this;
    };
    AnimatedEntity.prototype.update = function () {
        var self = this;
        _.each(forces, function (force) {
            self.updatePosition();
        });
        return this;
    };
    AnimatedEntity.prototype.updatePosition = function (nv) { // expects a vector
        if (!_.isUndefined(self.e.cx)) { // this is a circle
            self.e.cx += nv.x;
            self.e.cy += nv.y;
        } else {
            self.e.x += nv.x;
            self.e.y += nv.y;
        }
        return this;
    };

    var s = Snap("#snapnature"),
    entities = [],
    createAnimatedEntity = function (entityList, shape) {
        entityList.push(new AnimatedEntity(shape, function () {

        }));
    },
    center = new Victor(
        Math.floor(s.node.clientWidth/2), 
        Math.floor(s.node.clientHeight/2)
    ),
    newrgb = function () {
        return "rgba(" 
            + _.random(0, 255) + ", " 
            + _.random(0, 255)  +  ", " 
            + _.random(0, 255) + ", 1)";
    },
    mousep = new Victor(0, 0),
    render = function () {
        requestAnimationFrame(render);
        _.each(entities, function (entity) {
            entity.update();
        });
    };
    

})();
