import Block from "./Block";
import "./Board.css";

type Props = {
  board: any[];
  onClick: (idx: number) => {};
};

const Board = ({ board, onClick }: Props) => {
  return (
    <div className="board">
      {board.map((value, idx) => {
        return <Block key={idx} value={value} onClick={() => onClick(idx)} />;
      })}
    </div>
  );
};

export default Board;
