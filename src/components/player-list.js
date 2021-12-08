import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const Players = (props) => {

   const localURL= "http://localhost:3000/"
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
         <h4>Player List</h4>
         <img src="user-add.svg" onClick={toggleAddPLayer}/>
      </div>
      { addingPlayer ?
         <>
         <form onSubmit={handlePlayerSubmit}>
            <input type='text' name='name' placeholder="Name" onChange={handlePlayerInput}/>
            <input type='text' name='contact' placeholder="Contact info" onChange={handlePlayerInput}/>
            <input type='text' name='balance' placeholder="Starting Balance ($)" onChange={handlePlayerInput}/>
            <input type='submit'/>
         </form>
         <img src='delete.svg' onClick={()=>setAddingPlayer(false)}/>
         </>
            : null
      }
      <table className="playerTable">
         <tr>
            <th>ID</th>
            <th>Alias</th>
            <th>Contact</th>
            <th>Total Wins</th>
            <th>Balance</th>
         </tr>
         { props.playerList ?
            (props.playerList.map((player) => {
               return(
                  <tr key={player.id}>
                     <td><a href="#">{player.id}</a></td>
                     <td><a onClick={toggleDetails}>{player.name}</a></td>
                     <td id="contacts" onClick={toggleDetails}>{ player.contact}</td>
                     <td onClick={toggleDetails}>{ player.wins}</td>
                     <td onClick={toggleDetails}>${ player.balance}</td>
                     <td><img src='user-delete.svg' id={player.id} onClick={handleDelete}/></td>
                  </tr>
               )
            })): null
         }
      </table>
      </>
   )
}

export default Players
