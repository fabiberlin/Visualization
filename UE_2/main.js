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
        console.log("hidesOtherGlyphs:")
        console.log(glyphs)
        console.log(glyphs.length)
        console.log(this)
        for (var m = 0; m < glyphs.length; m++) {
            if (this.hidesEachOther(glyphs[m])) {
                console.log("HIDES One of the Other Glyphs!");
                return true;
            }
        }
        return false;
    }

    hidesEachOther(glyph) {
        if (Math.abs(this.x - glyph.x) <= (this.dim / 2 + glyph.dim / 2) && Math.abs(this.y - glyph.y) <= (this.dim / 2 + glyph.dim / 2)) {
            console.log("HIDES Each Other!");
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

    document.getElementById("decriptionText").textContent = data[indexOfTest].description
}

function showTestVisualization() {
    allobjectsToDraw = data[indexOfTest].objectsToDraw;
    glyphs = []
    for (i = 0; i < allobjectsToDraw.length; i++) {
        objects = allobjectsToDraw[i];

        for (j = 0; j < objects.count; j++) {
            aGlyph = new Glyph(objects.form, objects.color);

            while (aGlyph.hidesOtherGlyphs(glyphs)) {
                console.log("Calculate new position")
                aGlyph.randomizePosition();
            }

            glyphs.push(aGlyph);
        }
        console.log(glyphs);
        drawGlyphs(glyphs);
    }
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
    d3.select('div').selectAll('svg').remove();
    svgElement = d3.select('div').append('svg').attr({
        'width': width
        , 'height': height
    });
}

function hideEvaluationButtons() {
    noButton.style.display = "none";
    yesButton.style.display = "none";
    notSeenButton.style.display = "none";
}

function showEvaluationButtons() {
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
    okButton.style.display = "none";
    delay = data[indexOfTest].timeToShow;
    setTimeout(function () {
        showTestVisualization()

        aRect = new Glyph("rect", "red");
        aRect.x = 40;
        aRect.y = 40;

        console.log(aRect.hidesEachOther(110, 40, 80));

        setTimeout(function () {
            clear()
            showEvaluationButtons()


        }, delay);

    }, delayAfterOK);

}

main();
