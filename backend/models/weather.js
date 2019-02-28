const mongoose = require('mongoose');
var weather = mongoose.Schema({



	country:{type:String
	         },
 state:{
	 		type:String,
			
			require:true
	 },
	city:{
		type:String,
		require:true
},
// temp:{type:Number,
//        require:true},
// weather:{
// 	type:String,
// 	require:true

// },
date:{type:Date,
     	 default: Date.now
    },
data:{
          type: [{
             Time:{type:Number},
             Temperature:{ type:Number}
        }]

}
});

var wea = mongoose.model('wea',weather);
module.exports={wea};





