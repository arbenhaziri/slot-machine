import { useState } from "react";
import { Block } from "../components";
import { DEFAULT_CREDIT, SYMBOLS } from "../enums";
import { BlockState } from "../interfaces";
import { getRandomNumber } from "../utils";

export default function MainPage() {
  const initialState = [
    {
      block: 1,
      symbol: {
        name: "",
        credits: null,
        char: "",
      },
    },
    {
      block: 2,
      symbol: {
        name: "",
        credits: null,
        char: "",
      },
    },
    {
      block: 3,
      symbol: {
        name: "",
        credits: null,
        char: "",
      },
    },
  ];
  const [credit, setCredit] = useState(DEFAULT_CREDIT);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<Array<BlockState>>(initialState);

  const rollRequest = () => {
    setLoading(false);
    setCredit((prev) => prev - 1);
    setState([
      {
        block: 1,
        symbol: SYMBOLS[getRandomNumber(4)],
      },
      {
        block: 2,
        symbol: SYMBOLS[getRandomNumber(4)],
      },
      {
        block: 3,
        symbol: SYMBOLS[getRandomNumber(4)],
      },
    ]);
  };

  const handleOnClick = () => {
    setLoading(true);
    setTimeout(() => rollRequest(), 1000);
  };

  return (
    <div className="app">
      <h1>{`You have ${credit} credits`}</h1>
      <div className="d-flex row">
        {state.map((el: BlockState) => (
          <Block loading={loading} key={el.block} state={el} />
        ))}
        <button
          className="mx-1"
          onClick={handleOnClick}
          disabled={loading || credit === 0}
        >
          START
        </button>
      </div>
    </div>
  );
}
