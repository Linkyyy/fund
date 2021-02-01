const mongoose=require('mongoose')
const Schema=mongoose.Schema
const ProfileSchema=new Schema({
    type:{
        type:String,
        required:true
    },
    income:{
        type:String,
        required:true
    },
    expand:{
        type:String,
        required:true
    },
    cash:{
        type:String,
        required:true
    },
    remark:{
        type:String,
    },
    describe:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    },

})

module.exports=Profile=mongoose.model("profile",ProfileSchema)