function Cluster(feature, nameOfFeature) {
    this.nameOfCluster = nameOfFeature;
    this.feature = feature;
    this.cars = [];
}

Cluster.prototype = {

    constructor: Cluster,

    addCar: function (aCarJson) {
        //console.log("add a Car");
        car = new Car();
        car.setPropsFromJson(aCarJson);
        this.cars.push(car);
    },

    getMeanCar(){
        meanCar = new Car();

        meanCar.car = "";
        meanCar.manufacturer = "";
        meanCar.origin = "";
        meanCar[this.feature.toLowerCase()] = this.nameOfCluster
        meanCar.mpg = (new Range("mpg", this.cars)).mean;
        meanCar.cylinders = new Range("cylinders", this.cars).mean;
        meanCar.displacement = new Range("displacement", this.cars).mean;
        meanCar.horsepower = new Range("horsepower", this.cars).mean;
        meanCar.weight = new Range("weight", this.cars).mean;
        meanCar.acceleration = new Range("acceleration", this.cars).mean;
        meanCar.modelYear = new Range("modelYear", this.cars).mean;

        return meanCar;
    }
};
