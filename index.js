
const app = require('express')(),
    obtenerstring=require('./leerarchivo'),
    multer = require('multer'),
    bases=require("./db"),
    storage=multer.diskStorage({
        destination: (req, file, cb)=>{
            cb(null,'./csv')
        },
        filename: (req, file, cb)=>{
            cb(null,'csv_to_read.csv')
        }
    }),
    upload=multer({storage});

app.listen(3000,console.log("On line"));

app.get('/',(req,res)=>{
    res.sendFile('/index.html',{root:__dirname})
})

app.get("/descargar/:file?",(req,res)=>{
if(req.params.file===undefined){
res.sendFile("/descargar.html",{root:__dirname})
}else{
    res.download(__dirname+"/public/"+req.params.file,req.params.file,function(err){
        if(err){
            console.log(err);
        }
    })
}
})


app.post('/subir',upload.single('file'),(req,res)=>{
    var destino=req.file.destination;
    var archivo=req.file.filename;
    var filecsv=destino+"/"+archivo;
    var results=obtenerstring(filecsv);
    var sql = "INSERT INTO tempregister VALUES ";

    bases.dborig.run(sql+results,error=>{
    if(error){
        return res.send(error);
    }else{
        res.redirect("/copytodb");
    }
    });
});

app.get("/copytodb",(req,res)=>{
    bases.dborig.all("SELECT col4 as time,col6 as contracts,col2 as type,CAST(col5 AS REAL) as price,CAST(col8 AS REAL) as profitporc,CAST(col7 AS REAL) as profitusdt FROM tempregister",(errr,consulta)=>{
    let closePrice=0;
    let comission="a definir";
    let timeclose="a definir";
    let fincadena="";
    let status="closed";
    let simbolo="'ETHUSDT'";
    let params="";
        for (let i=0;i<consulta.length;i++){
            if(i<consulta.length-1){
                fincadena="'),"
            } else {
                fincadena="')"
            }
            type="";
            if(consulta[i].type.includes("Long")){
                type="BUY";
            }else{
                type="SELL";
            }
        params+=("('"+consulta[i].time+"',"+
                    simbolo+","+
                    "'"+consulta[i].contracts+"',"+
                    "'"+type+"',"+
                    +consulta[i].price+","+
                    "'"+status+"',"+
                    closePrice+","+
                    consulta[i].profitporc+","+
                    consulta[i].profitusdt+","+
                    "'"+comission+"',"+
                    "'"+timeclose+fincadena);
    }
    if(errr){
            res.send(err);
        }else{

            var sqlins = "INSERT INTO trades VALUES ";
            
           bases.dbdest.run(sqlins+params,error=>{
            if(error){
                return res.send(error);
            }else{
                res.redirect("/descargar");
            }
    });     
        }});

});

