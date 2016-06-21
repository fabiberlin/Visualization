var svg;
var width;
var height;

function main() {

    width = window.innerWidth - 20;
    height = window.innerHeight - 20;
    initialsetup();
}

function initialsetup() {
    console.log("initial setup");

    var force = d3.layout.force()
        .charge(-120)
        .linkDistance(30)
        .size([width, height]);

    svg = d3.select("#vis").append("svg")
        .attr("width", width)
        .attr("height", height);


    d3.xml("js/Old_New_Testament_Social_Network.xml", function(error, data) {
        if (error) throw error;
        //console.log(data);
        var nodes = [].map.call(data.querySelectorAll("node"), function(node) {
            //console.log("node id: "+node.getAttribute("id"));
            return {
                id: node.getAttribute("id"),
                key: node.querySelector("data").textContent

            };
        });
        var edges = [].map.call(data.querySelectorAll("edge"), function(edge) {
            //console.log("edge source: "+edge.getAttribute("source"));
            //console.log("edge target: "+edge.getAttribute("target"));
            return {
                source: parseInt(edge.getAttribute("source")),
                target: parseInt(edge.getAttribute("target")),
                weight: edge.querySelector("data").textContent
            };
        });
        console.log(nodes);
        console.log(edges);


        force
            .nodes(nodes)
            .links(edges)
            .start();

        console.log("Forces started");

        var edge = svg.selectAll(".link")
            .data(edges)
            .enter().append("line")
            .attr("class", "link");

        var node = svg.selectAll(".node")
            .data(nodes)
            .enter().append("circle")
            .attr("class", "node")
            .attr("r", 5)
            .call(force.drag);

        force.on("tick", function() {
            edge.attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node.attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });

        });

    });

}

main();