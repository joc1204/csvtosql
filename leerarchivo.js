function addstring(filecsv){
const datacsv=[];
require('fs').readFileSync(filecsv, 'utf-8').split(/\r?\n|\r/).forEach(function(line) {
    datacsv.push(line);
});
datacsv.shift();
            const todasFilas = datacsv;
            let string = '';
            for (let fila = 0; fila < todasFilas.length; fila++) {
                const celdasFila = todasFilas[fila].split(',');
                for (let rowCell = 0; rowCell < celdasFila.length; rowCell++) {
                    if(rowCell===0){
                        string += "('";
                    }else{
                        string += "'";
                    }
                        string += celdasFila[rowCell];
                        if (rowCell===celdasFila.length-1){
                            string+="')"
                            if (fila<todasFilas.length-1){
                                string+=",";
                            }
                        }else{
                            string+="',"
                        }
                    }

                }
return string;
        }

module.exports=addstring;