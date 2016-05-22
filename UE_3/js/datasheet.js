function DataSheet(carsArr) {
    this.cars = carsArr;
    this.ranges = [];
    console.log("datafieldsNumber.length "+datafieldsNumber.length);

    this.ranges.push(new Range("mpg", this.cars));
    this.ranges.push(new Range("cylinders", this.cars));
    this.ranges.push(new Range("displacement", this.cars));
    this.ranges.push(new Range("horsepower", this.cars));
    this.ranges.push(new Range("weight", this.cars));
    this.ranges.push(new Range("acceleration", this.cars));
    this.ranges.push(new Range("modelYear", this.cars));

    console.log(this.ranges);
    this.xAxisFeature = new XAxis(this.cars);
    this.xAxisFeature.setFeature("weight");
    this.yAxisFeature = new YAxis(this.cars);
    this.yAxisFeature.setFeature("horsepower");
}

DataSheet.prototype = {

    constructor: DataSheet,

    update: function () {

        this.xAxisFeature.update();
        this.yAxisFeature.update();
        /*
        for (i = 0; i < this.cars.length; i++) {
            this.cars[i].setPosition(Math.random() * (width - 2 * 10) + 10, Math.random() * (height - 2 * 10) + 10);
        }
        */
    },

    hoverElements: function (x,y){
        for (i = 0; i < this.cars.length; i++) {
            if ((Math.abs(this.cars[i].getX() - x) <= 10) && (Math.abs(this.cars[i].getY() - y) <= 10)) {
                this.cars[i].scale(15);
                //console.log("SACLE!");
            }else{
                this.cars[i].scale(2.5);
            }
        }
    },

    showInformationBox: function (x,y){
        for (i = 0; i < this.cars.length; i++) {
            if ((Math.abs(this.cars[i].getX() - x) <= 10) && (Math.abs(this.cars[i].getY() - y) <= 10)) {
                console.log("Show Information Box for");
                console.log(this.cars[i]);
                break;
            }
        }
    }
};
