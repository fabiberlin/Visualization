var data;
var svgElement;
var width = 800;
var height = 600;
var yesButton;
var noButton;
var notSeenButton;
var okButton;
var indexOfTest = 0;

function main() {
    console.log("Yeah");

    yesButton = document.getElementById("yesButton")
    yesButton.addEventListener("click", onYesClicked);

    noButton = document.getElementById("noButton")
    noButton.addEventListener("click", onNoClicked);

    notSeenButton = document.getElementById("notSeenButton")
    notSeenButton.addEventListener("click", onNotSeenClicked);

    okButton = document.getElementById("okButton")
    okButton.addEventListener("click", onOkClicked);

    hideEvaluationButtons()

    data = DATA;
    console.log(data);

    clear();






    drawSquare(10, 10, 300, "red")

    var delay = 1000; //1 second
    setTimeout(function () {
        //your code to be executed after 1 second
        clear()
        drawCircle(10,10,300,"blue");
        showEvaluationButtons()
    }, delay);
}

function drawSquare(x, y, dim, color) {
    svgElement
        .append('rect')
        .attr('x', x)
        .attr('width', dim)
        .attr('y', y)
        .attr('height', dim)
        .attr('fill', color);
}

function drawCircle(x, y, dim, color) {
    svgElement
        .append('circle')
        .attr("cy", y)
        .attr("cx", x)
        .attr("r", dim)
        .attr('fill', color);
}

function clear() {
    d3.select('div').selectAll('svg').remove();
    svgElement = d3.select('div').append('svg').attr({
        'width': width
        , 'height': height
    });
}

function hideEvaluationButtons(){
    noButton.style.display = "none";
    yesButton.style.display = "none";
    notSeenButton.style.display = "none";
}

function showEvaluationButtons(){
    noButton.style.display = "inline";
    yesButton.style.display = "inline";
    notSeenButton.style.display = "inline";
}

function onYesClicked() {
    console.log("On Yes Clicked");
}

function onNoClicked() {
    console.log("On No Clicked");
}

function onNotSeenClicked() {
    console.log("On Not Seen Clicked");
}

function onOkClicked() {
    console.log("On Ok Clicked");
}



main();
