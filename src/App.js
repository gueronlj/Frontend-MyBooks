import {useState, useEffect} from 'react'
import axios from 'axios'
import EditBet from './components/edit-bet.js'
import MyBook from './components/book.js'
import Players from './components/player-list.js'
import AddBet from './components/add-bet.js'
import Nav from './components/nav-bar.js'
import Login from './components/login.js'
import AddBook from './components/add-book.js'

const App = () => {
   const localURL= "http://localhost:3000/"
   const herokuURL = "https://protected-eyrie-39175.herokuapp.com/"

   const [currentUser, setCurrentUser ] = useState(null)
   const [books, setBooks] = useState([])
   const [currentBook, setCurrentBook] = useState(null)
   const [playerList, setPlayerList] = useState([])
   const [targetBet, setTargetBet] = useState({id:1})
   const emptyPlayer = {name:'', contact:'', balance:0}
   const [player, setPlayer]= useState(emptyPlayer)
   const [playersOn, setPlayersOn] = useState(false)
   const [addBetOn, setAddBetOn] = useState(false)
   const [editMode, setEditMode] = useState(false)
   const [addBook, setAddBook] = useState(false)
   const [openDetails, setOpenDetails] = useState(false)

   const checkSession = () => {
      let userRaw = localStorage.getItem('currentUser')
      if (userRaw != null){
         let userParsed = JSON.parse(userRaw)
         setCurrentUser(userParsed)

         let bookRaw = localStorage.getItem('currentBook')
         if (bookRaw != null){
            let bookParsed = JSON.parse(bookRaw)
            setCurrentBook(bookParsed)
         }
      }
   }

   useEffect(() => {
      checkSession()
   },[])

   return(
      <main>
         <header>
         { currentUser ?
            <Nav
               currentUser={currentUser}
               setBooks={setBooks}
               setPlayerList={setPlayerList}
               setCurrentUser={setCurrentUser}
               setCurrentBook={setCurrentBook}
               checkSession={checkSession}
               setPlayersOn={setPlayersOn}
               playersOn={playersOn}/>
            : null
         }
         </header>
         <section>
         {playersOn ?
            (<Players
               player={player}
               setPlayer={setPlayer}
               playerList={playerList}
               setPlayerList={setPlayerList}
               currentUser={currentUser}
               setOpenDetails={setOpenDetails}/>)
            : null
         }
         { currentUser ?
            <>
            { addBook ?
               <AddBook
                  currentUser={currentUser}
                  setCurrentBook={setCurrentBook}
                  setBooks={setBooks}/>
                  : null
            }

            <MyBook
               books={books}
               setBooks={setBooks}
               currentBook={currentBook}
               currentUser={currentUser}
               setCurrentBook={setCurrentBook}
               setTargetBet={setTargetBet}
               addBetOn={addBetOn}
               setAddBetOn={setAddBetOn}
               setEditMode={setEditMode}
               addBook={addBook}
               setAddBook={setAddBook}
               openDetails={openDetails}
               setOpenDetails={setOpenDetails}/>

            {addBetOn ?
               <AddBet
                  currentUser={currentUser}
                  currentBook={currentBook}
                  setCurrentBook={setCurrentBook}
                  playerList={playerList}
                  setPlayerList={setPlayerList}/>
                  : null
            }
            {editMode ?
               <EditBet
                  currentUser={currentUser}
                  player={player}
                  currentBook={currentBook}
                  setCurrentBook={setCurrentBook}
                  targetBet={targetBet}
                  setTargetBet={setTargetBet}
                  setEditMode={setEditMode}
                  editMode={editMode}
                  setPlayerList={setPlayerList}
                  playerList={playerList}/>

                  : null
            }

            </>
                  : <Login
                     setCurrentUser={setCurrentUser}
                     setBooks={setBooks}
                     setPlayerList={setPlayerList}/>
            }
         </section>
      </main>
   )
}

export default App;
