/*Creates the script for data options */
function getdataOptions(){
    //Gets value of input
    var filename = document.getElementById("datafilepath").value;
    //Checks to make sure input is not empty, else return the input as a script
    if(filename.length < 1){
        return null;
    }
    else{
        return "data = readDiscreteCharacterData(\"" + filename + "\")";
    }
}
