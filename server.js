const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const userRoutes = require('./api/routes/users');
const listRoutes = require('./api/routes/lists');
const elementRoutes = require('./api/routes/elements');

app.set('port', (process.env.PORT || 8080));
app.use(express.static('public'));
app.use(bodyParser.json());
app.listen(app.get('port'), function(){
    console.log('Your server is now running at port: ' + app.get('port'));
});

app.use('/api/user',userRoutes);
app.use('/api/user',listRoutes);
app.use('/api/user',elementRoutes);