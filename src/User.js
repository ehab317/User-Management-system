import React, { useState, useEffect } from "react";
import OtherData from "./OtherData";

const User = ({user, todos, updateUser, deleteUser, clickedUser, clicked}) => {

  const [otherData, setOtherData] = useState(false)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [street, setStreet] = useState(user.address.street)
  const [city, setCity] = useState(user.address.city)
  const [zipcode, setZipcode] = useState(user.address.zipcode)
  const [isClicked, setIsClicked] = useState(false)

  useEffect( () => {
    if (clicked == user.id) {
      setIsClicked(true)
    } else {
      setIsClicked(false)
    }
  }, [clicked])

  const showData = () => {
    setOtherData(true)
  }

  const hideData = () => {
    setOtherData(false)
  }

  const handleName = (e) => {
    setName(e.target.value)
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
  }

  const handleStreet = (e) => {
    setStreet(e.target.value)
  }

  const handleCity = (e) => {
    setCity(e.target.value)
  }

  const handleZipcode = (e) => {
    setZipcode(e.target.value)
  }

  const handleUpdate = () => {
    if (!name || !email) {
      alert('Must Have Name & Email!')
    } else if (!street || !city || !zipcode) {
      alert('Must Have Street, City & Zipcode!')
    } else {
        updateUser(user.id, name, email, street, city, zipcode)
    } 
  }

  const handleDelete = () => {
    deleteUser(user.id)
  }

  const handleClick = () => {
    clickedUser(user.id)
  }

  let hasIncomplete = todos.some( (todo) => todo.completed == false)

  return (
    <div className="user" style={{padding:'10px', border: hasIncomplete ?'solid 2px red' : 'solid 2px green' , backgroundColor: isClicked? 'orange': 'white', width:'50%', margin:'10px auto', }}>
      <label onClick={handleClick}>
      <p>ID: {user.id}</p><br/>
      </label>
      <label>
        <p style={{display: 'inline'}}>NAME: </p><input type="text" defaultValue={user.name} onChange={handleName}/>
      </label><br/>
      <label>
        <p style={{display: 'inline'}}>EMAIL: </p><input type="text" defaultValue={user.email} onChange={handleEmail}/>
      </label>
      <div style={{display:'flex', justifyContent:'space-evenly', marginTop: '15px'}}>
        <button style={{backgroundColor:'silver', border:'none', padding:'5px'}} onMouseOver={showData} onClick={hideData}>Other Data</button>
        <button  onClick={handleUpdate} style={{backgroundColor:'khaki', border:'1px solid #ccc', padding:'5px'}}>Update</button>
        <button onClick={handleDelete} style={{backgroundColor:'khaki', border:'1px solid #ccc', padding:'5px'}}>Delete</button>
      </div>
      {
        otherData ? <OtherData user={user} handleStreet={handleStreet} handleCity={handleCity} handleZipcode={handleZipcode}/> : null 
      }
    </div>
  );
}

export default User;
