import { useState } from "react";
import { Block } from "../components";
import { DEFAULT_CREDIT, SYMBOLS, INITIAL_STATE } from "../enums";
import { BlockState } from "../interfaces";
import { getRandomNumber, checkEqualSymbols } from "../utils";

export default function MainPage() {
  const [credit, setCredit] = useState<number>(70);
  const [state, setState] = useState<Array<BlockState>>(INITIAL_STATE);

  let reRoll = true;

  const win = (initialState: Array<BlockState>) => {
    setState(initialState);
    setCredit((prev) => prev + initialState[0].symbol.credits);
  };

  const rollRequest = () => {
    let initialState = [
      {
        block: 1,
        symbol: SYMBOLS[getRandomNumber(2)],
      },
      {
        block: 2,
        symbol: SYMBOLS[getRandomNumber(2)],
      },
      {
        block: 3,
        symbol: SYMBOLS[getRandomNumber(2)],
      },
    ];

    if (checkEqualSymbols(initialState)) {
      if (credit >= 40 && credit <= 60) {
        const prcNum = getRandomNumber(10) + 1;
        if (prcNum <= 3) {
          if (reRoll) {
            reRoll = false;
            return rollRequest();
          }
        }
        win(initialState);
        reRoll = true;
      }
      if (credit > 60) {
        const prcNum = getRandomNumber(10) + 1;
        if (prcNum >= 4) {
          if (reRoll) {
            reRoll = false;
            return rollRequest();
          }
        }
        win(initialState);
        reRoll = true;
      }
      win(initialState);
      reRoll = true;
    } else {
      setState(initialState);
      setCredit((prev) => prev - 1);
    }
  };

  const handleOnClick = () => {
    rollRequest();
  };

  const handleCashOut = () => {
    setCredit(DEFAULT_CREDIT);
    setState(INITIAL_STATE);
  };

  return (
    <div className="app">
      <h1 className="d-flex">{`You have ${credit} credits.`}</h1>
      <div className="d-flex row">
        {state.map((el: BlockState) => (
          <Block key={el.block} state={el} />
        ))}
      </div>
      <div className="d-flex my-2">
        <button
          className="mx-1"
          onClick={handleOnClick}
          disabled={credit === 0}
        >
          START
        </button>
        <button
          className="mx-1"
          onClick={handleCashOut}
          disabled={credit === 0}
        >
          CASH OUT
        </button>
      </div>
    </div>
  );
}
