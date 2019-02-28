var {mongoose}=require('./backend/db/db');
var {use}=require('./backend/models/user');
var {wea}=require('./backend/models/weather');
var express=require('express');
var app = express();
const _=require('lodash');

var multer = require('multer');
var upload = multer();

var bodyParser = require('body-parser');

const {ObjectID} = require('mongodb');
const bcrypt=require('bcryptjs');

app.use(function(req, res, next) {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.setHeader("Access-Control-Allow-Headers", "Origin ,x-auth, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Expose-Headers","x-auth");
    next();
});
app.use(bodyParser.json());
app.post('/reg',(req,res)=>{
  
 var body = _.pick(req.body,['username','pass','email',]);
 console.log(body);
 var newUser = new use(body);

 newUser.save().then(()=>{
            
 	 return newUser.generateAuthToken();

    })
      .then((token)=>{
        res.header('x-auth',token).send(newUser);        
    })
    .catch((error)=>{
        res.status(404).send(error);
    });

 }); 
app.post('/enter',(req,res)=>{
var body = _.pick(req.body,['country','state','city','date','data']);
console.log(body);
var newUser = new wea(body);
//console.log(newUser);
newUser.save().then(()=>{
console.log("hy");


})
.catch((error)=>{
res.status(404).send(error);


});






});


   app.post('/log',(req,res)=>{
    console.log("hy");
 
   var body = _.pick(req.body,['username','password']);
 console.log(body.password);

    use.login(body.username,body.password).then((user)=>{

            return user.generateAuthToken().then((token)=>{
             console.log("hy");
              res.status(200).header('x-auth',token).json({

                   'status': true,
                   'users':user
                 })
})

res.send(user);
      
      })
      .catch((err)=>{
          res.status(400).send();
      });

  });
   app.delete('/del',(req,res) => {
  wea.findOneAndRemove().then((result)=>
{
  console.log("aagyo"); 
  if(!result){
    return res.status(404).send();
   }
   console.log(result);
   res.status(200).send(result);
   })
   .catch((err)=>{
    res.status(404).send();
   }) ;
});






app.get('/find',(req,res)=> {
  console.log("hello");
  
          console.log(req.query);
           wea.findOne().then((docs)=>{
     // console.log(pppp);
      res.status(200).send(docs);
      console.log(docs);
    //   console.log(res.send(docs));


   }).catch((err)=>{
       res.status(400).send(err);
   });
 });







 let port = process.env.PORT || 3000;
  const server = app.listen(port, function(){
     console.log('Listening on port ' + port);
    });



