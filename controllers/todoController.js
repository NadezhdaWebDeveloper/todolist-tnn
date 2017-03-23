var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the DB
mongoose.connect('mongodb://nadezhda:qwerty@ds139370.mlab.com:39370/todoslist');

//Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});

//Create a model (collection)
var Todo = mongoose.model('Todo', todoSchema);

// simulation database
// var data = [{item: 'to read a book'}, {item: 'to go to the market'}, {item: 'to write a letter'}];

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app) {

  app.get('/todo', function(req, res) {
    // simulation database
    // res.render('todo', {todos: data});

    // get data from mongodb and pass it to view
    Todo.find({}, function(err, data){
      if (err) throw err;
      res.render('todo', {todos: data});
    });
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    // simulation database
    // if (!req.body) return res.sendStatus(400);
    // data.push(req.body);
    // res.json(data);

    // get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function(req, res) {
    // simulation database
    // data = data.filter(function(todo) {
    //   return todo.item.replace(/ /g, '-') !== req.params.item;
    // });
    // res.json(data);

    // delete the requested item from mongodb
    Todo.find({ item: req.params.item.replace(/\-/g, ' ') }).remove(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

};
