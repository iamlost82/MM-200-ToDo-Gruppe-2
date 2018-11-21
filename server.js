const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const userRoutes = require('./controller/routes/api/userRoutes');
const listRoutes = require('./controller/routes/api/listRoutes');
const elementRoutes = require('./controller/routes/api/elementRoutes')
const authorizeRoute = require('./controller/routes/authorize');

app.set('port', (process.env.PORT || 8080));


app.use(express.static('public'));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-auth");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Content-Type','application/json');
    next();
});

app.use(authorizeRoute);
app.use(userRoutes);
app.use(listRoutes);
app.use(elementRoutes);

app.listen(app.get('port'), function(){
    console.log('Your server is now running at port: ' + app.get('port'));
});