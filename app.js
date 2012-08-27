var config = require('./config').config;

var express = require('express'),
	_ = require('underscore'),
	db = require('mongojs').connect(config.mongoDb.connectionString),
	expenses = db.collection('expenses');

var app = express();

app.configure(function () {
	app.use(express.bodyParser());

	app.use('/js', express.static(__dirname + '/js'));
	app.use('/css', express.static(__dirname + '/css'));
	app.use('/templates', express.static(__dirname + '/templates'));
	app.use('/img', express.static(__dirname + '/img'));

	app.use(express.static(__dirname + '/public'));
});

function GetExpenseFromRequest(req){
	var body = req.body;
	return {
		'name':			body.name,
		'dateCreated':	new Date(Date.parse(body.dateCreated)),
		'categoryId':	body.categoryId,
		'cost':			body.cost,
		'paid':			body.paid,
		'description':	body.description
	};
};

app.get('/', function(req, res){
	res.render('index.html');
});

//----------GET ALL
app.get('/api/expenses', function(req, res){
	var result = [];
	var i = 0;
	expenses.find().forEach(function(err, doc) {
		if(err){
			res.send('Error: ' + err);
		}
		if (!doc) {
			res.send(result);
			return;
		}
		doc['number'] = ++i;
		result.push(doc);
	});
});

//----------GET ONE BY ID
app.get('/api/expenses/:id', function(req, res){
    expenses.findOne({ '_id' : db.ObjectId(req.params.id)}, function(err, doc){
      if(err){
        res.send('Error: ' + err);
      }
      res.send(doc);
    });
});

//----------CREATE 
app.post('/api/expenses', function(req, res){
	var model = GetExpenseFromRequest(req);
	expenses.save(model, function(err, doc){
		if(err) res.send('Error: ' + err);
		if(doc){
			res.send(doc);
		}
	});
});

//----------UPDATE
app.put('/api/expenses/:id', function(req, res){
	var model = GetExpenseFromRequest(req);
	expenses.save(_(model).extend({'_id': db.ObjectId(req.params.id)}),
		function(err, doc) {
			if(err){
				res.send(err);
			}
			expenses.findOne({'_id': db.ObjectId(req.params.id)}, function(err, doc){
				res.send(doc);
			});
		}
	);
});

//----------DELETE BY ID
app.delete('/api/expenses/:id', function(req, res) {
	expenses.remove({'_id': db.ObjectId(req.params.id)}, function(err, doc){
		if(err) {
			res.send('Error: ' + err);
			return;
		}
		res.send();
	});
});

app.listen(config.app.port);
console.log('Listening on port 3000');