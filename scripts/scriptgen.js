var author = "###Author###\n";
var sequenceData = "### Read in sequence data for both genes\n" +
"data = readDiscreteCharacterData" + "(" + "data/primates_and_galeopterus_cytb.nex" + ")";
var variables;
var substitutionModel;
var treeModel;
var phyloctmcModel;
var analysis;
var postProcessing;
var script = "";



function createScript(){
    script = author +sequenceData;
}

function resetScript(){
    document.getElementById('myTextarea').value = "Example script.....";
}

function generateScript(){
    createScript();
    document.getElementById('myTextarea').value = script;
    //$('#myTextarea').val('');
}