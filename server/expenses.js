var config = require('../config').config;

var _ = require('underscore'),
	db = require('mongojs').connect(config.mongoDb.connectionString),
	expenses = db.collection('expenses');

var controller = {};

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

controller.getAll =  function(req, res){
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
};

controller.getById = function(req, res){
	expenses.findOne({ '_id' : db.ObjectId(req.params.id)}, function(err, doc){
		if(err){
		res.send('Error: ' + err);
		}
		res.send(doc);
	});
};

controller.create = function(req, res){
	var model = GetExpenseFromRequest(req);
	expenses.save(model, function(err, doc){
		if(err) res.send('Error: ' + err);
		if(doc){
			res.send(doc);
		}
	});
};

controller.update = function(req, res){
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
};

controller.deleteById = function(req, res) {
	expenses.remove({'_id': db.ObjectId(req.params.id)}, function(err, doc){
		if(err) {
			res.send('Error: ' + err);
			return;
		}
		res.send();
	});
};

exports.expenses = controller;