import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const EditBet = (props) => {
   const localURL= "http://localhost:3001/"
   const herokuURL = "https://protected-eyrie-39175.herokuapp.com/"
   const emptyBet = { player_id:1, prop: '', value:0, juice:0 }
   const [bet, setBet] = useState(emptyBet)

   const closeModal = () => {
      props.setEditMode(false)
   }

   const handleInput = (event) => {
      props.setTargetBet({...props.targetBet, [event.target.name]:event.target.value})
      setBet({...bet, [event.target.name]:event.target.value})
   }

   const refreshPlayers = () => {
      axios
         .get(localURL+"players/"+props.currentUser.id)
         .then((response, error) => {
            if(error){
               console.log(error);
            } else{
               console.log(response.data);
               props.setPlayerList(response.data)
            }
         })
   }

   const handleSubmit = (event) => {
      event.preventDefault()
      setBet(props.targetBet)
      axios
      .patch(localURL+"bets/"+props.targetBet.id, {bet})
      .then((response, error) => {
         if (error){
            console.log(error);
         } else {
            console.log(response.data);
         }
         axios
            .get(localURL+"mybook/"+props.currentBook.id)
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

   useEffect(() => {
      refreshPlayers()
   },[])

   return(
      <div className = 'modalBack'>
         <div className = 'detailsModal'>
            { props.editMode ?
            <><h4>Edit Bet</h4>
            <Form onSubmit={handleSubmit}>
               <label for="player_id">Player:</label>
               <Form.Select name="player_id" id="player_id" onChange={handleInput} value={props.targetBet.player_id}>
                  <option>Select a player</option>
                  {props.playerList.map((player) => {
                        return(
                           <option key={player.id} value={player.id}>{player.name}</option>
                        )
                     })}
               </Form.Select><br/>
               <label for="prop">Details:</label>
               <Form.Control type="text" name="prop" onChange={handleInput} value={props.targetBet.prop}/><br/>
               <label for="value">Amount: $</label>
               <Form.Control type="number" name="value" onChange={handleInput} value={props.targetBet.value}/><br/>
               <label for="juice">Juice:</label>
               <Form.Control type="number" min="0" max="1" step="0.01" name="juice" onChange={handleInput} value={props.targetBet.juice}/>
               <input type="hidden" name="book_id" value=
                  { props.currentBook ?
                     props.currentBook.id : 1
                  }/>
               <Button type="submit">Submit</Button>
            </Form>
            <Button variant="secondary" onClick={closeModal}>Back</Button>
            </> : null
            }
      </div>
   </div>)
}

export default EditBet
