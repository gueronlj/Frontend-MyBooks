import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Nav = (props) => {

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
               <li><button >Log in</button></li>
            </>)
         }
      </ul>
      </>
   )
}

export default Nav
