function roundValues(featureName, value) {
    if (featureName == "mpg" || featureName == "displacement" || featureName == "weight" || featureName == "acceleration" || featureName == "cylinders" || featureName == "modelYear" || featureName == "horsepower") {
        return Math.round(value * 10) / 10;
    } else {
        return value;
    }
};

function getMeasureUnit(valueName) {
    if (valueName == "mpg") {
        return "l/100km";
    } else if (valueName == "displacement") {
        return "ccm";
    } else if (valueName == "horsepower") {
        return "PS";
    } else if (valueName == "weight") {
        return "kg";
    } else if (valueName == "acceleration") {
        return "s/0-100km/h";
    } else {
        return "";
    }
}

function getFriendlyFeatureName(feature){
            if(feature == "mpg"){
            return "Consumption";
        }else if(feature == "displacement"){
            return "Displacement";
        }else if(feature == "horsepower"){
            return "Horsepower";
        }else if(feature == "weight"){
            return "Weight";
        }else if(feature == "acceleration"){
            return "Acceleration";
        }else if(feature == "manufacturer"){
            return "Manufacturer";
        }else if(feature == "modelYear"){
            return "Model Year";
        }else if(feature == "origin"){
            return "Origin";
        }else if(feature == "car"){
            return "Car";
        }else if(feature == "cylinders"){
            return "Cylinders";
        }else if(feature == "Manufacturer"){
            return "Manufacturer";
        }else if(feature == "Origin"){
            return "Origin";
        }else if(feature == "none" || feature == "None"){
            return "None";
        }else{
            return "";
        }
}
