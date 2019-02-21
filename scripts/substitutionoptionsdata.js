var num_char_states = 4;

function set_num_char_states(){
    var dataType = document.getElementById("datatype").value;
    if(dataType == "N"){
        num_char_states = 4;
    }
    if(dataType == "A"){
        num_char_states = 20;
    }
}

function setqmatrixModel(){
    var model = document.getElementById("model").value;
}