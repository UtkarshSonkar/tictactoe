import "./Block.css";

type Props = {
  value?: string | null;
  onClick?: () => void;
};

const Block = ({ value, onClick }: Props) => {
  const style = value === "X" ? "block x" : "block o";
  return (
    <button className={style} onClick={onClick}>
      {value}
    </button>
  );
};

export default Block;
