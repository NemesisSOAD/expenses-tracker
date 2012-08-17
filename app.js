var express = require('express');
var app = express();

app.configure(function () {
    app.use('/js', express.static(__dirname + '/js'));
    app.use('/css', express.static(__dirname + '/css'));
    app.use('/templates', express.static(__dirname + '/templates'));
    app.use('/img', express.static(__dirname + '/img'));

    app.use(express.static(__dirname + '/public'));

});


app.get('/', function(req, res){
  //res.send('Hello World');
  res.render('index.html');
});

app.listen(3000);
console.log('Listening on port 3000');