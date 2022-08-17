import type { ToTuple } from "../utils/to-tuple";
import type { MathAbsolute } from "./calc";
import type { MathStringNegativeNumber } from "./definitions";

export type MathIsNegative<N extends number> = `${N}` extends MathStringNegativeNumber ? true : false;
export type MathIsPositive<N extends number> = MathIsNegative<N> extends true ? false : true;

export type MathIsEqual<N1 extends number, N2 extends number> =
  MathIsPositive<N1> extends true
    ? MathIsNegative<N2> extends true
      ? false
      : ToTuple<N1> extends [...ToTuple<N2>, ...infer _Rest]
        ? _Rest extends { length: 0 }
          ? true
          : false
        : false
    : MathIsPositive<N2> extends true
      ? false
      : ToTuple<MathAbsolute<N1>> extends [...ToTuple<MathAbsolute<N2>>, ...infer _Rest]
        ? _Rest extends { length: 0 }
          ? true
          : false
        : false;

export type MathIsGreaterThan<N1 extends number, N2 extends number> =
  MathIsPositive<N1> extends true
    ? MathIsNegative<N2> extends true
      ? true
      : ToTuple<N1> extends [...ToTuple<N2>, ...infer _Rest]
        ? _Rest extends { length: 0 }
          ? false
          : true
        : false
    : MathIsPositive<N2> extends true
      ? false
      : ToTuple<MathAbsolute<N1>> extends [...ToTuple<MathAbsolute<N2>>, ...infer _Rest]
        ? false
        : true;
export type MathIsGreaterThanOrEqual<N1 extends number, N2 extends number> =
  MathIsEqual<N1, N2> extends true
    ? true
    : MathIsGreaterThan<N1, N2>;

export type MathIsSmallerThan<N1 extends number, N2 extends number> =
  MathIsGreaterThan<N1, N2> extends true
    ? false
    : MathIsEqual<N1, N2> extends true
      ? false
      : true;
export type MathIsSmallerThanOrEqual<N1 extends number, N2 extends number> =
  MathIsEqual<N1, N2> extends true
    ? true
    : MathIsSmallerThan<N1, N2>;

export type MathMax<N1 extends number, N2 extends number> = MathIsGreaterThan<N1, N2> extends true ? N1 : N2;
export type MathMin<N1 extends number, N2 extends number> = MathIsGreaterThan<N1, N2> extends true ? N2 : N1;

export type MathMaxOr<MaxN extends number, N extends number> = MathIsGreaterThan<N, MaxN> extends true ? MaxN : N;
export type MathMinOr<MinN extends number, N extends number> = MathIsSmallerThan<N, MinN> extends true ? MinN : N;
