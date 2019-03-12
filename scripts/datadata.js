
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


function displayModelOptions(){
    var x = document.createElement("SELECT");
    x.setAttribute("id", "mySelect");
    x.setAttribute('value','value1');
    
    var y = document.getElementById("mcmc");
    y.appendChild(x);

    var z = document.createElement("option");
    z.setAttribute("value", "value1");
    var t = document.createTextNode("Volvo");
    z.appendChild(t);
    document.getElementById("mySelect").appendChild(z);

    var z = document.createElement("option");
    z.setAttribute("value", "value2");
    var t = document.createTextNode("volvo2");
    z.appendChild(t);
    document.getElementById("mySelect").appendChild(z);

    x.onchange = displayFandE(document.getElementById("myselect").value);
    //x.setAttribute("onchange", "displayFandE('value1','value2')")
}

function displayFandE(value){
    var mybr = document.createElement('br');
    var y = document.getElementById("mcmc");
    y.appendChild(mybr);

    if(value = "value1"){       
        var x = document.createElement("INPUT");
        x.setAttribute("type", "radio");
        y.appendChild(x);
    }
     
}

displayModelOptions();

