class NexusReader {

    //Takes in file as an array of lines
    constructor(filecontent) {
        this.getNexusData(filecontent);
    }

    getNexusData(filecontent){
    
        this.NTAX = 0;
        this.NCHAR = 0;
        this.DATATYPE = "none";
        this.TAXA = [];
        this.DNASequence = []
        this.TAXLABEL = [];
        this.TREES = [];
        this.MATRIX = [];
        
        //Loop to iterate through file and get contents 
        for(var i = 0; i < filecontent.length; i++){
            filecontent[i] = filecontent[i].toLowerCase();

            //Sets NTAXA Value
            if(filecontent[i].includes('ntax')){
                this.NTAX = this.parseDimension(filecontent[i], 'ntax');
            }
                
            //Sets NCHAR Value
            if(filecontent[i].includes('nchar')){
                this.NCHAR = this.parseDimension(filecontent[i], 'nchar');
            }
            
            //Sets DATATYPE Value
            if(filecontent[i].includes('datatype')){
                this.DATATYPE = this.parseDataType(filecontent[i]);
            }
    
            //Sets the Matrix data
            if(filecontent[i].trim() === 'matrix'){
                i++;

                while(!filecontent[i].includes(';')){
                    
                    //checks if the line is not empty, is not ';', and is not any sort of empty space
                    if(filecontent[i] && filecontent[i] !== ';' && /\S/.test(filecontent[i])){
                        //Method of splitting words: https://blog.abelotech.com/posts/split-string-into-tokens-javascript/
                        var taxa = filecontent[i].match(/\S+/g);
                        
                        //Checks if it is in format with numbered [1]
                        if(taxa[0].charAt(0) === '['){
                            
                            //Skips the [1] label
                            taxa.shift();

                            //This is if the taxa has quotes in its name('')
                            if(taxa[0].charAt(0) === '\''){
                                var qtaxa = [];
                                qtaxa.push(taxa[0].substring(1, taxa[0].length));
                                var n = 1;
                                while(taxa[n].indexOf('\'') == -1){
                                    qtaxa.push(taxa[n]);
                                    n++;
                                }
                                qtaxa.push(taxa[n].substring(0, taxa[n].indexOf('\'')));
                                this.TAXA.push(qtaxa.join(' '));
                            }else{
                                this.TAXA.push(taxa[0]);
                            }

                            i++;
                            var sequence = [];
                            var sequenceline = []
                            var n;
                            var temp = filecontent[i].match(/\S+/g);
                            //Finds the next taxa name numbered with [1]
                            while(temp[0] && temp[0].charAt(0) !== '[' && temp[0].charAt(0) !== ';'){
                                for(n = 0; n < temp.length; n++){
                                    sequenceline.push(temp[n]);
                                }
                                sequence.push(sequenceline.join(' '));
                                i++;
                                temp = filecontent[i].match(/\S+/g);
                                sequenceline.length = 0;
                            }
                            i--;
                            this.DNASequence.push(sequence.join(''));
                        }else{
                        
                            //This is if the taxa has quotes in its name('')
                            if(taxa[0].charAt(0) === '\''){
                                var qtaxa = [];
                                qtaxa.push(taxa[0].substring(1, taxa[0].length));
                                var n = 1;
                                while(taxa[n].indexOf('\'') == -1){
                                    qtaxa.push(taxa[n]);
                                    n++;
                                }
                                qtaxa.push(taxa[n].substring(0, taxa[n].indexOf('\'')));
                                this.TAXA.push(qtaxa.join(' '));
                                var sequence = [];
                                if(taxa[n].substring(taxa[n].indexOf('\'') + 1, taxa[n].length)){
                                    sequence.push(taxa[n].substring(taxa[n].indexOf('\'') + 1, taxa[n].length));
                                }
                                n++;
                                for(n; n < taxa.length; n++){
                                    sequence.push(taxa[n]);
                                }
                                this.DNASequence.push(sequence.join(' '));
                            }else{
                                this.TAXA.push(taxa[0]);
                                var sequence = [];
                                var n;
                                for(n = 1; n < taxa.length; n++){
                                    sequence.push(taxa[n]);
                                }
                                this.DNASequence.push(sequence.join(' '));
                            }

                        }
                    }

                    i++;
                }
            }
            
            //Sets the Taxlabel
            if(filecontent[i].includes('taxlabels')){
                i++;
                while(!filecontent[i].includes(';')){
                    if(filecontent[i] && filecontent[i] !== ';' && /\S/.test(filecontent[i])){
                        var tax = filecontent[i].match(/\S+/g);
                        if(tax.length > 0){

                            for(var n = 0; n < tax.length; n++){
                                if(tax[n].charAt(0) !== '\''){
                                    this.TAXLABEL.push(tax[n]);
                                }else{
                                    
                                    var qtax = [];
                                    qtax.push(tax[n].substring(1, tax[n].length));
                                    n++;
                                    while(tax[n].indexOf('\'') == -1){
                                        qtax.push(tax[n]);
                                        n++;
                                    }
                                    qtax.push(tax[n].substring(0, tax[n].indexOf('\'')));
                                    this.TAXLABEL.push(qtax.join(' '));
 
                                }
                            }

                        }else{

                            this.TAXLABEL.push(tax[0]);

                        }
                    }
                    i++;
                }
            }

            //Sets the trees
            if(filecontent[i].includes('trees')){
                i++;
                while(!filecontent[i].toLowerCase().includes('end;')){
                    this.TREES.push(filecontent[i].substring(filecontent[i].indexOf('=') + 1, filecontent[i].length - 2));
                    i++;
                }
            }
            
        }
        
        //Sets the Matrix array
        for(var j = 0; j < this.TAXA.length; j++){
            var taxa = {taxa: this.TAXA[j], sequence: this.DNASequence[j]}
            this.MATRIX.push(taxa);
        }

    }
    
    parseDimension(line, type){
        var regex = /\d+/g;
        var index = line.indexOf(type);
        return parseInt(line.substring(index, line.length-1).match(regex).join());
    }

    parseDataType(line){
        var regex = /[a-z]+/g;
        var index = line.indexOf('datatype');
        var sstring = line.substring(index + 9, line.length-1);
        return sstring.match(regex)[0];
    }

    get getNTAX(){
        return this.NTAX;
    }

    get getNCHAR(){
        return this.NCHAR;
    }

    get getdataType(){
        return this.DATATYPE.toUpperCase();
    }

    get getTaxa(){
        return this.TAXA;
    }

    get getDNASequence(){
        return this.DNASequence;
    }

    get getTaxLabel(){
        return this.TAXLABEL;
    }

    get getTrees(){
        return this.TREES;
    }

    //This would just be Taxa with DNA Sequence Array combined.
    get getMatrix(){
        return this.MATRIX;
    }

}
