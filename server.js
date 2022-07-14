//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/checkersWithAngular'));

app.get('/*', function(req,res) {

res.sendFile(path.join(__dirname+'/dist/checkersWithAngular/index.html'));
});

// Start the app by listening on the default Heroku port
//BACKEND ON SERVER (PORT 8080) OR FROM LOCALHOST (PORT 4200)
app.listen(process.env.PORT || 8080);
