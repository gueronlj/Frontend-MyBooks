import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Login = (props) => {

   const [login, setLogin] = useState({})

   const handleInput = (event) => {
      setLogin({...login,[event.target.name]:event.target.value})
   }

   const handleSubmit = (event) => {
      event.preventDefault()
      axios
         .post('https://protected-eyrie-39175.herokuapp.com/session', {user:login},
         {withCredentials:true})
         .then((response) => {
            console.log(response.data);
            props.setCurrentUser(response.data)
            localStorage.setItem('currentUser', JSON.stringify(response.data))
            props.setBooks(response.data.books)
            props.setPlayerList(response.data.players)
         })
   }

   return (
      <>
         <h3>Log in</h3>
         <form onSubmit={handleSubmit}>
            <label for="username"/>
            <input type='text' name="username" onChange={handleInput}/>
            <label for="password"/>
            <input type='password' name="password" onChange={handleInput}/>
            <input type="submit" value="Sign-in"/>
         </form>
      </>
   )
}

export default Login
