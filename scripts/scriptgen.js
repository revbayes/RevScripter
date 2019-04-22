var author = "###Author###";
var script = "";
var dataOptions = "filepath";
var num_char_states = 4;
var substitutionmodelTag = "";
var substitutionmodelTag = "";
var substitutionModel= "";
var treeTag = "";
var treeModel = "";
var mcmcTag = "";
var mcmc = "";

//This default code before substitution options
var variables = "# Get some useful variables from the data. We need these later on.\n" +
                 "num_taxa <- data.ntaxa()\n" +
                 "num_branches <- 2 * num_taxa - 3\n" +
                 "taxa <- data.taxa()\n\n"+
                 "moves    = VectorMoves()\n" +
                 "monitors = VectorMonitors()";

//Makes a RevBayes Title Tag with the given string
function revbayesTag(word){
    var tempword ="# " + word + " #";
    var temp = "";
    var i;
    for(i = 0; i < word.length + 4; i++){
        temp = temp + "#";
    }

    var words = [temp, tempword, temp];
    return word = words.join('\n');
}


//creates the script that will be generated.
function createScript(){
    dataoptions = getdataOptions();
    substitutionmodelTag = revbayesTag("Substitution Model");
    substitutionModel = getSubstitutionOptions(num_char_states);
    treeTag = revbayesTag("Tree Model");
    treeModel = getTreeOptions();
    mcmcTag = revbayesTag("MCMC");
    mcmc = getMCMCOptions();
    var scripts = [author, dataoptions, variables, substitutionmodelTag, substitutionModel, treeTag, treeModel, mcmcTag, mcmc];
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