var NTAX = "";
var NCHAR = "";
var TAXA = [];
var DATATYPE = "";

function init(){
    document.getElementById('file').addEventListener('change', handleFileSelect, false);
}

function handleFileSelect(event){
    const reader = new FileReader()
    reader.onload = handleFileLoad;
    reader.readAsText(event.target.files[0])
}

function handleFileLoad(event){
    console.log(event);
    filecontent = event.target.result;
    document.getElementById('data').textContent = event.target.result;
}

function parseFile(){
    var temparray = filecontent.split('\n');
    // // var nexusdata = getNexusData(temparray);
    //Testing class
    var n = new NexusReader(temparray);
    console.log("Number of Taxa:" + n.getNTAXA);
    console.log("First Taxa:" + n.getTaxa[0]);
    console.log("Taxa Size:" + n.getTaxa.length);
    // document.getElementById('data').textContent = nexusdata;
}


// function getNexusData(filecontent){//has file content as an array for each line
    
//     // var nexusdata = [];
//     // Collects the taxa for the molecular.nex file only
//     // for(var i = 7; i < 30; i++){
//     //     var string = filecontent[i].split(' ');
//     //     nexusdata.push(string[0]);
//     // }
//     // return nexusdata.join('\n');
    
//     //clears the array
//     TAXA.length = 0;

//     for(var i = 0; i < filecontent.length; i++){

//         if(filecontent[i].includes('DIMENSIONS')){
//             //Sets NTAXA Value
//             var n= filecontent[i].indexOf("NTAX");
//             NTAXA = parseInt(filecontent[i].substring(n+5, n+8), 10);
//             //Testing
//             console.log('NTAXA:'+ NTAXA)

//             //Sets NCHAR Value
//             var n=filecontent[i].indexOf("NCHAR");
//             NCHAR = parseInt(filecontent[i].substring(n+6,n+12),10);
//             //Testing
//             console.log('NCHAR:'+ NCHAR)

//         }

//         if(filecontent[i].includes('FORMAT')){
//             DATATYPE = parseDataType(filecontent[i]);
//             //For testing
//             console.log('Datatype:' + DATATYPE);
//         }

//         if(filecontent[i].includes('MATRIX')){
//             i++;
//             //Testing
//             console.log('Taxa:\n');
//             while(!filecontent[i].includes(';')){
//                 //Checks that string is not empty
//                 if(filecontent[i] && filecontent[i] !== ';' && /\S/.test(filecontent[i])){
//                     //Method of splitting words: https://blog.abelotech.com/posts/split-string-into-tokens-javascript/
//                     var taxa = filecontent[i].match(/\S+/g);
//                     TAXA.push(taxa[0]);
//                     //For testing
//                     console.log(taxa[0]);
//                 }
//                 i++;
//             }
//         }

//     }
//     //Testing
//     console.log('Length of taxa:' + TAXA.length);
    
// }

// function parseDataType(line){
//     var words = line.split(' ');
//     for (var i = 0; i < words.length; i++){
//         if(words[i].includes('DATATYPE')){
//             return words[i].substring(9, words[i].length);
//         }
//     }
// }

// function getNTAXA(){
//     return NTAXA;
// }

// function getNCHAR(){
//     return NCHAR;
// }

// function getdataType(){
//     return DATATYPE;
// }

// function getTaxa(){
//     return TAXA;
// }


class NexusReader {

    constructor(filecontent) {
     this.getNexusData(filecontent);
    }

    getNexusData(filecontent){//has file content as an array for each line
    
        this.TAXA = [];
    
        for(var i = 0; i < filecontent.length; i++){
    
            if(filecontent[i].includes('DIMENSIONS')){
                //Sets NTAXA Value
                if(filecontent[i].includes('NTAX')){
                    var n= filecontent[i].indexOf("NTAX");
                    this.NTAXA = parseInt(filecontent[i].substring(n+5, n+8), 10);
                }
    
                //Sets NCHAR Value
                if(filecontent[i].includes('NCHAR')){
                    var n=filecontent[i].indexOf("NCHAR");
                    this.NCHAR = parseInt(filecontent[i].substring(n+6,n+12),10);
                }
    
            }
    
            if(filecontent[i].includes('FORMAT')){
                this.DATATYPE = this.parseDataType(filecontent[i]);
            }
    
            if(filecontent[i].includes('MATRIX')){
                i++;
                while(!filecontent[i].includes(';')){
                    //Checks that string is not empty
                    if(filecontent[i] && filecontent[i] !== ';' && /\S/.test(filecontent[i])){
                        //Method of splitting words: https://blog.abelotech.com/posts/split-string-into-tokens-javascript/
                        var taxa = filecontent[i].match(/\S+/g);
                        this.TAXA.push(taxa[0]);
                    }
                    i++;
                }
            }
    
        }
        
    }
    
    parseDataType(line){
        var words = line.split(' ');
        for (var i = 0; i < words.length; i++){
            if(words[i].includes('DATATYPE')){
                return words[i].substring(9, words[i].length);
            }
        }
    }

    get getNTAXA(){
        return this.NTAXA;
    }

    get getNCHAR(){
        return this.NCHAR;
    }

    get getdataType(){
        return this.DATATYPE;
    }

    get getTaxa(){
        return this.TAXA;
    }

}
