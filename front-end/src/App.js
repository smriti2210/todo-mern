import logo from './logo.svg';
import TodoInput from './components/TodoInput';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [todos,setTodos]=useState([])
  useEffect(()=>{
    const getTodos=async()=>{
      let data= await axios(`http://localhost:4000/todos`)
      setTodos(data.data)
    }
    getTodos()
  },[])

  const addTodo=async(obj)=>{
    let data=await axios.post(`http://localhost:4000/todos/addtodo`,obj)
    console.log(obj)
    let newData=await axios(`http://localhost:4000/todos`)
    
    console.log(todos)
    //setTodos(...newData,data)
    setTodos(newData.data)
  }

  const deletetodo=async(id)=>{
    let data=await axios.delete(`http://localhost:4000/todos/${id}`)
    let newData=await axios(`http://localhost:4000/todos`)
    setTodos(newData.data)
  }

  const updatetodo=async(id,updateData)=>{
    let data=await axios.patch(`http://localhost:4000/todos/${id}`,updateData)
    let newData=await axios(`http://localhost:4000/todos`)
    setTodos(newData.data)
  }
  return (
    <div className='App'>
      <h1 >Task Manager</h1>
      <br/>
      <TodoInput addTodo={addTodo}/>
      {todos?.map(({text,status,_id})=><div key={_id} onClick={()=>{deletetodo(_id)}}><h1>{text}</h1><p onClick={()=>{
        updatetodo(_id,{status:!status})
      }}>{status?"completed":"not completed"}</p></div>)}
    </div>
  );
}

export default App;
