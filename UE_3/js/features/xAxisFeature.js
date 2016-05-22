function XAxisFeature(carsArr) {
    this.cars = carsArr;
    this.enabled = false;
    this.featureName = "";
    this.range = null;
}

XAxisFeature.prototype = {

    constructor: XAxisFeature,

    enable: function () {
        this.enabled = true;
    },

    disable: function () {
        this.enabled = false;
    },

    setFeature: function (featureName) {
        this.featureName = featureName;
        this.range = new Range(featureName, this.cars);
        document.getElementById("chosen_xAxis").textContent = this.range.getFriendlyName();
    },

    update: function () {
        for (i = 0; i < this.cars.length; i++) {
            xValue = this.calcValue(this.cars[i][this.featureName]);
            this.cars[i].setX(xValue);
        }
        this.drawAxis();
    },

    calcValue: function (input) {
        output = ((width - rightMargin - leftMargin) / (this.range.max - this.range.min)) * (input - this.range.min) + leftMargin;
        return output;
    },

    drawAxis: function () {

        d3.select("#xAxisLabelName").remove();
        d3.select("#xAxisLabelUnit").remove();
        d3.select("#xAxis").remove();

        var axisScale = d3.scale.linear()
        .domain([this.range.min, this.range.max])
        .range([leftMargin, width-rightMargin]);

        var xAxis = d3.svg.axis()
        .orient("bottom")
        .scale(axisScale);

        var xAxisGroup = svgElement.append("g")
        .attr("transform", "translate(0," + (height - lowerMargin + 10) + ")")
        .attr("id","xAxis")
        .call(xAxis);

        var xAxisLabel = svgElement.append("text")      // text label for the x axis
        .attr("x", (width-leftMargin)/2 )
        .attr("id","xAxisLabelName")
        .attr("y",  (height - lowerMargin + 50) )
        .style("text-anchor", "middle")
        .text(this.range.getFriendlyName());

        var xAxisLabelUnit = svgElement.append("text")      // text label for the x axis
        .attr("x", (width-leftMargin)/2 )
        .attr("id","xAxisLabelUnit")
        .attr("y",  (height - lowerMargin + 70) )
        .style("text-anchor", "middle")
        .text("in ["+this.range.getMeasureUnit()+"]");
    }
};
