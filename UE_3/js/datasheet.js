function DataSheet(carsArr) {
    this.cars = carsArr;
    this.ranges = [];
    this.ranges.push(new Range("mpg", this.cars));
    this.ranges.push(new Range("cylinders", this.cars));
    this.ranges.push(new Range("displacement", this.cars));
    this.ranges.push(new Range("horsepower", this.cars));
    this.ranges.push(new Range("weight", this.cars));
    this.ranges.push(new Range("acceleration", this.cars));
    this.ranges.push(new Range("modelYear", this.cars));

    console.log(this.ranges);
    this.xAxisFeature = new XAxisFeature(this.cars);
    this.xAxisFeature.setFeature("weight");
    this.yAxisFeature = new YAxisFeature(this.cars);
    this.yAxisFeature.setFeature("horsepower");
    this.colorFeature = new ColorFeature(this.cars);
    this.colorFeature.setFeature("hueFeature","none");
    this.colorFeature.setFeature("saturationFeature","none");
    this.colorFeature.setFeature("brightnessFeature","none");
    this.sizeFeature = new SizeFeature(this.cars);
    this.sizeFeature.setFeature("none");
}

DataSheet.prototype = {

    constructor: DataSheet,

    update: function () {
        this.xAxisFeature.update();
        this.yAxisFeature.update();
        this.colorFeature.update();
        this.sizeFeature.update();
    },

    setXAxis: function (feature) {
        this.xAxisFeature.setFeature(feature);
    },

    setYAxis: function (feature) {
        this.yAxisFeature.setFeature(feature);
    },

    setColor: function (what, featureName) {
        this.colorFeature.setFeature(what, featureName);
    },

    setSize: function (featureName) {
        this.sizeFeature.setFeature(featureName);
    },

    hoverElements: function (x, y) {
        car = null;
        for (i = 0; i < this.cars.length; i++) {
            if ((Math.abs(this.cars[i].getX() - x) <= dataSizeSilderValue) && (Math.abs(this.cars[i].getY() - y) <= dataSizeSilderValue)) {
                //this.cars[i].scale(dataSizeSilderValue*2);
                car = this.cars[i];
            } else {
                //this.cars[i].scale(dataSizeSilderValue);
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
            if(y>height/2){
                infoDiv.style.top = "" + (car.getY() - 205) + "px";
            }
            for (i = 0; i < allDataFields.length; i++) {
                infospan = document.getElementById("info_"+allDataFields[i]);
                infospan.textContent = roundValues(allDataFields[i], car[allDataFields[i]]) + " " + getMeasureUnit(allDataFields[i]);
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
            if ((Math.abs(this.cars[i].getX() - x) <= dataSizeSilderValue) && (Math.abs(this.cars[i].getY() - y) <= dataSizeSilderValue)) {
                return this.cars[i];
            }
        }
        return null;
    }
};
