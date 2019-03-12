var author = "###Author###";
var script = "";
var datafilename = "filepath";
var num_char_states = 4;
var substitutionModel= "Q <- fnJC(" + num_char_states + ")\n";

var substitutionmodelTag = "######################\n" +
                           "# Substitution Model #\n" +
                           "######################";

var variables = "# Get some useful variables from the data. We need these later on.\n" +
                 "num_taxa <- data.ntaxa()\n" +
                 "num_branches <- 2 * num_taxa - 3\n" +
                 "taxa <- data.taxa()\n\n"+
                 "moves    = VectorMoves()\n" +
                 "monitors = VectorMonitors()";


//creates the script that will be generated.
function createScript(){
    var scripts = [author, datafilename, variables,substitutionmodelTag, substitutionModel];
    script = scripts.join('\n\n');
}

function resetScript(){
    script = "";
    document.getElementById('myTextarea').value = "Example script.....";
}

function generateScript(){
	createScript();
    document.getElementById('myTextarea').value = script; 
}