import { report } from "process";
import { useState } from "react";
import { Block } from "../components";
import { DEFAULT_CREDIT, SYMBOLS } from "../enums";
import { BlockState } from "../interfaces";
import { getRandomNumber, checkEqualSymbols } from "../utils";

export default function MainPage() {
  let initialState = [
    {
      block: 1,
      symbol: {
        name: "",
        credits: 0,
        char: "",
      },
    },
    {
      block: 2,
      symbol: {
        name: "",
        credits: 0,
        char: "",
      },
    },
    {
      block: 3,
      symbol: {
        name: "",
        credits: 0,
        char: "",
      },
    },
  ];
  const [credit, setCredit] = useState<number>(DEFAULT_CREDIT);
  const [state, setState] = useState<Array<BlockState>>(initialState);
  let reroll = true;

  const rollRequest = () => {
    initialState = [
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
    ];
    if (checkEqualSymbols(initialState)) {
      if (credit >= 40 && credit <= 60) {
        const prcNum = getRandomNumber(10);
        if (prcNum <= 3) {
          if (reroll) {
            reroll = false;
            return rollRequest();
          }
        }
        setCredit((prev) => prev + initialState[0].symbol.credits);
        reroll = true;
        return;
      }
      if (credit > 60) {
        const prcNum = getRandomNumber(10);
        if (prcNum >= 4) {
          if (reroll) {
            reroll = false;
            return rollRequest();
          }
        }
        setCredit((prev) => prev + initialState[0].symbol.credits);
        reroll = true;
        return;
      }

      setCredit((prev) => prev + initialState[0].symbol.credits);
      reroll = true;
    } else {
      setCredit((prev) => prev - 1);
    }
    setState(initialState);
    return;
  };

  const handleOnClick = () => {
    rollRequest();
  };

  return (
    <div className="app">
      <h1>{`You have ${credit} credits.`}</h1>
      <div className="d-flex row">
        {state.map((el: BlockState) => (
          <Block key={el.block} state={el} />
        ))}
        <button
          className="mx-1"
          onClick={handleOnClick}
          disabled={credit === 0}
        >
          START
        </button>
      </div>
    </div>
  );
}
