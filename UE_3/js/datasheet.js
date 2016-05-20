function DataSheet(carsArr) {
    this.cars = carsArr;
    this.ranges = [];
    for (i = 0; i < datafieldsNumber.length; i++) {
        this.ranges.push(new Range(datafieldsNumber[i], this.cars));
    }
}

DataSheet.prototype = {

    constructor: DataSheet,

    update: function () {

        for (i = 0; i < this.cars.length; i++) {
            this.cars[i].setPosition(Math.random() * (width - 2 * 10) + 10, Math.random() * (height - 2 * 10) + 10);
        }
    }
};
