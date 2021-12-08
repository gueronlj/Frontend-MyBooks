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

   const [currentUser, setCurrentUser ] = useState(null)
   const [books, setBooks] = useState([])
   const [currentBook, setCurrentBook] = useState(null)
   const [playerList, setPlayerList] = useState([])
   const [targetBet, setTargetBet] = useState(null)
   const emptyPlayer = {name:'', contact:'', balance:0}
   const [player, setPlayer]= useState(emptyPlayer)
   const [playersOn, setPlayersOn] = useState(false)
   const [addBetOn, setAddBetOn] = useState(false)
   const [editMode, setEditMode] = useState(false)
   const [addBook, setAddBook] = useState(false)

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
      checkSession();
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
         <content>
         {playersOn ?
            (<Players
               player={player}
               setPlayer={setPlayer}
               playerList={playerList}
               setPlayerList={setPlayerList}
               currentUser={currentUser}/>)
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
               setAddBook={setAddBook}/>

            {addBetOn ?
               <AddBet
                  currentUser={currentUser}
                  currentBook={currentBook}
                  setCurrentBook={setCurrentBook}
                  playerList={playerList}/>
                  : null
            }
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
            </>
                  : <Login
                     setCurrentUser={setCurrentUser}
                     setBooks={setBooks}
                     setPlayerList={setPlayerList}/>
            }
         </content>
      </main>
   )
}

export default App;
