const express = require('express');
const bodyParser = require('body-parser');
const app = new express();

const userRoutes = require('./routes/api/userRoutes.js');

app.set('port', (process.env.PORT || 8080));
app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/api/users',userRoutes);

app.listen(app.get('port'), function(){
    console.log('Your server is now running at port: ' + app.get('port'));
});