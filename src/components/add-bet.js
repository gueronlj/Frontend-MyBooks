import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const AddBet = (props) => {
   const localURL= "http://localhost:3000/"
   const herokuURL = "https://protected-eyrie-39175.herokuapp.com/"
   const emptyBet = { player_id:1, prop: '', value:0, juice:0 }
   const [bet, setNewBet ] = useState(emptyBet)
   const handleInput = (event) => {
      setNewBet({...bet, user_id:props.currentUser.id, book_id:props.currentBook.id, [event.target.name]:event.target.value })
   }

   const handleBetSubmit = (event) => {
      event.preventDefault()
      axios
         .post(localURL+"bets", {bet})
         .then((response, error) => {
            if (error) {
               console.log(error);
            } else {
               console.log(response.data);
               localStorage.setItem('currentBook', JSON.stringify(response.data))
               props.setCurrentBook(response.data)
            }
         })
   }

   return(
      <>
      <form onSubmit={handleBetSubmit}>
      <label for="player_id">Player:</label>
      <select name="player_id" id="player_id" onChange={handleInput}>
         {
            props.playerList.map((player) => {
               return(
                  <option key={player.id} value={player.id}>{player.name}</option>
               )
            })
         }
      </select><br/>
      <label for="prop">Details:</label>
      <input type="text" name="prop" placeholder="Proposition" onChange={handleInput}/><br/>
      <label for="value">Ammount:</label>
      <input type="number" name="value" onChange={handleInput}/><br/>
      <label for="juice">Juice:</label>
      <input type="number" min="0" max="1" step="0.01" name="juice" onChange={handleInput}/>
      <input type="hidden" name="book_id" value=
         { props.currentBook ?
            props.currentBook.id : 1
         }/>
      <input type="hidden" name={props.currentUser.id} value={props.currentUser.id}/>
      <input type="submit"/>
      </form>
      </>
   )
}

export default AddBet
