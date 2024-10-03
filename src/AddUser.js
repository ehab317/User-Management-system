import React, { useState } from 'react'

const AddUser = ({toggleNewUser, addUser}) => {

    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')

    const handleName = (e) =>{
        setName(e.target.value)
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const addNewUser = () => {
        if(!Name) {
            alert('Must Provide a Name!')
        } else if (!Email) {
            alert('Must Provide an Email!')
        } else {
            const user = { 
                name: Name,
                email: Email,
                username: '',
                address: {
                    street: '',
                    city: '',
                    zipcode: ''
                },
                phone:'',
                website:'',
                company: {
                    name:'',
                    bs: '',
                    catchPhrase: ''
                }
            }
            addUser(user)
            toggleNewUser()
        }
    }


  return (
    <>
    <div style={{width:'50%', textAlign:'start'}}>
    <h3>Add New User</h3>
    <div style={{ width:'50%', border:'1px solid black', borderRadius:'2px', padding:'10px', margin:'10px 0'}}>
        <div style={{display:'flex', padding:'5px'}}>
        <p style={{marginRight:'10px'}}>Name:  </p> <input type='text' onChange={handleName}/>
        </div>
        <div style={{display:'flex', padding:'5px'}}>
        <p style={{marginRight:'10px'}}>Email:  </p><input type='text' onChange={handleEmail}/>
        </div>
        <div style={{display:'flex', justifyContent:'space-around', marginTop:'10px'}}>
            <button style={{backgroundColor:'khaki', border:'1px solid #ccc', padding:'10px'}} onClick={addNewUser}>ADD</button>
            <button style={{backgroundColor:'khaki', border:'1px solid #ccc', padding:'10px'}} onClick={toggleNewUser}>CANCEL</button>
        </div>
    </div>
    </div>
  </>
  )
}

export default AddUser