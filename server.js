var express = require('express');
var app = express();
var path = require('path');
var mongojs = require('mongojs');
var db = mongojs('contactList',['contactList']);
var bodyParser = require('body-parser');

app.use(bodyParser.json());



// app.get('/',function(req,res){
// 	res.send("Hi, This is from server");
// })

app.get('/',function(req,res){
 	res.sendFile(path.join(__dirname + '/index.html'));
 })

app.get('/contactList',function(req,res){
	console.log("I received a GET request");

	db.contactList.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	})


app.post('/contactList',function(req,res){
	console.log(req.body);
	db.contactList.insert(req.body,function(err,docs){
		res.json(docs);
	})
});


app.delete('/contactList/:id',function(req,res){
	var id=req.params.id;
	console.log(id);
	db.contactList.remove({_id:mongojs.ObjectId(id)},function(err,docs){
		res.json(docs);
	})
})

app.get('/contactList/:id',function(req,res){
	var id=req.params.id;
	console.log(id);
	db.contactList.findOne({_id:mongojs.ObjectId(id)},function(err,docs){
		res.json(docs);
	})
})

app.put('/contactList/:id',function(req,res){
	var id=req.params.id;
	console.log(req.body.name);
	db.contactList.findAndModify({Query:{_id:mongojs.ObjectId(id)},
		update:{$set:{name:req.body.name,email:req.body.email,mobile:req.body.number}},
		new:true}, function(err,docs){
			res.json(docs);
		}
	);
});
/*person1={

				name:'suman',
				email:'sumankotagiri28@gmail.com',
				Mobile:'+91 7729917928'
			};
			person2={

				name:'navvi',
				email:'naveenkotagiri28@gmail.com',
				Mobile:'+91 7729917928'
			};
			person3={

				name:'haari',
				email:'harikakotagiri28@gmail.com',
				Mobile:'+91 7729917928'
			};

			var contactList = [person1,person2,person3];

			res.json(contactList);*/
})
//app.use(path.join(__dirname + '/index.html'));
//console.log(__dirname);

app.listen(3000);
console.log("in console.");