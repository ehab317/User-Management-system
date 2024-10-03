import { useState, useEffect } from "react";
import { getData, getTodos, getPosts } from "./Utils";
import User from "./User";
import UserPosts from './userPosts';
import UserTodos from './userTodos';
import AddUser from './AddUser';

const Users = () => {

  const [Users, setUsers] = useState([])
  const [Todos, setTodos] = useState([])
  const [Posts, setPosts] = useState([])
  const [search, setSearch] = useState([])
  const [clicked, setClicked] = useState(0)
  const [addNewUser, setAddNewUser] = useState(false)

  useEffect( () => {
    const getUsers = async () => {
      const usersData = await getData(`https://jsonplaceholder.typicode.com/users`)
      setUsers(usersData)
    }

    const getUserTodos = async () => {
      const userTodos = await getTodos(`https://jsonplaceholder.typicode.com/todos`)
      setTodos(userTodos)
    }

    const getUserPosts = async () => {
      const userPosts = await getPosts(`https://jsonplaceholder.typicode.com/posts`)
      setPosts(userPosts)
    }

    getUsers()
    getUserTodos()
    getUserPosts()
  }, [])

  const findUser = (e) => {
    if(e.target.value === ''){
      setSearch([])
    } else {
      const filteredNames = Users.filter( (user) => user.name.toLowerCase().includes(e.target.value.toLowerCase()) )
      const filteredEmails = Users.filter( (user) => user.email.toLowerCase().includes(e.target.value.toLowerCase()) )
      let ids = new Set(filteredNames.map(d => d.id));
      var filteredUsers = [...filteredNames, ...filteredEmails.filter(item => !ids.has(item.id))];
      setSearch(filteredUsers.sort( (a, b) => a.id - b.id))
    }
  }

  const updateUser = (id, name, email, street, city, zipcode) => {
    const newUsers = Users.map( user => {
      if (user.id == id) {
        user.name = name
        user.email = email
        user.address.street = street
        user.address.city = city
        user.address.zipcode = zipcode
      }
      return user
    })
    setUsers(newUsers)
    alert('User updated successfully!')
  }

  const deleteUser = (id) => {
    const filteredUsers = Users.filter( (user) => user.id !== id)
    setUsers(filteredUsers)

    const filteredTodos = Todos.filter( (todo) => todo.userId !== id)
    setTodos(filteredTodos)

    const filteredPosts = Posts.filter( (post) => post.userId !== id)
    setPosts(filteredPosts)

  }

  const clickedUser = (id) =>{
    if (id == clicked) {
      setClicked(0)
    } else {
      setClicked(id)
    }
  }

  const completeTask = (id) => {
    let task = Todos.filter( (todo) => todo.id == id)
    task[0].completed = true
    setTodos([...Todos, task])
  }

  const addTask = (task) => {
    const lastId = Todos[Todos.length -1].id
    task.id = lastId + 1
    setTodos([...Todos, task ])
  }

  const addPost = (post) => {
    const lastId = Posts[Posts.length -1].id
    post.id = lastId +1
    setPosts([...Posts, post])
  }

  const toggleNewUser = () =>{
    setAddNewUser(!addNewUser)
  }

  const addUser = (user) => {
    const lastId = Users[Users.length -1].id
    user.id = lastId +1
    setUsers([...Users, user])
    console.log(user)
  }

  return (
    <>
      <div style={{display:'flex', justifyContent:'space-evenly', marginTop: '15px', width:'20%', margin:'20px auto'}}>
        <label>
            <p style={{display: 'inline'}}>SEARCH: </p><input type="text" onChange={findUser}/>
          </label>
        <button style={{backgroundColor:'khaki', border:'1px solid #ccc', padding:'5px'}} onClick={toggleNewUser}>ADD</button>
      </div>
      <div style={{display:'flex', justifyContent:'space-around'}}>
        <div style={{flexBasis:'50%'}}>
      { search.length ? (
        search.map( user => {
          const usrTodos = Todos.filter((todo) => todo.userId == user.id);
          const usrPosts = Posts.filter((post) => post.userId == user.id);
          return <User user={user} key={user.id} todos={usrTodos} posts={usrPosts} updateUser={updateUser} deleteUser={deleteUser} clickedUser={clickedUser}/>
        })
      ) : (
        Users.map( user => {
          const usrTodos = Todos.filter((todo) => todo.userId == user.id);
          const usrPosts = Posts.filter((post) => post.userId == user.id);
          return <User user={user} key={user.id} todos={usrTodos} posts={usrPosts} updateUser={updateUser} deleteUser={deleteUser} clickedUser={clickedUser} clicked={clicked}/>
        })
      )
      }
      </div>
      {
        addNewUser ? 
        <AddUser toggleNewUser={toggleNewUser} addUser={addUser} /> :
        clicked ? (
          <>
          <div style={{flexBasis:'50%', width:'50%', maxHeight:'100vh'}}>
          <UserTodos todos={Todos.filter((todo) => todo.userId == clicked)} clickedUser={Users.filter((user) => user.id == clicked)} completeTask={completeTask} addTask={addTask}/>
          <UserPosts posts={Posts.filter((post) => post.userId == clicked)} clickedUser={Users.filter((user) => user.id == clicked)} addPost={addPost}/>
          </div>
          </>
        ): 
          null
      }
      </div>
    </>
    );
}

export default Users;
