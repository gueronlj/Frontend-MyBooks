import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Nav = (props) => {

   const handleLogin = () => {
      axios
         .post('https://protected-eyrie-39175.herokuapp.com/session', {
            user:{
               username: 'lorens',
               password: '123456',
            }
         },
         {withCredentials:true})
         .then((response) => {
            console.log(response.data);
            props.setCurrentUser(response.data)
            localStorage.setItem('currentUser', JSON.stringify(response.data))
            props.setBooks(response.data.books)
            props.setPlayerList(response.data.players)
         })
   }

   const handleLogout = () => {
      localStorage.removeItem('currentUser')
      props.setCurrentUser(null)
      localStorage.removeItem('currentBook')
      props.setCurrentBook(null)
      props.setBooks([])
      props.setPlayerList([])
   }

   return(
      <>
      <ul className="nav">
         { props.currentUser ? (
            <><li><button onClick={handleLogout}>Logout</button></li>
               <li>Welcome, {props.currentUser.username}</li>
            </>)
            :
            (<>
               <li><button onClick={props.checkSession}>Sign up</button></li>
               <li><button onClick={handleLogin}>Log in</button></li>
            </>)
         }
      </ul>
      </>
   )
}

export default Nav
