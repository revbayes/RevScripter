
function getdataOptions(){
    var filename = document.getElementById("datafilepath").value;
    if(filename.length < 1){
        return null;
    }
    else{
        return "data = readDiscreteCharacterData(\"" + filename + "\")";
    }
}

//Only if Nucleotide and Amino Acid are both being use
/*
function setNumcharstates(){

    if(document.getElementById("datatype").value == "A"){
        num_char_states = 8;
    }
    else{
        num_char_states = 4;
    }
    
}
*/
