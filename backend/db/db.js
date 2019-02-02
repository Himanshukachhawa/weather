var mongoose=require('mongoose');
mongoose.Promise=require('bluebird');
mongoose.connect('mongodb://localhost:27017/weather');
module.exports={mongoose};