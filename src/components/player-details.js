import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'

const PlayerDetails = (props) => {
   const localURL= "http://localhost:3001/"
   const herokuURL = "https://protected-eyrie-39175.herokuapp.com/"

   const closeModal = () => {
      props.setOpenDetails(false)
   }

   return (
      <div className = "modalBack">
         <div className = "detailsModal">
            <h5>Name: {props.targetPlayer.name}</h5>
            <h5>Contact: {props.targetPlayer.contact}</h5>
            <h5>Total Wins: {props.targetPlayer.wins}</h5>
            <h5>Balance: ${props.targetPlayer.balance}</h5>
            <Button variant="secondary" onClick={closeModal}>Back</Button>
         </div>
      </div>
   )
}

export default PlayerDetails
