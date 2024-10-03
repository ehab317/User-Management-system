import React, { useState } from "react"

const UserPosts = ({clickedUser, posts, addPost}) => {

  const [addNewPost, setAddNewPost] = useState(false)
  const [Title, setTitle] = useState('')
  const [Body, setBody] = useState('')
  const user = clickedUser[0]

  const handleClick = () => {
    setAddNewPost(!addNewPost)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!Title) {
      alert('Post Must Have a Title!')
    } else if (!Body) {
      alert('Post Must Have a Body!')
    } else{
      const newPost = {userId: clickedUser[0].id, Title, Body}
      addPost(newPost)
      setAddNewPost(!addNewPost)
    }
  }

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handeBody = (e) => {
    setBody(e.target.value)
  }

  return (
    <>
    <div style={{display:'flex', justifyContent:'space-between', width:'50%'}}>    
      <h3 style={{width:'50%', textAlign:'start'}}>posts - {user.name}</h3>
      {!addNewPost ? <button style={{backgroundColor:'khaki', border:'1px solid #ccc', padding:'5px', flexBasis:'20%', margin:'10px 0'}} onClick={handleClick}>{addNewPost ? 'CANCEL' : 'ADD'}</button> : null}
    </div>
    <div style={{maxHeight:'35%', overflow:'auto', padding:'10px', border:'1px solid black', width:'50%'}}>
    {
      addNewPost ? 
      <form onSubmit={handleSubmit}>
      <div style={{display:'flex', justifyContent:'space-between'}}>
      <p>Title: </p>
      <input type='text' onChange={handleTitle}/>
      <p>Body: </p>
      <input type='text' onChange={handeBody}/><br/>
      </div>
      <div style={{display:'flex', justifyContent:'space-around', padding:'8px'}}>
      <button style={{backgroundColor:'khaki', border:'1px solid #ccc', padding:'2px', flexBasis:'20%'}}>ADD</button>
      <button style={{backgroundColor:'khaki', border:'1px solid #ccc', padding:'2px', flexBasis:'20%'}} onClick={handleClick}>CANCEL</button>
      </div>
      </form> : 
      posts.map((post) => {
        return (
        <div key={post.id} style={{border : '1px solid purple', borderRadius: '2px', margin: '5px 0', textAlign:'start', padding:'5px'}}>
          <p> TITLE:  {post.title}</p>
          <p>BODY:  {post.body}</p>
        </div>
        )
      })
    }
    </div>
    </>
  )
}

export default UserPosts;
