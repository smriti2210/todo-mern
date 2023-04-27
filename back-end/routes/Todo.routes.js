const express=require("express")
const {TodoModel} =require('../model/TodoModel')
const todosRouter=express.Router()

todosRouter.get("/",async(req,res)=>{
    try{
        let data=await TodoModel.find()
        res.send(data)
    }catch(error){
        res.send({
            message:error.message
        })
    }
})

todosRouter.post("/addtodo",async(req,res)=>{
    try{
        let data=new TodoModel(req.body);
        await data.save();
        res.send({message:"Todo Added"})
    }catch(error){
        res.send({message:error})
    }
})

todosRouter.patch("/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        await TodoModel.findByIdAndUpdate({_id:id},req.body);
        res.send({
            message:"Todo updated"
        });
    }catch(error){
        res.send({message:error.message})
    }
});

todosRouter.delete("/:id",async(req,res)=>{
    const {id}=req.params;
    try{
        await TodoModel.findByIdAndDelete({_id:id});
        res.send({message:"Todo deleted"})
    }catch(error){
        res.send({
            message:error.message,
        })
    }
})


module.exports={todosRouter}