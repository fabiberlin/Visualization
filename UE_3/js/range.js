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
    }
};
