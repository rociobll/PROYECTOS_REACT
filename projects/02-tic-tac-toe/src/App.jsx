import { useState, useEffect } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square"
import { TURNS, WINNER_COMBOS } from "./constants"
import "./App.css";
import { WinnerModal } from "./components/WinnerModal"
import { checkEndGamne, checkWinnerFrom } from "./logic/board"


//los useState siempre en el cuerpo del componente, nunca dentro d eun if ni for ni nada, siempre al mismo nivel, no pueden estar anidados
function App() {
  // * Estado tablero y LOCAL STORAGE - para guardar el estado del tablero y el turno, así si recargamos la página no se pierde el estado del juego         
  //const [board, setBoard] = useState(Array(9).fill(null));
  const [board, setBoard] = useState(() => {//función para inicializar el estado del tablero, se ejecuta solo la primera vez que se renderiza 
    console.log("Inicializar estado del board")                                          //el componente, luego el estado se mantiene en memoria, no se vuelve a ejecutar la función
                                     
    const boardFromStorage = window.localStorage.getItem("board") //si hay algo en el localStorage lo parseamos y lo usamos como estado inicial, sino usamos un tablero vacío
    if(boardFromStorage) return JSON.parse(boardFromStorage)
    return Array(9).fill(null)
  })

  // * Estado para los turnos y LOCAL STORAGE - guardamos estado del turno si hay guardado en local storage, sino el turno inicial es X
  //const [turn, setTurn] = useState(TURNS.X);
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn") //si hay algo en el localStorage lo parseamos y lo usamos como estado inicial, sino usamos el turno X
    return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.X
  })

  //estado para saber si alguien ha ganado
  const [winner, setWinner] = useState(null); // null no hya ganador, false hay empate, true hay un ganador



//resetear juego
const resetGame = () => {
  setBoard(Array(9).fill(null)); //reiniciamos el tablero
  setTurn(TURNS.X); //reiniciamos el turno al jugador X
  setWinner(null); //reiniciamos el ganador a null

  //resetear lo que hay en localstorage
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
}


  const updateBoard = (index) => {
    // No actualizamos esta posición si ya tiene algo para no sobreescribir o hay ganador
    if (board[index] || winner) return;
    //actualizar tablero
    const newBoard = [...board]; // Creamos una copia del tablero- estados siempre inmmutables
    newBoard[index] = turn; // Actualizamos la posición con el turno actual
    setBoard(newBoard); // Actualizamos el estado del tablero
    //cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    //guardar partida en LOCAL STORAGE - guardamos el estado del tablero y el turno en local storage para que se mantenga al recargar la página
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn",newTurn); 

    //revisar si hya ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti(); //lanzamos confetti si hay ganador
      setWinner(newWinner) 
     //todo chequear si hay empate
     } else if (checkEndGamne(newBoard)) {
        setWinner(false) //empate
     }
 } 

 useEffect(() => {
  // como minimo se ejcuta una vez, luego se ejecuta cada vez que el estado del tablero cambia, es decir, cada vez que se actualiza el tablero, se ejecuta esta función para revisar si hay un ganador o un empate
  console.log('useEffect') 
 }, [winner]) // si el array de dependencias está vacío, se ejecuta solo una vez al montar el componente, si no está vacío, se ejecuta cada vez que alguna de las dependencias cambia, en este caso no tenemos dependencias, por eso se ejecuta solo una vez al montar el componente
 // ahora se ejecuta la primera vez que se renderiza y cuando hay un ganador, empare o se reinicia el juego

 //ejemplo efecto para guaradr partida cada vez que cambia tablero o turno
 useEffect(() => {
  //guardar partida
  saveGameToStorage(board, turn)
  function saveGameToStorage(board, turn) {
    window.localStorage.setItem("board", JSON.stringify(board));
    window.localStorage.setItem("turn", turn);  
  }
  }, [board, turn]) // se ejecuta cada vez que el estado del tablero o el turno cambia, es decir, cada vez que se actualiza el tablero o el turno, se guarda la partida en local storage


return (
    <main className="board">
      <h1>TIc tAc Toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        {board.map((square, index) => {  // _ es la primera posicion lo que hay en ese square, podemos poner square
          return (
            <Square
             key={index} 
             index={index}
             updateBoard={updateBoard}
             >
              {square}
              {/* {board[index]}*/}
            </Square>
          );
        })}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>

     {/*  {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2>
              {
                winner === false
                ? "Empate"
                : "Ganó: "
              }
              </h2>

            
            <header className="win">
              {winner && <Square>{winner}</Square>}
            </header>

            <footer>
              <button onClick={resetGame}>Empezar de nuevo</button>
            </footer>
            </div>
          </section>
        ) 
      } */}
    </main>
  )
}

export default App;

