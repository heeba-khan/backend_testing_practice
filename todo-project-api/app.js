const express=require('express')
const mongoose=require('mongoose')
const body_parser=require('body-parser')
const dotenv=require('dotenv')
dotenv.config()

const app=express()

// app.use(body_parser.urlencoded)
app.use(body_parser.json())

mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log('MongoDB is connected');
})
.catch((e)=>{
    console.log('Error in connecting database',e);
    res.send(e)    
})

const todoSchema=new mongoose.Schema({
    title:{
        type:String
    },
    completed:{
        type:Boolean,
        default:false
    }
})

const Todo=mongoose.model('Todo',todoSchema)

//craeting a todo item
app.post('/todos',async(req,res)=>{
    const todo=new Todo(req.body);
    await todo.save();
    res.status(201).send(todo);
})

//getting all todo
app.get('/todos',async(req,res)=>{
    const todos=await Todo.find();
    res.send(todos)
})

//getting todo based on id
app.get('/todos/:id',async(req,res)=>{
    const todo=await Todo.find({id:_id});
    res.send(todo)
})

//updating a todo
app.patch('/todos/:id',async(req,res)=>{
    const todo=await Todo.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.send(todo)
})

//Updating the status of todo
app.patch('/todos/:id/complete',async(req,res)=>{
    const todo=await Todo.findByIdAndUpdate(req.params.id,{completed:true},{new:true})
    res.send(todo)
})

// deleting a todo
app.delete('/todos/:id',async(req,res)=>{
    await Todo.findByIdAndDelete(req.params.id)
    res.sendStatus(204)
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});