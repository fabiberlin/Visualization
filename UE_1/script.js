function showData() {
    d3.json("/data.json", function (error, data) {
        console.log(data);

        var datasetAll = data;

        var breite = 800;
        var hoehe = 600;
        var abstand = 40;
        var skalierung = 0.01;

        var dataset = datasetAll[dataIndex];
        
        d3.select('div').selectAll('svg').remove();

        var svgElement = d3.select('div').append('svg').attr({
            'width': breite,
            'height': hoehe
        });

        svgElement
            .selectAll('rect')
            .data(dataset)
            .enter()
            .append('rect')
            .attr('x', function (d, i) {
                return i * (breite / dataset.length);
            })
            .attr('width', breite / dataset.length - abstand)
            .attr('y', function (d) {
                return hoehe - (d.bip * skalierung) - 50;
            })
            .attr('height', function (d) {
                return d.bip * skalierung;
            })
            .attr('fill', function (d) {
                return 'rgb(0, 0, 255)';
            });

        svgElement
            .selectAll('text')
            .data(dataset)
            .enter()
            .append('text')
            .attr({
                'x': function (d, i) { return i * (breite / dataset.length) + ((breite / dataset.length - abstand) / 2) },
                'y': hoehe - 20,
                'font-family': 'Arial',
                'font-size': 25,
                'fill': 'black',
                'text-anchor': 'middle'
            })
            .text(function (d) { return d.country; });
        }
    );
}
document.getElementById("nextButton").addEventListener("click", function() {
    console.log("On Next Clicked");
    dataIndex++;
    showData();
});

document.getElementById("backButton").addEventListener("click", function() {
    console.log("On Back Clicked");
    dataIndex--;
    showData();
});

var dataIndex = 0;
showData();




