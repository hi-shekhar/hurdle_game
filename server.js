var express = require('express');
var app = express();

app.use(express.static(__dirname + '/game'));
app.listen(8080,function(){
    console.log('Running on port 8080');
})