function DataSheet(carsArr) {
    this.cars = carsArr;
    this.ranges = [];
    console.log("datafieldsNumber.length " + datafieldsNumber.length);

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
    },

    setXAxis: function (feature) {
        this.xAxisFeature.setFeature(feature);
    },

    setYAxis: function (feature) {
        this.yAxisFeature.setFeature(feature);
    },

    hoverElements: function (x, y) {
        car = null;
        for (i = 0; i < this.cars.length; i++) {
            if ((Math.abs(this.cars[i].getX() - x) <= 10) && (Math.abs(this.cars[i].getY() - y) <= 10)) {
                this.cars[i].scale(7.5);
                car = this.cars[i];
            } else {
                this.cars[i].scale(2.5);
            }
        }
        if(car != null){
            hoverDiv = document.getElementById("hoverLabel");
            hoverDiv.style.visibility = "visible"; //hidden
            hoverDiv.style.left = "" + (car.getX() + 10) + "px";
            hoverDiv.style.top = "" + (car.getY() - 20) + "px";
            document.getElementById("hover_car").textContent = car.getShortSting();
        }else{
            //hide
            hoverDiv = document.getElementById("hoverLabel");
            hoverDiv.style.left = "0px";
            hoverDiv.style.top = "0px";
            hoverDiv.style.visibility = "hidden"; //visible
        }
    },

    showInformationLabel: function (x, y) {
        car = this.getCarAtMousePos(x, y);
        if (car != null) {
            //show
            console.log("Show Information Label for");
            console.log(car);

            infoDiv = document.getElementById("informationLabel");
            infoDiv.style.visibility = "visible"; //hidden
            infoDiv.style.left = "" + (car.getX() + 0) + "px";
            infoDiv.style.top = "" + (car.getY() - 0) + "px";
            for (i = 0; i < allDataFields.length; i++) {
                infospan = document.getElementById("info_"+allDataFields[i]);
                infospan.textContent = car[allDataFields[i]];
            }

        } else {
            //hide
            infoDiv = document.getElementById("informationLabel");
            infoDiv.style.left = "0px";
            infoDiv.style.top = "0px";
            infoDiv.style.visibility = "hidden"; //visible
        }
    },

    getCarAtMousePos: function (x, y) {
        for (i = 0; i < this.cars.length; i++) {
            if ((Math.abs(this.cars[i].getX() - x) <= 10) && (Math.abs(this.cars[i].getY() - y) <= 10)) {
                return this.cars[i];
            }
        }
        return null;
    }
};
