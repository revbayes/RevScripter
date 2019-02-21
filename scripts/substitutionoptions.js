function displayDatatype(){
    var dataType = document.getElementById("datatype").value;
    var a = document.getElementById("N").style.display = "none";
    var b = document.getElementById("A").style.display = "none";
    
    document.getElementById(dataType).style.display = "block";
}

function displayModel(){
    var model = document.getElementById("model").value;
    var JC = document.getElementById("JC").style.display = "none";
    var F81 = document.getElementById("F81").style.display = "none";
    var K80 = document.getElementById("K80").style.display = "none";
    var HKY = document.getElementById("HKY").style.display = "none";
    var GTR = document.getElementById("GTR").style.display = "none";

    document.getElementById(model).style.display = "block";
}

function displayf81BF(){
    document.getElementById("f81f").style.display = "none";
    document.getElementById("f81e").style.display = "none";

    if(document.getElementById("f81bff").checked == true){
        document.getElementById("f81f").style.display = "block";
    }
    if(document.getElementById("f81bfe").checked == true){
        document.getElementById("f81e").style.display = "block";
    }
}

function displayk80TR(){
    document.getElementById("k80f").style.display = "none";
    document.getElementById("k80e").style.display = "none";

    if(document.getElementById("k80trf").checked == true){
        document.getElementById("k80f").style.display = "block";
    }
    if(document.getElementById("k80tre").checked == true){
        document.getElementById("k80e").style.display = "block";
    }
}

function displayhkyTR(){
    document.getElementById("hkyf").style.display = "none";
    document.getElementById("hkye").style.display = "none";

    if(document.getElementById("hkytrf").checked == true){
        document.getElementById("hkyf").style.display = "block";
    }
    if(document.getElementById("hkytre").checked == true){
        document.getElementById("hkye").style.display = "block";
    }
}

function displayhkyBF(){
    document.getElementById("hkyf2").style.display = "none";
    document.getElementById("hkye2").style.display = "none";

    if(document.getElementById("hkybff").checked == true){
        document.getElementById("hkyf2").style.display = "block";
    }
    if(document.getElementById("hkybfe").checked == true){
        document.getElementById("hkye2").style.display = "block";
    }
}


function displayMatrix(){
    var empirical = document.getElementById("E").style.display = "none";
    var estimated = document.getElementById("ES").style.display = "none";

    if(document.getElementById("matrix").checked == true){
        document.getElementById("E").style.display = "block";
    }
    if(document.getElementById("matrix2").checked == true){
        document.getElementById("ES").style.display = "block";
    }

}

function displaybFrequency(){
    var empirical = document.getElementById("BE").style.display = "none";
    var estimated = document.getElementById("BES").style.display = "none";

    if(document.getElementById("bfreq").checked == true){
        document.getElementById("BE").style.display = "block";
    }
    if(document.getElementById("bfreq2").checked == true){
        document.getElementById("BES").style.display = "block";
    }

}


function displayI(){
    var icheckbox = document.getElementById("icheckbox");
    if(icheckbox.checked){
        document.getElementById("ioptions").style.display = "block";
    }
    else{
        document.getElementById("ioptions").style.display= "none";
    }
}

function displayG(){
    var gcheckbox = document.getElementById("gcheckbox");
    if(gcheckbox.checked){
        document.getElementById("goptions").style.display = "block";
    }
    else{
        document.getElementById("goptions").style.display= "none";
    }
}
