import {useState, useEffect} from 'react'
import axios from 'axios'
import EditBet from './components/edit-bet.js'
import MyBook from './components/book.js'
import Players from './components/player-list.js'
import AddBet from './components/add-bet.js'
import Nav from './components/nav-bar.js'
import Login from './components/login.js'

const App = () => {
   const [currentUser, setCurrentUser ] = useState(null)
   const [books, setBooks] = useState([])
   const [currentBook, setCurrentBook] = useState(null)
   const [playerList, setPlayerList] = useState([])
   const [targetBet, setTargetBet] = useState(null)
   const emptyPlayer = {name:'', contact:'', balance:0}
   const [player, setPlayer]= useState(emptyPlayer)

   const checkSession = () => {
      let userRaw = localStorage.getItem('currentUser')
      if (userRaw != null){
         let userParsed = JSON.parse(userRaw)
         setCurrentUser(userParsed)
         setBooks(userParsed.books)

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
               checkSession={checkSession}/>
            : null
         }
         </header>
         <content>
         { currentUser ?
            <>
            <Players
               player={player}
               setPlayer={setPlayer}
               playerList={playerList}
               setPlayerList={setPlayerList}
               currentUser={currentUser}/>
            <MyBook
               books={books}
               currentBook={currentBook}
               setCurrentBook={setCurrentBook}
               setTargetBet={setTargetBet}/>
            <AddBet
               currentUser={currentUser}
               currentBook={currentBook}
               setCurrentBook={setCurrentBook}/>
            <EditBet
               currentUser={currentUser}
               player={player}
               currentBook={currentBook}
               setCurrentBook={setCurrentBook}
               targetBet={targetBet}
               setTargetBet={setTargetBet}/>
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
