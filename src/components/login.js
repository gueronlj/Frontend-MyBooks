import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const Login = (props) => {
   const localURL= "http://localhost:3001/"
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
         .post(herokuURL+'session', {user:{username:'lorens',password:'123456'}})
         .then((response) => {
            onLogin(response)
         })
   }

   const handleSubmit = (event) => {
      event.preventDefault()
      axios
         .post(herokuURL+'session', {user:login})
         .then((response) => {
            onLogin(response)
         })
   }

   const handleCreate = (event) => {
      event.preventDefault()
      axios
         .post(herokuURL+"users",{user:login})
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
            <div className="login">
            <h3>Create an account</h3>
            <Form onSubmit={handleCreate}>
               <Form.Control type='text' name="username" placeholder="Username" onChange={handleInput}/>
               <Form.Control type='password' name="password" placeholder="Password" onChange={handleInput}/>
               <Button type="submit" variant="success">Confirm</Button>
            </Form>
            <Button variant="secondary" onClick={toggleSignup}>Back</Button>
            </div>
            :
               <div className="login">
               <h3>Log in</h3>
               <Form  onSubmit={handleSubmit}>
                  <input type='text' name="username" placeholder="Username" onChange={handleInput}/>
                  <input type='password' name="password" placeholder="Password" onChange={handleInput}/>
                  <Button type="submit" variant="primary">Sign-in</Button>
               </Form>
               <Button variant="outline-warning" onClick={toggleSignup}>Create an account</Button>
               </div>
         }<br/>
         <p>If you just want to explore, click below to login with a dummy account.</p>
         <Button size="sm" variant="outline-dark" onClick={handleDummyLogin}>Have a look</Button>
      </>
   )
}

export default Login
