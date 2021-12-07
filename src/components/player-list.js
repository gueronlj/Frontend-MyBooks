import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Players = (props) => {

   const localURL= "http://localhost:3000/"
   const herokuURL = "https://protected-eyrie-39175.herokuapp.com/"

   const handlePlayerInput = (event) => {
      props.setPlayer({...props.player, user_id:props.currentUser.id, [event.target.name]:event.target.value})
   }

   const handlePlayerSubmit = (event) => {
      event.preventDefault()
      axios.post("https://protected-eyrie-39175.herokuapp.com/players", props.player)
      .then((response, error) => {
         if(error){
            console.log(error);
         } else {
            console.log(response.data);
            props.setPlayerList(response.data);
         }
      })
   }

   const handleDelete = (event) => {
      axios
         .delete("https://protected-eyrie-39175.herokuapp.com/players/"+event.target.id)
         .then((response, error) => {
            if (error){
               console.log(error);
            } else{
               console.log(response.data);
            }
            axios
               .get("https://protected-eyrie-39175.herokuapp.com/players/"+props.currentUser.id)
               .then((response, error) => {
                  if(error){
                     console.log(error);
                  }else{
                     props.setPlayerList(response.data)
                  }
               })
         })
   }

   return(
      <>
      <h4>Player List</h4>
      <table>
      <tr>
         <th>Alias</th>
         <th>Contact</th>
         <th>Total Wins</th>
         <th>Balance</th>
         <th>ID</th>
      </tr>
      { props.playerList ?
         (props.playerList.map((player) => {
            return(
               <tr key={player.id}>
                  <td><a href="#">{player.name}</a></td>
                  <td>{ player.contact}</td>
                  <td>{ player.wins}</td>
                  <td>${ player.balance}</td>
                  <td><a href="#">{player.id}</a></td>
                  <td><button id={player.id} onClick={handleDelete}>-</button></td>
               </tr>
            )
         })): null
      }
      </table>
      { props.currentUser ?
         <><h4>Add Player</h4>
         <form onSubmit={handlePlayerSubmit}>
            <input type='text' name='name' placeholder="Name" onChange={handlePlayerInput}/>
            <input type='text' name='contact' placeholder="Contact info" onChange={handlePlayerInput}/>
            <input type='text' name='balance' placeholder="Starting Balance ($)" onChange={handlePlayerInput}/>
            <input type='submit'/>
         </form></>
            : null
      }
      </>
   )
}

export default Players
