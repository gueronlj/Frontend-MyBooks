import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

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

   const handleDummyLogin = (event) => {
      event.preventDefault()
      axios
         .post(localURL+'session', {user:{username:'lorens',password:'123456'}})
         .then((response) => {
            onLogin(response)
         })
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
      <div id="login">
         {
            signUp ?
            <>
            <h3>Create an account</h3>
            <Form onSubmit={handleCreate}>
               <label for="username"/>
               <Form.Control type='text' name="username" placeholder="Username" onChange={handleInput}/>
               <label for="Password"/>
               <Form.Control type='password' name="password" placeholder="" onChange={handleInput}/>
               <Button type="submit" variant="success">Confirm</Button>
            </Form>
            <Button variant="secondary" onClick={toggleSignup}>Back</Button>
            </>
            :
               <>
               <h3>Log in</h3>
               <form  onSubmit={handleSubmit}>
                  <label for="username"/>
                  <input type='text' name="username" onChange={handleInput}/>
                  <label for="password"/>
                  <input type='password' name="password" onChange={handleInput}/>
                  <Button type="submit" variant="success">Sign-in</Button>
               </form>
               <Button variant="outline-primary" onClick={toggleSignup}>Create an account</Button>
               </>
         }<br/>
         <p>If you just want to explore, click below to login with a dummy account.</p>
         <Button size="sm" variant="outline-dark" onClick={handleDummyLogin}>Have a look</Button>
      </div>
   )
}

export default Login
