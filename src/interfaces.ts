type Nullable<T> = T | null;

export interface Symbol {
  name: string;
  credits: Nullable<number>;
  char: string;
}

export interface BlockState {
  block: number;
  symbol: Symbol;
}

export type Symbols = Array<Symbol>;
export type DefaultCredit = number;
export type Percentage = number;
