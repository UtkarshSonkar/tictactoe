import { useState } from "react";
import "./App.css";
import "./components/Block.css";
import fetchData from "./hooks/useapi";
import Board from "./components/Board";

function App() {
  const [data, setData] = useState(Array(9).fill(null));
  const [cellInput, setCellInput] = useState("");
  const [winStatus, setWinStatus] = useState("Game On");

  // HANDLE CLICK AND GAME USING API PROVIDED
  const handleClick = async (index: number) => {
    if (data[index] !== null) return;

    data[index] = cellInput;
    if (winningLogic()) {
      setWinStatus("Winner");
      return;
    }

    const cpuIndex = await fetchData(data);
    data[cpuIndex] = cellInput === "O" ? "X" : "O";
    if (winningLogic()) {
      setWinStatus("You Lose!");
      return;
    }

    setData([...data]);
  };

  // WINNING LOGIC
  const winningLogic = () => {
    const win = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < win.length; i++) {
      const [a, b, c] = win[i];
      if (data[a] !== null && data[a] === data[b] && data[a] === data[c]) {
        return true;
      }
    }
    return false;
  };

  // INITIALIZE PLAYER CHOICE OF SYMBOL
  const initialInput = (e: any) => {
    setCellInput(e.target.textContent);
  };

  return (
    <div>
      {/* SELECT TO PLAY "X" or "O" */}
      {cellInput === "" ? (
        <div>
          <h2>Select to play tic-tac-toe</h2>
          <div>
            <button className="block x" onClick={initialInput}>
              X
            </button>
            <button className="block o" onClick={initialInput}>
              O
            </button>
          </div>
        </div>
      ) : (
        <div>
          {/* DISPLAYING TICTACTOE BOARD */}
          <Board board={data} onClick={handleClick} />
          <button
            style={{ marginRight: "20px" }}
            onClick={() => {
              setData(Array(9).fill(null));
              setWinStatus("Game On");
            }}
          >
            Reset
          </button>
          {winStatus}
        </div>
      )}
      {/* HIGHLIGHTING WINNING SEQUUENCE  */}
      <div>
        {winningLogic() === true &&
          ((data[0] === data[1] && data[0] === data[2] && (
            <div className="strike-row-1"></div>
          )) ||
            (data[3] === data[4] && data[3] === data[5] && (
              <div className="strike-row-2"></div>
            )) ||
            (data[6] === data[7] && data[6] === data[8] && (
              <div className="strike-row-3"></div>
            )) ||
            (data[0] === data[3] && data[0] === data[6] && (
              <div className="strike-col-1"></div>
            )) ||
            (data[1] === data[4] && data[1] === data[7] && (
              <div className="strike-col-2"></div>
            )) ||
            (data[2] === data[5] && data[2] === data[8] && (
              <div className="strike-col-3"></div>
            )) ||
            (data[0] === data[4] && data[0] === data[8] && (
              <div className="strike-diagnol-1"></div>
            )) ||
            (data[2] === data[4] && data[2] === data[6] && (
              <div className="strike-diagnol-2"></div>
            )))}
      </div>
    </div>
  );
}

export default App;
