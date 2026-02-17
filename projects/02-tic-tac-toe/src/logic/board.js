import { WINNER_COMBOS } from "../constants"

export const checkWinnerFrom = (boardToCheck) => {
  //revisar todas la combinaciones ganadoras
  for (const combo of WINNER_COMBOS) {//iteramos sobre cada combinación ganadora
    const [a, b, c] = combo; //desestructuramos la combinación para obtener los índices
    if (
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a];
    }
  }
  // si no hay ganador
  return null
}


export const checkEndGamne = (boardToCheck) => {
  //revisar si hay empate
  return boardToCheck.every((square) => square !== null); //si todas las casillas del tablero están llenas y no hay ganador, entonces es un empate
}