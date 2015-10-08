var utilities = {
    randomRGB: function (lower, upper, alpha) {
        return "rgba("
            + _.random(lower, upper) + ", "
            + _.random(lower, upper)  +  ", "
            + _.random(lower, upper) + ", "
            + alpha + ")";
    },
    vector: function (x, y) {
        return new Victor(x, y);
    }
};