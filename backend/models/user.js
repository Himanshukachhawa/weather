const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
const _ = require('lodash');
const bcrypt=require('bcryptjs');
var user= mongoose.Schema({
	username:{
			type:String,
			minlength:3,
			required:true
	},
	 pass:{
        type:String,
        required:true,
        minlength:6
    },
     email:{
        type:String,
        trim:true,
        minlength:1,
        required:true,
        unique:true,    
    },
//     location:{
// type:Number,
// index: { type: '2dsphere', sparse: true}

//     },
    tokens:{
        type:String},  
    

});
user.pre('save',function(next){
    var user=this;
    if(user.isModified('pass')){
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(user.pass,salt,(err,hash)=>{
                user.pass=hash;
                next();
            });
        });
    }else{
        next();
    }      
});

user.statics.login = function(username,pass){
    var User = this;
     console.log(pass);
    return User.findOne({username}).then((user)=>{
            
            
        if(!user){
            console.log("hy");
            return Promise.reject();
        }
        return new Promise((resolve,reject)=>{
                      //  console.log("hy");
            bcrypt.compare(pass,user.pass,(err,result)=>{
                console.log(User.pass);
                if(result){
                    console.log("hello");
                    
                    // console.log(result);
                   // console.log(user);
                    
                    resolve(user);

                }
                else{
                    console.log("nh");
                    reject();
                }
            });
        });
    })
    .catch((err)=>{
        return Promise.reject();
    });
};
user.methods.generateAuthToken = function () {
    var user = this;
     console.log(user);
     var token = jwt.sign({_id:user._id.toHexString()},'himanshu').toString();
     user.tokens=token;
     console.log(user);
     //console.log("token call");
       
      return user.save().then(()=>{
       
        return token;
    });

 };



     var use = mongoose.model('use',user);
module.exports={use};