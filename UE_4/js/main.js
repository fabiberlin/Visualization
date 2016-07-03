var svg;
var width;
var height;
var fill = d3.scale.category20();
var nodeClick = false;
var vis;

function main() {

    width = window.innerWidth - 20;
    height = window.innerHeight - 20;
    initialsetup();
}

function initialsetup() {
    console.log("initial setup");

    d3.xml("js/Old_New_Testament_Social_Network.xml", function (error, data) {
        if (error) throw error;
        //console.log(data);
        var nodes = [].map.call(data.querySelectorAll("node"), function (node) {
            return {
                id: node.getAttribute("id")
                , key: node.querySelector("data").textContent
                , numOfLinks: 0

            };
        });
        var edges = [].map.call(data.querySelectorAll("edge"), function (edge) {
            return {
                source: parseInt(edge.getAttribute("source"))
                , target: parseInt(edge.getAttribute("target"))
                , weight: edge.querySelector("data").textContent
            };
        });

        for (var i = 0; i < edges.length; i++) {
            var source = edges[i].source;
            var target = edges[i].target
            nodes[source].numOfLinks++;
            nodes[target].numOfLinks++;

        }

        console.log(nodes);
        console.log(edges);


        // init svg
        var outer = d3.select("#vis")
            .append("svg:svg")
            .attr("width", width)
            .attr("height", height)
            .attr('fill', 'black')
            .on("mouseup", mouseUp)
            .attr("pointer-events", "all");


        vis = outer
            .append('svg:g')
            .attr('fill', 'black')
            .call(d3.behavior.zoom().on("zoom", rescale))
            .append('svg:g');

        vis.append('svg:rect')
            .attr('width', 10 * width)
            .attr('height', 10 * height)
            .attr('fill', 'black')
            .attr("transform", function (d) {
                return "translate(" + (-5 * width) + "," + (-5 * height) + ")";
            });;

        var force = d3.layout.force()
            .charge(-120)
            .linkDistance(30)
            .size([width, height]);

        force
            .links(edges)
            .nodes(nodes)
            .start();

        console.log("Forces started");

        var edge = vis.selectAll(".link")
            .data(edges)
            .enter().append("line")
            .attr("class", "link")
            .style("stroke", "rgb(100,100,100)")
            .style("stroke-width", function (d) {
                return d.weight;
            });

        var node = vis.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .attr("class", "node")
            .on("mousedown", mouseDown)
            .on("mouseup", mouseUp)
            .call(force.drag);

        node.append("circle")
            .attr("class", "node")
            .attr("r", function (d) {
                return Math.sqrt(d.numOfLinks / Math.PI) * 10
            })
            .style("fill", "rgb(140,140,140)")

        node.append("text")
            .attr("class", "nodetext")
            .attr("text-anchor", "middle")
            .style("fill", "rgb(255,255,255)")
            .style("font-size", "10")

        .text(function (d) {
            return d.key
        });

        force.on("tick", function () {
            edge.attr("x1", function (d) {
                    return d.source.x;
                })
                .attr("y1", function (d) {
                    return d.source.y;
                })
                .attr("x2", function (d) {
                    return d.target.x;
                })
                .attr("y2", function (d) {
                    return d.target.y;
                });

            node.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        });


        function rescale() {
            if (!nodeClick) {
                console.log("rescale");
                trans = d3.event.translate;
                scale = d3.event.scale;

                vis.attr("transform"
                    , "translate(" + trans + ")" + " scale(" + scale + ")");
            }
        }

        function mouseDown() {
            console.log("mouseDown");
            nodeClick = true;
        }

        function mouseUp() {
            console.log("mouseUp");
            nodeClick = false;
        }
    });
}


$("#search_input").on("input", function (e) {
    if ($(this).data("lastval") != $(this).val()) {
        $(this).data("lastval", $(this).val());
        //change action
        value = $(this).val().toLowerCase();
        console.log("search input changed to: " + value);

        vis.selectAll("circle")
            .style("fill", function (d) {
                if (value == "") {
                    return "rgb(140,140,140)";
                } else if (d.key.toLowerCase().indexOf(value) > -1) {
                    return "rgb(250,40,40)"; //red
                } else {
                    return "rgb(140,140,140)";
                }
            })
        vis.selectAll("text")
            .style("font-size", function (d) {
                if (value == "") {
                    return "10";
                } else if (d.key.toLowerCase().indexOf(value) > -1) {
                    //console.log("enlarge");
                    return "30"; //red
                } else {
                    return "10";
                }
            })
    };
});

main();