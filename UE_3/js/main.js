var svgElement;
var width = 800;
var height = 600;
var dataSheet;

function main() {

    okButton = document.getElementById("okButton")
    okButton.addEventListener("click", onOkClicked);

    width = window.innerWidth - 0;
    height = window.innerHeight - 4;

    clear();

    document.getElementById("overlay").addEventListener("mousemove", handleMouseMove);
    document.getElementById("overlay").addEventListener("mousedown", handleMouseDown);

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

function handleMouseMove(event){
    dataSheet.hoverElements(event.clientX, event.clientY);
}

function handleMouseDown(event){
    console.log("Mouse Down   "+event.clientX+"   "+event.clientY);
    dataSheet.showInformationLabel(event.clientX, event.clientY);
}

function onOkClicked() {
    console.log("On Ok Clicked");
    dataSheet.update();
}

function xAxisChanged(element){
    console.log("xAxisChanged " + element);
    dataSheet.setXAxis(element);
    dataSheet.update();
}

function yAxisChanged(element){
    console.log("yAxisChanged " + element);
    dataSheet.setYAxis(element);
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

main();
