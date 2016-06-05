function Car() {
    this.car = null;
    this.manufacturer = null;
    this.mpg = null;
    this.cylinders = null;
    this.displacement = null;
    this.horsepower = null;
    this.weight = null;
    this.acceleration = null;
    this.modelYear = null;
    this.origin = null;
    this.svg = null;
    this.carId = null;

    this.x = null;
    this.y = null;
    this.color = null;
}

Car.prototype = {

    constructor: Car,

    setPropsFromJson: function (aCarJson) {
        this.car = aCarJson["Car"];
        this.manufacturer = aCarJson["Manufacturer"];
        this.mpg = aCarJson["MPG"];
        this.cylinders = aCarJson["Cylinders"];
        this.displacement = aCarJson["Displacement"];
        this.horsepower = aCarJson["Horsepower"];
        this.weight = aCarJson["Weight"];
        this.acceleration = aCarJson["Acceleration"];
        this.modelYear = aCarJson["Model Year"];
        this.origin = aCarJson["Origin"];
        this.convertToMetricSystem();
    },

    convertToMetricSystem: function () {
        if (this.weight !== null) {
            this.weight *= 0.4536;
        }
        if (this.displacement !== null) {
            this.displacement *= 16.387;
        }
        if (this.mpg !== null) {
            this.mpg *= 0.425099; // l/km
            this.mpg = 100 / this.mpg;
        }
    },

    setSvg: function (element) {
        this.svg = element;
    },

    update: function () {
        d3.select("#carId_" + this.carId)
            .transition()
            .duration(animationDuration)
            .attr('cx', this.x)
            .attr('cy', this.y)
            .style("fill", this.color);
    },

    setX: function (x) {
        this.x = x;
    },

    setY: function (y) {
        this.y = y;
    },

    getX: function () {
        return this.svg[0][0].cx.baseVal.value;
    },

    getY: function () {
        return this.svg[0][0].cy.baseVal.value;
    },

    setColor: function (hex) {
        this.color = hex;
        //this.svg.attr('style', "fill:"+hex);
    },

    scale: function (scale) {
        this.svg[0][0].r.baseVal.value = scale;
    },

    getScale: function () {
        return this.svg[0][0].r.baseVal.value;
    },

    getShortSting: function () {
        return this.manufacturer + " " + this.car;
    },

    hide: function () {
        console.log("hide");
        d3.select("#carId_" + this.carId)
            .transition()
            .duration(300)
            .style("opacity", 0);
    },

    show: function () {
        console.log("show");
        d3.select("#carId_" + this.carId)
            .transition()
            .duration(300)
            .style("opacity", 1);
    }
};
