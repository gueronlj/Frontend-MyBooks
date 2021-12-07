import {useState, useEffect} from 'react'
import axios from 'axios'
import EditBet from './components/edit-bet.js'

const App = () => {

   const [currentUser, setCurrentUser ] = useState(null)
   const [books, setBooks] = useState([])
   const [currentBook, setCurrentBook] = useState(null)
   const [playerList, setPlayerList] = useState([])
   const [targetBet, setTargetBet] = useState(null)


   const emptyPlayer = {name:'', contact:'', balance:0}
   const [player, setPlayer]= useState(emptyPlayer)

   const emptyBet = { player_id:1, prop: '', value:0, juice:0 }
   const [bet, setNewBet ] = useState(emptyBet)

   const handleLogin = () => {
      axios
         .post('https://protected-eyrie-39175.herokuapp.com/session', {
            user:{
               username: 'lorens',
               password: '123456',
            }
         },
         {withCredentials:true})
         .then((response) => {
            console.log(response.data);
            setCurrentUser(response.data)
            localStorage.setItem('currentUser', JSON.stringify(response.data))
            setBooks(response.data.books)
            setPlayerList(response.data.players)
         })
   }


   const handleLogout = () => {
      localStorage.removeItem('currentUser')
      setCurrentUser(null)
      localStorage.removeItem('currentBook')
      setCurrentBook(null)
      setBooks([])
      setPlayerList([])
   }

   const handleBookBtn = (event) => {
      axios
         .get("https://protected-eyrie-39175.herokuapp.com/books/"+event.target.id+".json")//Example: hitting the '2nd' button will querry for the '2nd' book
         .then((response, error) => {
            if (error){
               console.log(error);
            } else {
               console.log(response.data);
               setCurrentBook(response.data)
               localStorage.setItem('currentBook', JSON.stringify(response.data))
            }
         })
   }

   const handleInput = (event) => {
      setNewBet({...bet, user_id:currentUser.id, book_id:currentBook.id, [event.target.name]:event.target.value })
   }

   const handlePlayerInput = (event) => {
      setPlayer({...player, user_id:currentUser.id, [event.target.name]:event.target.value})
   }

   const handleBetSubmit = (event) => {
      event.preventDefault()
      axios
         .post("https://protected-eyrie-39175.herokuapp.com/bets", {bet})
         .then((response, error) => {
            if (error) {
               console.log(error);
            } else{
               console.log(response.data);
               localStorage.setItem('currentBook', JSON.stringify(response.data))
               setCurrentBook(response.data)
            }
         })
   }

   const handlePlayerSubmit = (event) => {
      event.preventDefault()
      axios.post("https://protected-eyrie-39175.herokuapp.com/players", {player})
      .then((response, error) => {
         if(error){
            console.log(error);
         } else {
            console.log(response.data);
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
                  .get("https://protected-eyrie-39175.herokuapp.com/books/"+currentBook.id+".json")
                  .then((response, error) => {
                     if (error){
                        console.log(error);
                     } else {
                        setCurrentBook(response.data)
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
               setTargetBet(response.data)
            }
         })
   }

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
         <ul className="nav">
            { currentUser ? (
               <><li><button onClick={handleLogout}>Logout</button></li>
                  <li>Welcome, {currentUser.username}</li>
               </>)
               :
               (<>
                  <li><button onClick={checkSession}>Sign up</button></li>
                  <li><button onClick={handleLogin}>Log in</button></li>
               </>)
            }
         </ul>
         </header>
         <nav>
            {books.map((book) => {
               return(
                  <button onClick={handleBookBtn} key={book.id} id={book.id}>{book.name}</button>
               )
            })}
         </nav>
         <content>
            <table>
               <tr>
                  <th>Player</th>
                  <th>Proposition</th>
                  <th>Ammount</th>
                  <th>Juice</th>
                  <th>Bet Id</th>
               </tr>
               { currentBook?
                  (currentBook.bets.map((bet) => {
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

            <h4>Player List</h4>
            <table>
            <tr>
               <th>Alias</th>
               <th>Contact</th>
               <th>Total Wins</th>
               <th>Balance</th>
               <th>ID</th>
            </tr>
            { playerList ?
               (playerList.map((player) => {
                  return(
                     <tr key={player.id}>
                        <td><a href="#">{player.name}</a></td>
                        <td>{ player.contact}</td>
                        <td>{ player.wins}</td>
                        <td>${ player.balance}</td>
                        <td><a href="#">{player.id}</a></td>
                     </tr>
                  )
               })): null
            }
            </table>
            { currentUser ?
               <><h4>Add Player</h4>
               <form onSubmit={handlePlayerSubmit}>
                  <input type='text' name='name' placeholder="Name" onChange={handlePlayerInput}/>
                  <input type='text' name='contact' placeholder="Contact info" onChange={handlePlayerInput}/>
                  <input type='text' name='balance' placeholder="Starting Balance ($)" onChange={handlePlayerInput}/>
                  <input type='submit'/>
               </form></>
                  : null
            }

            { currentUser ?
               (<><form onSubmit={handleBetSubmit}>
               <h4>Add new bet</h4>
               <label for="player_id">Player:</label>
               <select name="player_id_id" id="player_id">
                  {
                     currentUser.players.map((player) => {
                        return(
                           <option key={player.id} value={player.id}>{player.name}</option>
                        )
                     })
                  }
               </select><br/>
               <label for="prop">Details:</label>
                  <input type="text" name="prop" placeholder="Proposition" onChange={handleInput}/><br/>
               <label for="value">Ammount:</label>
                  <input type="number" name="value" onChange={handleInput}/><br/>
               <label for="juice">Juice:</label>
                  <input type="number" min="0" max="1" step="0.01" name="juice" onChange={handleInput}/>
               <input type="hidden" name="book_id" value=
                  { currentBook ?
                     currentBook.id : 1
                  }/>
               <input type="hidden" name={currentUser.id} value={currentUser.id}/>
               <input type="submit"/>
               </form>
               <EditBet
                  currentUser={currentUser}
                  player={player}
                  currentBook={currentBook}
                  setCurrentBook={setCurrentBook}
                  targetBet={targetBet}
                  setTargetBet={setTargetBet}/>
               </>)
                  : null
            }
         </content>
      </main>
   )
}

export default App;
