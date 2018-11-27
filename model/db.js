const DEBUG = false;

const {Pool, Client} = require('pg');
const connectionString = process.env.DATABASE_URL;

const db = {};

async function runQuery(query,values){
    let response = {};
    const client = new Client({connectionString: connectionString, ssl:true});

    try{
        await client.connect();
        let queryResult = await client.query(query,values);
        await client.end();
        log(queryResult);
        response.status = 200;
        response.return = {
            rowCount: queryResult.rowCount,
            rows: queryResult.rows
        };
    } catch (e) { 
        await client.end();
        response.status = 500;
        response.return = {error:'Error in action on database'};
    }
    return response;
}

db.insert = function(query,values){
    return runQuery(query,values);
}
db.select = function(query,values){
    return runQuery(query,values);
}
db.delete = function (query,values) {
    return runQuery(query,values);
}
db.update = function (query,values) {
    return runQuery(query,values);
}

module.exports = db;

function log(...messages) {
    if (DEBUG) {
        messages.forEach(msg => {
            console.log(msg);
        })
    }
}