var svgElement;
var width = 800;
var height = 600;
var dataSheet;
var dataSizeSilderValue = 30;

function main() {

    width = window.innerWidth - 0;
    height = window.innerHeight - 4;

    document.getElementById("overlay").addEventListener("mousemove", handleMouseMove);
    document.getElementById("overlay").addEventListener("mousedown", handleMouseDown);

    document.getElementById("SelectionBar").style.transform = "translate(" + (width - rightMargin + 50) + "px," + upperMargin + "px)";
    document.getElementById("SelectionBarLeft").style.transform = "translate(" + 0 + "px," + upperMargin + "px)";

    initialsetup();
}

function initialsetup() {
    clear();
    cars = [];
    for (i = 0; i < data.length; i++) {
        aCar = new Car();
        aCar.setPropsFromJson(data[i]);
        aCar.carId = i;
        aCar.svg = this.drawCircle(new Glyph("black", 5), i);
        cars.push(aCar);
    }
    dataSheet = new DataSheet(cars, svgElement);
    dataSheet.update();
}

function handleMouseMove(event) {
    dataSheet.hoverElements(event.clientX, event.clientY);
}

function handleMouseDown(event) {
    //console.log("Mouse Down   " + event.clientX + "   " + event.clientY);
    dataSheet.showInformationLabel(event.clientX, event.clientY);
}

function xAxisChanged(element) {
    //console.log("xAxisChanged " + element);
    dataSheet.setXAxis(element);
    dataSheet.update();
}

function yAxisChanged(element) {
    //console.log("yAxisChanged " + element);
    dataSheet.setYAxis(element);
    dataSheet.update();
}

function colorChanged(what, featureName) {
    //console.log("colorChanged " + what + " " + featureName);
    dataSheet.setColor(what, featureName);
    dataSheet.update();
}

function sizeChanged(featureName) {
    //console.log("sizeChanged " + featureName);
    dataSheet.setSize(featureName);
    dataSheet.update();
}

function clusterChanged(featureName) {
    //console.log("clusterChanged " + featureName);
    clear();
    cars = clusterCars(featureName);
}

function clusterCars(featureName) {

    document.getElementById("chosen_cluster").textContent = getFriendlyFeatureName(featureName)

    if (featureName == "none") {
        initialsetup()
        return;
    }

    clusters = [];
    for (i = 0; i < data.length; i++) {
        value = data[i][featureName];
        cluster = isInClusters(clusters, value)
        if (cluster != null) {
            cluster.addCar(data[i]);
        } else {
            cluster = new Cluster(featureName, value);
            cluster.addCar(data[i]);
            clusters.push(cluster);
        }
    }
    //console.log(clusters);

    meanCars = [];
    //console.log(meanCars);
    for (k = 0; k < clusters.length; k++) {
        //console.log(meanCars);
        theMeancar = clusters[k].getMeanCar();
        theMeancar.svg = this.drawCircle(new Glyph("black", 5), k);
        theMeancar.carId = k;
        meanCars.push(theMeancar);
        //console.log(meanCars);
    }
    //console.log(meanCars);

    dataSheet = new DataSheet(meanCars, svgElement);
    dataSheet.update();
}

function isInClusters(clusters, value) {
    for (j = 0; j < clusters.length; j++) {
        if (clusters[j].nameOfCluster == value) {
            return clusters[j];
        }
    }
    return null;
}

function drawCircle(circle, id) {
    circle = svgElement
        .append('circle')
        .attr("cy", circle.y)
        .attr("cx", circle.x)
        .attr("r", circle.dim / 2)
        .attr("id", "carId_" + id)
        .attr('fill', circle.color);
    return circle;
}

function clear() {
    d3.select('#vis').selectAll('svg').remove();
    svgElement = d3.select('#vis').append('svg').attr({
        'width': width
        , 'height': height
    });
}

var slider = new Slider("#ex1");
slider.on("slide", function (slideEvt) {
    $("#ex6SliderVal").text(slideEvt.value);
    //console.log("Slider Chaned to: " + slideEvt);
    dataSizeSilderValue = slideEvt;
    dataSheet.update();
});

$("#search_input").on("input", function (e) {
    if ($(this).data("lastval") != $(this).val()) {
        $(this).data("lastval", $(this).val());
        //change action
        value = $(this).val();
        //console.log("search input changed to: " + value);
        dataSheet.filter(value);

    };
});
main();
