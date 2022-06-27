const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const filepathorig = "./public/temp.db";
const filepathdest = "./public/trades.db";

function connectToDatabase() {
    if (fs.existsSync(filepathorig)) {
        fs.unlinkSync(filepathorig);
    }
        const dborig = new sqlite3.Database(filepathorig, (error) => {
        if (error) {return console.error(error.message);}
        createTableorig(dborig);
        });
///////////////////////////
    if (fs.existsSync(filepathdest)) {
        fs.unlinkSync(filepathdest);
    }
        const dbdest = new sqlite3.Database(filepathdest, (error) => {
        if (error) {return console.error(error.message);}
        createTabledest(dbdest);
        });

        return {dborig,dbdest};
  }


function createTabledest(dbdest) {
  dbdest.exec(`
          CREATE TABLE destregister
          (
          time        TEXT,
          symbol      TEXT,
          lot         TEXT,
          side        TEXT,
          price       float,
          status      TEXT,
          closeprice  float,
          profitporc  FLOAT,
          profit      float,
          comission   TEXT,
          timeclose   TEXT
          )
        `);

}

function createTableorig(dborig) {
  dborig.exec(`
          CREATE TABLE tempregister
          (
          col1        TEXT,
          col2        TEXT,
          col3        TEXT,
          col4        TEXT,
          col5        TEXT,
          col6        TEXT,
          col7        TEXT,
          col8        TEXT,
          col9        TEXT,
          col10       TEXT,
          col11       TEXT,
          col12       TEXT,
          col13       TEXT,
          col14       TEXT
          )
        `);

}
module.exports = connectToDatabase();