const {Pool, Client} = require('pg');
const connectionString = process.env.DATABASE_URL;

const db = {};

async function runQuery(query){
    let response = null;
    const client = new Client({connectionString: connectionString, ssl:true});

    try{
        await client.connect();
        response = await client.query(query);
        response = response.rows;
    } catch (e) { 
        console.log(e);
    }
    console.log(response);
    return response;
}

db.insert = function(query){
    return runQuery(query);
}
db.select = function(query){
    return runQuery(query);
}
db.delete = function (query) {
    return runQuery(query);
}
db.update = function (query) {
    return runQuery(query);
}

module.exports = db;