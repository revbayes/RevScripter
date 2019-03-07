function displayDatatype(){
    var dataType = document.getElementById("datatype").value;
    var a = document.getElementById("N").style.display = "none";
    var b = document.getElementById("A").style.display = "none";
    
    document.getElementById(dataType).style.display = "block";
}

function displayModel(){
    var model = document.getElementById("nucleotideModel").value;
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

function displaygtrE(){
    document.getElementById("gtrf").style.display = "none";
    document.getElementById("gtre").style.display = "none";

    if(document.getElementById("gtref").checked == true){
        document.getElementById("gtrf").style.display = "block";
    }
    if(document.getElementById("gtree").checked == true){
        document.getElementById("gtre").style.display = "block";
    }
}

function displaygtrBF(){
    document.getElementById("gtrf2").style.display = "none";
    document.getElementById("gtre2").style.display = "none";

    if(document.getElementById("gtrbff").checked == true){
        document.getElementById("gtrf2").style.display = "block";
    }
    if(document.getElementById("gtrbfe").checked == true){
        document.getElementById("gtre2").style.display = "block";
    }
}

function displayaaMatrix(){
    document.getElementById("aamatrixe").style.display = "none";
    document.getElementById("aamatrixes").style.display = "none";

    if(document.getElementById("aamatrix").checked == true){
        document.getElementById("aamatrixe").style.display = "block";
    }
    if(document.getElementById("aamatrix2").checked == true){
        document.getElementById("aamatrixes").style.display = "block";
    }
}

function displayaamatrixempericalBF(){
    document.getElementById("aamatrixempericale").style.display = "none";
    document.getElementById("aamatrixempericales").style.display = "none";

    if(document.getElementById("aamatrixempericalbf").checked == true){
        document.getElementById("aamatrixempericale").style.display = "block";
    }
    if(document.getElementById("aamatrixempericalbf2").checked == true){
        document.getElementById("aamatrixempericales").style.display = "block";
    }
}


function displayaamatrixempericalModel(){
    var model = document.getElementById("emodel").value;
    var WAG = document.getElementById("WAG").style.display = "none";
    var LG = document.getElementById("LG").style.display = "none";
    var ETC = document.getElementById("ETC").style.display = "none";
    
    document.getElementById(model).style.display = "block";
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

function displayioptionFE(){
    document.getElementById("ioptionf").style.display = "none";
    document.getElementById("ioptione").style.display = "none";

    if(document.getElementById("ioptionfef").checked == true){
        document.getElementById("ioptionf").style.display = "block";
    }
    if(document.getElementById("ioptionfee").checked == true){
        document.getElementById("ioptione").style.display = "block";
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


function displaygoptionSP(){
    document.getElementById("goptionf").style.display = "none";
    document.getElementById("goptione").style.display = "none";

    if(document.getElementById("goptionspf").checked == true){
        document.getElementById("goptionf").style.display = "block";
    }
    if(document.getElementById("goptionspe").checked == true){
        document.getElementById("goptione").style.display = "block";
    }
}