function addstring(filecsv,typetrade){
const datacsv=[];
require('fs').readFileSync(filecsv, 'utf-8').split(/\r?\n|\r/).forEach(function(line) {
    datacsv.push(line);
});
datacsv.shift();
            const todasFilas = datacsv;
            let string = '';
            var column=0;
            for (let fila = 0; fila < todasFilas.length; fila++) {
                const celdasFila = todasFilas[fila].split(','); 
                    if (celdasFila[1].includes(typetrade)){
                        if (celdasFila[1].includes("Exit")){
                            for (let rowCell = 0; rowCell < celdasFila.length; rowCell++) {
                                column=rowCell;
                                if(rowCell===0){
                                    if (string.length > 1){string += ",";}
                                    string += "(";
                                }else{string+=","}
                                    string += "'"+celdasFila[rowCell]+"'";
                                } // fin del for que recorre las columnas
                        }else{
                            string+=",'"+celdasFila[4]+"','"+celdasFila[3]+"')";
                        }
                    }

            } //fin del for que recorre las filas (let fila = 0; fila < todasFilas.length; fila++)
            return string;
        }

module.exports=addstring;