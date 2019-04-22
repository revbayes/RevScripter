function getTreeOptions(){
    var treeModel = "";
    var outGroup = "";
    var branchLength = ""
    //Unrooted Option
    //Fixed
    if($("#funroot").is(':checked')){
        //Topology only
        if($("#tunrooted").is(':checked')){
            treeModel = getInputTreeString($("#unrootedt").val(), "topology");
        }

        //Topology and Branch Only
        if($("#tbunrooted").is(':checked')){
            treeModel = getInputTreeString($("#unrootedtb").val(), "psi");
        }
    }

    //estimated
    if($("#eunroot").is(':checked')){
        //Outgroup
        treeModel = getOutgroupString($("#eMenuunroot").val(), $("#unrootoutgroup").val())
    }

    var scripts = [treeModel, outGroup, "mymodel =  model(psi)"];

    return scripts.join("\n");
}

function getInputTreeString(treefile, type){
    var scripts = ["input_tree = readTrees(" + treefile + ", treetype=\"non-clock\")[1]", type + " <- input_tree"];
    return scripts.join("\n");
}

function getOutgroupString(option, names){
    var scripts;
    if(option == "O"){
        scripts = ["out_group = clade(" + names + ")", "topology ~ dnUniformTopology(taxa, outgroup=out_group)", "moves.append( mvNNI(topology, weight=num_taxa/2.0) )", "moves.append( mvSPR(topology, weight=num_taxa/10.0) )"];
    }

    if(option == "NO"){
        scripts = ["topology ~ dnUniformTopology(taxa", "moves.append( mvNNI(topology, weight=num_taxa/2.0) )", "moves.append( mvSPR(topology, weight=num_taxa/10.0) )"];
    }

    return scripts.join("\n");

}

