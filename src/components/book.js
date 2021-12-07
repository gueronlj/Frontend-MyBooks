import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'


const MyBook = (props) => {

   const handleBookBtn = (event) => {
      axios
         .get("https://protected-eyrie-39175.herokuapp.com/books/"+event.target.id+".json")//Example: hitting the '2nd' button will querry for the '2nd' book
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
         .delete("https://protected-eyrie-39175.herokuapp.com/bets/"+event.target.id)
         .then((response, error) => {
            if (error){
               console.log(error);
            } else {
               axios
                  .get("https://protected-eyrie-39175.herokuapp.com/books/"+props.currentBook.id+".json")
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
         .get("https://protected-eyrie-39175.herokuapp.com/bets/"+id)
         .then((response, error) => {
            if(error){
               console.log(error);
            } else {
               console.log(response.data);
               props.setTargetBet(response.data)
            }
         })
   }

   return(<>
      <nav>
         {props.books.map((book) => {
            return(
               <button onClick={handleBookBtn} key={book.id} id={book.id}>{book.name}</button>
            )
         })}
      </nav>
      <table>
         <tr>
            <th>Player</th>
            <th>Proposition</th>
            <th>Ammount</th>
            <th>Juice</th>
            <th>Bet Id</th>
         </tr>
         { props.currentBook ?
            (props.currentBook.bets.map((bet) => {
               return(
                  <tr key={bet.id}>
                     <td ><a href="#">{bet.player.name}</a></td>
                     <td>{ bet.prop}</td>
                     <td>${ bet.value}</td>
                     <td>{ bet.juice}</td>
                     <td><a href="#">{bet.id}</a></td>
                     <td><button id={bet.id} onClick={handleDelete}>-</button></td>
                     <td><button id={bet.id} onClick={e=>findBet(e.target.id)}>...</button></td>
                  </tr>
               )
            })) : null
         }
      </table>
   </>)
}

export default MyBook
