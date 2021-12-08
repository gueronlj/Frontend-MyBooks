import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import PlayerDetails from './player-details.js'


const MyBook = (props) => {
   const localURL= "http://localhost:3000/"
   const herokuURL = "https://protected-eyrie-39175.herokuapp.com/"
   const [openDetails, setOpenDetails] = useState(false)

   const [targetPlayer, setTargetPlayer] = useState({name:'', contact:'', wins:'', balance:''})

   const handleBookBtn = (event) => {
      axios
         .get(localURL+"mybook/"+event.target.id)
         .then((response, error) => {
            if (error){
               console.log(error);
            } else {
               console.log(response.data);
               props.setCurrentBook(response.data)
               localStorage.setItem('currentBook', JSON.stringify(response.data))
            }
         })
   }

   const getPlayer = (id) => {
      axios
         .get(localURL+"player-details/"+id)
         .then((response, error) => {
            error ?
               console.log(error)
               :
               console.log(response.data);
               setTargetPlayer(response.data)
         })
   }

   const refreshBooks = () => {
      axios
         .get(localURL+"books/"+props.currentUser.id)
         .then((response, error) => {
            if(error){
               console.log(error);
            }else{
               console.log(response.data);
               props.setBooks(response.data)
            }
         })
   }

   const handleDelete = (event) => {
      axios
         .delete(localURL+"bets/"+event.target.id)
         .then((response, error) => {
            if (error){
               console.log(error);
            } else {
               axios
                  .get(localURL+"mybook/"+props.currentBook.id)
                  .then((response, error) => {
                     if (error){
                        console.log(error);
                     } else {
                        console.log(response.data);
                        props.setCurrentBook(response.data)
                        localStorage.setItem('currentBook', JSON.stringify(response.data))
                     }
                  })
            }
         })
   }

   const findBet = (event) => {
      axios
         .get(localURL+"bets/"+event.target.id)
         .then((response, error) => {
            if(error){
               console.log(error);
            } else {
               console.log(response.data);
               props.setTargetBet(response.data)
            }
         })
         props.editMode ?
            props.setEditMode(false) : props.setEditMode(true)
   }

   const toggleAddBet= () => {
      if(props.addBetOn=== false){
         props.setAddBetOn(true)
      }else{
         props.setAddBetOn(false)
      }
   }

   const toggleDetails = (event) => {
      props.setOpenDetails(true)
      getPlayer(event.target.id)
   }

   const toggleAddBook = () => {
      props.addBook ?
         props.setAddBook(false) : props.setAddBook(true)
   }

   const deleteBook = () => {
      axios
         .delete(localURL+"books/"+props.currentBook.id)
         .then((response, error) => {
            error?
               console.log(error) : console.log(response.data);
               refreshBooks()
         })
   }

   useEffect(() => {
      refreshBooks()
   },[])

   return(<>
      <nav id="bookNav">
         {props.books.map((book) => {
            return(
               <button onClick={handleBookBtn} key={book.id} id={book.id}>{book.name}</button>
            )
         })}
         <img src="./file-add.svg" onClick={toggleAddBook}/>
         <img src="./trash.svg" onClick={deleteBook}/>
      </nav>
      { props.currentBook ?
         (<>
         <table>
            <tr>
               <th>Player</th>
               <th></th>
               <th></th>
               <th>Juice</th>
            </tr>
            {(props.currentBook.bets.map((bet) => {
               return(
                  <tr key={bet.id}>
                     <td ><a id={bet.player_id} onClick={toggleDetails}>{bet.player_id}</a></td>
                     <td>{ bet.prop}</td>
                     <td>${ bet.value}</td>
                     <td>{ bet.juice}</td>
                     <td><img src="./delete.svg" id={bet.id} onClick={handleDelete}/></td>
                     <td><img src='./pencil.svg' alt="" id={bet.id} onClick={findBet}/></td>
                  </tr>
               )
            }))}
         </table>
         <nav>
         <button  onClick={toggleAddBet}>New Bet</button>
         </nav>
         </>) : null
      }

      {props.openDetails ?
         <PlayerDetails
            setOpenDetails={props.setOpenDetails}
            targetPlayer={targetPlayer}/> : null
      }
   </>)
}

export default MyBook
