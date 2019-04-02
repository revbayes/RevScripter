function checksubstitutionModel(){
    if(document.getElementById("datatype").value == "A"){
        updateaminoacidModel();
    }
    else{
        updatenucleotideModel();
    }
}

function updatenucleotideModel(){
    substitutionModel = "";

    if(document.getElementById("nucleotideModel").value == "JC"){
        substitutionModel = "Q <- fnJC(" + num_char_states + ")\n";
    }
    else if(document.getElementById("nucleotideModel").value == "F81"){
      
        if(document.getElementById("f81bff").checked){
            substitutionModel = getfixedpierString(document.getElementById("f81pi1").value, document.getElementById("f81pi2").value, document.getElementById("f81pi3").value, document.getElementById("f81pi4").value,"pi");
        }

        if(document.getElementById("f81bfe").checked){
            substitutionModel = getestimatedpierString(document.getElementById("f81cp1").value, document.getElementById("f81cp2").value, document.getElementById("f81cp3").value, document.getElementById("f81cp4").value,"pi");
        }

        substitutionModel += "Q := fnF81(pi)"
    }
    else if(document.getElementById("nucleotideModel").value == "K80"){

        if(document.getElementById("k80trf").checked){
            substitutionModel = getkappaString(document.getElementById("k80kappa").value);
        }

        if(document.getElementById("k80tre").checked){
            substitutionModel = getlamdakappaString(document.getElementById("k80lamda_kappa").value);
        }

        substitutionModel += "Q := fnK80(kappa)"
    }
    else if(document.getElementById("nucleotideModel").value == "HKY"){
        //Transition/Transversion Ratio
        if(document.getElementById("hkytrf").checked){
            substitutionModel = getkappaString(document.getElementById("hkykappa").value);
        }

        if(document.getElementById("hkytre").checked){
            substitutionModel = getlamdakappaString(document.getElementById("hkylamda_kappa").value);
        }

        //Base Frequencies
        if(document.getElementById("hkybff").checked){
            substitutionModel += getfixedpierString(document.getElementById("hkypi1").value, document.getElementById("hkypi2").value, document.getElementById("hkypi3").value, document.getElementById("hkypi4").value,"er");
        }

        if(document.getElementById("hkybfe").checked){
            substitutionModel += getestimatedpierString(document.getElementById("hkycp1").value, document.getElementById("hkycp2").value, document.getElementById("hkycp3").value, document.getElementById("hkycp4").value,"er");
        }

        substitutionModel += "Q := fnHKY(kappa,pi)";
    }
    else if(document.getElementById("nucleotideModel").value == "GTR"){

        //Exchangeablilities
        if(document.getElementById("gtref").checked){
            substitutionModel += getfixedpierString(document.getElementById("gtrer1").value, document.getElementById("gtrer2").value, document.getElementById("gtrer3").value, document.getElementById("gtrer4").value,"er");
        }

        if(document.getElementById("gtree").checked){
            substitutionModel += getestimatedpierString(document.getElementById("gtrcp1").value, document.getElementById("gtrcp2").value, document.getElementById("gtrcp3").value, document.getElementById("gtrcp4").value,"er");
        }

        //Base Frequencies
        if(document.getElementById("gtrbff").checked){
            substitutionModel += getfixedpierString(document.getElementById("gtrpi1").value, document.getElementById("gtrpi2").value, document.getElementById("gtrpi3").value, document.getElementById("gtrpi4").value,"pi");
        }

        if(document.getElementById("gtrbfe").checked){
            substitutionModel += getestimatedpierString(document.getElementById("gtrcp5").value, document.getElementById("gtrcp6").value, document.getElementById("gtrcp7").value, document.getElementById("gtrcp8").value,"pi");
        }

        substitutionModel += "Q := fnGTR(er,pi)";
    }

}

function getfixedpierString(pi1,pi2,pi3,pi4,type){
    if(type == "pi"){
        return "pi <- v(" + pi1 + "," + pi2 + "," + pi3 +"," + pi4 +")\n\n";
    }
    else{
        return "er <- v(" + pi1 + "," + pi2 + "," + pi3 +"," + pi4 +")\n\n";
    }
}

function getestimatedpierString(pi1,pi2,pi3,pi4,type){
    if(type == "pi"){
        return  "pi ~ v(" + pi1 + "," + pi2 + "," + pi3 +"," + pi4 +")\n" +
                "moves.append(mvBetaSimplex(pi))\n"+
                "moves.append(mvDirichletSimplex(pi))\n\n" ;
    }
    else{
        return  "er ~ v(" + pi1 + "," + pi2 + "," + pi3 +"," + pi4 +")\n" +
                "moves.append(mvBetaSimplex(er))\n"+
                "moves.append(mvDirichletSimplex(er))\n\n" ;
    }
}

function getkappaString(kappa){
    return "kappa <- "+ kappa + "\n\n";
}

function getlamdakappaString(lamdakappa){
    return "lambda_kappa <- " + lamdakappa + "\n" +
            "kappa ~ dnExp(lambda_kappa)\n" +
            "moves.append(mvScale(kappa))\n\n" ;
}




function updateaminoacidModel(){
    substitutionModel = "";


}