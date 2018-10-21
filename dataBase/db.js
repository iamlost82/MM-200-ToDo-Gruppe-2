const {Pool, Client} = require('pg');
const connectionString = process.env.DATABASE_URL;

const db = {};

function runQuery(query){
    let response = null;
    const client = new Client({connectionString: connectionString, ssl:true});

    try{
        client.connect();
        if(client){
            client.query(query, (err,res) => {
                if(err) throw err;
                console.log(res);
                response = res.rows;
                client.end();
            });
        };
    } catch (e) { 
        console.log(e);
    }

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