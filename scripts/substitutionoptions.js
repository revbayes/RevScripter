function displayDatatype(){
    var dataType = document.getElementById("datatype").value;
    var a = document.getElementById("N").style.display = "none";
    //var b = document.getElementById("A").style.display = "none";
    
    document.getElementById(dataType).style.display = "block";
}

function displayModel(){
    var model = document.getElementById("model").value;
    var JC = document.getElementById("JC").display = "none";
    var F81 = document.getElementById("F81").style.display = "none";
    var K80 = document.getElementById("K80").style.display = "none";
    var HKY = document.getElementById("HKY").style.display = "none";
    var GTR = document.getElementById("GTR").style.display = "none";

    document.getElementById(model).style.display = "block";
}



function checksiteModel(){
    var sModel = document.getElementById("siteModel");
    var y = document.getElementById("smOptions");
    if(sModel.checked){
        y.style.display = "block";
        fixed = document.getElementById("fixed").value;
        alpha = document.getElementById("alpha").value;
        beta = document.getElementById("beta").value;
    }
    else{
        y.style.display= "none";
    }
}

function setsmOptions(){
    fixed = document.getElementById("fixed").value;
    alpha = document.getElementById("alpha").value;
    beta = document.getElementById("beta").value;
}
