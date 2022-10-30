import { BlockState } from "../interfaces";

export function getRandomNumber(max: number) {
  return Math.floor(Math.random() * max);
}

export function checkEqualSymbols(initialState: Array<BlockState>) {
  return (
    initialState[0].symbol.char === initialState[1].symbol.char &&
    initialState[0].symbol.char === initialState[2].symbol.char
  );
}
