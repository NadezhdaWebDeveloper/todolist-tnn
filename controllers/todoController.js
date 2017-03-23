var bodyParser = require('body-parser');

var data = [{item: 'to read a book'}, {item: 'to go to the market'}, {item: 'to write a letter'}];

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app) {

  app.get('/todo', function(req, res) {
    res.render('todo', {todos: data});
  });

  app.post('/todo', urlencodedParser, function(req, res) {
    if (!req.body) return res.sendStatus(400);
    data.push(req.body);
    res.json(data);
  });

  app.delete('/todo', function(req, res) {

  });

};
