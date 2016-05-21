function DataSheet(carsArr) {
    this.cars = carsArr;
    this.ranges = [];
    for (i = 0; i < datafieldsNumber.length; i++) {
        this.ranges.push(new Range(datafieldsNumber[i], this.cars));
    }
    this.xAxisFeature = new XAxis(this.cars);
    this.xAxisFeature.setFeature("mpg");
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
                console.log("SACLE!");
            }else{
                this.cars[i].scale(2.5);
            }
        }
    }
};
