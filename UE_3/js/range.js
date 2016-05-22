function Range(valueName, carsArr) {
    this.min = 0;
    this.max = 1;
    this.mean = 0.5;
    this.median = 0.5; //TODO
    this.valueName = "";
    this.setRanges(valueName, carsArr);
}

Range.prototype = {

    constructor: Range,

    setRanges: function (valueName, carsArr) {
        this.valueName = valueName;
        currentmin = 1000;
        currentmax = 0;
        sum = 0;
        num = 0;

        for (i = 0; i < carsArr.length; i++) {
            var car = carsArr[i];
            if (car[this.valueName] !== null) {
                if (car[this.valueName] >= currentmax){
                    currentmax = car[this.valueName];
                }
                if (car[this.valueName] <= currentmin){
                    currentmin = car[this.valueName];
                }
                sum += car[this.valueName];
                num += 1;
            }
        }
        this.min = currentmin;
        this.max = currentmax;
        this.mean = sum/num;
    },

    getMeasureUnit: function () {
        if(this.valueName == "mpg"){
            return "l/100km";
        }else if(this.valueName == "displacement"){
            return "ccm";
        }else if(this.valueName == "horsepower"){
            return "PS";
        }else if(this.valueName == "weight"){
            return "kg";
        }else if(this.valueName == "acceleration"){
            return "s/0-100km/h";
        }else{
            return "1";
        }
    },

    getFriendlyName: function () {
        if(this.valueName == "mpg"){
            return "Consumption";
        }else if(this.valueName == "displacement"){
            return "Displacement";
        }else if(this.valueName == "horsepower"){
            return "Horsepower";
        }else if(this.valueName == "weight"){
            return "Weight";
        }else if(this.valueName == "acceleration"){
            return "Acceleration";
        }else if(this.valueName == "manufacturer"){
            return "Manufacturer";
        }else if(this.valueName == "modelYear"){
            return "Model Year";
        }else if(this.valueName == "origin"){
            return "Origin";
        }else if(this.valueName == "car"){
            return "Car";
        }else if(this.valueName == "cylinders"){
            return "Cylinders";
        }else{
            return "";
        }
    }
};
