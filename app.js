var config = require('./config').config;

var express = require('express'),
	expenses = require('./server/expenses').expenses;

var app = express();

app.configure(function () {
	app.use(express.bodyParser());

	app.use('/js', express.static(__dirname + '/js'));
	app.use('/css', express.static(__dirname + '/css'));
	app.use('/templates', express.static(__dirname + '/templates'));
	app.use('/img', express.static(__dirname + '/img'));

	app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
	res.render('index.html');
});

//----------GET ALL
app.get('/api/expenses', expenses.getAll);

//----------GET ONE BY ID
app.get('/api/expenses/:id', expenses.getById);

//----------CREATE 
app.post('/api/expenses', expenses.create);

//----------UPDATE
app.put('/api/expenses/:id', expenses.update);

//----------DELETE BY ID
app.delete('/api/expenses/:id', expenses.deleteById);

app.listen(config.app.port);
console.log('Listening on port ' + config.app.port);