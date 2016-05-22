function roundValues (featureName, value){
    if(featureName == "mpg" || featureName == "displacement" || featureName == "weight" || featureName == "acceleration"){
        return Math.round(value * 10) / 10;
    }else{
        return value;
    }
}
