const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const userRoutes = require('./routes/api/userRoutes.js');
const jokeRoutes = require('./routes/api/jokeRoutes.js');

app.set('port', (process.env.PORT || 8080));
app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/api/users',userRoutes);
app.use('/api/joke',jokeRoutes);

app.listen(app.get('port'), function(){
    console.log('Your server is now running at port: ' + app.get('port'));
});