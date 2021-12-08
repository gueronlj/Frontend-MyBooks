import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const AddBet = (props) => {
   const localURL= "https://protected-eyrie-39175.herokuapp.com/"
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

   const updatePlayerList = () => {
      axios
         .get(localURL+"players/"+props.currentUser.id)
         .then((response, error) => {
            if(error){
               console.log(error);
            }else{
               console.log(response.data);
               props.setPlayerList(response.data)
            }
         })
   }

   useEffect(() => {
      updatePlayerList()
   },[])

   return(
      <>
      <Form onSubmit={handleBetSubmit}>
      <label for="player_id">Player:</label>
      <Form.Select name="player_id" id="player_id" onChange={handleInput}>
      <option>Select a player</option>
         {
            props.playerList.map((player) => {
               return(
                  <option key={player.id} value={player.id}>{player.name}</option>
               )
            })
         }
      </Form.Select><br/>
      <label for="prop">Details:</label>
      <Form.Control type="text" name="prop" placeholder="Proposition" onChange={handleInput}/><br/>
      <label for="value">Ammount ($):</label>
      <Form.Control type="number" name="value" onChange={handleInput}/><br/>
      <label for="juice">Juice:</label>
      <Form.Control type="number" min="0" max="1" step="0.01" name="juice" onChange={handleInput} placeholder="Example: 0.05"/>
      <input type="hidden" name="book_id" value=
         { props.currentBook ?
            props.currentBook.id : 1
         }/>
      <input type="hidden" name={props.currentUser.id} value={props.currentUser.id}/>
      <Button variant="success" type="submit">Submit</Button>
      </Form>
      </>
   )
}

export default AddBet
