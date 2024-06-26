const mongoose = require('mongoose');
const user = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:Number,
        require:true
    },
    verified:{
      type:Boolean,
      require:true
    },
    isAdmin:{
        type:Number,
        default:0
    },
    Block:{
        type:Boolean,
        default:false
    },
    token:{
        type:String,
        default:''
    },
    referralCode:{
       type:String,
       unique:true
    },
    alreadyreferred:{
      type:Boolean,
      require:true,
      default:false,
    },
    Coupon:[{
        couponCode:String,
        usagecount:Number
    }]
})
module.exports = mongoose.model("user",user)