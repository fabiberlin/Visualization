function YAxis(carsArr) {
    this.cars = carsArr;
    this.enabled = false;
    this.featureName = "";
    this.range = null;
}

YAxis.prototype = {

    constructor: YAxis,

    enable: function () {
        this.enabled = true;
    },

    disable: function () {
        this.enabled = false;
    },

    setFeature: function (featureName) {
        this.featureName = featureName;
        this.range = new Range(featureName, this.cars);
    },

    update: function () {
        for (i = 0; i < this.cars.length; i++) {
            yValue = this.calcValue(this.cars[i][this.featureName]);
            this.cars[i].setY(yValue);

        }
    },

    calcValue: function (input) { //TODO FIX -100 Upper Problem
        output = (((upperMargin-height+lowerMargin) * (input - this.range.min)) / (this.range.max - this.range.min)) + (height-lowerMargin);
        console.log(output);
        return output;
    }

};
