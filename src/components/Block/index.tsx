import "./index.css";
import { BlockState } from "../../interfaces";
import { useEffect, useState } from "react";

interface Props {
  state: BlockState;
}

export default function Block({ state }: Props) {
  const [spining, setSpining] = useState(false);
  const spiningTimeout = (block: number) => {
    const ms = block === 1 ? 1000 : block === 2 ? 2000 : block === 3 ? 3000 : 0;
    setTimeout(() => {
      setSpining(false);
    }, ms);
  };

  useEffect(() => {
    if (state.symbol.credits) {
      setSpining(true);
      spiningTimeout(state.block);
    }
  }, [state]);

  return (
    <div className="block">
      <h2>{spining ? "X" : state.symbol.char}</h2>
    </div>
  );
}
