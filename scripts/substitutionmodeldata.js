//Only if Nucleotide and Amino Acid are both being use
/*
function checksubstitutionModel(){
    if(document.getElementById("datatype").value == "A"){
        updateaminoacidModel();
    }
    else{
        updatenucleotideModel();
    }
}
*/

//Makes the script for the Substitution Model
function getSubstitutionOptions(num_char_states){
    
    var substitutionModel = "";
    var ioption = "";
    var goption = ""

    //Adds the script for the selected model
    if(document.getElementById("nucleotideModel").value == "JC"){
        substitutionModel = getQString("JC", num_char_states, null);
    }
    else if(document.getElementById("nucleotideModel").value == "F81"){
        //Checks the basefrequency
        //If it is fixed
        if($("#ff81bf").is(':checked')){
            var n = [$("#f81bf0").val(), $("#f81bf1").val(), $("#f81bf2").val(), $("#f81bf3").val()];
            substitutionModel = getSimplexFString("pi_F81", n);
        }
        //if it is estimated
        if($("#ef81bf").is(':checked')){
            substitutionModel = getSimplexEString("pi_F81", $("#f81bfcparameter1").val(), $("#f81bfcparameter2").val(), $("#f81bfcparameter3").val(), $("#f81bfcparameter4").val());
        }
        var temp = [substitutionModel, "\n"  + getQString("F81", "pi_F81", null)];
        substitutionModel = temp.join("\n");

    }
    else if(document.getElementById("nucleotideModel").value == "K80"){
        //Checks transition/transversion ratio
        //If it is fixed
        if($("#fk80tt").is(':checked')){
            
            substitutionModel = getProbabilityFString("kappa_K80", $("#k80tt").val());
        }
        //if it is estimated
        if($("#ek80tt").is(':checked')){
            substitutionModel = getRealPosEString($("#eMenuk80tt").val(), "kappa_K80", $("#k80tt").val(), $("#k80tt2").val())
        }
        var temp = [substitutionModel, "\n"  + getQString("K80", "kappa_K80", null)];
        substitutionModel = temp.join("\n");
    }
    else if(document.getElementById("nucleotideModel").value == "HKY"){

        var tt = "";
        var bf = "";

        //Checks transition/transversion ratio
        //If it is fixed
        if($("#fhkytt").is(':checked')){
            
            tt = getProbabilityFString("kappa_HKY", $("#hkytt").val());
        }
        //if it is estimated
        if($("#ehkytt").is(':checked')){
            tt = getRealPosEString($("#eMenuhkytt").val(), "kappa_HKY", $("#hkytt").val(), $("#hkytt2").val())
        }

        //Checks the basefrequency
        //If it is fixed
        if($("#fhkybf").is(':checked')){
            var n = [$("#hkybf0").val(), $("#hkybf1").val(), $("#hkybf2").val(), $("#hkybf3").val()];
            bf = getSimplexFString("pi_HKY", n);
        }
        //if it is estimated
        if($("#ehkybf").is(':checked')){
            bf = getSimplexEString("pi_HKY", $("#hkybfcparameter1").val(), $("#hkybfcparameter2").val(), $("#hkybfcparameter3").val(), $("#hkybfcparameter4").val());
        }


        var temp = [tt, "\n" + bf,"\n"  + getQString("HKY", "kappa_HKY", "pi_HKY")];
        substitutionModel = temp.join("\n");

    }
    else if(document.getElementById("nucleotideModel").value == "GTR"){
        var er = "";
        var bf = "";
        
        //Checks exchangability
        //If it is fixed
        if($("#fgtre").is(':checked')){
            var n = [$("#gtre0").val(), $("#gtre1").val(), $("#gtre2").val(), $("#gtre3").val(), $("#gtre4").val(), $("#gtre5").val()];
            er = getSimplexFString("er_GTR", n);
        }
        //if it is estimated
        if($("#egtre").is(':checked')){
            er = getSimplexEString("er_GTR", $("#gtrecparameter1").val(), $("#gtrecparameter2").val(), $("#gtrecparameter3").val(), $("#gtrecparameter4").val());
        }

        //Checks the basefrequency
        //If it is fixed
        if($("#fgtrbf").is(':checked')){
            var n = [$("#gtrbf0").val(), $("#gtrbf1").val(), $("#gtrbf2").val(), $("#gtrbf3").val()];
            bf = getSimplexFString("pi_GTR", n);
        }
        //if it is estimated
        if($("#egtrbf").is(':checked')){
            bf = getSimplexEString("pi_GTR", $("#gtrbfcparameter1").val(), $("#gtrbfcparameter2").val(), $("#gtrbfcparameter3").val(), $("#gtrbfcparameter4").val());
        }

        var temp = [er, "\n" + bf,"\n"  + getQString("GTR", "er_GTR", "pi_GTR")];
        substitutionModel = temp.join("\n");
    }

    //Adds the script for the i option
    if($("#icheckbox").is(':checked')){
        //Checks the matrix type
        //If it is fixed
        if($("#fioption").is(':checked')){
            ioption = getProbabilityFString("prop_inv", $("#ioptionpparameter").val());
        }
        //if it is estimated
        if($("#eioption").is(':checked')){
           ioption = getProbabilityEString("prop_inv", $("#ioptionpalpha").val(), $("#ioptionpbeta").val());
        }

        var temp = [substitutionModel, "\n"  + ioption];
        substitutionModel = temp.join("\n");
    }
    
    //Adds the script for the g option
    if($("#gcheckbox").is(':checked')){

        var site_rates = "";
        //Checks the shape parameter
        //If it is fixed
        if($("#fgoption").is(':checked')){
            goption = getProbabilityFString("site_rates_shape", $("#goption").val());
            site_rates = "site_rates := fnDiscretizeGamma(site_rates_shape, num_rate_categories)";
        }
        //if it is estimated
        if($("#egoption").is(':checked')){
           goption = getRealPosEString($("#eMenugoption").val(), "site_rates_shape", $("#goption").val(), $("#goption2").val());
           site_rates = "site_rates := fnDiscretizeGamma(site_rates_shape, site_rates_shape, num_rate_categories)";
        }

        //site_rates = site_rates + $("#numratecategories").val() + ")";
       
        var temp = [substitutionModel, "\n"  + goption, "num_rate_categories <- " + $("#numratecategories").val() ,site_rates];
        substitutionModel = temp.join("\n");
    }


    return substitutionModel;

}

//Makes the script for "Q <- fnJC(num_char_states)"
function getQString(name, input, input2){
    if(input2){
        var scripts = ["Q := ", "fn", name, "(", input, ",", input2, ")"];
        return scripts.join('');
    }
    else{
        if(name == "JC"){
            var scripts = ["Q <- ", "fn", name, "(", input, ")"];
        }
        else{
            var scripts = ["Q :- ", "fn", name, "(", input, ")"];
        }
        return scripts.join('');
    }
}

//Makes the script for a simplex parameter when it is Fixed
function getSimplexFString(parameter, n){

    var values = n.shift() + ",";
    var nLength = n.length;
    for(i=1; i <= nLength; i++){
        if(i < nLength){
            values = values + " " + n.shift() + ", ";
        }
        else{
            values = values + " " + n.shift(); 
        }
        
    }

    return parameter + " <- " + "v(" + values + ")";
}

//Makes the script for a simplex parameter when it is estimataed
function getSimplexEString(parameter, value1, value2, value3, value4){
    var scripts = [parameter + " ~ dnDirichlet(v(" + value1 + ", " + value2 + ", " + value3 + ", " + value4 + "))", "moves.append(mvBetaSimplex(" + parameter + "))"];
    return scripts.join("\n");
}

//Makes the script for a probabilty parameter when it is fixed 
//This also works for Real Pos when it estimated
function getProbabilityFString(parameter, value){
    return parameter + " <- " + value;
}

//Makes the script for a probability parameter when it is estimated
function getProbabilityEString(parameter, alpha, beta){
    var scripts = [parameter + " ~ " + "dnBeta(" + alpha + ", " + beta + ")", "moves.append(mvBetaSimplex(" + parameter + "))"];
    return scripts.join("\n");
}

//Makes the script for a Real Pos parameter when it is estimated
function getRealPosEString(option, parameter, value1, value2){
    dn = ""
    if(option == "E"){
        dn = "dnExponential(" + value1 + ")";
    }
    
    if(option == "G"){
        dn = "dnGamma(" + value1 + "," + value2 + ")";
    }

    if(option == "L"){
        dn = "dnLognormal(mean=" + value1 + ",sd=" + value2 + ")";
    }

    if(option == "U"){
        dn = "dnUniform(" + value1 + "," + value2 + ")";
    }

    var scripts = [parameter + " ~ " + dn, "moves.append(mvScale(" + parameter + "))"];
    return scripts.join("\n");

}

//Makes the script for a Vector of Real Pos parameter when it is fixed
function getVectorRealPosFString(parameter, n, value){
    var scripts = ["for(i in " + n + "){", "    " + parameter + "[i] <- " + value, "}"];
    return scripts.join("\n");
}

//Makes the script for a Vector of Real Pos parameter when it estimated
function getVectorRealPosEString(option, parameter, n, prior, hyperprior){
    var scripts = [];

    if(option == "I"){
        scripts = ["for(i in " + n + "){", "    " + parameter + "[i] ~ " + prior, "     moves.append(mvscale(" + parameter + "[i])", "}"];
    }

    if(option == "H"){
        scripts = [parameter + " ~ " + hyperprior, "moves.append(mvScale(" + parameter + ")", "...","for(i in " + n + "){", "    " + parameter + "[i] ~ " + prior, "     moves.append(mvscale(" + parameter + "[i])", "}"];
    }

    return scripts.join("\n");
}
