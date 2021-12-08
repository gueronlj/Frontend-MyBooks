import React from 'react'

const PlayerDetails = (props) => {

   const closeModal = () => {
      props.setOpenDetails(false)
   }

   return (
      <div className = "modalBack">
         <div className = "detailsModal">
            <h5>Name:</h5>
            <h5>Contact:</h5>
            <h5>Total Wins:</h5>
            <h5>Balance:</h5>
            <button onClick={closeModal}>Back</button>
         </div>
      </div>
   )
}

export default PlayerDetails
