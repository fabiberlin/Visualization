var svgElement;
var width = 800;
var height = 600;
var dataSheet;
var dataSizeSilderValue = 2.5;

function main() {

    width = window.innerWidth - 0;
    height = window.innerHeight - 4;

    clear();

    document.getElementById("overlay").addEventListener("mousemove", handleMouseMove);
    document.getElementById("overlay").addEventListener("mousedown", handleMouseDown);

    document.getElementById("SelectionBar").style.transform = "translate(" + (width - rightMargin + 50) + "px," + upperMargin + "px)";
    cars = [];

    for (i = 0; i < data.length; i++) {
        aCar = new Car();
        aCar.setPropsFromJson(data[i]);
        aCar.svg = this.drawCircle(new Glyph("black", 5));
        cars.push(aCar);
    }
    dataSheet = new DataSheet(cars, svgElement);
    dataSheet.update();
}

function handleMouseMove(event) {
    dataSheet.hoverElements(event.clientX, event.clientY);
}

function handleMouseDown(event) {
    console.log("Mouse Down   " + event.clientX + "   " + event.clientY);
    dataSheet.showInformationLabel(event.clientX, event.clientY);
}

function xAxisChanged(element) {
    console.log("xAxisChanged " + element);
    dataSheet.setXAxis(element);
    dataSheet.update();
}

function yAxisChanged(element) {
    console.log("yAxisChanged " + element);
    dataSheet.setYAxis(element);
    dataSheet.update();
}

function colorChanged(what, featureName) {
    console.log("colorChanged " + what + " "+featureName);
    dataSheet.setColor(what, featureName);
    dataSheet.update();
}

function sizeChanged(featureName) {
    console.log("sizeChanged "+ featureName);
    dataSheet.setSize(featureName);
    dataSheet.update();
}


function drawCircle(circle) {
    circle = svgElement
        .append('circle')
        .attr("cy", circle.y)
        .attr("cx", circle.x)
        .attr("r", circle.dim / 2)
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
    console.log("Slider Chaned to: "+slideEvt);
    dataSizeSilderValue = slideEvt;
    dataSheet.update();
});

main();
