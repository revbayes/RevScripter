var author = "###Author###\n\n";
var script = "";


var scripts=['test1', 'test2', 'test3'];
var scripts2=['test4','test5','test6']

script = _.concat(scripts,scripts2);

var substitutionmodelTag = "######################\n" +
                           "# Substitution Model #\n" +
                           "######################\n\n";

var variables = "# Get some useful variables from the data. We need these later on.\n" +
                 "num_taxa <- data.ntaxa()\n" +
                 "num_branches <- 2 * num_taxa - 3\n" +
                 "taxa <- data.taxa()\n\n";


//creates the script that will be generated.
function createScript(){
    script = author + variables; 
}

function resetScript(){
    script = "";
    document.getElementById('myTextarea').value = "Example script.....";
}

function generateScript(){
	//createScript();
    document.getElementById('myTextarea').value = script; 
}