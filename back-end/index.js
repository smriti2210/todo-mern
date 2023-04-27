const express=require("express")
const cors=require("cors")
const {connection} =require("./db");
const { todosRouter } = require("./routes/Todo.routes");
const app=express();
app.use(cors());
app.use(express.json())
app.use("/todos",todosRouter)
app.get("/",(req,res)=>{
    res.send({
        message:"you are connected with api"
    })
})
app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("connected to db")
    }catch(error){
        console.log(error)
    }
    console.log("server is started on port number",process.env.PORT)
})
