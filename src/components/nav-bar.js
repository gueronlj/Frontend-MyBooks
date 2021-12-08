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
               <li id='playersToggle' ><p>close</p><img src="cross.svg" onClick={togglePlayers}/></li>
               :
               <li><button onClick={togglePlayers}>Players</button></li>
            }
            <li><button>Help</button></li>
            <li><button onClick={handleLogout}>Logout</button></li>
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
