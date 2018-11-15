const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const userRoutes = require('./controller/routes/api/userRoutes');
const listRoutes = require('./controller/routes/api/listRoutes');
const authorizeRoute = require('./controller/routes/authorize');

app.set('port', (process.env.PORT || 8080));
app.use(express.static('public'));
app.use(bodyParser.json());

app.use(authorizeRoute);
app.use(userRoutes);
app.use(listRoutes);

app.listen(app.get('port'), function(){
    console.log('Your server is now running at port: ' + app.get('port'));
});