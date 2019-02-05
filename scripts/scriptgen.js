var author = "###Author###\n\n";
var script = "";
var model;


var sequenceData = "### Read in sequence data for both genes\n" +
"data = readDiscreteCharacterData(\"data/primates_and_galeopterus_cytb.nex\")\n\n";
var variables = "# Get some useful variables from the data. We need these later on.\n" +
"num_taxa <- data.ntaxa()\n"+
"num_branches <- 2 * num_taxa - 3\n"+
"taxa <- data.taxa()\n\n" +
"moves    = VectorMoves()\n" +
"monitors = VectorMonitors()\n\n";
var substitutionModel = "######################\n"+
                        "# Substitution Model #\n"+
                        "######################\n\n"+
                        "# create a constant variable for the rate matrix\n"+
                        "Q <- fnJC(4)\n\n";
var treeModel = "##############\n"+
                "# Tree model #\n"+
                "##############\n\n"+

                "out_group = clade(\"Galeopterus_variegatus\")\n"+
                "# Prior distribution on the tree topology\n"+    
                "topology ~ dnUniformTopology(taxa, outgroup=out_group)" +
                "moves.append( mvNNI(topology, weight=num_taxa/2.0) )" +
                "moves.append( mvSPR(topology, weight=num_taxa/10.0) )\n\n"+

                "#Branch length prior\n"+
                 "for (i in 1:num_branches) {\n"+
                "bl[i] ~ dnExponential(10.0)\n"+
                "moves.append( mvScale(bl[i]) )\n"+
                "}\n\n"+
                "TL := sum(bl)\n\n"+
                "psi := treeAssembly(topology, bl)\n\n";


var phyloctmcModel = "###################\n"+
                    "# PhyloCTMC Model #\n"+
                    "###################\n\n"+

                    "# the sequence evolution model\n"+
                    "seq ~ dnPhyloCTMC(tree=psi, Q=Q, type=\"DNA\")\n\n"+

                    "# attach the data\n"+
                    "seq.clamp(data)\n\n";

var analysis = "############\n"+
                "# Analysis #\n"+
                "############\n\n"+

                "mymodel = model(psi)\n\n"+

                "# add monitors\n"+
                "monitors.append( mnScreen(TL, printgen=1000) )\n"+
                "monitors.append( mnFile(psi, filename=\"output/primates_cytb_JC.trees\", printgen=10) )\n"+
                "monitors.append( mnModel(filename=\"output/primates_cytb_JC.log\", printgen=10) )\n\n"+

                "# run the analysis\n"+
                "mymcmc = mcmc(mymodel, moves, monitors, nruns=2, combine=\"mixed\")\n"+
                "mymcmc.run(generations=20000,tuningInterval=200)\n\n";

var postProcessing = "###################\n"+
                        "# Post processing #\n"+
                    "###################\n\n"+

                    "# Now, we will analyze the tree output.\n"+
                    "# Let us start by reading in the tree trace\n"+
                    "treetrace = readTreeTrace(\"output/primates_cytb_JC.trees\", treetype=\"non-clock\", outgroup=out_group)\n"+
                    "# and then get the MAP tree\n"+
                    "map_tree = mapTree(treetrace,\"output/primates_cytb_JC_MAP.tree\")";







function doGET(path, callback) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            // The request is done; did it work?
            if (xhr.status == 200) {
                // ***Yes, use `xhr.responseText` here***
                callback(xhr.responseText);
            } else {
                // ***No, tell the callback the call failed***
                callback(null);
			}
        }
    };
    xhr.open("GET", path);
    xhr.send();
}

function handleFileData(fileData) {
    if (!fileData) {
        // Show error
		console.log("error");
        return;
    }
    // Use the file data
}


function getSubstitutionModel(){
    
}

function readText(){

}

function val() {
    model = document.getElementById("theModel").value; 
}

function createScript(){
    //script = author + sequenceData + variables + substitutionModel + treeModel + phyloctmcModel + analysis + postProcessing;
    script = author + model;
  
    
}

function resetScript(){
    script = "";
    document.getElementById('myTextarea').value = "Example script.....";
}

function generateScript(){
    val();
    doGET("http://localhost/scripts.txt", handleFileData);
    createScript();
    document.getElementById('myTextarea').value = script; 
}