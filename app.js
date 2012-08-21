var connectionString = 'jDmc:admin@ds037007.mongolab.com:37007/expenses';

var express = require('express'),
	db = require('mongojs').connect(connectionString),
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

app.get('/', function(req, res){
	res.render('index.html');
});

//----------GET ALL
app.get('/api/expenses', function(req, res){
	var result = [];
	expenses.find().forEach(function(err, doc) {
		if(err){
			res.send('Error: ' + err);
		}
		if (!doc) {
			res.send(result);
			return;
		}
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
	expenses.save(req.body, function(err, doc){
		if(err) res.send('Error: ' + err);
		if(doc){
			res.send(doc);
		}
	});
});

//----------UPDATE
app.put('/api/expenses/:id', function(req, res){
	var model = req.body;
	expenses.save(
		{
			'_id':			db.ObjectId(req.params.id),
			'name':			model.name,
			'dateCreated':	new Date(Date.parse(model.dateCreated)),
			'categoryId':	model.categoryId,
			'cost':			model.cost,
			'paid':			model.paid,
			'description':	model.description
		},
		function(err, doc) {
			if(err){
				res.send(err);
			}
			//TODO: Remove findOne
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

app.listen(3000);
console.log('Listening on port 3000');