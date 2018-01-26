var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
var Todo= mongoose.model('Todo',{ text:String, done: Boolean });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// get : select(SQL), find(MongoDB)
// http://localhost:3000/todos
router.get('/todos', (req,res)=>{
  Todo.find((err,todos)=>{
    if(err) { res.send(err); return; }
    res.json(todos);
  })
})

// post : insert(SQL), save(MongoDB)

router.post('/todos',(req,res)=>{
  Todo.create({ text:req.body.text, done:false },(err, result)=>{
    if(err) { res.send(err); return; }
    Todo.find((err,todos)=>{
      res.json(todos);
    })
  })
})

// delete : delete(SQL), remove(MongoDB)
// http://localhost:3000/todos/5a619990ec7fbf1a3bb0c6fe(ex)

router.delete('/todos/:id',(req,res)=>{
  console.log(req.params.id)
  Todo.remove({ _id:req.params.id }, (err, result)=>{
    if(err) { res.send(err); return; }
    Todo.find((err,todos)=>{
      res.json(todos);
    })
  })
})



module.exports = router;
