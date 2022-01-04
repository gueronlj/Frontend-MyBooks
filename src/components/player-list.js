import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import CloseButton from 'react-bootstrap/CloseButton'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'

const Players = (props) => {

   const localURL= "http://localhost:3001/"
   const herokuURL = "https://protected-eyrie-39175.herokuapp.com/"
   const [addingPlayer, setAddingPlayer] = useState(false)

   const handlePlayerInput = (event) => {
      props.setPlayer({...props.player, user_id:props.currentUser.id, [event.target.name]:event.target.value})
   }

   const handlePlayerSubmit = (event) => {
      event.preventDefault()
      axios.post(localURL+"players", props.player)
      .then((response, error) => {
         if(error){
            console.log(error);
         } else {
            console.log(response.data);
            props.setPlayerList(response.data);
         }
      })
   }

   const updateList = () => {
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

   const handleDelete = (event) => {
      axios
         .delete(localURL+"players/"+event.target.id)
         .then((response, error) => {
            if (error){
               console.log(error);
            } else{
               console.log(response.data);
               updateList()
            }
         })
   }

   const toggleAddPLayer = () => {
      addingPlayer ?
         setAddingPlayer(false) : setAddingPlayer(true)
   }

   const toggleDetails = () => {
      props.setOpenDetails(true)
   }

   useEffect(() => {
      updateList()
   },[])

   return(
      <>
      <div id="playerHead">

         { addingPlayer ?
            <><Button variant="outline-danger" size="sm" onClick={toggleAddPLayer}>Close</Button><img src="cross.svg" onClick={toggleAddPLayer}/></>
            :
            <><p onClick={toggleAddPLayer}>Add player</p><img src="user-add.svg" onClick={toggleAddPLayer}/></>
         }

      </div>
      { addingPlayer ?
         <>
         <Form onSubmit={handlePlayerSubmit}>
            <Form.Control type='text' name='name' placeholder="Name" onChange={handlePlayerInput}/>
            <Form.Control type='text' name='contact' placeholder="Contact info" onChange={handlePlayerInput}/>
            <Form.Control type='text' name='balance' placeholder="Starting Balance ($)" onChange={handlePlayerInput}/>
            <Button size='sm' type='submit'>Submit</Button>
         </Form>

         </>
            : null
      }
      <Table striped hover className="playerTable">
         <thead>
         <tr>
            <th>ID</th>
            <th>Alias</th>
            <th>Contact</th>
            <th>Total Wins</th>
            <th>Balance</th>
         </tr>
         </thead>
         <tbody>
         { props.playerList ?
            (props.playerList.map((player) => {
               return(
                  <tr key={player.id}>
                     <td>{player.id}</td>
                     <td><a onClick={toggleDetails}>{player.name}</a></td>
                     <td id="contacts" onClick={toggleDetails}>{ player.contact}</td>
                     <td onClick={toggleDetails}>{ player.wins}</td>
                     <td onClick={toggleDetails}>${ player.balance}</td>
                     <td><CloseButton id={player.id} onClick={handleDelete}/></td>
                  </tr>
               )
            })): null
         }
         </tbody>
      </Table>
      </>
   )
}

export default Players
