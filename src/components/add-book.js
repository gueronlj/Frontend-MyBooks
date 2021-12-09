import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const AddBook = (props) => {
   const localURL= "https://protected-eyrie-39175.herokuapp.com/"
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
               props.setAddBook(false)
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
         <Form id="addBook" onClick={handleSubmit}>
            <Form.Control type="text" name="name" placeholder="Name your book" onChange={handleInput}/>
            <Button size="sm" type="submit">Submit</Button>
         </Form>
      </>
   )
}

export default AddBook
