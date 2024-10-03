import React, { useState } from "react"

const UserTodos = ({clickedUser, todos, completeTask, addTask}) => {

  const user = clickedUser[0]
  const [title, setTitle] = useState('')

  const [addNewTodo, setAddNewTodo] = useState(false)

  const handleClick = (id) => {
    completeTask(id)
  }

  const addTodo = () => {
    setAddNewTodo(!addNewTodo)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title) {
      alert('Task Must Have a Title!')
    } else {
      const task = {completed: false, title: title, userId: clickedUser[0].id}
      addTask(task)
      setAddNewTodo(!addNewTodo)
    }
  }

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  return (
    <>
    <div style={{display:'flex', justifyContent:'space-between', width:'50%'}}>    
      <h3 style={{width:'50%', textAlign:'start'}}>Todos - {user.name}</h3>
      {!addNewTodo ? <button style={{backgroundColor:'khaki', border:'1px solid #ccc', padding:'5px', flexBasis:'20%', margin:'10px 0'}} onClick={addTodo}> ADD</button>
      : null }
    </div>
    <div style={{maxHeight:'35%', overflow:'auto', padding:'10px', border:'1px solid black', width:'50%'}}>


    {
      addNewTodo ? 
      <form onSubmit={handleSubmit}>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <p>Title: </p>
        <input type='text' onChange={handleTitle}/>
      </div>
      <div style={{display:'flex', justifyContent:'space-around', padding:'8px'}}>
        <button style={{backgroundColor:'khaki', border:'1px solid #ccc', padding:'2px', flexBasis:'20%'}}>ADD</button>
        <button style={{backgroundColor:'khaki', border:'1px solid #ccc', padding:'2px', flexBasis:'20%'}} onClick={addTodo}>CANCEL</button>
      </div>
      </form> : 
      todos.map((todo) => {
        return (
        <div key={todo.id} style={{border : '1px solid purple', borderRadius: '2px', margin: '5px 0', textAlign:'start', padding:'5px'}}>
          <p>{todo.title}</p>
          <div style={{display:'flex', justifyContent:'space-between'}}>
          <p>COMPLETED:  {todo.completed ? 'YES' : 'NO'}</p>
          {
            !todo.completed ?  <button style={{backgroundColor:'khaki', border:'1px solid #ccc', padding:'5px', flexBasis:'40%', margin:'10px 0'}} onClick={() => handleClick(todo.id)}>MARK COMPLETED</button>
            : null
          }
          </div>
        </div>
        )
      })
    }
    </div>
    </>
  )
}

export default UserTodos;
