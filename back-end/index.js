const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const db = mysql.createConnection({
  host     : '34.205.83.88',
  user     : 'analytics_proto',
  password : 'analytics_123',
  database : 'Analytics_Prototype'
});




const query = sqlStatement =>
  new Promise((resolve, reject) => {
    db.query(sqlStatement, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });

  
  const staticFileMiddleware = express.static("dist");

  // 1st call for unredirected requests
  app.use(staticFileMiddleware);
  
app.use(
  cors({
    origin: 'http://localhost:8080'
  })
);
app.get("/", (req, res) => {
  res.send("Hello World");

});
const getename = tableName => async (req, res) => {
  const ename = await query(
    `select * from ${tableName}`
  );
  res.json(ename);
  console.log('ename',ename);
};
const getmname = tableName => async (req, res) => {
  const mname = await query(
    `select * from ${tableName}`
  );
  res.json(mname);
  console.log('mname',mname);
};




const getcityname = tableName => async (req, res) => { 
  console.log('Hey there')
  const city = await query( `select DISTINCT CITY from ${tableName} `  );
  res.json(city);
}; 

const getcid = tableName => async (req, res) => { 
  console.log('Hey there')
  const cid = await query( `select * from ${tableName}  ORDER BY id DESC LIMIT 1 `  );
  res.json(cid);
}; 
const getid = tableName => async (req, res) => { 
  console.log('Hey there')
  const id = await query( `select * from ${tableName}  ORDER BY id DESC LIMIT 1 `  );
  res.json(id);
}; 




/**
 * this mehtod insertes a new table record filling the ID automatically meaning no need to send the ID with the request
 * @param {string} tableName
 */


const insertTableRow = tableName => async (req, res) => {
  let sqlValuesStatment = "(NULL";
  for (let column in req.body) {
    sqlValuesStatment += `, '${req.body[column]}'`;
  }
  sqlValuesStatment += ")";
  console.log("hi");
  console.log(sqlValuesStatment);
  const insertedTableRow = await query(
    `insert into ${tableName} values ${sqlValuesStatment}`
  );
  
  res.json(insertedTableRow);
  console.log(insertedTableRow);
};



/**
 * this method creates the basic API template for a given table name using the name as route of the api
 * @param {string} tableName
 */


const createTableBasicAPI = tableName => {
  app.get(`/${tableName}/getename`, getename(`${tableName}`));
  app.get(`/${tableName}/getmname`, getmname(`${tableName}`));
  app.get(`/${tableName}/getcid`, getcid(`${tableName}`));
  app.get(`/${tableName}/getid`, getid(`${tableName}`));
  app.get(`/${tableName}/getcityname`, getcityname(`${tableName}`));
  app.post(`/${tableName}/insert`, insertTableRow(`${tableName}`));
};


createTableBasicAPI("entitymap");
createTableBasicAPI("entity_name");
createTableBasicAPI("RevenueShare");
createTableBasicAPI("KeyCommericalTerms");
createTableBasicAPI("entityonboard");
createTableBasicAPI("tranchedetailsunit");
createTableBasicAPI("city");
createTableBasicAPI("revenue");

const PORT = process.env.PORT || 3000;
console.log('server running at', PORT);
app.listen(PORT);






