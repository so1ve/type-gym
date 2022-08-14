import type { ToTuple } from "../utils/to-tuple";
import type { Absolute } from "./calc";
import type { StringNegativeNumber } from "./definitions";

export type IsNegative<N extends number> = `${N}` extends StringNegativeNumber ? true : false;
export type IsPositive<N extends number> = IsNegative<N> extends true ? false : true;

export type IsEqual<N1 extends number, N2 extends number> =
  IsPositive<N1> extends true
    ? IsNegative<N2> extends true
      ? false
      : ToTuple<N1> extends [...ToTuple<N2>, ...infer _Rest]
        ? _Rest extends { length: 0 }
          ? true
          : false
        : false
    : IsPositive<N2> extends true
      ? false
      : ToTuple<Absolute<N1>> extends [...ToTuple<Absolute<N2>>, ...infer _Rest]
        ? _Rest extends { length: 0 }
          ? true
          : false
        : false;

export type IsGreaterThan<N1 extends number, N2 extends number> =
  IsPositive<N1> extends true
    ? IsNegative<N2> extends true
      ? true
      : ToTuple<N1> extends [...ToTuple<N2>, ...infer _Rest]
        ? _Rest extends { length: 0 }
          ? false
          : true
        : false
    : IsPositive<N2> extends true
      ? false
      : ToTuple<Absolute<N1>> extends [...ToTuple<Absolute<N2>>, ...infer _Rest]
        ? false
        : true;
export type IsGreaterThanOrEqual<N1 extends number, N2 extends number> =
  IsEqual<N1, N2> extends true
    ? true
    : IsGreaterThan<N1, N2>;

export type IsSmallerThan<N1 extends number, N2 extends number> =
  IsGreaterThan<N1, N2> extends true
    ? false
    : IsEqual<N1, N2> extends true
      ? false
      : true;
export type IsSmallerThanOrEqual<N1 extends number, N2 extends number> =
  IsEqual<N1, N2> extends true
    ? true
    : IsSmallerThan<N1, N2>;

export type Max<N1 extends number, N2 extends number> = IsGreaterThan<N1, N2> extends true ? N1 : N2;
export type Min<N1 extends number, N2 extends number> = IsGreaterThan<N1, N2> extends true ? N2 : N1;

export type MaxOr<MaxN extends number, N extends number> = IsGreaterThan<N, MaxN> extends true ? MaxN : N;
export type MinOr<MinN extends number, N extends number> = IsSmallerThan<N, MinN> extends true ? MinN : N;
