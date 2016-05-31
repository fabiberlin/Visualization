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
        if (featureName == "none") {
            this.disable();
        } else {
            this.enable();
            this.range = new Range(featureName, this.cars);
        }
        document.getElementById("chosen_size").textContent = getFriendlyFeatureName(this.featureName);
    },

    update: function () {
        for (i = 0; i < this.cars.length; i++) {
            if (this.enabled) {
                size = this.calcValue(this.cars[i][this.featureName]);
                this.cars[i].scale(size);
            }else{
                value = Math.sqrt(dataSizeSilderValue/Math.PI);
                this.cars[i].scale(value);
            }
        }
    },

    calcValue: function (input) {
        mindim = dataSizeSilderValue * 1 / 2;
        maxdim = dataSizeSilderValue * 3;
        output = ((maxdim - mindim) / (this.range.max - this.range.min)) * (input - this.range.min) + (mindim);
        output = Math.sqrt(output/Math.PI);
        return output;
    }
, };
