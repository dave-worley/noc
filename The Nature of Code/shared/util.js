var utilities = {
    rgba: function (r, g, b, a) {
        //return _.template("rgba(<%= r %>, <%= g %>, <%= b %>, <%= a %>)").compile({
        //    r: r,
        //    g: g,
        //    b: b,
        //    a: a
        //});
        return "rgba("
            + r + ", "
            + g  +  ", "
            + b + ", "
            + a + ")";
    },
    vector: function (x, y) {
        return new Victor(x, y);
    }
};