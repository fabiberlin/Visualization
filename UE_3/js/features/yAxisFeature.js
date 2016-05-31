function YAxisFeature(carsArr) {
    this.cars = carsArr;
    this.enabled = false;
    this.featureName = "";
    this.range = null;
}

YAxisFeature.prototype = {

    constructor: YAxisFeature,

    enable: function () {
        this.enabled = true;
    },

    disable: function () {
        this.enabled = false;
    },

    setFeature: function (featureName) {
        this.featureName = featureName;
        this.range = new Range(featureName, this.cars);
        document.getElementById("chosen_yAxis").textContent = this.range.getFriendlyName();
    },

    update: function () {
        for (i = 0; i < this.cars.length; i++) {
            //if(this.cars[i][this.featureName] == null){
            //    this.cars[i].hide();
            //}else{
                yValue = this.calcValue(this.cars[i][this.featureName]);
                this.cars[i].setY(yValue);
            //}

        }
        this.drawAxis();
    },

    calcValue: function (input) { //TODO FIX -100 Upper Problem
        output = (((upperMargin - height + lowerMargin) * (input - this.range.min)) / (this.range.max - this.range.min)) + (height - lowerMargin);
        //console.log(output);
        return output;
    },

    drawAxis: function () {

        d3.select("#yAxisLabel").remove();
        d3.select("#yAxisLabelUnit").remove();
        d3.select("#yAxis").remove();

        var axisScale = d3.scale.linear()
            .domain([this.range.min, this.range.max])
            .range([height - lowerMargin, upperMargin]);

        var yAxis = d3.svg.axis()
            .orient("left")
            .scale(axisScale);

        var yAxisGroup = svgElement.append("g")
            .attr("transform", "translate(" + (leftMargin - 10) + ",0)")
            //.attr("transform", "translate(0," + (height - lowerMargin + 10) + ")")
            .attr("id", "yAxis")
            .call(yAxis);

        var yAxisLabel = svgElement.append("text") // text label for the x axis
            .attr("x", leftMargin - 100)
            .attr("y", (height - upperMargin) / 2)
            .attr("id", "yAxisLabel")
            .style("text-anchor", "middle")
            .text(this.range.getFriendlyName());

        var yAxisLabelUnit = svgElement.append("text") // text label for the x axis
            .attr("x", leftMargin - 100)
            .attr("y", ((height - upperMargin) / 2) + 20)
            .attr("id", "yAxisLabelUnit")
            .style("text-anchor", "middle")
            .text("in [" + this.range.getMeasureUnit() + "]");
    }
};
