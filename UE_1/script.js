function showData() {
    d3.json("/data.json", function (error, data) {
        console.log(data);

        var datasetAll = data;

        var width = 800;
        var height = 600;
        var padding = 40;
        var scaling = 0.01;

        var dataset = datasetAll[dataIndex];
        
        d3.select('div').selectAll('svg').remove();

        var svgElement = d3.select('div').append('svg').attr({
            'width': width,
            'height': height
        });

        svgElement
            .selectAll('rect')
            .data(dataset)
            .enter()
            .append('rect')
            .attr('x', function (d, i) {
                return i * (width / dataset.length);
            })
            .attr('width', width / dataset.length - padding)
            .attr('y', function (d) {
                return height - (d.bip * scaling) - 50;
            })
            .attr('height', function (d) {
                return d.bip * scaling;
            })
            .attr('fill', function (d) {
                return 'rgb(0, 0, 0)';
            });

        svgElement
            .selectAll('text')
            .data(dataset)
            .enter()
            .append('text')
            .attr({
                'x': function (d, i) { return i * (width / dataset.length) + ((width / dataset.length - padding) / 2) },
                'y': height - 20,
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




