const mongoose=require("mongoose")
const todoSchema=mongoose.Schema({
    text:{type:String,required:true},
    status:{type:Boolean,required:true}
},{
    versionKey:false
})

const TodoModel=mongoose.model("alltodo",todoSchema)
module.exports={TodoModel}