import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'

const AddBook = (props) => {
   const localURL= "http://localhost:3000/"
   const herokuURL = "https://protected-eyrie-39175.herokuapp.com/"
   const [newBook, setNewBook] = useState({})

   const handleInput = (event) => {
      setNewBook({...newBook, user_id:props.currentUser.id, [event.target.name]:event.target.value})
   }

   const handleSubmit = (event) => {
      event.preventDefault()
      axios
         .post(localURL+"books", {book:newBook})
         .then((response, error) => {
            if (error){
               console.log(error);
            } else{
               console.log(response.data);
               props.setCurrentBook(response.data)
               updateList()
            }
         })
   }

   const updateList = () => {
      axios
         .get(localURL+"books/"+props.currentUser.id)
         .then((response, error) => {
            if(error){
               console.log(error);
            } else {
               console.log(response.data);
               props.setBooks(response.data)
            }
         })
   }

   useEffect(() => {
      updateList()
   },[])

   return(
      <>
         <form onClick={handleSubmit}>
            <h4>New Book</h4>
            <label for="name"/>
            <input type="text" name="name" placeholder="Name for book" onChange={handleInput}/>
            <input type="submit"/>
         </form>
      </>
   )
}

export default AddBook
