import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'


const MyBook = (props) => {
   const localURL= "http://localhost:3000/"
   const herokuURL = "https://protected-eyrie-39175.herokuapp.com/"
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

   const handleDelete = (event) => {
      axios
         .delete(localURL+"bets/"+event.target.id)
         .then((response, error) => {
            if (error){
               console.log(error);
            } else {
               axios
                  .get(localURL+"books/"+props.currentBook.id+".json")
                  .then((response, error) => {
                     if (error){
                        console.log(error);
                     } else {
                        props.setCurrentBook(response.data)
                        localStorage.setItem('currentBook', JSON.stringify(response.data))
                     }
                  })
            }
         })
   }

   const findBet = (id) => {
      axios
         .get(localURL+"bets/"+id)
         .then((response, error) => {
            if(error){
               console.log(error);
            } else {
               console.log(response.data);
               props.setTargetBet(response.data)
            }
         })
   }

   const toggleAddBet= () => {
      if(props.addBetOn=== false){
         props.setAddBetOn(true)
      }else{
         props.setAddBetOn(false)
      }
   }

   return(<>
      <nav>
         {props.books.map((book) => {
            return(
               <button onClick={handleBookBtn} key={book.id} id={book.id}>{book.name}</button>
            )
         })}
      </nav>
      { props.currentBook ?
         (<>
         <table>
            <tr>
               <th>Player</th>
               <th></th>
               <th></th>
               <th>Juice</th>
               <th>Id</th>
            </tr>
            {(props.currentBook.bets.map((bet) => {
               return(
                  <tr key={bet.id}>
                     <td ><a href="#">{bet.player_id}</a></td>
                     <td>{ bet.prop}</td>
                     <td>${ bet.value}</td>
                     <td>{ bet.juice}</td>
                     <td><a href="#">{bet.id}</a></td>
                     <td><button id={bet.id} onClick={handleDelete}>-</button></td>
                     <td><button id={bet.id} onClick={e=>findBet(e.target.id)}>...</button></td>
                  </tr>
               )
            }))}
         </table>
         <button onClick={toggleAddBet}>New Bet</button>
         </>) : null
      }
   </>)
}

export default MyBook
