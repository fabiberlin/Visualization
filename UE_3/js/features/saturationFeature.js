function SaturationFeature(carsArr) {
    this.cars = carsArr;
    this.enabled = false;
    this.featureName = "";
    this.range = null;
}

SaturationFeature.prototype = {

    constructor: SaturationFeature,

    enable: function () {
        this.enabled = true;
    },

    disable: function () {
        this.enabled = false;
    },

    setFeature: function (featureName) {
        this.featureName = featureName;
        if (featureName == "none"){
            this.enabled = false;
        }else{
            this.enabled = true;
            this.range = new Range(featureName, this.cars);
        }
        document.getElementById("chosen_saturation").textContent = getFriendlyFeatureName(this.featureName);
    },

    getFeatureValue: function (car) {
        if(this.enabled){
            return this.calcValue(car[this.featureName]);
        }else{
            return 0.5; //hsl
        }
    },

    calcValue: function (input) {
        output = ((1-1/6)/(this.range.max-this.range.min))*(input-this.range.min)+(1/6);
        return output;
    },

    drawAxis: function () {
        //TODO
    }
};
