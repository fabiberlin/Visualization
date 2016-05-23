function SizeFeature(carsArr) {
    this.cars = carsArr;
    this.enabled = false;
    this.featureName = "";
    this.range = null;
}

SizeFeature.prototype = {

    constructor: SizeFeature,

    enable: function () {
        this.enabled = true;
    },

    disable: function () {
        this.enabled = false;
    },

    setFeature: function (featureName) {
        this.featureName = featureName;
        this.range = new Range(featureName, this.cars);
        document.getElementById("chosen_size").textContent = this.range.getFriendlyName();
    },

    update: function () {
        for (i = 0; i < this.cars.length; i++) {
            size = this.calcValue(this.cars[i][this.featureName]);
            this.cars[i].scale(size);
        }
    },

    calcValue: function (input) {
        mindim = dataSizeSilderValue * 1/2;
        maxdim = dataSizeSilderValue * 2;
        output = ((maxdim-mindim)/(this.range.max-this.range.min))*(input-this.range.min)+(mindim);
        return output;
    },
};
