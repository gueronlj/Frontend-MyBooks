import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import PlayerDetails from './player-details.js'
import AddBook from './add-book.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import CloseButton from 'react-bootstrap/CloseButton'


const MyBook = (props) => {
   const localURL= "http://localhost:3001/"
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
               <Button variant="info" size="sm" onClick={handleBookBtn} key={book.id} id={book.id}>{book.name}</Button>
            )
         })}
         { props.addBook ?
            <img src="./cross.svg" onClick={toggleAddBook}/> : <img src="./file-add.svg" onClick={toggleAddBook}/>
         }

         <img src="./trash.svg" onClick={deleteBook}/>
      </nav>
      { props.addBook ?
         <AddBook
            currentUser={props.currentUser}
            setCurrentBook={props.setCurrentBook}
            setBooks={props.setBooks}
            setAddBook={props.setAddBook}/>
            : null
      }

      { props.currentBook?
         <>
         { props.currentBook.bets.length !== 0 ?
            (<>
            <Table striped hover>
               <thead>
               <tr>
                  <th>Player</th>
                  <th></th>
                  <th></th>
                  <th>Juice</th>
               </tr>
               </thead>
               <tbody>
               {(props.currentBook.bets.map((bet) => {
                  return(
                     <tr key={bet.id}>
                        <td><a href="#" id={bet.player.id} onClick={toggleDetails}>{bet.player.name}</a></td>
                        <td>{ bet.prop}</td>
                        <td>${ bet.value}</td>
                        <td>{ bet.juice}</td>
                        <td><CloseButton id={bet.id} onClick={handleDelete}/></td>
                        <td><img src='./pencil.svg' alt="" id={bet.id} onClick={findBet}/></td>
                     </tr>
                  )
               }))}
               </tbody>
            </Table>
            </>)
            :
            <><h4>This book is empty.</h4> <p>Add a new bet, but make sure you have a player first.</p></>
         }
         </>
         : null
      }
      <nav>
      { props.addBetOn && props.currentBook?
         <Button variant="outline-danger" onClick={toggleAddBet}>Cancel</Button>
         :
         <Button variant="success" onClick={toggleAddBet}>New Bet</Button>
      }
      </nav>
      {props.openDetails ?
         <PlayerDetails
            setOpenDetails={props.setOpenDetails}
            targetPlayer={targetPlayer}/> : null
      }
   </>)
}

export default MyBook
