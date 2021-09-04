var express = require('express');
var app = express();
global.__root = __dirname + '/';
console.log("__root",__root);
global.__db_model = require(__root+'src/model');

app.get('/api',function(req,res){
  res.status(200).send("api works");
});

var UserController = require(__root+'user/UserController');
app.use('/api/user',UserController);

var OrderController = require(__root+'order/OrderController');
app.use('/api/order',OrderController);

var IngredientsController = require(__root+'ingredients/IngredientsController');
app.use('/api/ingred',IngredientsController);


module.exports = app;
