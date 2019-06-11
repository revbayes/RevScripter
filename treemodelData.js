/*Creates the script for Tree Model options */
function getTreeOptions(){
    var unRooted = "";
    var branchLength = "";
    var treeModel = "";
    var psi = "phylo ~ dnPhyloCTMC(tree=psi, Q=Q, type=\"DNA\")";
    var clamp = "phylo.clamp(data)";
    
    //Tree topology  Option
    //Fixed
    if($("#funroot").is(':checked')){
        unRooted = getInputTreeString($("#unroott").val(), "topology");
        //Checks to make sure word input is not empty
        if($("#unroott").val().length < 1){
            return null;
        }
    }

    //estimated
    if($("#eunroot").is(':checked')){
        //Outgroup
        unRooted = getUnrootedEstimateString($("#eMenuunroot").val(), $("#outgroup").val())

        //Checks to make sure get unrooted has an option chosen or if the input is empty
        if(!unRooted){
            return null;
        }
    }

    //Checks to make sure that an unrooted Option is checked
    if(!$("#funroot").is(':checked') && !$("#eunroot").is(':checked')){
        return null;
    }

    //BranchLength
    //Fixed
    if($("#funroot2").is(':checked')){
        //no string is added
    }

    //Estimated
    if($("#eunroot2").is(':checked')){
        //Gets the menu value
        var priordistribution =  $("#eMenuunroot2").val();
        //Hyper Matrix
        //Fixed
        if($("#funroot2e").is(':checked')){
            //add this string   
            branchLength = getVectorRealPosEFixedString("branch_lengths", priordistribution, $("#unroot2e").val(), $("#unroot2e2").val());
        }

        //Estimated
        if($("#eunroot2e").is(':checked')){
            //add this string
            branchLength = getVectorRealPosEEstimateString("branch_lengths", priordistribution , $("#unroot2e").val(), $("#unroot2e2").val(), $("#eMenuunroot2e").val())
        }

        //Checks to make sure that a branch lengths Option is checked
        if(!$("#funroot2e").is(':checked') && !$("#eunroot2e").is(':checked')){
            return null;
        }

    }

    //Checks to make sure that a Branch Length Option is selected
    if(!$("#funroot2").is(':checked') && !$("#eunroot2").is(':checked')){
        return null;
    }

    //Create the psi variables
    //If +I is checked
    if(($("#icheckbox").is(':checked'))){
        psi = ["phylo ~ dnPhyloCTMC(tree=psi, Q=Q, type=\"DNA\", pInv=prop_inv)",clamp];
    }
    //If +G is checked
    if(($("#gcheckbox").is(':checked'))){
        psi = ["phylo ~ dnPhyloCTMC(tree=psi, Q=Q, type=\"DNA\", siteRates=site_rates)",clamp];
    }
    //If both +I and +G are checked
    if(($("#icheckbox").is(':checked')) && ($("#gcheckbox").is(':checked'))){
        psi = ["phylo ~ dnPhyloCTMC(tree=psi, Q=Q, type=\"DNA\", pInv=prop_inv, siteRates=site_rates)",clamp];
    }
//    psi.join("\nphylo.clamp(data)");


    //Checks if branch length has any string that needs to be added(if it is fixed there is no string)
    if(branchLength != ""){
        treeModel = [unRooted, branchLength, "psi := fnTreeAssembly(topology, branch_lengths)", psi, "mymodel =  model(topology)"];
    }
    else{
        treeModel = [unRooted, "psi := fnTreeAssembly(topology, branch_lengths)", psi, "mymodel =  model(topology)"];
    }

    return treeModel.join("\n\n");
}


//Creates the string for Tree topology Fixed Option
function getInputTreeString(treefile, type){
    var tree_file = "tree_file = \"" + treefile + "\"";
    var scripts = [tree_file, "input_tree = readTrees(tree_file, treetype=\"non-clock\")[1]", type + " <- input_tree"];
    return scripts.join("\n");
}

//Creates the string for Tree topology when is is estimate
function getUnrootedEstimateString(option, input){
    var script;
    if(option == "UT"){
        script = getOutgroupString(input);

    }
    return script;
}

//Creates the string if the menu option is Uniform topology
function getOutgroupString(names){
    var scripts = "";
    if($("#outgroupB").is(':checked')){
        scripts = ["out_group = clade(\"" + names + "\")", "topology ~ dnUniformTopology(taxa, outgroup=out_group)", "moves.append( mvNNI(topology, weight=num_taxa/2.0) )", "moves.append( mvSPR(topology, weight=num_taxa/10.0) )"];
        
        //Checks to make sure that the Outgroup names input is not empty
        if(names.length < 1){
            return null;
        }
    }
    else{
        scripts = ["topology ~ dnUniformTopology(taxa)", "moves.append( mvNNI(topology, weight=num_taxa/2.0) )", "moves.append( mvSPR(topology, weight=num_taxa/10.0) )"];
    }


    return scripts.join("\n");
}

//Makes the script for a Vector of Real Pos parameter when it estimated- Fixed option
function getVectorRealPosEFixedString(parameter, prior, value1, value2){
    var hyperparameter1;
    var hyperparameter2;
    var pd;
    var scripts;

    if(prior == 1){
        hyperparameter1 = "branch_hypershape <- " + value1;
        hyperparameter2 = null;
        pd= "dnExponential(branch_hypershape)";
    }

    if(prior == 2){
        hyperparameter1 = "branch_hypershape <- " + value1;
        hyperparameter2 = "branch_hyperrate <- " + value2;
        pd= "dnGamma(branch_hypershape, branch_hyperrate)";
    }

    if(prior == 3){
        hyperparameter1 = "branch_hypermean <- " + value1;
        hyperparameter2 = "branch_hypersd <- " + value2;
        pd= "dnLognormal(branch_hypermean, branch_hypersd)";
    }

    if(prior == 4){
        hyperparameter1 = "branch_hypermin <- " + value1;
        hyperparameter2 = "branch_hypermax <- " + value2;
        pd= "dnUniform(branch_hypermin, branch_hypermax)";
    }

    if(!hyperparameter2){
        scripts = [hyperparameter1 + "\n", "for(i in 1:num_branches){", "   " + parameter + "[i] ~ " + pd, "    moves.append(mvScale(" + parameter + "[i]))", "}"];
    }
    else{
        scripts = [hyperparameter1, hyperparameter2 + "\n", "for(i in 1:num_branches){", "  " + parameter + "[i] ~ " + pd, "  moves.append(mvScale(" + parameter + "[i]))", "}"];
    }
    return scripts.join("\n");

}

//Makes the script for a Vector of Real Pos parameter when it estimated- Estimate option
function getVectorRealPosEEstimateString(parameter, prior,value1, value2, hyperprior){
    var hyperparameter1;
    var hyperparameter2;
    var pd;
    var scripts;
    
    if(prior == 1){
        hyperparameter1 = getRealPosEString(hyperprior, "branch_hypershape", value1, value2);
        hyperparameter2 = null;
        pd= "dnExponential(branch_hypershape)";
    }

    if(prior == 2){
        hyperparameter1 = getRealPosEString(hyperprior, "branch_hypershape", value1, value2);
        hyperparameter2 = getRealPosEString(hyperprior, "branch_hyperrate", value1, value2);
        pd= "dnGamma(branch_hypershape, branch_hyperrate)";
    }

    if(prior == 3){
        hyperparameter1 = getRealPosEString(hyperprior, "branch_hypermean", value1, value2);
        hyperparameter2 = getRealPosEString(hyperprior, "branch_hypersd", value1, value2);
        pd= "dnLognormal(branch_hypermean, branch_hypersd)";
    }

    if(prior == 4){
        hyperparameter1 = getRealPosEString(hyperprior, "branch_hypermin", value1, value2);
        hyperparameter2 = getRealPosEString(hyperprior, "branch_hypermax", value1, value2);
        pd= "dnUniform(branch_hypermin, branch_hypermax)";
    }

    if(!hyperparameter2){
        scripts = [hyperparameter1 + "\n", "for(i in 1:num_branches){", "   " + parameter + "[i] ~ " + pd, "    moves.append(mvScale(" + parameter + "[i]))", "}"];
    }
    else{
        scripts = [hyperparameter1 + "\n", hyperparameter2 + "\n", "for(i in 1:num_branches){", "  " + parameter + "[i] ~ " + pd, "  moves.append(mvScale(" + parameter + "[i]))", "}"];
    }
    return scripts.join("\n");

}

