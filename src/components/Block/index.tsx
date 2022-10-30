import "./index.css";
import { BlockState } from "../../interfaces";

interface Props {
  loading: Boolean;
  state: BlockState;
}

export default function Block({ loading, state }: Props) {
  return (
    <div className="block">
      <h2>{loading ? "X" : state.symbol.char}</h2>
    </div>
  );
}
