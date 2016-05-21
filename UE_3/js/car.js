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

    setPosition: function (x, y) {
        this.svg[0][0].cx.baseVal.value = x;
        this.svg[0][0].cy.baseVal.value = y;
    },

    setX: function (x) {
        this.svg[0][0].cx.baseVal.value = x;
    },

    setY: function (y) {
        this.svg[0][0].cy.baseVal.value = y;
    },

    getX: function () {
        return this.svg[0][0].cx.baseVal.value;
    },

    getY: function () {
        return this.svg[0][0].cy.baseVal.value;
    },

    scale: function (scale){
        //console.log(this.svg[0][0].r.baseVal.value);
        this.svg[0][0].r.baseVal.value = scale;
    }
};
