import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Login = (props) => {
   const localURL= "http://protected-eyrie-39175.herokuapp.com/"
   const herokuURL = "https://protected-eyrie-39175.herokuapp.com/"
   const [login, setLogin] = useState({})
   const [signUp, setSignUp] = useState(false)

   const handleInput = (event) => {
      setLogin({...login,[event.target.name]:event.target.value})
   }

   const onLogin = (response) => {
      console.log(response.data);
      props.setCurrentUser(response.data)
      localStorage.setItem('currentUser', JSON.stringify(response.data))
      props.setBooks(response.data.books)
      props.setPlayerList(response.data.players)
      props.setCurrentBook(response.data.books[0])
   }

   const handleSubmit = (event) => {
      event.preventDefault()
      axios
         .post(localURL+'session', {user:login})
         .then((response) => {
            onLogin(response)
         })
   }

   const handleCreate = (event) => {
      event.preventDefault()
      axios
         .post(localURL+"users",{user:login})
         .then((response, error) => {
            error ?
               console.log(error) : onLogin(response)
         })
   }

   const toggleSignup = () => {
      signUp ?
         setSignUp(false) : setSignUp(true)
   }

   return (
      <>
         {
            signUp ?
            <>
            <h3>Create an account</h3>
            <form onSubmit={handleCreate}>
               <label for="username"/>
               <input type='text' name="username" onChange={handleInput}/>
               <label for="password"/>
               <input type='password' name="password" onChange={handleInput}/>
               <input type="submit" value="Confirm"/>
            </form>
            <button onClick={toggleSignup}>Back</button>
            </>
            :
            <>
            <h3>Log in</h3>
            <form onSubmit={handleSubmit}>
               <label for="username"/>
               <input type='text' name="username" onChange={handleInput}/>
               <label for="password"/>
               <input type='password' name="password" onChange={handleInput}/>
               <input type="submit" value="Sign-in"/>
            </form>
            <button onClick={toggleSignup}>Create an account</button>
            </>
         }
      </>
   )
}

export default Login
