class Glyph {
    constructor(color, dim) {
        this.y = (height-lowerMargin-upperMargin)/2 + upperMargin;
        this.x = (width - leftMargin - rightMargin)/2 + leftMargin;
        this.dim = dim;
        this.color = color;
        //this.randomizePosition();
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
        this.x = Math.random() * (width - 2 * 10) + 10;
        this.y = Math.random() * (height - 2 * 10) + 10;
    }
}
