import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const EditBet = (props) => {

   const emptyBet = { player_id:1, prop: '', value:0, juice:0 }
   const [bet, setBet] = useState(emptyBet)

   const handleInput = (event) => {
      props.setTargetBet({...props.targetBet, [event.target.name]:event.target.value})
      setBet({...bet, [event.target.name]:event.target.value})
   }

   const handleSubmit = (event) => {
      event.preventDefault()
      setBet(props.targetBet)
      axios
      .patch("https://protected-eyrie-39175.herokuapp.com/bets/"+props.targetBet.id, {bet})
      .then((response, error) => {
         if (error){
            console.log(error);
         } else {
            console.log(response.data);
         }
         axios
            .get("https://protected-eyrie-39175.herokuapp.com/books/"+props.currentBook.id+'.json')
            .then((response, error) => {
               if(error){
                  console.log(error);
               } else {
                  console.log(response.data);
                  props.setCurrentBook(response.data);
               }
            })
      })
   }

   return(
      <>{ props.targetBet != null ?
      <><h4>Edit Bet</h4>
      <form onSubmit={handleSubmit}>
         <label for="player_id">Player:</label>
         <select name="player_id" id="player_id" onChange={handleInput} value={props.targetBet.player_id}>
            {props.currentUser.players.map((player) => {
                  return(
                     <option key={player.id} value={player.id}>{player.name}</option>
                  )
               })}
         </select><br/>
         <label for="prop">Details:</label>
            <input type="text" name="prop" onChange={handleInput} value={props.targetBet.prop}/><br/>
         <label for="value">Amount: $</label>
            <input type="number" name="value" onChange={handleInput} value={props.targetBet.value}/><br/>
         <label for="juice">Juice:</label>
            <input type="number" min="0" max="1" step="0.01" name="juice" onChange={handleInput} value={props.targetBet.juice}/>
         <input type="hidden" name="book_id" value=
            { props.currentBook ?
               props.currentBook.id : 1
            }/>
         <input type="submit"/>
      </form>
      </> : null}
   </>)
}

export default EditBet
