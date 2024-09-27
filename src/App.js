import { useState } from "react"
import "./App.css"

function App() {
 const [size, setSize] = useState(3)
 const [gamegrid, setGamegrid] = useState([])
 const [currentSymbol, setCurrentSymbol] = useState("X")
 const [gamewinner, setGamewinner] = useState(null)
 const [streak, setStreak] = useState(3)
 const [tie, setTie] = useState(false) 

 let maxvalue = Infinity;

 const makeGrid = () => {
  const grid = Array(size).fill(null).map(() => Array(size).fill(null))
  setGamegrid(grid);
  setCurrentSymbol("X");
  setGamewinner(null);
  setTie(false); 
 }

 const handleonClick = (r,c) => {
  if (!gamegrid[r][c] && !gamewinner) {
   const newgrid = [...gamegrid]
   newgrid[r][c] = currentSymbol
   setGamegrid(newgrid)
   checkforwin(newgrid, r, c)
   setCurrentSymbol(currentSymbol === "X" ? "O" : "X");
   if (newgrid.flat().every(cell => cell !== null) && !gamewinner) {
    setTie(true); 
   }
  }
 }

 const checkforwin = (grid, r, c) => {
  const playermark = grid[r][c]
  const directions = [[1,0],[0,1],[1,1],[1,-1]]
  for (let i=0;i<directions.length;i++) {
        const dx = directions[i][0]
        const dy = directions[i][1]
      let count = 1
      for (let d=-1;d<=1;d+=2) {
          for (let j=1;j<streak;j++) {
              const newr = r+j*dx*d
              const newc = c+j*dy*d
              if (newr >= 0 && newr<size && newc>= 0 && newc<size &&grid[newr][newc] === playermark) {
                  count++;
                  if (count === streak) {
                      setGamewinner(playermark)
                      return
                  }
              } else {
                  break
              }
          }
      }
  }
}

 const handleformsubmit=(e)=>{
  e.preventDefault()
  if (streak > size) {
   alert("streak cannot more than grid length")
  }else{
   makeGrid()
  }
 }

 const reset=()=>{
  window.location.reload();
 }

 return <div className="game-container">
   <h1>Tic Tac Toe </h1>
   <form onSubmit={handleformsubmit} className="game-form">
  <div className="form-group">
    <label>
      Grid Length -
      <input  type="number" value={size} onChange={(e) => setSize(Number(e.target.value))} min="3" max={maxvalue}/>
    </label>
  </div>
  <div className="form-group">
    <label>
      Win Number Length -
      <input type="number" value={streak} onChange={(e) => setStreak(Number(e.target.value))} min="3" />
    </label>
  </div>
  <div className="form-buttons">
    <button type="submit">Start Game</button>
    <button type="button" onClick={reset}>Reset Game</button>
  </div>
</form>

   {gamewinner && <h2>{gamewinner} is the winner</h2>}
   {!gamewinner && tie && <h2>Game Tied between X & O</h2>} 
   <div className="grid" style={{gridTemplateColumns:`repeat(${size}, 1fr)` }}>
    {gamegrid.map((row, rowIndex) =>
     row.map((cell, colIndex) => (
      <div key={`${rowIndex}-${colIndex}`} className="cell" onClick={() => handleonClick(rowIndex, colIndex)}>
       {cell}
      </div>
     ))
    )}
   </div>
  </div>
 
}

export default App;
