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
    },

    setXAxis: function (feature) {
        this.xAxisFeature.setFeature(feature);
    },

    setYAxis: function (feature) {
        this.yAxisFeature.setFeature(feature);
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

    showInformationLabel: function (x,y){
        for (i = 0; i < this.cars.length; i++) {
            if ((Math.abs(this.cars[i].getX() - x) <= 10) && (Math.abs(this.cars[i].getY() - y) <= 10)) {
                console.log("Show Information Label for");
                console.log(this.cars[i]);

                infoDiv = document.getElementById("informationLabel");
                console.log(infoDiv);
                console.log(infoDiv.style.left)

                infoDiv.style.visibility = "visible"; //hidden
                infoDiv.style.left = ""+(this.cars[i].getX()+20)+"px";
                infoDiv.style.top =  ""+(this.cars[i].getY()-10)+"px";

                break;
            }
        }
    }
};
