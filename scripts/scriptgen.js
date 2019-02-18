var author = "###Author###\n\n";
var script = "";
var fixed = 0;
var alpha = 0;
var beta = 0;

var substitutionmodelTag = "######################\n" +
                           "# Substitution Model #\n" +
                           "######################\n\n";

var sequenceData;
var variables;
var substitutionModel;
var treeModel;
var phyloctmcModel;
var analysis;
var postProcessing;





function getSubstitutionModel(){
    
}



//creates the script that will be generated.
function createScript(){
    script = author +"\n"  + fixed + "\n" + alpha + "\n" + beta; 
}

function resetScript(){
    script = "";
    document.getElementById('myTextarea').value = "Example script.....";
}

function generateScript(){
	createScript();
    document.getElementById('myTextarea').value = script; 
}