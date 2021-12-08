import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'

const Nav = (props) => {

   const handleLogout = () => {
      localStorage.removeItem('currentUser')
      props.setCurrentUser(null)
      localStorage.removeItem('currentBook')
      props.setCurrentBook(null)
      props.setBooks([])
      props.setPlayerList([])
   }

   const togglePlayers = () => {
      if(props.playersOn === false){
         props.setPlayersOn(true)
      }else{
         props.setPlayersOn(false)
      }
   }

   return(
      <>
      <ul className="nav">
         { props.currentUser ? (
            <>
            <li id="welcome" >Welcome, {props.currentUser.username}</li>

            {props.playersOn ?
               <li id='playersToggle' ><Button variant="outline-primary" onClick={togglePlayers}>close</Button><img src="cross.svg" onClick={togglePlayers}/></li>
               :
               <li><Button variant="primary" onClick={togglePlayers}>Players</Button></li>
            }
            <li><Button variant="outline-info" >Help</Button></li>
            <li><Button variant="outline-warning" onClick={handleLogout}>Logout</Button></li>
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
