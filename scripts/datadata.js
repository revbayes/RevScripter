
function getdataFilepath(){
    var filename = document.getElementById("datafilepath").value;
    datafilename = "data = readDiscreteCharacterData(\"" + filename + "\")";
}

function setNumcharstates(){

    if(document.getElementById("datatype").value == "A"){
        num_char_states = 8;
    }
    else{
        num_char_states = 4;
    }
    
}

