function checksubstitutionModel(){
    if(document.getElementById("datatype").value == "A"){
        aminoacidModel();
    }
    else{
        nucleotideModel();
    }
}

function updatenucleotideModel(){
    substitutionModel = "";

    if(document.getElementById("nucleotideModel").value == "JC"){
        substitutionModel = "Q <- fnJC(" + num_char_states + ")\n";
    }
    else if(document.getElementById("nucleotideModel").value == "F81"){
      
        if(document.getElementById("f81bff").checked){
            substitutionModel =  "pi <- v(" + document.getElementById("f81pi1").value + "," + document.getElementById("f81pi2").value + "," + document.getElementById("f81pi3").value +"," + document.getElementById("f81pi4").value +")\n\n";
        }

        if(document.getElementById("f81bfe").checked){
            substitutionModel =  "pi <- v(" + document.getElementById("f81cp1").value + "," + document.getElementById("f81cp2").value + "," + document.getElementById("f81cp3").value +"," + document.getElementById("f81cp4").value +")\n" +
                                 "moves.append(mvBetaSimplex(pi))\n"+
                                 "moves.append(mvDirichletSimplex(pi))\n\n" ;
        }

        substitutionModel += "Q := fnF81(pi)"
    }
    else if(document.getElementById("nucleotideModel").value == "K80"){

        if(document.getElementById("k80trf").checked){
            substitutionModel = "kappa <- "+ document.getElementById("k80kappa").value + "\n\n";
        }

        if(document.getElementById("k80tre").checked){
            substitutionModel =  "lambda_kappa <- " + document.getElementById("k80lamda_kappa").value + "\n" +
                                 "kappa ~ dnExp(lambda_kappa)\n" +
                                 "moves.append(mvScale(kappa))\n\n" 
        }

        substitutionModel += "Q := fnK80(kappa)"
    }

}



function aminoacidModel(){
    substitutionModel = "";
}