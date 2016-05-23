function BrightnessFeature(carsArr) {
    this.cars = carsArr;
    this.enabled = false;
    this.featureName = "";
    this.range = null;
}

BrightnessFeature.prototype = {

    constructor: BrightnessFeature,

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
        document.getElementById("chosen_brightness").textContent = getFriendlyFeatureName(this.featureName);
    },

    getFeatureValue: function (car) {
        if(this.enabled){
            return this.calcValue(car[this.featureName]);
        }else{
            return 0.5; //hsl
        }
    },

    calcValue: function (input) {
        output = ((5/6)/(this.range.max-this.range.min))*(input-this.range.min)+(0);
        return output;
    },

    drawAxis: function () {
        //TODO
    }
};
