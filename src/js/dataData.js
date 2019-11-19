/*Creates the script for data options */
function getdataOptions(){
    //Gets value of input
    var filepath = document.getElementById("datafilepath").value;
    var filename = filepath.substring(filepath.lastIndexOf('\\')+1);
    //Checks to make sure input is not empty, else return the input as a script
    if(filename.length < 1){
        return null;
    }
    else{
        return "data = readDiscreteCharacterData(\"" + filename + "\")";
    }
}
