var svgElement;
var width;
var height;

function main() {

    width = window.innerWidth - 5;
    height = window.innerHeight - 5;
    initialsetup();
}

function initialsetup() {
    console.log("yeah");

    d3.xml("js/Old_New_Testament_Social_Network_short.xml", function(error, data) {
        if (error) throw error;
        console.log(data);

        // Convert the XML document to an array of objects.
        // Note that querySelectorAll returns a NodeList, not a proper Array,
        // so we must use map.call to invoke array methods.
        nodes = [].map.call(data.querySelectorAll("node"), function(node) {
            return {
                id: node.getAttribute("id"),
                key: node.querySelector("data").textContent
            };
        });
        edges = [].map.call(data.querySelectorAll("edge"), function(edge) {
            return {
                source: edge.getAttribute("source"),
                target: edge.getAttribute("target"),
                weight: edge.querySelector("data").textContent
            };
        });

        console.log(nodes);
        console.log(edges);

        
    });

}

main();