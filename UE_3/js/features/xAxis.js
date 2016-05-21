function XAxis(carsArr) {
    this.cars = carsArr;
    this.enabled = false;
    this.featureName = "";
    this.range = null;
}

XAxis.prototype = {

    constructor: XAxis,

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
            xValue = this.calcValue(this.cars[i][this.featureName]);
            this.cars[i].setX(xValue);

        }
    },

    calcValue: function (input) {
        output = ((width - rightMargin - leftMargin) / (this.range.max - this.range.min)) * (input - this.range.min) + leftMargin;
        return output;
    }

};