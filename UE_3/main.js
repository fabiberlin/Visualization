class Glyph {
    constructor(form, color) {
        this.x = 0;
        this.y = 0;
        this.dim = globalDimension;
        this.color = color;
        this.form = form;
        this.randomizePosition();
    }

    hidesOtherGlyphs(glyphs) {
        for (var m = 0; m < glyphs.length; m++) {
            if (this.hidesEachOther(glyphs[m])) {
                return true;
            }
        }
        return false;
    }

    hidesEachOther(glyph) {
        if (Math.abs(this.x - glyph.x) <= (this.dim / 2 + glyph.dim / 2) && Math.abs(this.y - glyph.y) <= (this.dim / 2 + glyph.dim / 2)) {
            return true;
        } else {
            return false;
        }
    };

    randomizePosition() {
        this.x = Math.random() * (width - 2 * margin) + margin;
        this.y = Math.random() * (height - 2 * margin) + margin;
    }
}

var data;
var svgElement;
var width = 800;
var height = 600;
var yesButton;
var noButton;
var notSeenButton;
var okButton;
var indexOfTest = 0;
var delayAfterOK = 1000;
var globalDimension = 40
var margin = 30
var evaluation = [];

function main() {
    data = DATA;
    clear();
}

function drawGlyphs(glyphs) {
    for (var i = 0; i < glyphs.length; i++) {
        drawGlyph(glyphs[i]);
    }
}

function drawGlyph(glyph) {
    if (glyph.form == "rect") {
        drawSquare(glyph)
    }
    if (glyph.form == "circle") {
        drawCircle(glyph)
    }
}

function drawSquare(rect) {
    svgElement
        .append('rect')
        .attr('x', rect.x - rect.dim / 2)
        .attr('width', rect.dim)
        .attr('y', rect.y - rect.dim / 2)
        .attr('height', rect.dim)
        .attr('fill', rect.color);
}

function drawCircle(circle) {
    svgElement
        .append('circle')
        .attr("cy", circle.y)
        .attr("cx", circle.x)
        .attr("r", circle.dim / 2)
        .attr('fill', circle.color);
}

function clear() {
    d3.select('#vis').selectAll('svg').remove();
    svgElement = d3.select('div').append('svg').attr({
        'width': width,
        'height': height
    });
}

main();
