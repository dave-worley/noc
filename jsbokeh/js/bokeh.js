(function (_) {
    var s = Snap('#js-bokeh'),
        stageSize = {
            x: s.node.clientWidth,
            y:s.node.clientHeight
        },
        randomHex = function () {
            return Snap.rgb(
                _.random(150, 255),
                _.random(150, 255),
                _.random(150, 255)
            );
        },
        randomGradient = function () {
            var compiled = _.template("L(0, 0, 0, <%= stageHeight %>)<%= topColor %>-<%= midColor %>:<%= gradientSplit %>-<%= bottomColor %>");
            return s.gradient(compiled({
                stageHeight: stageSize.y,
                topColor: randomHex(),
                midColor: randomHex(),
                bottomColor: randomHex(),
                gradientSplit: _.random(25, 75)
            }));
        },
        randomGradientBackground = function () {
            return s.rect(0, 0, stageSize.x, stageSize.y).attr({
                fill: randomGradient()
            });
        },
        randomBokeh = function (count) {
            return _.map(_.range(count), function () {
                var circle = s.circle(
                    _.random(0, stageSize.x),
                    _.random(0, stageSize.y),
                    _.random(1, 40)
                );
                if (_.random(0, 100) < 80) { // chance to blur
                    var blurval = _.random(1, 10);
                    var blur = s.filter(Snap.filter.blur(blurval, blurval));
                    circle.attr({
                        filter: blur
                    });
                }
                circle.attr({
                    fill: 'white', // could be some fun effects that change colors!
                    fillOpacity: _.random(0.01, 0.40) // random opacity up to 40%
                });

                return circle;
            });
        },
        bg,
        bokeh,
        display = function () {
            bg = randomGradientBackground();
            bokeh = randomBokeh(200);
        },
        clearStage = function () {
            bg.remove();
            _.each(bokeh, function (c) {
                c.remove();
            });
        };

    s.click(function () {
        clearStage();
        display();
    });

    setInterval(function () {
        clearStage();
        display();
    }, 3000);

    display();

})(_); // fail if undefined